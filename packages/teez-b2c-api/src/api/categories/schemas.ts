import { nullable } from "../../common/schemas";
import * as v from "valibot";

interface CategoryItem {
	/**
	 * Unique identifier of the category
	 */
	id: number;

	/**
	 * Identifier of the parent category
	 */
	parentId: number;

	/**
	 * Depth level in the category tree
	 */
	level: number;

	/**
	 * Localized display name of the category
	 */
	name: string;

	/**
	 * Indicates if the category contains adult content
	 */
	isAdult: boolean;

	/**
	 * Indicates if there are nested subcategories
	 */
	hasSubcategories: boolean;

	/**
	 * List of nested subcategories
	 */
	subcategories?: CategoryItem[] | null | undefined;
}

/**
 * Recursive schema for a category hierarchy.
 */
export const CategoriesApiCategorySchema: v.GenericSchema<CategoryItem> =
	v.object({
		/**
		 * Unique identifier of the category
		 */
		id: v.number(),

		/**
		 * Identifier of the parent category
		 */
		parentId: v.number(),

		/**
		 * Depth level in the category tree
		 */
		level: v.number(),

		/**
		 * Localized display name of the category
		 */
		name: v.string(),

		/**
		 * Indicates if the category contains adult content
		 */
		isAdult: v.boolean(),

		/**
		 * Indicates if there are nested subcategories
		 */
		hasSubcategories: v.boolean(),

		/**
		 * List of nested subcategories
		 */
		subcategories: nullable(
			v.array(v.lazy(() => CategoriesApiCategorySchema)),
		),
	});

/**
 * Schema for a parent category item.
 */
export const CategoriesApiParentItemSchema = v.object({
	/**
	 * Unique identifier of the category
	 */
	id: v.number(),

	/**
	 * Depth level in the category tree
	 */
	level: v.number(),

	/**
	 * Localized display name of the category
	 */
	name: v.string(),

	/**
	 * Indicates if there are nested subcategories
	 */
	hasSubcategories: v.boolean(),

	/**
	 * List of nested subcategories
	 */
	subcategories: nullable(
		v.array(v.lazy(() => CategoriesApiCategorySchema)),
	),
});

/**
 * Schema for a category list item.
 */
export const CategoriesApiListItemSchema = v.object({
	/**
	 * Unique identifier of the category
	 */
	id: v.number(),

	/**
	 * Identifier of the parent category
	 */
	parentId: v.number(),

	/**
	 * Depth level in the category tree
	 */
	level: v.number(),

	/**
	 * Localized display name of the category
	 */
	name: v.string(),

	/**
	 * Indicates if the category contains adult content
	 */
	isAdult: v.boolean(),

	/**
	 * Indicates if there are nested subcategories
	 */
	hasSubcategories: v.boolean(),
});

/**
 * Response schema for getting parent categories.
 */
export const CategoriesApiGetParentsResponseSchema = v.array(
	CategoriesApiParentItemSchema,
);

/**
 * Response schema for the list of categories.
 */
export const CategoriesApiListResponseSchema = v.array(
	CategoriesApiListItemSchema,
);

/**
 * Response schema for getting a specific category by ID.
 */
export const CategoriesApiGetResponseSchema = CategoriesApiCategorySchema;