// -----------------------------------------------------------------------------
// 🚫 THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY IT MANUALLY.
//    Run `npm run generate:schema-types` to update this file.
// -----------------------------------------------------------------------------

import type * as schemas from "./schemas";
import type * as v from "valibot";

/**
 * Schema for a promotion item.
 */
export type PromoApiItem = v.InferOutput<typeof schemas.PromoApiItemSchema>;

/**
 * Response schema for the list of promotions.
 */
export type PromoApiListResponse = v.InferOutput<
	typeof schemas.PromoApiListResponseSchema
>;
