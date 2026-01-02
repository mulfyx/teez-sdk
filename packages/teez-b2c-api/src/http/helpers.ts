import {
	TeezValidationError,
	type TeezValidationIssue,
} from "../errors/teez-validation-error";
import { type QueryParams } from "./types";
import {
	safeParse,
	type output as ZodInferOutput,
	type ZodMiniType,
} from "zod/mini";

type SafeParseResult = ReturnType<typeof safeParse>;

type SafeParseFailure = Extract<SafeParseResult, { success: false }>;

type ZodMiniError = SafeParseFailure["error"];

/**
 * Constructs a full URL with query parameters.
 */
export function buildUrl(
	path: string,
	baseUrl: string,
	queryParams?: QueryParams,
): URL {
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

	return url;
}

/**
 * Converts Zod ZodError to abstract ValidationIssue[].
 */
export function toValidationIssues(error: ZodMiniError): TeezValidationIssue[] {
	return error.issues.map((issue) => ({
		code: issue.code,
		path: issue.path,
		message: issue.message,
	}));
}

/**
 * Validates and parses the API response data against a schema.
 */
export function parseResponse<T extends ZodMiniType>(
	schema: T,
	data: unknown,
): ZodInferOutput<T> {
	const result = safeParse(schema, data);

	if (!result.success) {
		const issues = toValidationIssues(result.error);

		throw new TeezValidationError("Response validation failed", {
			issues,
			data,
		});
	}

	return result.data;
}
