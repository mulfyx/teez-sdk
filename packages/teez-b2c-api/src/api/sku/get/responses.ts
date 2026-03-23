import * as v from "valibot";

import { nullishToUndefined } from "../../../schema/nullish";

export const skuGetInstallmentSchema = v.pipe(
	v.object({
		installmentSvg: v.pipe(
			nullishToUndefined(v.string()),
			v.description("URL to the installment SVG icon"),
		),
		installmentTerm: v.pipe(
			nullishToUndefined(v.string()),
			v.description("Description of the installment term"),
		),
	}),
	v.description("Schema for installment payment information."),
);
export const skuGetShopSchema = v.pipe(
	v.object({
		id: v.pipe(v.number(), v.description("Unique identifier of the shop")),
		logo: v.pipe(
			nullishToUndefined(v.string()),
			v.description("URL to the shop's logo"),
		),
		name: v.pipe(v.string(), v.description("Name of the shop")),
		photo: v.pipe(v.string(), v.description("URL to the shop's photo")),
		url: v.pipe(
			v.string(),
			v.description("URL to the shop's page or resource"),
		),
		isInstallment: v.pipe(
			v.boolean(),
			v.description("Indicates if installment payment is available"),
		),
		qtyPurchasedInfo: v.pipe(
			nullishToUndefined(v.string()),
			v.description(
				'Popularity text for the shop (e.g., "\u0427\u0430\u0441\u0442\u043E \u043F\u043E\u043A\u0443\u043F\u0430\u044E\u0442", "11 \u0437\u0430\u043A\u0430\u0437\u043E\u0432")',
			),
		),
		rating: v.pipe(
			nullishToUndefined(v.number()),
			v.description("Average rating of the shop"),
		),
		daysSinceRegistration: v.pipe(
			v.number(),
			v.description("Number of days since the shop was registered"),
		),
		isMonobrand: v.pipe(
			v.boolean(),
			v.description("Indicates if the shop represents a single brand"),
		),
	}),
	v.description("Schema for shop details associated with a SKU."),
);
export const skuGetBrandSchema = v.pipe(
	v.object({
		id: v.pipe(v.number(), v.description("Unique identifier of the brand")),
		name: v.pipe(v.string(), v.description("Name of the brand")),
	}),
	v.description("Schema for brand information."),
);
export const skuGetCategorySchema = v.pipe(
	v.object({
		id: v.pipe(v.number(), v.description("Unique identifier of the category")),
		name: v.pipe(v.string(), v.description("Name of the category")),
		isPrimary: v.pipe(
			v.boolean(),
			v.description(
				"Indicates if this is the primary category for the product",
			),
		),
	}),
	v.description("Schema for a category item."),
);
export const skuGetAttributePropertyValueSchema = v.pipe(
	v.object({
		name: v.pipe(
			v.string(),
			v.description('Name of the property value (e.g., "Red", "XL")'),
		),
		photo: v.pipe(
			v.string(),
			v.description("URL to a photo representing this property value"),
		),
	}),
	v.description("Schema for an attribute property value."),
);
export const skuGetAttributePropertySchema = v.pipe(
	v.object({
		name: v.pipe(
			v.string(),
			v.description('Name of the attribute (e.g., "Color", "Size")'),
		),
		value: v.pipe(
			skuGetAttributePropertyValueSchema,
			v.description("Value details for the attribute"),
		),
	}),
	v.description("Schema for a product attribute."),
);
export const skuGetAttributeSchema = v.pipe(
	v.object({
		skuId: v.pipe(
			v.number(),
			v.description(
				"SKU ID associated with this specific attribute combination",
			),
		),
		quantity: v.pipe(
			v.number(),
			v.description("Quantity available for this specific variant"),
		),
		attributeProperties: v.pipe(
			v.array(skuGetAttributePropertySchema),
			v.description("List of properties defining this variant"),
		),
	}),
	v.description("Schema for SKU attributes configuration."),
);
export const skuGetTagSchema = v.pipe(
	v.object({
		type: v.pipe(v.string(), v.description("Type of the tag")),
		name: v.pipe(v.string(), v.description("Display name of the tag")),
		svg: v.pipe(v.string(), v.description("URL to the SVG icon for the tag")),
		value: v.pipe(
			nullishToUndefined(v.string()),
			v.description("Value associated with the tag"),
		),
	}),
	v.description("Schema for a product tag."),
);
export const skuGetStockAvailabilityTypeSchema = v.pipe(
	v.literal("stock"),
	v.description("Type literal for SKU stock availability type"),
);
export const skuGetStockAvailabilitySchema = v.pipe(
	v.object({
		type: v.pipe(
			skuGetStockAvailabilityTypeSchema,
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
export const skuGetResponse200Schema = v.pipe(
	v.object({
		productId: v.pipe(v.number(), v.description("Unique product identifier")),
		skuId: v.pipe(
			v.number(),
			v.description("Unique stock keeping unit identifier"),
		),
		description: v.pipe(
			v.string(),
			v.description("Detailed product description in HTML format"),
		),
		name: v.pipe(v.string(), v.description("Full display name of the product")),
		photos: v.pipe(
			v.array(v.string()),
			v.description("List of URLs for product photos"),
		),
		shortDescription: v.pipe(
			v.string(),
			v.description("Brief summary of the product"),
		),
		discount: v.pipe(v.number(), v.description("Discount amount")),
		originalPrice: v.pipe(
			v.number(),
			v.description("Original price before discounts"),
		),
		percentDiscount: v.pipe(v.number(), v.description("Discount percentage")),
		price: v.pipe(v.number(), v.description("Current selling price")),
		qty: v.pipe(v.number(), v.description("Quantity available in stock")),
		stockAvailability: v.pipe(
			nullishToUndefined(skuGetStockAvailabilitySchema),
			v.description("Stock availability details"),
		),
		installment: v.pipe(
			nullishToUndefined(skuGetInstallmentSchema),
			v.description("Installment payment options"),
		),
		isPromo: v.pipe(
			v.boolean(),
			v.description("Indicates if the product is on promotion"),
		),
		promoName: v.pipe(
			nullishToUndefined(v.string()),
			v.description("Name of the promotion"),
		),
		promocodes: v.pipe(
			v.array(v.string()),
			v.description("List of applicable promocodes"),
		),
		qtyPurchasedInfo: v.pipe(
			nullishToUndefined(v.string()),
			v.description(
				'Popularity text indicating purchase frequency (e.g., "\u0427\u0430\u0441\u0442\u043E \u043F\u043E\u043A\u0443\u043F\u0430\u044E\u0442", "11 \u0437\u0430\u043A\u0430\u0437\u043E\u0432", "930 \u0437\u0430\u043A\u0430\u0437\u043E\u0432")',
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
		textReviewQuantity: v.pipe(
			nullishToUndefined(v.number()),
			v.description("Total number of text reviews"),
		),
		brand: v.pipe(
			nullishToUndefined(skuGetBrandSchema),
			v.description("Brand information"),
		),
		categories: v.pipe(
			v.array(skuGetCategorySchema),
			v.description("List of categories the product belongs to"),
		),
		shop: v.pipe(
			skuGetShopSchema,
			v.description("Details of the shop selling the product"),
		),
		additionalInfo: v.pipe(
			v.record(v.string(), v.string()),
			v.description("Dictionary of additional product information"),
		),
		attributes: v.pipe(
			v.array(skuGetAttributeSchema),
			v.description("List of available attribute variants"),
		),
		tags: v.pipe(
			v.array(skuGetTagSchema),
			v.description("List of tags associated with the product"),
		),
	}),
	v.description(
		"Full SKU detail response with media, pricing, attributes, shop information, categories, and tags.",
	),
);
