import { type BaseParams } from "../../common/types";
import { type ProductSortKey } from "../products/schema-types";

/**
 * Parameters for fetching a specific shop.
 */
export interface ShopsApiGetParams extends BaseParams {
	/**
	 * Unique identifier of the shop
	 */
	shopId: number;
}

/**
 * Parameters for fetching monobrand shops.
 */
export interface ShopsApiGetMonobrandParams extends BaseParams {
	/**
	 * Random seed for consistent pagination
	 */
	seed?: number;

	/**
	 * Number of the page to retrieve
	 */
	pageNumber?: number;

	/**
	 * Number of items per page
	 */
	pageSize?: number;
}

/**
 * Parameters for fetching products from a shop.
 */
export interface ShopsApiGetProductsParams extends BaseParams {
	/**
	 * Unique identifier of the shop
	 */
	shopId: number;

	/**
	 * Number of the page to retrieve
	 */
	pageNumber?: number;

	/**
	 * Number of items per page
	 */
	pageSize?: number;

	/**
	 * Sorting option for the results
	 */
	sortBy?: ProductSortKey;

	/**
	 * Filter by category ID
	 */
	categoryId?: number;

	/**
	 * Filter by brand IDs
	 */
	brandIds?: number[];

	/**
	 * Minimum price filter
	 */
	minPrice?: number;

	/**
	 * Maximum price filter
	 */
	maxPrice?: number;
}
