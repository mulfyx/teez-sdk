import { type BaseParams } from "../../common/types";
import type { PromoApiItemSchema, PromoApiGetAllResponseSchema } from "./schemas";
import type * as v from "valibot";

/**
 * Parameters for fetching promotions.
 */
export type PromoApiGetAllParams = BaseParams;

/**
 * Promotion item.
 */
export type PromoApiItem = v.InferOutput<typeof PromoApiItemSchema>;

/**
 * Response for the list of promotions.
 */
export type PromoApiGetAllResponse = v.InferOutput<
	typeof PromoApiGetAllResponseSchema
>;
