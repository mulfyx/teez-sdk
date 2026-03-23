import {
	safeParse,
	type ZodMiniType,
	type output as ZodSchemaOutput,
} from "zod/mini";

import {
	TeezValidationError,
	type TeezValidationIssue,
} from "../errors/teez-validation-error";

type SafeParseResult = ReturnType<typeof safeParse>;
type SafeParseFailure = Extract<SafeParseResult, { success: false }>;
type ZodMiniError = SafeParseFailure["error"];

export function formatOperationMessage(
	message: string,
	operationName?: string,
): string {
	return operationName == undefined
		? message
		: `Operation "${operationName}": ${message}`;
}

function toValidationIssues(error: ZodMiniError): TeezValidationIssue[] {
	return error.issues.map((issue) => ({
		code: issue.code,
		path: issue.path,
		message: issue.message,
	}));
}

export function parseSchema<T extends ZodMiniType>(
	schema: T,
	data: unknown,
	message: string,
): ZodSchemaOutput<T> {
	const result = safeParse(schema, data);

	if (!result.success) {
		throw new TeezValidationError(message, {
			issues: toValidationIssues(result.error),
			data,
		});
	}

	return result.data;
}

export function parseInput<T extends ZodMiniType>(
	schema: T,
	data: unknown,
	operationName: string,
): ZodSchemaOutput<T> {
	return parseSchema(
		schema,
		data,
		formatOperationMessage("input validation failed", operationName),
	);
}

export function parseResponse<T extends ZodMiniType>(
	schema: T,
	data: unknown,
	operationName: string,
): ZodSchemaOutput<T> {
	return parseSchema(
		schema,
		data,
		formatOperationMessage("response validation failed", operationName),
	);
}

export function parseErrorResponse<T extends ZodMiniType>(
	schema: T,
	data: unknown,
	operationName: string,
	status: number,
): ZodSchemaOutput<T> {
	return parseSchema(
		schema,
		data,
		formatOperationMessage(
			`error response validation failed (${status})`,
			operationName,
		),
	);
}
