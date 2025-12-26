import type * as schemas from "./schemas";
import type * as v from "valibot";

/**
 * Enum for banner image types.
 * Known values: "network" (remote image URL)
 */
export type BannersApiImageType = v.InferOutput<
	typeof schemas.BannersApiImageTypeEnum
>;

/**
 * Schema for a banner image.
 */
export type BannersApiImage = v.InferOutput<
	typeof schemas.BannersApiImageSchema
>;

/**
 * Enum for banner action types.
 * Known values: "url" (external link), "path" (internal navigation), "key" (app action)
 */
export type BannersApiActionType = v.InferOutput<
	typeof schemas.BannersApiActionTypeEnum
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
