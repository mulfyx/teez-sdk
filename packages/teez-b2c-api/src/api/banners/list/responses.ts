import * as z from "zod/mini";

import { nullishToUndefined } from "../../../schema/codecs";
import { doc } from "../../../schema/metadata";

export const bannersListImageTypeSchema = doc({
	schema: z.literal("network"),
	description: "Type literal for banner image resource type",
});

export const bannersListImageSchema = doc({
	schema: z.object({
		type: doc({
			schema: bannersListImageTypeSchema,
			description: 'Type of image resource (e.g., "network" for remote URLs)',
		}),
		url: doc({
			schema: z.string(),
			description: "Direct URL to the image",
		}),
	}),
	description: "Schema for a banner image.",
});

export const bannersListActionTypesSchema = doc({
	schema: z.union([
		z.literal("url"),
		z.literal("path"),
		z.literal("key"),
		z.literal("promocode"),
	]),
	description: "Type union for banner action types",
});

export const bannersListActionSchema = doc({
	schema: z.object({
		type: doc({
			schema: bannersListActionTypesSchema,
			description:
				'Type of action - "url" for external links, "path" for app navigation, "key" for special actions, or "promocode" for applying a promocode',
		}),
		value: doc({
			schema: z.string(),
			description:
				'Target value - full URL for "url" type, app path for "path" type (e.g., "/collection/393"), action key for "key" type, or the promocode string for "promocode" type',
		}),
		analyticsKey: doc({
			schema: nullishToUndefined(z.string()),
			description: "Key for analytics tracking",
		}),
	}),
	description: "Schema for a banner action.",
});

export const bannersListBannerItemSchema = doc({
	schema: z.object({
		image: doc({
			schema: bannersListImageSchema,
			description: "Image details for the banner",
		}),
		action: doc({
			schema: bannersListActionSchema,
			description: "Action details for the banner interaction",
		}),
	}),
	description: "Banner card returned by the storefront banners feed.",
});

export const bannersListResponse200Schema = doc({
	schema: z.array(bannersListBannerItemSchema),
	description:
		"List of active storefront banners with image and action metadata.",
});
