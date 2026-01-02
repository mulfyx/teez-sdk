import { type HttpClient } from "../../http/client";
import { type BannersApiListResponse } from "./schema-types";
import { BannersApiListResponseSchema } from "./schemas";
import { type BannersApiListParams } from "./types";

/**
 * API for retrieving promotional and informational banners.
 */
export class BannersApi {
	/**
	 * Initializes a new instance of the BannersApi.
	 *
	 * @param http HTTP client instance.
	 */
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves a list of active banners.
	 *
	 * @example
	 * const banners = await client.banners.list();
	 */
	public list(
		params: BannersApiListParams = {},
	): Promise<BannersApiListResponse> {
		return this.http.get(
			{
				path: "/api/v3/banners",
				params,
			},
			BannersApiListResponseSchema,
		);
	}
}
