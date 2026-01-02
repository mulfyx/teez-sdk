import * as z from "zod/mini";

/**
 * Response schema for retrieving favorite SKU IDs.
 */
export const FavoritesApiGetIdsResponseSchema = z.object({
	/**
	 * List of favorited SKU IDs
	 */
	skuIds: z.array(z.number()),
});

/**
 * Response schema for adding a SKU to favorites.
 */
export const FavoritesApiAddResponseSchema = z.nullish(z.null());

/**
 * Response schema for removing a SKU from favorites.
 */
export const FavoritesApiRemoveResponseSchema = z.nullish(z.null());
