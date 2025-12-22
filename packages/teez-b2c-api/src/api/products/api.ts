import { type HttpClient } from "../../http/client";
import {
	ProductsApiGetProductsResponseSchema,
	ProductsApiGetReviewsResponseSchema,
	ProductsApiGetSortOptionsResponseSchema,
} from "./schemas";
import {
	type ProductsApiGetProductsParams,
	type ProductsApiGetProductsResponse,
	type ProductsApiGetReviewsParams,
	type ProductsApiGetReviewsResponse,
	type ProductsApiGetSortOptionsParams,
	type ProductsApiGetSortOptionsResponse,
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
	public async getProducts(
		params: ProductsApiGetProductsParams = {},
	): Promise<ProductsApiGetProductsResponse> {
		return await this.http.get({
			path: "/api/v2/product",
			params,
			schema: ProductsApiGetProductsResponseSchema,
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
