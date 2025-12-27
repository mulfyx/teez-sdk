import * as z from "zod/mini";

/**
 * Schema for a category list item.
 */
export const CategoriesApiListResponseItemSchema = z.object({
	/**
	 * Unique identifier of the category
	 */
	id: z.number(),

	/**
	 * Localized display name of the category
	 */
	name: z.string(),

	/**
	 * Depth level in the category tree
	 */
	level: z.number(),

	/**
	 * Identifier of the parent category
	 */
	parentId: z.number(),

	/**
	 * Indicates if there are nested subcategories
	 */
	hasSubcategories: z.boolean(),

	/**
	 * Indicates if the category contains adult content
	 */
	isAdult: z.boolean(),
});

/**
 * Response schema for the list of categories.
 */
export const CategoriesApiListResponseSchema = z.array(
	CategoriesApiListResponseItemSchema,
);

/**
 * Response schema for getting a specific category by ID.
 */
export const CategoriesApiGetResponseSchema = z.object({
	/**
	 * Unique identifier of the category
	 */
	id: z.number(),

	/**
	 * Localized display name of the category
	 */
	name: z.string(),

	/**
	 * Depth level in the category tree
	 */
	level: z.number(),

	/**
	 * Identifier of the parent category
	 */
	parentId: z.number(),

	/**
	 * Indicates if there are nested subcategories
	 */
	hasSubcategories: z.boolean(),

	/**
	 * Indicates if the category contains adult content
	 */
	isAdult: z.boolean(),

	/**
	 * List of nested subcategories.
	 */
	get subcategories() {
		return z.nullish(z.array(CategoriesApiGetResponseSchema));
	},
});

/**
 * Schema for a parent category item with nesting.
 */
export const CategoriesApiGetParentsResponseItemSchema = z.object({
	/**
	 * Unique identifier of the category
	 */
	id: z.number(),

	/**
	 * Localized display name of the category
	 */
	name: z.string(),

	/**
	 * Depth level in the category tree
	 */
	level: z.number(),

	/**
	 * Indicates if there are nested subcategories
	 */
	hasSubcategories: z.boolean(),

	/**
	 * List of nested subcategories.
	 */
	get subcategories() {
		return z.nullish(z.array(CategoriesApiGetParentsResponseItemSchema));
	},
});

/**
 * Response schema for getting parent categories.
 */
export const CategoriesApiGetParentsResponseSchema = z.array(
	CategoriesApiGetParentsResponseItemSchema,
);
