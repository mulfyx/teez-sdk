import * as z from "zod/mini";

import { nullishToUndefined } from "../../../schema/codecs";
import { doc } from "../../../schema/metadata";

export const shopsGetContactInfoSchema = doc({
	schema: z.object({
		bin: doc({
			schema: z.string(),
			description: "Business Identification Number",
		}),
		daysSinceRegistration: doc({
			schema: z.number(),
			description: "Number of days since the shop was registered",
		}),
		legalType: doc({
			schema: z.number(),
			description: "Legal entity type code",
		}),
	}),
	description: "Merchant registration metadata returned for a shop.",
});

export const shopsGetTagSchema = doc({
	schema: z.object({
		description: doc({
			schema: z.string(),
			description: "Description of the tag",
		}),
		icon: doc({
			schema: z.string(),
			description: "URL to the raster icon for the tag",
		}),
		name: doc({
			schema: z.string(),
			description: "Display name of the tag",
		}),
		svg: doc({
			schema: z.string(),
			description: "URL to the SVG icon for the tag",
		}),
		code: doc({
			schema: z.string(),
			description: "Unique code for the tag",
		}),
	}),
	description: "Merchant quality tag returned by the shop endpoint.",
});

export const shopsGetResponse200Schema = doc({
	schema: z.object({
		id: doc({
			schema: z.number(),
			description: "Unique identifier of the shop",
		}),
		banner: doc({
			schema: nullishToUndefined(z.string()),
			description: "URL to the shop's banner image",
		}),
		description: doc({
			schema: z.string(),
			description: "Description of the shop",
		}),
		logo: doc({
			schema: nullishToUndefined(z.string()),
			description: "URL to the shop's logo",
		}),
		name: doc({
			schema: z.string(),
			description: "Name of the shop",
		}),
		qtyPurchasedInfo: doc({
			schema: nullishToUndefined(z.string()),
			description:
				'Text about total orders/purchases (e.g., "11 \u0437\u0430\u043A\u0430\u0437\u043E\u0432", "930 \u0437\u0430\u043A\u0430\u0437\u043E\u0432")',
		}),
		rating: doc({
			schema: nullishToUndefined(z.number()),
			description: "Average rating of the shop",
		}),
		totalReviews: doc({
			schema: nullishToUndefined(z.number()),
			description: "Total number of reviews received",
		}),
		contactInfo: doc({
			schema: shopsGetContactInfoSchema,
			description: "Contact information for the shop",
		}),
		isMonobrand: doc({
			schema: z.boolean(),
			description: "Indicates if the shop represents a single brand",
		}),
		tag: doc({
			schema: shopsGetTagSchema,
			description: "Tag associated with the shop",
		}),
	}),
	description:
		"Shop detail response with branding, ratings, merchant metadata, and storefront tag information.",
});
