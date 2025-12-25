import * as v from "valibot";

/**
 * Creates a schema that accepts the given type or null/undefined, defaulting to undefined.
 */
export const nullable = <T extends v.GenericSchema>(
	schema: T,
): v.NullishSchema<T, () => undefined> => v.nullish(schema, () => undefined);
