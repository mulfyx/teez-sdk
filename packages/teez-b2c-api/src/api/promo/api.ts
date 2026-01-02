import { type HttpClient } from "../../http/client";
import { type PromoApiListResponse } from "./schema-types";
import { PromoApiListResponseSchema } from "./schemas";
import { type PromoApiListParams } from "./types";

/**
 * API for retrieving active promotions.
 */
export class PromoApi {
	/**
	 * Initializes a new instance of the PromoApi.
	 *
	 * @param http HTTP client instance.
	 */
	public constructor(private http: HttpClient) {}

	/**
	 * Retrieves a list of all active promotions.
	 *
	 * @example
	 * const promos = await client.promo.list();
	 */
	public list(params: PromoApiListParams = {}): Promise<PromoApiListResponse> {
		return this.http.get(
			{
				path: "/api/promo",
				params,
			},
			PromoApiListResponseSchema,
		);
	}
}
