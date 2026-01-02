import { type HttpClient } from "../../http/client";
import {
	type FavoritesApiAddResponse,
	type FavoritesApiGetIdsResponse,
	type FavoritesApiRemoveResponse,
} from "./schema-types";
import {
	FavoritesApiAddResponseSchema,
	FavoritesApiGetIdsResponseSchema,
	FavoritesApiRemoveResponseSchema,
} from "./schemas";
import {
	type FavoritesApiAddParams,
	type FavoritesApiGetIdsParams,
	type FavoritesApiRemoveParams,
} from "./types";

/**
 * API for managing user favorites.
 */
export class FavoritesApi {
	/**
	 * Initializes a new instance of the FavoritesApi.
	 *
	 * @param http HTTP client instance.
	 */
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves the list of IDs of favorited SKUs.
	 *
	 * @example
	 * const { skuIds } = await client.favorites.getIds();
	 */
	public getIds(
		params: FavoritesApiGetIdsParams = {},
	): Promise<FavoritesApiGetIdsResponse> {
		return this.http.get(
			{
				path: "/api/v1/favorites/ids",
				params,
			},
			FavoritesApiGetIdsResponseSchema,
		);
	}

	/**
	 * Adds SKUs to favorites.
	 *
	 * @example
	 * await client.favorites.add({ skuIds: [12345, 67890] });
	 */
	public add(params: FavoritesApiAddParams): Promise<FavoritesApiAddResponse> {
		return this.http.post(
			{
				path: "/api/v1/favorites",
				body: params.skuIds,
			},
			FavoritesApiAddResponseSchema,
		);
	}

	/**
	 * Removes SKUs from favorites.
	 *
	 * @example
	 * await client.favorites.remove({ skuIds: [12345, 67890] });
	 */
	public remove(
		params: FavoritesApiRemoveParams,
	): Promise<FavoritesApiRemoveResponse> {
		return this.http.delete(
			{
				path: "/api/v1/favorites",
				body: params.skuIds,
			},
			FavoritesApiRemoveResponseSchema,
		);
	}
}
