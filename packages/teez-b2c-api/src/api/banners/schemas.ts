import { nullable } from "../../common/schemas";
import * as v from "valibot";

/**
 * Enum for banner image types.
 * Known values: "network" (remote image URL)
 */
export const BannersApiImageTypeEnum = v.union([
	v.literal("network"),
	v.string(),
]);

/**
 * Schema for a banner image.
 */
export const BannersApiImageSchema = v.object({
	/**
	 * Type of image resource (e.g., "network" for remote URLs)
	 */
	type: BannersApiImageTypeEnum,

	/**
	 * Direct URL to the image
	 */
	url: v.string(),
});

/**
 * Enum for banner action types.
 * Known values: "url" (external link), "path" (internal navigation), "key" (app action)
 */
export const BannersApiActionTypeEnum = v.union([
	v.literal("url"),
	v.literal("path"),
	v.literal("key"),
	v.string() as v.GenericSchema<string & {}>,
]);

/**
 * Schema for a banner action.
 */
export const BannersApiActionSchema = v.object({
	/**
	 * Type of action - "url" for external links, "path" for app navigation, "key" for special actions
	 */
	type: BannersApiActionTypeEnum,

	/**
	 * Target value - full URL for "url" type, app path for "path" type (e.g., "/collection/393"), or action key for "key" type
	 */
	value: v.string(),

	/**
	 * Key for analytics tracking
	 */
	analyticsKey: nullable(v.string()),
});

/**
 * Schema for a banner item containing an image and an action.
 */
export const BannersApiBannerItemSchema = v.object({
	/**
	 * Image details for the banner
	 */
	image: BannersApiImageSchema,

	/**
	 * Action details for the banner interaction
	 */
	action: BannersApiActionSchema,
});

/**
 * Response schema for the list of banners.
 */
export const BannersApiListResponseSchema = v.array(BannersApiBannerItemSchema);
