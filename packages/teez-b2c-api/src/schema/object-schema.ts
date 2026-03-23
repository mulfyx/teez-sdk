import { type ZodMiniObject, type ZodMiniType } from "zod/mini";

export type AnyZodObjectSchema = ZodMiniObject<Record<string, ZodMiniType>>;

export function isObjectSchema(
	schema: ZodMiniType,
): schema is AnyZodObjectSchema {
	return "shape" in schema;
}

export function getObjectSchemaKeys(schema: AnyZodObjectSchema): string[] {
	return Object.keys(schema.shape);
}
