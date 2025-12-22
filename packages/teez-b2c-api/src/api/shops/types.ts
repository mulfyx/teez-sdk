import { type BaseParams, type SortOption } from "../../common/types";
import type {
	ShopsApiContactInfoSchema,
	ShopsApiFilterOptionSchema,
	ShopsApiFilterSchema,
	ShopsApiGetByIdResponseSchema,
	ShopsApiGetMonobrandResponseSchema,
	ShopsApiGetProductsResponseSchema,
	ShopsApiProductItemSchema,
	ShopsApiShopItemSchema,
	ShopsApiStockAvailabilitySchema,
	ShopsApiTagSchema,
} from "./schemas";
import type * as v from "valibot";

/**
 * Parameters for fetching a specific shop.
 */
export interface ShopsApiGetByIdParams extends BaseParams {
	/** Unique identifier of the shop */
	shopId: number;
}

/**
 * Shop contact information.
 */
export type ShopsApiContactInfo = v.InferOutput<
	typeof ShopsApiContactInfoSchema
>;

/**
 * Shop tag.
 */
export type ShopsApiTag = v.InferOutput<typeof ShopsApiTagSchema>;

/**
 * Response for getting a specific shop by ID.
 */
export type ShopsApiGetByIdResponse = v.InferOutput<
	typeof ShopsApiGetByIdResponseSchema
>;

/**
 * Parameters for fetching monobrand shops.
 */
export interface ShopsApiGetMonobrandParams extends BaseParams {
	/** Random seed for consistent pagination */
	seed?: number;

	/** Number of the page to retrieve */
	pageNumber?: number;

	/** Number of items per page */
	pageSize?: number;
}

/**
 * Shop item in a list.
 */
export type ShopsApiShopItem = v.InferOutput<typeof ShopsApiShopItemSchema>;

/**
 * Response for the monobrand shop list.
 */
export type ShopsApiGetMonobrandResponse = v.InferOutput<
	typeof ShopsApiGetMonobrandResponseSchema
>;

/**
 * Parameters for fetching products from a shop.
 */
export interface ShopsApiGetProductsParams extends BaseParams {
	/** Unique identifier of the shop */
	shopId: number;

	/** Number of the page to retrieve */
	pageNumber?: number;

	/** Number of items per page */
	pageSize?: number;

	/** Sorting option for the results */
	sortBy?: SortOption;

	/** Filter by category ID */
	categoryId?: number;

	/** Filter by brand IDs */
	brandIds?: number[];

	/** Minimum price filter */
	minPrice?: number;

	/** Maximum price filter */
	maxPrice?: number;
}

/**
 * Filter option.
 */
export type ShopsApiFilterOption = v.InferOutput<
	typeof ShopsApiFilterOptionSchema
>;

/**
 * Shop product filter.
 */
export type ShopsApiFilter = v.InferOutput<typeof ShopsApiFilterSchema>;

/**
 * Stock availability information.
 */
export type ShopsApiStockAvailability = v.InferOutput<
	typeof ShopsApiStockAvailabilitySchema
>;

/**
 * Product item in a shop.
 */
export type ShopsApiProductItem = v.InferOutput<
	typeof ShopsApiProductItemSchema
>;

/**
 * Response for products from a specific shop.
 */
export type ShopsApiGetProductsResponse = v.InferOutput<
	typeof ShopsApiGetProductsResponseSchema
>;
