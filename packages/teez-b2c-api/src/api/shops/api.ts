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
	/**
	 * Initializes a new instance of the ShopsApi.
	 *
	 * @param http HTTP client instance.
	 */
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves details of a specific shop.
	 *
	 * @example
	 * const shop = await client.shops.get({
	 *   shopId: 123
	 * });
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
	 *
	 * @example
	 * const monobrand = await client.shops.getMonobrand();
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
	 *
	 * @example
	 * const shopProducts = await client.shops.getProducts({
	 *   shopId: 123,
	 *   pageSize: 10
	 * });
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
