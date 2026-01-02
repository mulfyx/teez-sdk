import { type HttpClient } from "../../http/client";
import {
	type CategoriesApiGetParentsResponse,
	type CategoriesApiGetResponse,
	type CategoriesApiListResponse,
} from "./schema-types";
import {
	CategoriesApiGetParentsResponseSchema,
	CategoriesApiGetResponseSchema,
	CategoriesApiListResponseSchema,
} from "./schemas";
import {
	type CategoriesApiGetParams,
	type CategoriesApiGetParentsParams,
	type CategoriesApiListParams,
} from "./types";

/**
 * API for retrieving product category information.
 */
export class CategoriesApi {
	/**
	 * Initializes a new instance of the CategoriesApi.
	 *
	 * @param http HTTP client instance.
	 */
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves a list of all categories.
	 *
	 * @example
	 * const categories = await client.categories.list();
	 */
	public list(
		params: CategoriesApiListParams = {},
	): Promise<CategoriesApiListResponse> {
		return this.http.get(
			{
				path: "/categories",
				params,
			},
			CategoriesApiListResponseSchema,
		);
	}

	/**
	 * Retrieves detailed information about a specific category by its ID.
	 *
	 * @example
	 * const category = await client.categories.get({
	 *   categoryId: 1234
	 * });
	 */
	public get(
		params: CategoriesApiGetParams,
	): Promise<CategoriesApiGetResponse> {
		return this.http.get(
			{
				path: `/categories/${params.categoryId}`,
				params,
			},
			CategoriesApiGetResponseSchema,
		);
	}

	/**
	 * Retrieves parent categories for specific category IDs.
	 *
	 * @example
	 * const parents = await client.categories.getParents({
	 *   categoryId: [123, 456]
	 * });
	 */
	public getParents(
		params: CategoriesApiGetParentsParams,
	): Promise<CategoriesApiGetParentsResponse> {
		return this.http.get(
			{
				path: "/api/v1/categories/parents",
				params,
			},
			CategoriesApiGetParentsResponseSchema,
		);
	}
}
