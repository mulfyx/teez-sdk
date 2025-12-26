import type * as schemas from "./schemas";
import type * as v from "valibot";

/**
 * Recursive schema for a category hierarchy.
 */
export type CategoriesApiCategory = v.InferOutput<
	typeof schemas.CategoriesApiCategorySchema
>;

/**
 * Schema for a parent category item.
 */
export type CategoriesApiParentItem = v.InferOutput<
	typeof schemas.CategoriesApiParentItemSchema
>;

/**
 * Schema for a category list item.
 */
export type CategoriesApiListItem = v.InferOutput<
	typeof schemas.CategoriesApiListItemSchema
>;

/**
 * Response schema for getting parent categories.
 */
export type CategoriesApiGetParentsResponse = v.InferOutput<
	typeof schemas.CategoriesApiGetParentsResponseSchema
>;

/**
 * Response schema for the list of categories.
 */
export type CategoriesApiListResponse = v.InferOutput<
	typeof schemas.CategoriesApiListResponseSchema
>;

/**
 * Response schema for getting a specific category by ID.
 */
export type CategoriesApiGetResponse = v.InferOutput<
	typeof schemas.CategoriesApiGetResponseSchema
>;
