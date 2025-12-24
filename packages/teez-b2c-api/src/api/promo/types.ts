import { type BaseParams } from "../../common/types";
import type { PromoApiItemSchema, PromoApiListResponseSchema } from "./schemas";
import type * as v from "valibot";

/**
 * Parameters for fetching promotions.
 */
export type PromoApiListParams = BaseParams;

/**
 * Promotion item.
 */
export type PromoApiItem = v.InferOutput<typeof PromoApiItemSchema>;

/**
 * Response for the list of promotions.
 */
export type PromoApiListResponse = v.InferOutput<
	typeof PromoApiListResponseSchema
>;
