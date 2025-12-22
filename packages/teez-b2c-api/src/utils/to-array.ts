/**
 * Converts a value or an array of values into an array.
 * @param value The value or array to convert.
 */
export function toArray<T>(value: T | T[]): T[] {
	return Array.isArray(value) ? value : [value];
}
