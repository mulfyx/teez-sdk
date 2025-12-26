// -----------------------------------------------------------------------------
// 🚫 THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY IT MANUALLY.
//    Run `npm run generate:schema-types` to update this file.
// -----------------------------------------------------------------------------

import type * as schemas from "./schemas";
import type * as v from "valibot";

/**
 * Schema for installment payment information.
 */
export type SkuApiInstallment = v.InferOutput<
	typeof schemas.SkuApiInstallmentSchema
>;

/**
 * Schema for shop details associated with a SKU.
 */
export type SkuApiShop = v.InferOutput<typeof schemas.SkuApiShopSchema>;

/**
 * Schema for brand information.
 */
export type SkuApiBrand = v.InferOutput<typeof schemas.SkuApiBrandSchema>;

/**
 * Schema for a category item.
 */
export type SkuApiCategory = v.InferOutput<typeof schemas.SkuApiCategorySchema>;

/**
 * Schema for an attribute property value.
 */
export type SkuApiAttributePropertyValue = v.InferOutput<
	typeof schemas.SkuApiAttributePropertyValueSchema
>;

/**
 * Schema for a product attribute.
 */
export type SkuApiAttributeProperty = v.InferOutput<
	typeof schemas.SkuApiAttributePropertySchema
>;

/**
 * Schema for SKU attributes configuration.
 */
export type SkuApiAttribute = v.InferOutput<
	typeof schemas.SkuApiAttributeSchema
>;

/**
 * Schema for a product tag.
 */
export type SkuApiTag = v.InferOutput<typeof schemas.SkuApiTagSchema>;

/**
 * Schema for stock availability information.
 */
export type SkuApiStockAvailability = v.InferOutput<
	typeof schemas.SkuApiStockAvailabilitySchema
>;

/**
 * Response schema for getting a specific SKU by ID.
 */
export type SkuApiGetResponse = v.InferOutput<
	typeof schemas.SkuApiGetResponseSchema
>;

/**
 * Schema for a similar product item.
 */
export type SkuApiSimilarItem = v.InferOutput<
	typeof schemas.SkuApiSimilarItemSchema
>;

/**
 * Response schema for similar SKUs.
 */
export type SkuApiGetSimilarResponse = v.InferOutput<
	typeof schemas.SkuApiGetSimilarResponseSchema
>;

/**
 * Schema for a collection item.
 */
export type SkuApiCollectionItem = v.InferOutput<
	typeof schemas.SkuApiCollectionItemSchema
>;

/**
 * Response schema for SKU collections.
 */
export type SkuApiGetCollectionsResponse = v.InferOutput<
	typeof schemas.SkuApiGetCollectionsResponseSchema
>;

/**
 * Response schema for review availability check.
 */
export type SkuApiGetReviewAvailableResponse = v.InferOutput<
	typeof schemas.SkuApiGetReviewAvailableResponseSchema
>;
