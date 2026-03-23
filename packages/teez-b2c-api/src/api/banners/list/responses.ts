import * as v from "valibot";

import { nullishToUndefined } from "../../../schema/nullish";

export const bannersListImageTypeSchema = v.pipe(
	v.literal("network"),
	v.description("Type literal for banner image resource type"),
);
export const bannersListImageSchema = v.pipe(
	v.object({
		type: v.pipe(
			bannersListImageTypeSchema,
			v.description('Type of image resource (e.g., "network" for remote URLs)'),
		),
		url: v.pipe(v.string(), v.description("Direct URL to the image")),
	}),
	v.description("Schema for a banner image."),
);
export const bannersListActionTypesSchema = v.pipe(
	v.union([
		v.literal("url"),
		v.literal("path"),
		v.literal("key"),
		v.literal("promocode"),
	]),
	v.description("Type union for banner action types"),
);
export const bannersListActionSchema = v.pipe(
	v.object({
		type: v.pipe(
			bannersListActionTypesSchema,
			v.description(
				'Type of action - "url" for external links, "path" for app navigation, "key" for special actions, or "promocode" for applying a promocode',
			),
		),
		value: v.pipe(
			v.string(),
			v.description(
				'Target value - full URL for "url" type, app path for "path" type (e.g., "/collection/393"), action key for "key" type, or the promocode string for "promocode" type',
			),
		),
		analyticsKey: v.pipe(
			nullishToUndefined(v.string()),
			v.description("Key for analytics tracking"),
		),
	}),
	v.description("Schema for a banner action."),
);
export const bannersListBannerItemSchema = v.pipe(
	v.object({
		image: v.pipe(
			bannersListImageSchema,
			v.description("Image details for the banner"),
		),
		action: v.pipe(
			bannersListActionSchema,
			v.description("Action details for the banner interaction"),
		),
	}),
	v.description("Banner card returned by the storefront banners feed."),
);
export const bannersListResponse200Schema = v.pipe(
	v.array(bannersListBannerItemSchema),
	v.description(
		"List of active storefront banners with image and action metadata.",
	),
);
