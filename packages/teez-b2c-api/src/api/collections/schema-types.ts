// -----------------------------------------------------------------------------
// 🚫 THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY IT MANUALLY.
//    Run `npm run generate:schema-types` to update this file.
// -----------------------------------------------------------------------------

import type * as schemas from "./schemas";
import type * as v from "valibot";

/**
 * Type literal for collections stock availability type
 */
export type CollectionsStockAvailabilityType = v.InferOutput<
	typeof schemas.CollectionsStockAvailabilityTypeSchema
>;

/**
 * Schema for stock availability information.
 */
export type CollectionsApiStockAvailability = v.InferOutput<
	typeof schemas.CollectionsApiStockAvailabilitySchema
>;

/**
 * Schema for a SKU item within a collection.
 */
export type CollectionsApiSkuItem = v.InferOutput<
	typeof schemas.CollectionsApiSkuItemSchema
>;

/**
 * Response schema for getting SKUs from a collection.
 */
export type CollectionsApiGetSkusResponse = v.InferOutput<
	typeof schemas.CollectionsApiGetSkusResponseSchema
>;

/**
 * Schema for a collection list item.
 */
export type CollectionsApiListItem = v.InferOutput<
	typeof schemas.CollectionsApiListItemSchema
>;

/**
 * Response schema for the list of collections.
 */
export type CollectionsApiListResponse = v.InferOutput<
	typeof schemas.CollectionsApiListResponseSchema
>;

/**
 * Type literal for collection type identifier
 */
export type CollectionType = v.InferOutput<typeof schemas.CollectionTypeSchema>;

/**
 * Response schema for getting a specific collection by ID.
 */
export type CollectionsApiGetResponse = v.InferOutput<
	typeof schemas.CollectionsApiGetResponseSchema
>;
