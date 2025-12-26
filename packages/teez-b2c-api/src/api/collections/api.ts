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
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves a list of SKUs belonging to a specific collection with pagination and sorting.
	 */
	public async getSkus(
		params: CollectionsApiGetSkusParams,
	): Promise<CollectionsApiGetSkusResponse> {
		return await this.http.get({
			path: "/api/v2/collections/skus",
			params,
			schema: CollectionsApiGetSkusResponseSchema,
		});
	}

	/**
	 * Retrieves a list of all collections.
	 */
	public async list(
		params: CollectionsApiListParams = {},
	): Promise<CollectionsApiListResponse> {
		return await this.http.get({
			path: "/collections",
			params,
			schema: CollectionsApiListResponseSchema,
		});
	}

	/**
	 * Retrieves detailed information about a specific collection by its ID.
	 */
	public async get(
		params: CollectionsApiGetParams,
	): Promise<CollectionsApiGetResponse> {
		return await this.http.get({
			path: `/collections/${params.collectionId}`,
			params,
			schema: CollectionsApiGetResponseSchema,
		});
	}
}
