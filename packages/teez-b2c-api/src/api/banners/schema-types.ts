// -----------------------------------------------------------------------------
// 🚫 THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY IT MANUALLY.
//    Run `npm run generate:schema-types` to update this file.
// -----------------------------------------------------------------------------

import type * as schemas from "./schemas";
import type * as v from "valibot";

/**
 * Schema for a banner image.
 */
export type BannersApiImage = v.InferOutput<
	typeof schemas.BannersApiImageSchema
>;

/**
 * Schema for a banner action.
 */
export type BannersApiAction = v.InferOutput<
	typeof schemas.BannersApiActionSchema
>;

/**
 * Schema for a banner item containing an image and an action.
 */
export type BannersApiBannerItem = v.InferOutput<
	typeof schemas.BannersApiBannerItemSchema
>;

/**
 * Response schema for the list of banners.
 */
export type BannersApiListResponse = v.InferOutput<
	typeof schemas.BannersApiListResponseSchema
>;
