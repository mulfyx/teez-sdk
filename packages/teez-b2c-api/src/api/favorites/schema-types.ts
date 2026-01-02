/**
 * ⚠️ This file is auto-generated. Do not edit manually.
 * Run `npm run generate:schema-types` to regenerate.
 * Generated from: schemas.ts
 */

/**
 * Response schema for retrieving favorite SKU IDs.
 */
export interface FavoritesApiGetIdsResponse {
	/**
	 * List of favorited SKU IDs
	 */
	skuIds: number[];
}

/**
 * Response schema for adding a SKU to favorites.
 */
export type FavoritesApiAddResponse = (null | null) | undefined;

/**
 * Response schema for removing a SKU from favorites.
 */
export type FavoritesApiRemoveResponse = (null | null) | undefined;
