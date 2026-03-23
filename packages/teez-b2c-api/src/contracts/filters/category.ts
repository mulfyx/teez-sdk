import * as v from "valibot";

export const categoryFilterOptionSchema = v.pipe(
	v.object({
		label: v.pipe(
			v.string(),
			v.description("Display label for the filter option"),
		),
		value: v.pipe(v.number(), v.description("Value for the filter option")),
	}),
	v.description(
		"Schema for category/brand filter options.\nCommon schema used by multiple APIs.",
	),
);
export const categoryFilterTypesSchema = v.pipe(
	v.union([v.literal("category"), v.literal("alphabetic_search_list")]),
	v.description("Type union for category filter types"),
);
export const categoryFilterSchema = v.pipe(
	v.object({
		type: v.pipe(
			categoryFilterTypesSchema,
			v.description("Filter type: category or alphabetic_search_list"),
		),
		name: v.pipe(
			v.string(),
			v.description("Localized display name of the filter"),
		),
		code: v.pipe(
			v.string(),
			v.description("Unique code identifying the filter type"),
		),
		options: v.pipe(
			v.array(categoryFilterOptionSchema),
			v.description("List of available options for this filter"),
		),
	}),
	v.description(
		"Schema for category/brand filters.\nUse this in discriminatedUnion-based filter schemas.",
	),
);
