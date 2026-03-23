import { type HeadersInit } from "./types";

export function mergeHeaders(
	base?: HeadersInit,
	overrides?: HeadersInit,
): Headers {
	const result = new Headers(base);

	if (overrides != undefined) {
		for (const [key, value] of new Headers(overrides)) {
			result.set(key, value);
		}
	}

	return result;
}
