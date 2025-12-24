import { type BaseParams, type SortOption } from "../../common/types";
import type {
	ProductsApiBadgeSchema,
	ProductsApiFilterOptionSchema,
	ProductsApiFilterSchema,
	ProductsApiListResponseSchema,
	ProductsApiGetReviewsResponseSchema,
	ProductsApiGetSortOptionsResponseSchema,
	ProductsApiProductItemSchema,
	ProductsApiReviewItemSchema,
	ProductsApiSortOptionSchema,
	ProductsApiStockAvailabilitySchema,
} from "./schemas";
import type * as v from "valibot";

/**
 * Parameters for fetching product sort options.
 */
export interface ProductsApiGetSortOptionsParams extends BaseParams {
	/** Indicates if the context is a search result */
	IsSearch?: boolean;

	/** Indicates if the context is a promotional listing */
	IsPromo?: boolean;
}

/**
 * Sort option.
 */
export type ProductsApiSortOption = v.InferOutput<
	typeof ProductsApiSortOptionSchema
>;

/**
 * Response for available sort options.
 */
export type ProductsApiGetSortOptionsResponse = v.InferOutput<
	typeof ProductsApiGetSortOptionsResponseSchema
>;

/**
 * Parameters for fetching a filtered list of products.
 */
export interface ProductsApiListParams extends BaseParams {
	/** Random seed for consistent pagination */
	seed?: number;

	/** Number of the page to retrieve */
	pageNumber?: number;

	/** Number of products per page */
	pageSize?: number;

	/** Filter products by category ID */
	categoryId?: number;

	/** Criteria to sort products by */
	sortBy?: SortOption;

	/** Filter products by brand ID */
	brandIds?: number;

	/** Minimum price filter */
	minPrice?: number;

	/** Maximum price filter */
	maxPrice?: number;
}

/**
 * Filter option.
 */
export type ProductsApiFilterOption = v.InferOutput<
	typeof ProductsApiFilterOptionSchema
>;

/**
 * Product filter.
 */
export type ProductsApiFilter = v.InferOutput<typeof ProductsApiFilterSchema>;

/**
 * Product badge.
 */
export type ProductsApiBadge = v.InferOutput<typeof ProductsApiBadgeSchema>;

/**
 * Stock availability information.
 */
export type ProductsApiStockAvailability = v.InferOutput<
	typeof ProductsApiStockAvailabilitySchema
>;

/**
 * Product item.
 */
export type ProductsApiProductItem = v.InferOutput<
	typeof ProductsApiProductItemSchema
>;

/**
 * Response for the product list.
 */
export type ProductsApiListResponse = v.InferOutput<
	typeof ProductsApiListResponseSchema
>;

/**
 * Parameters for fetching product reviews.
 */
export interface ProductsApiGetReviewsParams extends BaseParams {
	/** Unique identifier of the product */
	productId: number;

	/** Number of the page to retrieve */
	pageNumber?: number;

	/** Number of reviews per page */
	pageSize?: number;
}

/**
 * Product review item.
 */
export type ProductsApiReviewItem = v.InferOutput<
	typeof ProductsApiReviewItemSchema
>;

/**
 * Response for product reviews.
 */
export type ProductsApiGetReviewsResponse = v.InferOutput<
	typeof ProductsApiGetReviewsResponseSchema
>;
