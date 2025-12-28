import { type HttpClient } from "../../http/client";
import {
	type CollectionsApiGetResponse,
	type CollectionsApiGetSkusResponse,
	type CollectionsApiListResponse,
} from "./schema-types";
import {
	CollectionsApiGetResponseSchema,
	CollectionsApiGetSkusResponseSchema,
	CollectionsApiListResponseSchema,
} from "./schemas";
import {
	type CollectionsApiGetParams,
	type CollectionsApiGetSkusParams,
	type CollectionsApiListParams,
} from "./types";

/**
 * API for retrieving curated collections of products.
 */
export class CollectionsApi {
	/**
	 * Initializes a new instance of the CollectionsApi.
	 *
	 * @param http HTTP client instance.
	 */
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves a list of SKUs belonging to a specific collection with pagination and sorting.
	 *
	 * @example
	 * const skus = await client.collections.getSkus({
	 *   collectionId: 123,
	 *   pageSize: 10
	 * });
	 */
	public getSkus(
		params: CollectionsApiGetSkusParams,
	): Promise<CollectionsApiGetSkusResponse> {
		return this.http.get({
			path: "/api/v2/collections/skus",
			params,
			schema: CollectionsApiGetSkusResponseSchema,
		});
	}

	/**
	 * Retrieves a list of all collections.
	 *
	 * @example
	 * const collections = await client.collections.list();
	 */
	public list(
		params: CollectionsApiListParams = {},
	): Promise<CollectionsApiListResponse> {
		return this.http.get({
			path: "/collections",
			params,
			schema: CollectionsApiListResponseSchema,
		});
	}

	/**
	 * Retrieves detailed information about a specific collection by its ID.
	 *
	 * @example
	 * const collection = await client.collections.get({
	 *   collectionId: 123
	 * });
	 */
	public get(
		params: CollectionsApiGetParams,
	): Promise<CollectionsApiGetResponse> {
		return this.http.get({
			path: `/collections/${params.collectionId}`,
			params,
			schema: CollectionsApiGetResponseSchema,
		});
	}
}
