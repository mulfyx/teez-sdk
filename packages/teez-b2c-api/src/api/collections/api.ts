import { type HttpClient } from "../../http/client";
import {
	CollectionsApiGetByIdResponseSchema,
	CollectionsApiGetSkusResponseSchema,
	CollectionsApiGetAllResponseSchema,
} from "./schemas";
import {
	type CollectionsApiGetByIdParams,
	type CollectionsApiGetByIdResponse,
	type CollectionsApiGetSkusParams,
	type CollectionsApiGetSkusResponse,
	type CollectionsApiGetAllParams,
	type CollectionsApiGetAllResponse,
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
	public async getAll(
		params: CollectionsApiGetAllParams = {},
	): Promise<CollectionsApiGetAllResponse> {
		return await this.http.get({
			path: "/collections",
			params,
			schema: CollectionsApiGetAllResponseSchema,
		});
	}

	/**
	 * Retrieves detailed information about a specific collection by its ID.
	 */
	public async getById(
		params: CollectionsApiGetByIdParams,
	): Promise<CollectionsApiGetByIdResponse> {
		return await this.http.get({
			path: `/collections/${params.collectionId}`,
			params,
			schema: CollectionsApiGetByIdResponseSchema,
		});
	}
}
