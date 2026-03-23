import * as z from "zod/mini";

import { filterSchema } from "../../../contracts/filters/filter";
import { createPaginationFields } from "../../../contracts/pagination";
import { nullishToUndefined } from "../../../schema/codecs";
import { doc } from "../../../schema/metadata";

export const productsListBadgeSchema = doc({
	schema: z.object({
		label: doc({
			schema: z.string(),
			description: "Text label of the badge",
		}),
		textColor: doc({
			schema: z.number(),
			description: "Text color code",
		}),
		backgroundColor: doc({
			schema: nullishToUndefined(z.number()),
			description: "Background color code",
		}),
	}),
	description: "Schema for a product badge.",
});

export const productsListStockAvailabilityTypeSchema = doc({
	schema: z.literal("stock"),
	description: "Type literal for products stock availability type",
});

export const productsListStockAvailabilitySchema = doc({
	schema: z.object({
		type: doc({
			schema: productsListStockAvailabilityTypeSchema,
			description: 'Type of stock status (known value: "stock")',
		}),
		svg: doc({
			schema: nullishToUndefined(z.string()),
			description: "SVG icon representing stock status",
		}),
		text: doc({
			schema: z.string(),
			description:
				'Localized text describing stock status (e.g., "\u0412 \u043D\u0430\u043B\u0438\u0447\u0438\u0438 - \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C \u0432\u0441\u0435\u0433\u043E 16 \u0448\u0442\u0443\u043A")',
		}),
		maxQty: doc({
			schema: z.number(),
			description: "Maximum quantity available",
		}),
		maxQtyReason: doc({
			schema: z.string(),
			description:
				'Localized reason text for quantity limit (e.g., "\u0412 \u043D\u0430\u043B\u0438\u0447\u0438\u0438 \u0442\u043E\u043B\u044C\u043A\u043E 16 \u0448\u0442\u0443\u043A")',
		}),
	}),
	description: "Schema for stock availability information.",
});

export const productsListItemSchema = doc({
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
			description: "Full display name of the product",
		}),
		shortDescription: doc({
			schema: z.string(),
			description: "Brief description of the product",
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
		stockAvailability: doc({
			schema: nullishToUndefined(productsListStockAvailabilitySchema),
			description: "Stock availability details",
		}),
		isPromo: doc({
			schema: z.boolean(),
			description: "Indicates if the product is on promotion",
		}),
		promoName: doc({
			schema: nullishToUndefined(z.string()),
			description: "Name of the promotion",
		}),
		promocodes: doc({
			schema: z.array(z.string()),
			description: "List of applicable promocodes",
		}),
		qtyPurchasedInfo: doc({
			schema: nullishToUndefined(z.string()),
			description:
				'Popularity text indicating purchase frequency (e.g., "\u0427\u0430\u0441\u0442\u043E \u043F\u043E\u043A\u0443\u043F\u0430\u044E\u0442", "11 \u0437\u0430\u043A\u0430\u0437\u043E\u0432", "930 \u0437\u0430\u043A\u0430\u0437\u043E\u0432")',
		}),
		rating: doc({
			schema: nullishToUndefined(z.number()),
			description: "Average rating score",
		}),
		scoreQuantity: doc({
			schema: nullishToUndefined(z.number()),
			description: "Total number of ratings",
		}),
		badge: doc({
			schema: nullishToUndefined(productsListBadgeSchema),
			description: "Badge information for the product",
		}),
		moderationStatus: doc({
			schema: z.number(),
			description: "Moderation status code",
		}),
	}),
	description: "Product card returned by listing endpoints.",
});

export const productsListResponse200Schema = doc({
	schema: z.object({
		filters: doc({
			schema: z.array(filterSchema),
			description: "List of applicable filters",
		}),
		items: doc({
			schema: z.array(productsListItemSchema),
			description: "List of product items",
		}),
		...createPaginationFields({
			totalCountDescription: "Total number of products found",
		}),
	}),
	description:
		"Paginated product listing response with filters, product cards, and pagination metadata.",
});
