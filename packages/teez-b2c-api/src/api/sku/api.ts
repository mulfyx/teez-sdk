import { type HttpClient } from "../../http/client";
import {
	type SkuApiGetCollectionsResponse,
	type SkuApiGetResponse,
	type SkuApiGetReviewAvailableResponse,
	type SkuApiGetSimilarResponse,
} from "./schema-types";
import {
	SkuApiGetCollectionsResponseSchema,
	SkuApiGetResponseSchema,
	SkuApiGetReviewAvailableResponseSchema,
	SkuApiGetSimilarResponseSchema,
} from "./schemas";
import {
	type SkuApiGetCollectionsParams,
	type SkuApiGetParams,
	type SkuApiGetReviewAvailableParams,
	type SkuApiGetSimilarParams,
} from "./types";

/**
 * API for interacting with SKU-related endpoints.
 */
export class SkuApi {
	/**
	 * Initializes a new instance of the SkuApi.
	 *
	 * @param http HTTP client instance.
	 */
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves details of a specific SKU.
	 *
	 * @example
	 * const sku = await client.sku.get({
	 *   skuId: 123
	 * });
	 */
	public get(params: SkuApiGetParams): Promise<SkuApiGetResponse> {
		return this.http.get({
			path: `/api/v2/sku/${params.skuId}`,
			params,
			schema: SkuApiGetResponseSchema,
		});
	}

	/**
	 * Retrieves similar SKUs.
	 *
	 * @example
	 * const similar = await client.sku.getSimilar({
	 *   skuId: 123
	 * });
	 */
	public getSimilar(
		params: SkuApiGetSimilarParams,
	): Promise<SkuApiGetSimilarResponse> {
		return this.http.get({
			path: "/api/v2/sku/similar-skus",
			params,
			schema: SkuApiGetSimilarResponseSchema,
		});
	}

	/**
	 * Retrieves collections associated with a SKU.
	 *
	 * @example
	 * const collections = await client.sku.getCollections({
	 *   skuId: 123
	 * });
	 */
	public getCollections(
		params: SkuApiGetCollectionsParams,
	): Promise<SkuApiGetCollectionsResponse> {
		return this.http.get({
			path: `/sku/${params.skuId}/collections`,
			params,
			schema: SkuApiGetCollectionsResponseSchema,
		});
	}

	/**
	 * Checks if a review is available for a SKU.
	 *
	 * @example
	 * const isAvailable = await client.sku.getReviewAvailable({
	 *   skuId: 123
	 * });
	 */
	public getReviewAvailable(
		params: SkuApiGetReviewAvailableParams,
	): Promise<SkuApiGetReviewAvailableResponse> {
		return this.http.get({
			path: `/sku/${params.skuId}/review-available`,
			params,
			schema: SkuApiGetReviewAvailableResponseSchema,
		});
	}
}
