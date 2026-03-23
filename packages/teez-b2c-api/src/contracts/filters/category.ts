import * as z from "zod/mini";

import { doc } from "../../schema/metadata";

export const categoryFilterOptionSchema = doc({
	schema: z.object({
		label: doc({
			schema: z.string(),
			description: "Display label for the filter option",
		}),
		value: doc({
			schema: z.number(),
			description: "Value for the filter option",
		}),
	}),
	description:
		"Schema for category/brand filter options.\nCommon schema used by multiple APIs.",
});

export const categoryFilterTypesSchema = doc({
	schema: z.union([z.literal("category"), z.literal("alphabetic_search_list")]),
	description: "Type union for category filter types",
});

export const categoryFilterSchema = doc({
	schema: z.object({
		type: doc({
			schema: categoryFilterTypesSchema,
			description: "Filter type: category or alphabetic_search_list",
		}),
		name: doc({
			schema: z.string(),
			description: "Localized display name of the filter",
		}),
		code: doc({
			schema: z.string(),
			description: "Unique code identifying the filter type",
		}),
		options: doc({
			schema: z.array(categoryFilterOptionSchema),
			description: "List of available options for this filter",
		}),
	}),
	description:
		"Schema for category/brand filters.\nUse this in discriminatedUnion-based filter schemas.",
});
