import * as v from "valibot";

/**
 * Creates a schema that accepts the given type or null/undefined, defaulting to undefined.
 */
export function nullable<T extends v.GenericSchema>(
	schema: T,
): v.NullishSchema<T, () => undefined> {
	return v.nullish(schema, () => undefined);
}

/**
 * Creates a schema that accepts any string, but provides autocomplete for the given values.
 */
export function looseEnum<T extends string>(
	options: readonly T[],
): v.UnionSchema<
	(v.LiteralSchema<T, undefined> | v.GenericSchema<string & {}>)[],
	undefined
> {
	return v.union([
		...options.map((option) => v.literal(option)),
		v.string() as v.GenericSchema<string & {}>,
	]);
}
