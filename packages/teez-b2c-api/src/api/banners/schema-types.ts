/**
 * ⚠️ This file is auto-generated. Do not edit manually.
 * Run `npm run generate:schema-types` to regenerate.
 * Generated from: schemas.ts
 */

/**
 * Type literal for banner image resource type
 */
export type BannerImageType = "network";

/**
 * Schema for a banner image.
 */
export interface BannersApiImage {
	/**
	 * Type of image resource (e.g., "network" for remote URLs)
	 */
	type: BannerImageType;
	/**
	 * Direct URL to the image
	 */
	url: string;
}

/**
 * Type union for banner action types
 */
export type BannerActionTypes = "url" | "path" | "key";

/**
 * Schema for a banner action.
 */
export interface BannersApiAction {
	/**
	 * Type of action - "url" for external links, "path" for app navigation, "key" for special actions
	 */
	type: BannerActionTypes;
	/**
	 * Target value - full URL for "url" type, app path for "path" type (e.g., "/collection/393"), or action key for "key" type
	 */
	value: string;
	/**
	 * Key for analytics tracking
	 */
	analyticsKey?: (string | null) | undefined;
}

/**
 * Schema for a banner item containing an image and an action.
 */
export interface BannersApiBannerItem {
	/**
	 * Image details for the banner
	 */
	image: BannersApiImage;
	/**
	 * Action details for the banner interaction
	 */
	action: BannersApiAction;
}

/**
 * Response schema for the list of banners.
 */
export type BannersApiListResponse = BannersApiBannerItem[];
