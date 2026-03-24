import { type HeadersInit } from "./types";

export function mergeHeaders(
	base?: HeadersInit,
	overrides?: HeadersInit,
): Headers {
	const result = new Headers(base);

	if (overrides != undefined) {
		// oxlint-disable-next-line unicorn/no-array-for-each -- Headers iteration without dom.iterable
		new Headers(overrides).forEach((value, key) => {
			result.set(key, value);
		});
	}

	return result;
}
