import {
	type HttpOperationFlatRequest,
	type HttpOperationRequestSections,
} from "../http-operation/inference";
import {
	type AnyHttpOperationDef,
	type AnySchema,
} from "../http-operation/types";
import { getObjectSchemaKeys, isObjectSchema } from "../schema/object-schema";

function pickFlatSection(
	flatInput: Record<string, unknown>,
	schema: AnySchema | undefined,
): Record<string, unknown> | undefined {
	if (schema == undefined || !isObjectSchema(schema)) {
		return undefined;
	}

	const section: Record<string, unknown> = {};

	for (const key of getObjectSchemaKeys(schema)) {
		if (key in flatInput) {
			section[key] = flatInput[key];
		}
	}

	return section;
}

export function toRequestSections<T extends AnyHttpOperationDef>(
	operation: T,
	flatRequest: HttpOperationFlatRequest<T>,
): HttpOperationRequestSections<T> {
	const source = flatRequest as Record<string, unknown>;
	const requestSections: Record<string, unknown> = {};

	const path = pickFlatSection(source, operation.request.path.schema);
	const query = pickFlatSection(source, operation.request.query?.schema);
	const headers = pickFlatSection(source, operation.request.headers?.schema);
	const body = pickFlatSection(source, operation.request.body?.schema);

	if (path != undefined) {
		requestSections["path"] = path;
	}

	if (query != undefined) {
		requestSections["query"] = query;
	}

	if (headers != undefined) {
		requestSections["headers"] = headers;
	}

	if (body != undefined) {
		requestSections["body"] = body;
	}

	return requestSections as HttpOperationRequestSections<T>;
}
