import * as v from "valibot";

import { createPaginationFields } from "../../../contracts/pagination";
import { nullishToUndefined } from "../../../schema/nullish";

export const skuGetSimilarItemSchema = v.pipe(
	v.object({
		productId: v.pipe(v.number(), v.description("Unique product identifier")),
		skuId: v.pipe(
			v.number(),
			v.description("Unique stock keeping unit identifier"),
		),
		imageUrl: v.pipe(v.string(), v.description("URL for the full-size image")),
		name: v.pipe(
			v.string(),
			v.description("Display name of the similar product"),
		),
		shortDescription: v.pipe(
			v.string(),
			v.description("Brief description of the similar product"),
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
		isPromo: v.pipe(
			v.boolean(),
			v.description("Indicates if the product is on promotion"),
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
		moderationStatus: v.pipe(
			v.number(),
			v.description("Moderation status code"),
		),
	}),
	v.description("Product card returned by the similar SKU endpoint."),
);
export const skuGetSimilarResponse200Schema = v.pipe(
	v.object({
		items: v.pipe(
			v.array(skuGetSimilarItemSchema),
			v.description("List of similar product items"),
		),
		...createPaginationFields({
			totalCountDescription: "Total number of similar items found",
		}),
	}),
	v.description(
		"Paginated similar SKU response with product cards and pagination metadata.",
	),
);
