import { type HttpClient } from "../../http/client";
import {
	CategoriesApiGetAllResponseSchema,
	CategoriesApiGetByIdResponseSchema,
	CategoriesApiGetParentsResponseSchema,
} from "./schemas";
import {
	type CategoriesApiGetAllParams,
	type CategoriesApiGetAllResponse,
	type CategoriesApiGetByIdParams,
	type CategoriesApiGetByIdResponse,
	type CategoriesApiGetParentsParams,
	type CategoriesApiGetParentsResponse,
} from "./types";

/**
 * API for retrieving product category information.
 */
export class CategoriesApi {
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves parent categories for specific category IDs.
	 */
	public async getParents(
		params: CategoriesApiGetParentsParams,
	): Promise<CategoriesApiGetParentsResponse> {
		return await this.http.get({
			path: "/api/v1/categories/parents",
			params,
			schema: CategoriesApiGetParentsResponseSchema,
		});
	}

	/**
	 * Retrieves a list of all categories.
	 */
	public async getAll(
		params: CategoriesApiGetAllParams = {},
	): Promise<CategoriesApiGetAllResponse> {
		return await this.http.get({
			path: "/categories",
			params,
			schema: CategoriesApiGetAllResponseSchema,
		});
	}

	/**
	 * Retrieves detailed information about a specific category by its ID.
	 */
	public async getById(
		params: CategoriesApiGetByIdParams,
	): Promise<CategoriesApiGetByIdResponse> {
		return await this.http.get({
			path: `/categories/${params.categoryId}`,
			params,
			schema: CategoriesApiGetByIdResponseSchema,
		});
	}
}
