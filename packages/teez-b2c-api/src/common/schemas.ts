import * as v from "valibot";

/**
 * Schema for range filter options (e.g., price slider).
 * Common schema used by multiple APIs.
 */
export const RangeFilterOptionSchema = v.object({
	/**
	 * Minimum value for range filters
	 */
	min: v.number(),

	/**
	 * Maximum value for range filters
	 */
	max: v.number(),
});

/**
 * Schema for range filters (e.g., price slider).
 * Use this in variant-based filter schemas.
 */
export const RangeFilterSchema = v.object({
	/**
	 * Filter type: range for price slider
	 */
	type: v.literal("range"),

	/**
	 * Localized display name of the filter
	 */
	name: v.string(),

	/**
	 * Unique code identifying the filter type
	 */
	code: v.string(),

	/**
	 * List of available options for this filter
	 */
	options: v.array(RangeFilterOptionSchema),
});

/**
 * Schema for category/brand filter options.
 * Common schema used by multiple APIs.
 */
export const CategoryFilterOptionSchema = v.object({
	/**
	 * Display label for the filter option
	 */
	label: v.string(),

	/**
	 * Value for the filter option
	 */
	value: v.number(),
});

/**
 * Schema for category/brand filters.
 * Use this in variant-based filter schemas.
 */
export const CategoryFilterSchema = v.object({
	/**
	 * Filter type: category or alphabetic_search_list
	 */
	type: v.union([v.literal("category"), v.literal("alphabetic_search_list")]),

	/**
	 * Localized display name of the filter
	 */
	name: v.string(),

	/**
	 * Unique code identifying the filter type
	 */
	code: v.string(),

	/**
	 * List of available options for this filter
	 */
	options: v.array(CategoryFilterOptionSchema),
});

/**
 * Union filter schema that can be either range or category filter.
 * This is the recommended pattern for type-safe filters.
 */
export const FilterSchema = v.variant("type", [
	RangeFilterSchema,
	CategoryFilterSchema,
]);
