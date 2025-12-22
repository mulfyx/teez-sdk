import { type BaseParams, type SortOption } from "../../common/types";
import type {
	CollectionsApiFilterOptionSchema,
	CollectionsApiFilterSchema,
	CollectionsApiGetByIdResponseSchema,
	CollectionsApiGetSkusResponseSchema,
	CollectionsApiListItemSchema,
	CollectionsApiGetAllResponseSchema,
	CollectionsApiSkuItemSchema,
	CollectionsApiStockAvailabilitySchema,
} from "./schemas";
import type * as v from "valibot";

/**
 * Parameters for fetching SKUs from a collection.
 */
export interface CollectionsApiGetSkusParams extends BaseParams {
	/** Number of the page to retrieve */
	pageNumber?: number;

	/** Number of items per page */
	pageSize?: number;

	/** Unique identifier of the collection */
	collectionId: number;

	/** Sorting option for the results */
	sortBy?: SortOption;
}

/**
 * Filter option.
 */
export type CollectionsApiFilterOption = v.InferOutput<
	typeof CollectionsApiFilterOptionSchema
>;

/**
 * Product filter.
 */
export type CollectionsApiFilter = v.InferOutput<
	typeof CollectionsApiFilterSchema
>;

/**
 * Stock availability information.
 */
export type CollectionsApiStockAvailability = v.InferOutput<
	typeof CollectionsApiStockAvailabilitySchema
>;

/**
 * SKU item within a collection.
 */
export type CollectionsApiSkuItem = v.InferOutput<
	typeof CollectionsApiSkuItemSchema
>;

/**
 * Response for getting SKUs from a collection.
 */
export type CollectionsApiGetSkusResponse = v.InferOutput<
	typeof CollectionsApiGetSkusResponseSchema
>;

/**
 * Parameters for fetching the list of collections.
 */
export interface CollectionsApiGetAllParams extends BaseParams {
	/** Type of collections to filter by */
	type?: string;

	/** Filter collections by shop ID */
	shopId?: number;
}

/**
 * Collection list item.
 */
export type CollectionsApiListItem = v.InferOutput<
	typeof CollectionsApiListItemSchema
>;

/**
 * Response for the list of collections.
 */
export type CollectionsApiGetAllResponse = v.InferOutput<
	typeof CollectionsApiGetAllResponseSchema
>;

/**
 * Parameters for fetching a specific collection.
 */
export interface CollectionsApiGetByIdParams extends BaseParams {
	/** Unique identifier of the collection */
	collectionId: number;
}

/**
 * Response for getting a specific collection by ID.
 */
export type CollectionsApiGetByIdResponse = v.InferOutput<
	typeof CollectionsApiGetByIdResponseSchema
>;
