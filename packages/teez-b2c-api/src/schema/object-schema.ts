import type * as v from "valibot";

import { type AnySchema } from "./types";

export type AnyObjectSchema = v.ObjectSchema<
	v.ObjectEntries,
	v.ErrorMessage<v.ObjectIssue> | undefined
>;

export function isObjectSchema(schema: AnySchema): schema is AnyObjectSchema {
	return schema.type === "object" && "entries" in schema;
}

export function getObjectSchemaKeys(schema: AnyObjectSchema): string[] {
	return Object.keys(schema.entries);
}
