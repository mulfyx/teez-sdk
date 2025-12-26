import { type BaseParams, type SortOption } from "../../common/types";

/**
 * Parameters for fetching SKUs from a collection.
 */
export interface CollectionsApiGetSkusParams extends BaseParams {
	/**
	 * Number of the page to retrieve
	 */
	pageNumber?: number;

	/**
	 * Number of items per page
	 */
	pageSize?: number;

	/**
	 * Unique identifier of the collection
	 */
	collectionId: number;

	/**
	 * Sorting option for the results
	 */
	sortBy?: SortOption;
}

/**
 * Parameters for fetching the list of collections.
 */
export interface CollectionsApiListParams extends BaseParams {
	/**
	 * Type of collections to filter by
	 */
	type?: string;

	/**
	 * Filter collections by shop ID
	 */
	shopId?: number;
}

/**
 * Parameters for fetching a specific collection.
 */
export interface CollectionsApiGetParams extends BaseParams {
	/**
	 * Unique identifier of the collection
	 */
	collectionId: number;
}
