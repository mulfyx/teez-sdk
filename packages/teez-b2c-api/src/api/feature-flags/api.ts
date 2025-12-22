import { type HttpClient } from "../../http/client";
import { FeatureFlagsApiGetAllResponseSchema } from "./schemas";
import {
	type FeatureFlagsApiGetAllParams,
	type FeatureFlagsApiGetAllResponse,
} from "./types";

/**
 * API for retrieving feature flags configuration.
 */
export class FeatureFlagsApi {
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves all active feature flags.
	 */
	public async getAll(
		params: FeatureFlagsApiGetAllParams = {},
	): Promise<FeatureFlagsApiGetAllResponse> {
		return await this.http.get({
			path: "/api/v1/feature-flags",
			params,
			schema: FeatureFlagsApiGetAllResponseSchema,
		});
	}
}
