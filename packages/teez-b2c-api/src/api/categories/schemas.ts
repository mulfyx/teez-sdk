import { optionalNullish } from "../../common/helpers";
import * as v from "valibot";

/**
 * Base fields present in all category types.
 */
const BaseCategoryFields = {
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
};

/**
 * Additional fields for full category objects.
 */
const FullCategoryFields = {
	/**
	 * Identifier of the parent category
	 */
	parentId: v.number(),

	/**
	 * Indicates if the category contains adult content
	 */
	isAdult: v.boolean(),
};

// Helper types for interface inference
type BaseCategory = v.InferOutput<
	v.ObjectSchema<typeof BaseCategoryFields, undefined>
>;

type FullCategory = v.InferOutput<
	v.ObjectSchema<typeof FullCategoryFields, undefined>
>;

/**
 * Schema for a category list item.
 * Flat structure without subcategories.
 */
export const CategoriesApiListResponseItemSchema = v.object({
	...BaseCategoryFields,
	...FullCategoryFields,
});

/**
 * Response schema for the list of categories.
 */
export const CategoriesApiListResponseSchema = v.array(
	CategoriesApiListResponseItemSchema,
);

/**
 * Interface for detailed category information.
 * Includes full fields and nested subcategories.
 */
interface CategoriesApiGetResponse extends BaseCategory, FullCategory {
	/**
	 * List of nested subcategories
	 */
	subcategories?: CategoriesApiGetResponse[] | null;
}

/**
 * Response schema for getting a specific category by ID.
 */
export const CategoriesApiGetResponseSchema: v.GenericSchema<CategoriesApiGetResponse> =
	v.object({
		...BaseCategoryFields,
		...FullCategoryFields,

		/**
		 * List of nested subcategories.
		 * v.lazy is used inside v.array to handle recursion correctly.
		 */
		subcategories: optionalNullish(
			v.array(v.lazy(() => CategoriesApiGetResponseSchema)),
		),
	});

/**
 * Interface for a parent category item.
 * Contains only base fields and hierarchy structure.
 */
interface CategoriesApiGetParentsResponseItem extends BaseCategory {
	/**
	 * List of nested subcategories
	 */
	subcategories?: CategoriesApiGetParentsResponseItem[] | null;
}

/**
 * Schema for a parent category item with nesting.
 */
export const CategoriesApiGetParentsResponseItemSchema: v.GenericSchema<CategoriesApiGetParentsResponseItem> =
	v.object({
		...BaseCategoryFields,

		/**
		 * List of nested subcategories.
		 * v.lazy is used inside v.array to handle recursion correctly.
		 */
		subcategories: optionalNullish(
			v.array(v.lazy(() => CategoriesApiGetParentsResponseItemSchema)),
		),
	});

/**
 * Response schema for getting parent categories.
 */
export const CategoriesApiGetParentsResponseSchema = v.array(
	CategoriesApiGetParentsResponseItemSchema,
);
