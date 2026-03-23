import * as z from "zod/mini";

import { doc } from "../../schema/metadata";

export const rangeFilterOptionSchema = doc({
	schema: z.object({
		min: doc({
			schema: z.number(),
			description: "Minimum value for range filters",
		}),
		max: doc({
			schema: z.number(),
			description: "Maximum value for range filters",
		}),
	}),
	description:
		"Schema for range filter options (e.g., price slider).\nCommon schema used by multiple APIs.",
});

export const rangeTypeSchema = doc({
	schema: z.literal("range"),
	description: "Type literal for range-based filters",
});

export const rangeFilterSchema = doc({
	schema: z.object({
		type: doc({
			schema: rangeTypeSchema,
			description: "Filter type: range for price slider",
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
			schema: z.array(rangeFilterOptionSchema),
			description: "List of available options for this filter",
		}),
	}),
	description:
		"Schema for range filters (e.g., price slider).\nUse this in discriminatedUnion-based filter schemas.",
});
