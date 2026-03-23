import * as v from "valibot";

import { filterSchema } from "../../../contracts/filters/filter";
import { createPaginationFields } from "../../../contracts/pagination";
import { nullishToUndefined } from "../../../schema/nullish";

export const collectionsGetSkusStockAvailabilityTypeSchema = v.pipe(
	v.literal("stock"),
	v.description("Type literal for SKU stock availability type"),
);
export const collectionsGetSkusStockAvailabilitySchema = v.pipe(
	v.object({
		type: v.pipe(
			collectionsGetSkusStockAvailabilityTypeSchema,
			v.description('Type of stock status (known value: "stock")'),
		),
		svg: v.pipe(
			nullishToUndefined(v.string()),
			v.description("SVG icon representing stock status"),
		),
		text: v.pipe(
			v.string(),
			v.description(
				'Localized text describing stock status (e.g., "\u0412 \u043D\u0430\u043B\u0438\u0447\u0438\u0438 - \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C \u0432\u0441\u0435\u0433\u043E 16 \u0448\u0442\u0443\u043A")',
			),
		),
		maxQty: v.pipe(v.number(), v.description("Maximum quantity available")),
		maxQtyReason: v.pipe(
			v.string(),
			v.description(
				'Localized reason text for quantity limit (e.g., "\u0412 \u043D\u0430\u043B\u0438\u0447\u0438\u0438 \u0442\u043E\u043B\u044C\u043A\u043E 16 \u0448\u0442\u0443\u043A")',
			),
		),
	}),
	v.description("Schema for stock availability information."),
);
export const collectionsGetSkusItemSchema = v.pipe(
	v.object({
		productId: v.pipe(v.number(), v.description("Unique product identifier")),
		skuId: v.pipe(
			v.number(),
			v.description("Unique stock keeping unit identifier"),
		),
		imageUrl: v.pipe(v.string(), v.description("URL for the full-size image")),
		name: v.pipe(v.string(), v.description("Display name of the product")),
		shortDescription: v.pipe(
			v.string(),
			v.description("Brief description of the product"),
		),
		thumbnailUrl: v.pipe(
			v.string(),
			v.description("URL for the small preview image"),
		),
		originalPrice: v.pipe(
			v.number(),
			v.description("Original price before discounts"),
		),
		price: v.pipe(v.number(), v.description("Current selling price")),
		qty: v.pipe(v.number(), v.description("Quantity available in stock")),
		stockAvailability: v.pipe(
			nullishToUndefined(collectionsGetSkusStockAvailabilitySchema),
			v.description("Stock availability details"),
		),
		isPromo: v.pipe(
			v.boolean(),
			v.description("Indicates if the item is on promotion"),
		),
		promoName: v.pipe(
			nullishToUndefined(v.string()),
			v.description("Name of the promotion"),
		),
		qtyPurchasedInfo: v.pipe(
			nullishToUndefined(v.string()),
			v.description(
				'Popularity text indicating purchase frequency (e.g., "\u0427\u0430\u0441\u0442\u043E \u043F\u043E\u043A\u0443\u043F\u0430\u044E\u0442")',
			),
		),
		rating: v.pipe(
			nullishToUndefined(v.number()),
			v.description("Average rating score"),
		),
		scoreQuantity: v.pipe(
			nullishToUndefined(v.number()),
			v.description("Total number of ratings"),
		),
	}),
	v.description("Product card returned inside collection SKU feeds."),
);
export const collectionsGetSkusResponse200Schema = v.pipe(
	v.object({
		filters: v.pipe(
			v.array(filterSchema),
			v.description("List of applicable filters for the collection"),
		),
		items: v.pipe(
			v.array(collectionsGetSkusItemSchema),
			v.description("List of SKU items in the collection"),
		),
		...createPaginationFields({
			totalCountDescription: "Total number of items in the collection",
		}),
	}),
	v.description(
		"Paginated collection SKU response with filters, product cards, and pagination metadata.",
	),
);
