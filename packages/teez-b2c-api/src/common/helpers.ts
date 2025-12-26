import * as v from "valibot";

/**
 * Creates a schema that accepts a value if it is not null or undefined.
 */
export function optionalNullish<T extends v.GenericSchema>(
	schema: T,
): v.OptionalSchema<v.NullishSchema<T, () => undefined>, undefined> {
	return v.optional(v.nullish(schema, () => undefined));
}
