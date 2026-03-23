import * as v from "valibot";

import { nullishToUndefined } from "../../../schema/nullish";

export const shopsGetContactInfoSchema = v.pipe(
	v.object({
		bin: v.pipe(v.string(), v.description("Business Identification Number")),
		daysSinceRegistration: v.pipe(
			v.number(),
			v.description("Number of days since the shop was registered"),
		),
		legalType: v.pipe(v.number(), v.description("Legal entity type code")),
	}),
	v.description("Merchant registration metadata returned for a shop."),
);
export const shopsGetTagSchema = v.pipe(
	v.object({
		description: v.pipe(v.string(), v.description("Description of the tag")),
		icon: v.pipe(
			v.string(),
			v.description("URL to the raster icon for the tag"),
		),
		name: v.pipe(v.string(), v.description("Display name of the tag")),
		svg: v.pipe(v.string(), v.description("URL to the SVG icon for the tag")),
		code: v.pipe(v.string(), v.description("Unique code for the tag")),
	}),
	v.description("Merchant quality tag returned by the shop endpoint."),
);
export const shopsGetResponse200Schema = v.pipe(
	v.object({
		id: v.pipe(v.number(), v.description("Unique identifier of the shop")),
		banner: v.pipe(
			nullishToUndefined(v.string()),
			v.description("URL to the shop's banner image"),
		),
		description: v.pipe(v.string(), v.description("Description of the shop")),
		logo: v.pipe(
			nullishToUndefined(v.string()),
			v.description("URL to the shop's logo"),
		),
		name: v.pipe(v.string(), v.description("Name of the shop")),
		qtyPurchasedInfo: v.pipe(
			nullishToUndefined(v.string()),
			v.description(
				'Text about total orders/purchases (e.g., "11 \u0437\u0430\u043A\u0430\u0437\u043E\u0432", "930 \u0437\u0430\u043A\u0430\u0437\u043E\u0432")',
			),
		),
		rating: v.pipe(
			nullishToUndefined(v.number()),
			v.description("Average rating of the shop"),
		),
		totalReviews: v.pipe(
			nullishToUndefined(v.number()),
			v.description("Total number of reviews received"),
		),
		contactInfo: v.pipe(
			shopsGetContactInfoSchema,
			v.description("Contact information for the shop"),
		),
		isMonobrand: v.pipe(
			v.boolean(),
			v.description("Indicates if the shop represents a single brand"),
		),
		tag: v.pipe(
			shopsGetTagSchema,
			v.description("Tag associated with the shop"),
		),
	}),
	v.description(
		"Shop detail response with branding, ratings, merchant metadata, and storefront tag information.",
	),
);
