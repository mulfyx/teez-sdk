import {
	type AnySchema,
	type HttpOperationEmptyResponse,
	type HttpOperationEmptyResponseOptions,
	type HttpOperationJsonResponse,
	type HttpOperationJsonResponseOptions,
} from "./types";

export function response<const TSchema extends AnySchema>({
	schema,
	description,
	contentType,
}: HttpOperationJsonResponseOptions<TSchema>): HttpOperationJsonResponse<TSchema> {
	return {
		kind: "json",
		schema,
		description,
		contentType,
	};
}

export function emptyResponse({
	description,
}: HttpOperationEmptyResponseOptions = {}): HttpOperationEmptyResponse {
	return {
		kind: "empty",
		description,
	};
}
