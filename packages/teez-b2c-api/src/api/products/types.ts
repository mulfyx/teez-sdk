import { type BaseParams } from "../../common/types";
import { type ProductSortKey } from "./schema-types";

/**
 * Parameters for fetching product sort options.
 */
export interface ProductsApiGetSortOptionsParams extends BaseParams {
	/**
	 * Indicates if the context is a search result
	 */
	IsSearch?: boolean;

	/**
	 * Indicates if the context is a promotional listing
	 */
	IsPromo?: boolean;
}

/**
 * Parameters for fetching product reviews.
 */
export interface ProductsApiGetReviewsParams extends BaseParams {
	/**
	 * Unique identifier of the product
	 */
	productId: number;

	/**
	 * Number of the page to retrieve
	 */
	pageNumber?: number;

	/**
	 * Number of reviews per page
	 */
	pageSize?: number;
}

/**
 * Parameters for fetching a filtered list of products.
 */
export interface ProductsApiListParams extends BaseParams {
	/**
	 * Random seed for consistent pagination
	 */
	seed?: number;

	/**
	 * Number of the page to retrieve
	 */
	pageNumber?: number;

	/**
	 * Number of products per page
	 */
	pageSize?: number;

	/**
	 * Filter products by category ID
	 */
	categoryId?: number;

	/**
	 * Criteria to sort products by
	 */
	sortBy?: ProductSortKey;

	/**
	 * Filter products by brand ID
	 */
	brandIds?: number;

	/**
	 * Minimum price filter
	 */
	minPrice?: number;

	/**
	 * Maximum price filter
	 */
	maxPrice?: number;
}
