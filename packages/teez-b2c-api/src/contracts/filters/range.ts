import * as v from "valibot";

export const rangeFilterOptionSchema = v.pipe(
	v.object({
		min: v.pipe(v.number(), v.description("Minimum value for range filters")),
		max: v.pipe(v.number(), v.description("Maximum value for range filters")),
	}),
	v.description(
		"Schema for range filter options (e.g., price slider).\nCommon schema used by multiple APIs.",
	),
);
export const rangeTypeSchema = v.pipe(
	v.literal("range"),
	v.description("Type literal for range-based filters"),
);
export const rangeFilterSchema = v.pipe(
	v.object({
		type: v.pipe(
			rangeTypeSchema,
			v.description("Filter type: range for price slider"),
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
			v.array(rangeFilterOptionSchema),
			v.description("List of available options for this filter"),
		),
	}),
	v.description(
		"Schema for range filters (e.g., price slider).\nUse this in discriminatedUnion-based filter schemas.",
	),
);
