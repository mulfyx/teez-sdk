import { type QueryParams, type QueryPrimitive } from "./types";

function isQueryPrimitiveArray(
	value: QueryParams[string],
): value is readonly QueryPrimitive[] {
	return Array.isArray(value);
}

function serializeQueryPrimitive(value: QueryPrimitive): string {
	return String(value);
}

export function buildUrl(
	path: string,
	baseUrl: string,
	queryParams?: QueryParams,
): URL {
	const url = new URL(path, baseUrl);

	if (queryParams != undefined) {
		for (const key of Object.keys(queryParams)) {
			const value = queryParams[key];

			if (value == undefined) {
				continue;
			}

			if (isQueryPrimitiveArray(value)) {
				for (const item of value) {
					url.searchParams.append(key, serializeQueryPrimitive(item));
				}
			} else {
				url.searchParams.set(key, serializeQueryPrimitive(value));
			}
		}
	}

	return url;
}
