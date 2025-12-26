// -----------------------------------------------------------------------------
// 🚫 THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY IT MANUALLY.
//    Run `npm run generate:schema-types` to update this file.
// -----------------------------------------------------------------------------

import type * as schemas from "./schemas";
import type * as v from "valibot";

/**
 * Enum for product sort option keys.
 * Known values: "popularity", "highestRated", "new", "price", "priceDesc"
 */
export type ProductsApiSortKey = v.InferOutput<
	typeof schemas.ProductsApiSortKeyEnum
>;

/**
 * Schema for a sort option.
 */
export type ProductsApiSortOption = v.InferOutput<
	typeof schemas.ProductsApiSortOptionSchema
>;

/**
 * Response schema for available sort options.
 */
export type ProductsApiGetSortOptionsResponse = v.InferOutput<
	typeof schemas.ProductsApiGetSortOptionsResponseSchema
>;

/**
 * Schema for a product review item.
 */
export type ProductsApiReviewItem = v.InferOutput<
	typeof schemas.ProductsApiReviewItemSchema
>;

/**
 * Response schema for product reviews.
 */
export type ProductsApiGetReviewsResponse = v.InferOutput<
	typeof schemas.ProductsApiGetReviewsResponseSchema
>;

/**
 * Schema for a filter option.
 */
export type ProductsApiFilterOption = v.InferOutput<
	typeof schemas.ProductsApiFilterOptionSchema
>;

/**
 * Enum for product filter types.
 * Known values: "category" (category selector), "alphabetic_search_list" (brand picker), "range" (price slider)
 */
export type ProductsApiFilterType = v.InferOutput<
	typeof schemas.ProductsApiFilterTypeEnum
>;

/**
 * Schema for a product filter.
 */
export type ProductsApiFilter = v.InferOutput<
	typeof schemas.ProductsApiFilterSchema
>;

/**
 * Schema for a product badge.
 */
export type ProductsApiBadge = v.InferOutput<
	typeof schemas.ProductsApiBadgeSchema
>;

/**
 * Enum for stock availability types.
 * Known values: "stock" (in stock with quantity info)
 */
export type ProductsApiStockAvailabilityType = v.InferOutput<
	typeof schemas.ProductsApiStockAvailabilityTypeEnum
>;

/**
 * Schema for stock availability information.
 */
export type ProductsApiStockAvailability = v.InferOutput<
	typeof schemas.ProductsApiStockAvailabilitySchema
>;

/**
 * Schema for a product item.
 */
export type ProductsApiProductItem = v.InferOutput<
	typeof schemas.ProductsApiProductItemSchema
>;

/**
 * Response schema for the product list.
 */
export type ProductsApiListResponse = v.InferOutput<
	typeof schemas.ProductsApiListResponseSchema
>;
