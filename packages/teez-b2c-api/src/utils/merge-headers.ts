/**
 * Merges base headers with new ones (overrides).
 * Returns a new Headers instance without mutating the original source.
 */
export function mergeHeaders(
	base?: HeadersInit,
	overrides?: HeadersInit,
): Headers {
	const result = new Headers(base);

	if (overrides != undefined) {
		// eslint-disable-next-line unicorn/no-array-for-each
		new Headers(overrides).forEach((value, key) => {
			result.set(key, value);
		});
	}

	return result;
}
