import { type BaseParams } from "../../common/types";

/**
 * Parameters for retrieving favorite SKU IDs.
 */
export type FavoritesApiGetIdsParams = BaseParams;

/**
 * Parameters for adding items to favorites.
 */
export interface FavoritesApiAddParams extends BaseParams {
	/**
	 * Unique identifiers of the SKUs to add.
	 */
	skuIds: number[];
}

/**
 * Parameters for removing items from favorites.
 */
export interface FavoritesApiRemoveParams extends BaseParams {
	/**
	 * Unique identifiers of the SKUs to remove.
	 */
	skuIds: number[];
}
