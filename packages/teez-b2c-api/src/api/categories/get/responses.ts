import * as z from "zod/mini";

import { nullishToUndefined } from "../../../schema/codecs";
import { doc, registerSchemaDoc } from "../../../schema/metadata";

export const categoriesGetItemSchema = doc({
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
		parentId: doc({
			schema: z.number(),
			description: "Identifier of the parent category",
		}),
		hasSubcategories: doc({
			schema: z.boolean(),
			description: "Indicates if there are nested subcategories",
		}),
		isAdult: doc({
			schema: z.boolean(),
			description: "Indicates if the category contains adult content",
		}),
		get subcategories() {
			const subcategoriesSchema = nullishToUndefined(
				z.array(categoriesGetItemSchema),
			);

			registerSchemaDoc(subcategoriesSchema, {
				description: "List of nested subcategories.",
			});

			return subcategoriesSchema;
		},
	}),
	description:
		"Category node returned by the category detail endpoint, including immediate subcategories.",
});

export const categoriesGetResponse200Schema = doc({
	schema: categoriesGetItemSchema,
	description:
		"Category detail response with the selected category and its immediate subcategories.",
});
