import { type HttpClient } from "../../http/client";
import { PromoApiListResponseSchema } from "./schemas";
import { type PromoApiListParams, type PromoApiListResponse } from "./types";

/**
 * API for retrieving active promotions.
 */
export class PromoApi {
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves a list of all active promotions.
	 */
	public async list(
		params: PromoApiListParams = {},
	): Promise<PromoApiListResponse> {
		return await this.http.get({
			path: "/api/promo",
			params,
			schema: PromoApiListResponseSchema,
		});
	}
}
