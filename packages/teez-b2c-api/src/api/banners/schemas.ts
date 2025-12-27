import * as z from "zod/mini";

/**
 * Type literal for banner image resource type
 */
export const BannerImageTypeSchema = z.literal("network");

/**
 * Schema for a banner image.
 */
export const BannersApiImageSchema = z.object({
	/**
	 * Type of image resource (e.g., "network" for remote URLs)
	 */
	type: BannerImageTypeSchema,

	/**
	 * Direct URL to the image
	 */
	url: z.string(),
});

/**
 * Type union for banner action types
 */
export const BannerActionTypesSchema = z.union([
	z.literal("url"),
	z.literal("path"),
	z.literal("key"),
]);

/**
 * Schema for a banner action.
 */
export const BannersApiActionSchema = z.object({
	/**
	 * Type of action - "url" for external links, "path" for app navigation, "key" for special actions
	 */
	type: BannerActionTypesSchema,

	/**
	 * Target value - full URL for "url" type, app path for "path" type (e.g., "/collection/393"), or action key for "key" type
	 */
	value: z.string(),

	/**
	 * Key for analytics tracking
	 */
	analyticsKey: z.nullish(z.string()),
});

/**
 * Schema for a banner item containing an image and an action.
 */
export const BannersApiBannerItemSchema = z.object({
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
export const BannersApiListResponseSchema = z.array(BannersApiBannerItemSchema);
