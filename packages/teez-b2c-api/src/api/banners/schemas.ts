import { nullable } from "../../common/schemas";
import * as v from "valibot";

/**
 * Schema for a banner image.
 */
export const BannersApiImageSchema = v.object({
	/** Type of the image resource */
	type: v.string(),

	/** Direct URL to the image */
	url: v.string(),
});

/**
 * Schema for a banner action.
 */
export const BannersApiActionSchema = v.object({
	/** Type of action to perform on click */
	type: v.string(),

	/** Target value for the action (e.g., URL or deep link) */
	value: v.string(),

	/** Key for analytics tracking */
	analyticsKey: nullable(v.string()),
});

/**
 * Schema for a banner item containing an image and an action.
 */
export const BannersApiBannerItemSchema = v.object({
	/** Image details for the banner */
	image: BannersApiImageSchema,

	/** Action details for the banner interaction */
	action: BannersApiActionSchema,
});

/**
 * Response schema for the list of banners.
 */
export const BannersApiGetAllResponseSchema = v.array(BannersApiBannerItemSchema);
