import * as z from "zod/mini";

export type NullishSchema<TSchema extends z.ZodMiniType> = z.ZodMiniOptional<
	z.ZodMiniNullable<TSchema>
>;

export type OptionalSchema<TSchema extends z.ZodMiniType> =
	z.ZodMiniOptional<TSchema>;

export function nullishToUndefined<TSchema extends z.ZodMiniType>(
	schema: TSchema,
): z.ZodMiniCodec<NullishSchema<TSchema>, OptionalSchema<TSchema>> {
	return z.codec(z.nullish(schema), z.optional(schema), {
		decode: (value) => (value ?? undefined) as z.input<OptionalSchema<TSchema>>,
		encode: (value) => (value ?? undefined) as z.output<NullishSchema<TSchema>>,
	});
}
