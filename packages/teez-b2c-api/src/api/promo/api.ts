import { type HttpClient } from "../../http/client";
import { type PromoApiListResponse } from "./schema-types";
import { PromoApiListResponseSchema } from "./schemas";
import { type PromoApiListParams } from "./types";

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
