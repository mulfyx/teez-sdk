import * as z from "zod/mini";

/**
 * Schema for range filter options (e.g., price slider).
 * Common schema used by multiple APIs.
 */
export const RangeFilterOptionSchema = z.object({
	/**
	 * Minimum value for range filters
	 */
	min: z.number(),

	/**
	 * Maximum value for range filters
	 */
	max: z.number(),
});

/**
 * Type literal for range-based filters
 */
export const RangeTypeSchema = z.literal("range");

/**
 * Schema for range filters (e.g., price slider).
 * Use this in discriminatedUnion-based filter schemas.
 */
export const RangeFilterSchema = z.object({
	/**
	 * Filter type: range for price slider
	 */
	type: RangeTypeSchema,

	/**
	 * Localized display name of the filter
	 */
	name: z.string(),

	/**
	 * Unique code identifying the filter type
	 */
	code: z.string(),

	/**
	 * List of available options for this filter
	 */
	options: z.array(RangeFilterOptionSchema),
});

/**
 * Schema for category/brand filter options.
 * Common schema used by multiple APIs.
 */
export const CategoryFilterOptionSchema = z.object({
	/**
	 * Display label for the filter option
	 */
	label: z.string(),

	/**
	 * Value for the filter option
	 */
	value: z.number(),
});

/**
 * Type union for category filter types
 */
export const CategoryFilterTypesSchema = z.union([
	z.literal("category"),
	z.literal("alphabetic_search_list"),
]);

/**
 * Schema for category/brand filters.
 * Use this in discriminatedUnion-based filter schemas.
 */
export const CategoryFilterSchema = z.object({
	/**
	 * Filter type: category or alphabetic_search_list
	 */
	type: CategoryFilterTypesSchema,

	/**
	 * Localized display name of the filter
	 */
	name: z.string(),

	/**
	 * Unique code identifying the filter type
	 */
	code: z.string(),

	/**
	 * List of available options for this filter
	 */
	options: z.array(CategoryFilterOptionSchema),
});

/**
 * Union filter schema that can be either range or category filter.
 * This is the recommended pattern for type-safe filters.
 */
export const FilterSchema = z.discriminatedUnion("type", [
	RangeFilterSchema,
	CategoryFilterSchema,
]);
