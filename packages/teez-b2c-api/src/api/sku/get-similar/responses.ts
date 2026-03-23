import * as z from "zod/mini";

import { createPaginationFields } from "../../../contracts/pagination";
import { nullishToUndefined } from "../../../schema/codecs";
import { doc } from "../../../schema/metadata";

export const skuGetSimilarItemSchema = doc({
	schema: z.object({
		productId: doc({
			schema: z.number(),
			description: "Unique product identifier",
		}),
		skuId: doc({
			schema: z.number(),
			description: "Unique stock keeping unit identifier",
		}),
		imageUrl: doc({
			schema: z.string(),
			description: "URL for the full-size image",
		}),
		name: doc({
			schema: z.string(),
			description: "Display name of the similar product",
		}),
		shortDescription: doc({
			schema: z.string(),
			description: "Brief description of the similar product",
		}),
		thumbnailUrl: doc({
			schema: z.string(),
			description: "URL for the small preview image",
		}),
		originalPrice: doc({
			schema: z.number(),
			description: "Original price before discounts",
		}),
		price: doc({
			schema: z.number(),
			description: "Current selling price",
		}),
		qty: doc({
			schema: z.number(),
			description: "Quantity available in stock",
		}),
		isPromo: doc({
			schema: z.boolean(),
			description: "Indicates if the product is on promotion",
		}),
		promoName: doc({
			schema: nullishToUndefined(z.string()),
			description: "Name of the promotion",
		}),
		qtyPurchasedInfo: doc({
			schema: nullishToUndefined(z.string()),
			description:
				'Popularity text indicating purchase frequency (e.g., "\u0427\u0430\u0441\u0442\u043E \u043F\u043E\u043A\u0443\u043F\u0430\u044E\u0442")',
		}),
		rating: doc({
			schema: nullishToUndefined(z.number()),
			description: "Average rating score",
		}),
		scoreQuantity: doc({
			schema: nullishToUndefined(z.number()),
			description: "Total number of ratings",
		}),
		moderationStatus: doc({
			schema: z.number(),
			description: "Moderation status code",
		}),
	}),
	description: "Product card returned by the similar SKU endpoint.",
});

export const skuGetSimilarResponse200Schema = doc({
	schema: z.object({
		items: doc({
			schema: z.array(skuGetSimilarItemSchema),
			description: "List of similar product items",
		}),
		...createPaginationFields({
			totalCountDescription: "Total number of similar items found",
		}),
	}),
	description:
		"Paginated similar SKU response with product cards and pagination metadata.",
});
