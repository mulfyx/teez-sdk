import { type HttpClient } from "../../http/client";
import { type FeatureFlagsApiListResponse } from "./schema-types";
import { FeatureFlagsApiListResponseSchema } from "./schemas";
import { type FeatureFlagsApiListParams } from "./types";

/**
 * API for retrieving feature flags configuration.
 */
export class FeatureFlagsApi {
	/**
	 * Initializes a new instance of the FeatureFlagsApi.
	 *
	 * @param http HTTP client instance.
	 */
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves all active feature flags.
	 *
	 * @example
	 * const flags = await client.featureFlags.list();
	 */
	public list(
		params: FeatureFlagsApiListParams = {},
	): Promise<FeatureFlagsApiListResponse> {
		return this.http.get(
			{
				path: "/api/v1/feature-flags",
				params,
			},
			FeatureFlagsApiListResponseSchema,
		);
	}
}
