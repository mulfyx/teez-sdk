import { type HttpClient } from "../../http/client";
import {
	SkuApiGetCollectionsResponseSchema,
	SkuApiGetResponseSchema,
	SkuApiGetReviewAvailableResponseSchema,
	SkuApiGetSimilarResponseSchema,
} from "./schemas";
import {
	type SkuApiGetCollectionsParams,
	type SkuApiGetCollectionsResponse,
	type SkuApiGetParams,
	type SkuApiGetResponse,
	type SkuApiGetReviewAvailableParams,
	type SkuApiGetReviewAvailableResponse,
	type SkuApiGetSimilarParams,
	type SkuApiGetSimilarResponse,
} from "./types";

/**
 * API for interacting with SKU-related endpoints.
 */
export class SkuApi {
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves details of a specific SKU.
	 */
	public async get(params: SkuApiGetParams): Promise<SkuApiGetResponse> {
		return await this.http.get({
			path: `/api/v2/sku/${params.skuId}`,
			params,
			schema: SkuApiGetResponseSchema,
		});
	}

	/**
	 * Retrieves similar SKUs.
	 */
	public async getSimilar(
		params: SkuApiGetSimilarParams,
	): Promise<SkuApiGetSimilarResponse> {
		return await this.http.get({
			path: "/api/v2/sku/similar-skus",
			params,
			schema: SkuApiGetSimilarResponseSchema,
		});
	}

	/**
	 * Retrieves collections associated with a SKU.
	 */
	public async getCollections(
		params: SkuApiGetCollectionsParams,
	): Promise<SkuApiGetCollectionsResponse> {
		return await this.http.get({
			path: `/sku/${params.skuId}/collections`,
			params,
			schema: SkuApiGetCollectionsResponseSchema,
		});
	}

	/**
	 * Checks if a review is available for a SKU.
	 */
	public async getReviewAvailable(
		params: SkuApiGetReviewAvailableParams,
	): Promise<SkuApiGetReviewAvailableResponse> {
		return await this.http.get({
			path: `/sku/${params.skuId}/review-available`,
			params,
			schema: SkuApiGetReviewAvailableResponseSchema,
		});
	}
}
