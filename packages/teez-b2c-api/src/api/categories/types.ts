import { type BaseParams } from "../../common/types";
import type {
	CategoriesApiGetResponseSchema,
	CategoriesApiGetParentsResponseSchema,
	CategoriesApiListItemSchema,
	CategoriesApiListResponseSchema,
	CategoriesApiParentItemSchema,
} from "./schemas";
import type * as v from "valibot";

/**
 * Parameters for fetching parent categories.
 */
export interface CategoriesApiGetParentsParams extends BaseParams {
	/** List of category IDs to find parents for */
	categoryId: number[];

	/** Hierarchy level to filter by */
	level?: number;
}

/**
 * Parent category item.
 */
export type CategoriesApiParentItem = v.InferOutput<
	typeof CategoriesApiParentItemSchema
>;

/**
 * Response for getting parent categories.
 */
export type CategoriesApiGetParentsResponse = v.InferOutput<
	typeof CategoriesApiGetParentsResponseSchema
>;

/**
 * Parameters for fetching category list.
 */
export type CategoriesApiListParams = BaseParams;

/**
 * Category list item.
 */
export type CategoriesApiListItem = v.InferOutput<
	typeof CategoriesApiListItemSchema
>;

/**
 * Response for the list of categories.
 */
export type CategoriesApiListResponse = v.InferOutput<
	typeof CategoriesApiListResponseSchema
>;

/**
 * Parameters for fetching a specific category.
 */
export interface CategoriesApiGetParams extends BaseParams {
	/** Unique identifier of the category */
	categoryId: number;
}

/**
 * Response for getting a specific category by ID.
 */
export type CategoriesApiGetResponse = v.InferOutput<
	typeof CategoriesApiGetResponseSchema
>;
