import * as v from "valibot";

import {
	TeezValidationError,
	type TeezValidationIssue,
} from "../errors/teez-validation-error";
import { type AnySchema } from "../schema/types";

export function formatOperationMessage(
	message: string,
	operationName?: string,
): string {
	return operationName == undefined
		? message
		: `Operation "${operationName}": ${message}`;
}

function toValidationPath(
	path: readonly v.IssuePathItem[] | undefined,
): (string | number | symbol)[] {
	if (path == undefined) {
		return [];
	}

	return path.flatMap(({ key }) =>
		typeof key === "string" ||
		typeof key === "number" ||
		typeof key === "symbol"
			? [key]
			: [],
	);
}

function toValidationIssues<T extends AnySchema>(
	issues: readonly v.InferIssue<T>[],
): TeezValidationIssue[] {
	return issues.map((issue) => ({
		code: issue.type,
		path: toValidationPath(issue.path),
		message: issue.message,
	}));
}

export function parseSchema<T extends AnySchema>(
	schema: T,
	data: unknown,
	message: string,
): v.InferOutput<T> {
	const result = v.safeParse(schema, data);

	if (!result.success) {
		throw new TeezValidationError(message, {
			issues: toValidationIssues(result.issues),
			data,
		});
	}

	return result.output;
}

export function parseInput<T extends AnySchema>(
	schema: T,
	data: unknown,
	operationName: string,
): v.InferOutput<T> {
	return parseSchema(
		schema,
		data,
		formatOperationMessage("input validation failed", operationName),
	);
}

export function parseResponse<T extends AnySchema>(
	schema: T,
	data: unknown,
	operationName: string,
): v.InferOutput<T> {
	return parseSchema(
		schema,
		data,
		formatOperationMessage("response validation failed", operationName),
	);
}

export function parseErrorResponse<T extends AnySchema>(
	schema: T,
	data: unknown,
	operationName: string,
	status: number,
): v.InferOutput<T> {
	return parseSchema(
		schema,
		data,
		formatOperationMessage(
			`error response validation failed (${status})`,
			operationName,
		),
	);
}
