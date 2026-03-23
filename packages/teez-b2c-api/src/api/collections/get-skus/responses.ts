import * as z from "zod/mini";

import { filterSchema } from "../../../contracts/filters/filter";
import { createPaginationFields } from "../../../contracts/pagination";
import { nullishToUndefined } from "../../../schema/codecs";
import { doc } from "../../../schema/metadata";

export const collectionsGetSkusStockAvailabilityTypeSchema = doc({
	schema: z.literal("stock"),
	description: "Type literal for SKU stock availability type",
});

export const collectionsGetSkusStockAvailabilitySchema = doc({
	schema: z.object({
		type: doc({
			schema: collectionsGetSkusStockAvailabilityTypeSchema,
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

export const collectionsGetSkusItemSchema = doc({
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
			description: "Display name of the product",
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
			schema: nullishToUndefined(collectionsGetSkusStockAvailabilitySchema),
			description: "Stock availability details",
		}),
		isPromo: doc({
			schema: z.boolean(),
			description: "Indicates if the item is on promotion",
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
	}),
	description: "Product card returned inside collection SKU feeds.",
});

export const collectionsGetSkusResponse200Schema = doc({
	schema: z.object({
		filters: doc({
			schema: z.array(filterSchema),
			description: "List of applicable filters for the collection",
		}),
		items: doc({
			schema: z.array(collectionsGetSkusItemSchema),
			description: "List of SKU items in the collection",
		}),
		...createPaginationFields({
			totalCountDescription: "Total number of items in the collection",
		}),
	}),
	description:
		"Paginated collection SKU response with filters, product cards, and pagination metadata.",
});
