import * as z from "zod/mini";

export interface SchemaDocMetadata {
	title?: string;
	description: string;
	examples?: readonly unknown[];
	readonly [key: `x-${string}`]: unknown;
}

export interface SchemaDocConfig<
	TSchema extends z.ZodMiniType,
> extends SchemaDocMetadata {
	readonly schema: TSchema;
}

export const schemaDocRegistry = z.registry<SchemaDocMetadata>();

export function getSchemaDoc(
	schema: z.ZodMiniType,
): SchemaDocMetadata | undefined {
	return schemaDocRegistry.get(schema);
}

export function registerSchemaDoc<TSchema extends z.ZodMiniType>(
	schema: TSchema,
	metadata: SchemaDocMetadata,
): TSchema {
	schemaDocRegistry.add(schema, metadata);
	z.globalRegistry.add(schema, metadata as unknown as Record<string, unknown>);

	return schema;
}

export function doc<TSchema extends z.ZodMiniType>({
	schema,
	...metadata
}: SchemaDocConfig<TSchema>): TSchema {
	return registerSchemaDoc(schema, metadata);
}
