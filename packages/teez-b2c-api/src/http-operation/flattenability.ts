import { getObjectSchemaKeys, isObjectSchema } from "../schema/object-schema";
import { type AnyHttpOperationDef } from "./types";

export function isHttpOperationFlattenable(
	operation: AnyHttpOperationDef,
): boolean {
	const sectionSchemas = [
		operation.request.path.schema,
		operation.request.query?.schema,
		operation.request.headers?.schema,
		operation.request.body?.schema,
	];

	const objectSchemaKeys = new Set<string>();

	for (const schema of sectionSchemas) {
		if (schema == undefined) {
			continue;
		}

		if (!isObjectSchema(schema)) {
			return false;
		}

		for (const key of getObjectSchemaKeys(schema)) {
			if (objectSchemaKeys.has(key)) {
				return false;
			}

			objectSchemaKeys.add(key);
		}
	}

	return true;
}
