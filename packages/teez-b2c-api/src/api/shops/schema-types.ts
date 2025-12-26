// -----------------------------------------------------------------------------
// 🚫 THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY IT MANUALLY.
//    Run `npm run generate:schema-types` to update this file.
// -----------------------------------------------------------------------------

import type * as schemas from "./schemas";
import type * as v from "valibot";

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
 * Type literal for shops stock availability type
 */
export type ShopsStockAvailabilityType = v.InferOutput<
	typeof schemas.ShopsStockAvailabilityTypeSchema
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
