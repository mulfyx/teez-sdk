import { type HttpClient } from "../../http/client";
import { FeatureFlagsApiListResponseSchema } from "./schemas";
import {
	type FeatureFlagsApiListParams,
	type FeatureFlagsApiListResponse,
} from "./types";

/**
 * API for retrieving feature flags configuration.
 */
export class FeatureFlagsApi {
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves all active feature flags.
	 */
	public async list(
		params: FeatureFlagsApiListParams = {},
	): Promise<FeatureFlagsApiListResponse> {
		return await this.http.get({
			path: "/api/v1/feature-flags",
			params,
			schema: FeatureFlagsApiListResponseSchema,
		});
	}
}
