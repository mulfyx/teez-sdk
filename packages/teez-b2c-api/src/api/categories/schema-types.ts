// -----------------------------------------------------------------------------
// 🚫 THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY IT MANUALLY.
//    Run `npm run generate:schema-types` to update this file.
// -----------------------------------------------------------------------------

import type * as schemas from "./schemas";
import type * as v from "valibot";

/**
 * Schema for a category list item.
 * Flat structure without subcategories.
 */
export type CategoriesApiListResponseItem = v.InferOutput<
	typeof schemas.CategoriesApiListResponseItemSchema
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

/**
 * Schema for a parent category item with nesting.
 */
export type CategoriesApiGetParentsResponseItem = v.InferOutput<
	typeof schemas.CategoriesApiGetParentsResponseItemSchema
>;

/**
 * Response schema for getting parent categories.
 */
export type CategoriesApiGetParentsResponse = v.InferOutput<
	typeof schemas.CategoriesApiGetParentsResponseSchema
>;
