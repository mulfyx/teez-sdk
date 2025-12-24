import { type HttpClient } from "../../http/client";
import { BannersApiListResponseSchema } from "./schemas";
import {
	type BannersApiListParams,
	type BannersApiListResponse,
} from "./types";

/**
 * API for retrieving promotional and informational banners.
 */
export class BannersApi {
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves a list of active banners.
	 */
	public async list(
		params: BannersApiListParams = {},
	): Promise<BannersApiListResponse> {
		return await this.http.get({
			path: "/api/v3/banners",
			params,
			schema: BannersApiListResponseSchema,
		});
	}
}
