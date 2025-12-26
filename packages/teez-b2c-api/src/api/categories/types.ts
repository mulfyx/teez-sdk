import { type BaseParams } from "../../common/types";

/**
 * Parameters for fetching parent categories.
 */
export interface CategoriesApiGetParentsParams extends BaseParams {
	/**
	 * List of category IDs to find parents for
	 */
	categoryId: number[];

	/**
	 * Hierarchy level to filter by
	 */
	level?: number;
}

/**
 * Parameters for fetching category list.
 */
export type CategoriesApiListParams = BaseParams;

/**
 * Parameters for fetching a specific category.
 */
export interface CategoriesApiGetParams extends BaseParams {
	/**
	 * Unique identifier of the category
	 */
	categoryId: number;
}
