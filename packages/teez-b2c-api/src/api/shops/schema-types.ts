import type * as schemas from "./schemas";
import type * as v from "valibot";

/**
 * Enum for shop filter types.
 * Known values: "category" (category selector), "alphabetic_search_list" (brand picker), "range" (price slider)
 */
export type ShopsApiFilterType = v.InferOutput<
	typeof schemas.ShopsApiFilterTypeEnum
>;

/**
 * Schema for shop contact information.
 */
export type ShopsApiContactInfo = v.InferOutput<
	typeof schemas.ShopsApiContactInfoSchema
>;

/**
 * Schema for a shop tag.
 */
export type ShopsApiTag = v.InferOutput<typeof schemas.ShopsApiTagSchema>;

/**
 * Response schema for getting a specific shop by ID.
 */
export type ShopsApiGetResponse = v.InferOutput<
	typeof schemas.ShopsApiGetResponseSchema
>;

/**
 * Schema for a shop item in a list.
 */
export type ShopsApiShopItem = v.InferOutput<
	typeof schemas.ShopsApiShopItemSchema
>;

/**
 * Response schema for the monobrand shop list.
 */
export type ShopsApiGetMonobrandResponse = v.InferOutput<
	typeof schemas.ShopsApiGetMonobrandResponseSchema
>;

/**
 * Schema for a filter option.
 */
export type ShopsApiFilterOption = v.InferOutput<
	typeof schemas.ShopsApiFilterOptionSchema
>;

/**
 * Schema for a shop product filter.
 */
export type ShopsApiFilter = v.InferOutput<typeof schemas.ShopsApiFilterSchema>;

/**
 * Enum for stock availability types.
 * Known values: "stock" (in stock with quantity info)
 */
export type ShopsApiStockAvailabilityType = v.InferOutput<
	typeof schemas.ShopsApiStockAvailabilityTypeEnum
>;

/**
 * Schema for stock availability information.
 */
export type ShopsApiStockAvailability = v.InferOutput<
	typeof schemas.ShopsApiStockAvailabilitySchema
>;

/**
 * Schema for a product item in a shop.
 */
export type ShopsApiProductItem = v.InferOutput<
	typeof schemas.ShopsApiProductItemSchema
>;

/**
 * Response schema for products from a specific shop.
 */
export type ShopsApiGetProductsResponse = v.InferOutput<
	typeof schemas.ShopsApiGetProductsResponseSchema
>;
