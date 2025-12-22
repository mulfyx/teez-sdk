import { type HttpClient } from "../../http/client";
import { PromoApiGetAllResponseSchema } from "./schemas";
import {
	type PromoApiGetAllParams,
	type PromoApiGetAllResponse,
} from "./types";

/**
 * API for retrieving active promotions.
 */
export class PromoApi {
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves a list of all active promotions.
	 */
	public async getAll(
		params: PromoApiGetAllParams = {},
	): Promise<PromoApiGetAllResponse> {
		return await this.http.get({
			path: "/api/promo",
			params,
			schema: PromoApiGetAllResponseSchema,
		});
	}
}
