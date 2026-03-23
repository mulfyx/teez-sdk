import * as v from "valibot";

import { type AnySchema } from "./types";

export type NullishSchema<TSchema extends AnySchema> = v.NullishSchema<
	TSchema,
	undefined
>;

export type OptionalSchema<TSchema extends AnySchema> = v.OptionalSchema<
	TSchema,
	undefined
>;

export type NullishToUndefinedSchema<TSchema extends AnySchema> =
	v.GenericSchema<
		v.InferInput<TSchema> | null | undefined,
		v.InferOutput<TSchema> | undefined
	>;

export function nullishToUndefined<TSchema extends AnySchema>(
	schema: TSchema,
): NullishToUndefinedSchema<TSchema> {
	return v.pipe(
		v.nullish(schema),
		v.transform((value) => value ?? undefined),
		v.optional(schema),
	) as NullishToUndefinedSchema<TSchema>;
}
