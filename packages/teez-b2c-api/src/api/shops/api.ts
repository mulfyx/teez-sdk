import { type HttpClient } from "../../http/client";
import {
	ShopsApiGetByIdResponseSchema,
	ShopsApiGetMonobrandResponseSchema,
	ShopsApiGetProductsResponseSchema,
} from "./schemas";
import {
	type ShopsApiGetByIdParams,
	type ShopsApiGetByIdResponse,
	type ShopsApiGetMonobrandParams,
	type ShopsApiGetMonobrandResponse,
	type ShopsApiGetProductsParams,
	type ShopsApiGetProductsResponse,
} from "./types";

/**
 * API for interacting with shop-related endpoints.
 */
export class ShopsApi {
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves details of a specific shop.
	 */
	public async getById(
		params: ShopsApiGetByIdParams,
	): Promise<ShopsApiGetByIdResponse> {
		return await this.http.get({
			path: `/api/v1/shops/${params.shopId}`,
			params,
			schema: ShopsApiGetByIdResponseSchema,
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
