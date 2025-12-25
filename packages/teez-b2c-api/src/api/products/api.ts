import { type HttpClient } from "../../http/client";
import {
	ProductsApiGetReviewsResponseSchema,
	ProductsApiGetSortOptionsResponseSchema,
	ProductsApiListResponseSchema,
} from "./schemas";
import {
	type ProductsApiGetReviewsParams,
	type ProductsApiGetReviewsResponse,
	type ProductsApiGetSortOptionsParams,
	type ProductsApiGetSortOptionsResponse,
	type ProductsApiListParams,
	type ProductsApiListResponse,
} from "./types";

/**
 * API for retrieving product listings, details, and reviews.
 */
export class ProductsApi {
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves available sorting options for product lists.
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
