import { type HttpClient } from "../../http/client";
import {
	type ShopsApiGetMonobrandResponse,
	type ShopsApiGetProductsResponse,
	type ShopsApiGetResponse,
} from "./schema-types";
import {
	ShopsApiGetMonobrandResponseSchema,
	ShopsApiGetProductsResponseSchema,
	ShopsApiGetResponseSchema,
} from "./schemas";
import {
	type ShopsApiGetMonobrandParams,
	type ShopsApiGetParams,
	type ShopsApiGetProductsParams,
} from "./types";

/**
 * API for interacting with shop-related endpoints.
 */
export class ShopsApi {
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves details of a specific shop.
	 */
	public async get(params: ShopsApiGetParams): Promise<ShopsApiGetResponse> {
		return await this.http.get({
			path: `/api/v1/shops/${params.shopId}`,
			params,
			schema: ShopsApiGetResponseSchema,
		});
	}

	/**
	 * Retrieves monobrand shop details.
	 */
	public async getMonobrand(
		params: ShopsApiGetMonobrandParams = {},
	): Promise<ShopsApiGetMonobrandResponse> {
		return await this.http.get({
			path: "/api/v1/shops/monobrand",
			params,
			schema: ShopsApiGetMonobrandResponseSchema,
		});
	}

	/**
	 * Retrieves products for a specific shop.
	 */
	public async getProducts(
		params: ShopsApiGetProductsParams,
	): Promise<ShopsApiGetProductsResponse> {
		return await this.http.get({
			path: `/api/v2/shops/${params.shopId}/products`,
			params,
			schema: ShopsApiGetProductsResponseSchema,
		});
	}
}
