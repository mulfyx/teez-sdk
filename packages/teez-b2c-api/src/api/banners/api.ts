import { type HttpClient } from "../../http/client";
import { BannersApiGetAllResponseSchema } from "./schemas";
import {
	type BannersApiGetAllParams,
	type BannersApiGetAllResponse,
} from "./types";

/**
 * API for retrieving promotional and informational banners.
 */
export class BannersApi {
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves a list of active banners.
	 */
	public async getAll(
		params: BannersApiGetAllParams = {},
	): Promise<BannersApiGetAllResponse> {
		return await this.http.get({
			path: "/api/v3/banners",
			params,
			schema: BannersApiGetAllResponseSchema,
		});
	}
}
