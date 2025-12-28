import { type HttpClient } from "../../http/client";
import {
	type ProductsApiGetReviewsResponse,
	type ProductsApiGetSortOptionsResponse,
	type ProductsApiListResponse,
} from "./schema-types";
import {
	ProductsApiGetReviewsResponseSchema,
	ProductsApiGetSortOptionsResponseSchema,
	ProductsApiListResponseSchema,
} from "./schemas";
import {
	type ProductsApiGetReviewsParams,
	type ProductsApiGetSortOptionsParams,
	type ProductsApiListParams,
} from "./types";

/**
 * API for retrieving product listings, details, and reviews.
 */
export class ProductsApi {
	/**
	 * Initializes a new instance of the ProductsApi.
	 *
	 * @param http HTTP client instance.
	 */
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves available sorting options for product lists.
	 *
	 * @example
	 * const sortOptions = await client.products.getSortOptions();
	 */
	public async getSortOptions(
		params: ProductsApiGetSortOptionsParams = {},
	): Promise<ProductsApiGetSortOptionsResponse> {
		return await this.http.get({
			path: "/api/product/sort-options",
			params,
			schema: ProductsApiGetSortOptionsResponseSchema,
		});
	}

	/**
	 * Retrieves a list of products with optional filtering and pagination.
	 *
	 * @example
	 * const products = await client.products.list({
	 *   pageSize: 20,
	 *   pageNumber: 1
	 * });
	 */
	public async list(
		params: ProductsApiListParams = {},
	): Promise<ProductsApiListResponse> {
		return await this.http.get({
			path: "/api/v2/product",
			params,
			schema: ProductsApiListResponseSchema,
		});
	}

	/**
	 * Retrieves reviews for a specific product.
	 *
	 * @example
	 * const reviews = await client.products.getReviews({
	 *   productId: 12345
	 * });
	 */
	public async getReviews(
		params: ProductsApiGetReviewsParams,
	): Promise<ProductsApiGetReviewsResponse> {
		return await this.http.get({
			path: `/api/v1/product/${params.productId}/review`,
			params,
			schema: ProductsApiGetReviewsResponseSchema,
		});
	}
}
