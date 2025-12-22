import {
	TeezValidationError,
	type TeezValidationIssue,
} from "../errors/teez-validation-error";
import { type QueryParams } from "./types";
import * as v from "valibot";

/**
 * Constructs a full URL with query parameters.
 */
export function buildUrl(
	path: string,
	baseUrl: string,
	queryParams?: QueryParams,
): string {
	const url = new URL(path, baseUrl);

	if (queryParams != undefined) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value == undefined) {
				continue;
			}

			if (Array.isArray(value)) {
				for (const item of value) {
					url.searchParams.append(key, String(item));
				}
			} else {
				url.searchParams.set(key, String(value));
			}
		}
	}

	return String(url);
}

/**
 * Converts Valibot BaseIssue[] to abstract ValidationIssue[].
 */
export function toValidationIssues(
	issues: v.BaseIssue<unknown>[],
): TeezValidationIssue[] {
	return issues.map((issue) => ({
		message: issue.message,
		path: issue.path?.map((part) => part.key as string | number),
		expected: issue.expected ?? undefined,
		received: issue.received ?? undefined,
	}));
}

/**
 * Validates and parses the API response data against a schema.
 */
export function parseResponse<T extends v.GenericSchema>(
	schema: T,
	data: unknown,
): v.InferOutput<T> {
	const result = v.safeParse(schema, data);

	if (!result.success) {
		const issues = toValidationIssues(result.issues);

		throw new TeezValidationError("Response validation failed", {
			issues,
			data,
		});
	}

	return result.output;
}
