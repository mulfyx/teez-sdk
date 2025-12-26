import { type BaseParams } from "../../common/types";

/**
 * Parameters for fetching a specific SKU by ID.
 */
export interface SkuApiGetParams extends BaseParams {
	/**
	 * Unique identifier of the SKU
	 */
	skuId: number;
}

/**
 * Parameters for fetching similar SKUs.
 */
export interface SkuApiGetSimilarParams extends BaseParams {
	/**
	 * Unique identifier of the SKU to find similarities for
	 */
	skuId: number;

	/**
	 * Number of the page to retrieve
	 */
	pageNumber?: number;

	/**
	 * Number of items per page
	 */
	pageSize?: number;
}

/**
 * Parameters for fetching collections for a SKU.
 */
export interface SkuApiGetCollectionsParams extends BaseParams {
	/**
	 * Unique identifier of the SKU
	 */
	skuId: number;
}

/**
 * Parameters for checking review availability.
 */
export interface SkuApiGetReviewAvailableParams extends BaseParams {
	/**
	 * Unique identifier of the SKU
	 */
	skuId: number;
}
