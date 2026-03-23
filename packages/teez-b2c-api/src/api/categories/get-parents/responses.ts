import * as z from "zod/mini";

import {
	nullishToUndefined,
	type NullishSchema,
	type OptionalSchema,
} from "../../../schema/codecs";
import { doc, registerSchemaDoc } from "../../../schema/metadata";

type CategoriesGetParentsSubcategoriesSchema = z.ZodMiniCodec<
	NullishSchema<z.ZodMiniArray<typeof categoriesGetParentsItemSchema>>,
	OptionalSchema<z.ZodMiniArray<typeof categoriesGetParentsItemSchema>>
>;

export const categoriesGetParentsItemSchema = doc({
	schema: z.object({
		id: doc({
			schema: z.number(),
			description: "Unique identifier of the category",
		}),
		name: doc({
			schema: z.string(),
			description: "Localized display name of the category",
		}),
		level: doc({
			schema: z.number(),
			description: "Depth level in the category tree",
		}),
		hasSubcategories: doc({
			schema: z.boolean(),
			description: "Indicates if there are nested subcategories",
		}),
		get subcategories(): CategoriesGetParentsSubcategoriesSchema {
			const subcategoriesSchema = nullishToUndefined(
				z.array(categoriesGetParentsItemSchema),
			);

			return registerSchemaDoc(subcategoriesSchema, {
				description: "List of nested subcategories.",
			});
		},
	}),
	description:
		"Category node used inside parent-category chains, including nested subcategories.",
});

export const categoriesGetParentsResponse200Schema = doc({
	schema: z.array(categoriesGetParentsItemSchema),
	description:
		"Parent category chains returned for the requested category identifiers.",
});
