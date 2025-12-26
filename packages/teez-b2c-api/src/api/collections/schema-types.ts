import type * as schemas from "./schemas";
import type * as v from "valibot";

/**
 * Schema for a filter option.
 */
export type CollectionsApiFilterOption = v.InferOutput<
	typeof schemas.CollectionsApiFilterOptionSchema
>;

/**
 * Enum for collection filter types.
 * Known values: "category" (category selector), "alphabetic_search_list" (brand picker), "range" (price slider)
 */
export type CollectionsApiFilterType = v.InferOutput<
	typeof schemas.CollectionsApiFilterTypeEnum
>;

/**
 * Schema for a product filter.
 */
export type CollectionsApiFilter = v.InferOutput<
	typeof schemas.CollectionsApiFilterSchema
>;

/**
 * Enum for stock availability types.
 * Known values: "stock" (in stock with quantity info)
 */
export type CollectionsApiStockAvailabilityType = v.InferOutput<
	typeof schemas.CollectionsApiStockAvailabilityTypeEnum
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
 * Enum for collection types.
 * Known values: "Collection"
 */
export type CollectionsApiCollectionType = v.InferOutput<
	typeof schemas.CollectionsApiCollectionTypeEnum
>;

/**
 * Response schema for getting a specific collection by ID.
 */
export type CollectionsApiGetResponse = v.InferOutput<
	typeof schemas.CollectionsApiGetResponseSchema
>;
