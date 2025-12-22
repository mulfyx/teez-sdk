import * as v from "valibot";

/**
 * Creates a schema that accepts the given type or null/undefined, defaulting to undefined.
 * @param schema The schema to wrap.
 */
export const nullable = <T extends v.GenericSchema>(schema: T) =>
	v.nullish(schema, () => undefined);
