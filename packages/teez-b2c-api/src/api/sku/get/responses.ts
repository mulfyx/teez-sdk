import * as z from "zod/mini";

import { nullishToUndefined } from "../../../schema/codecs";
import { doc } from "../../../schema/metadata";

export const skuGetInstallmentSchema = doc({
	schema: z.object({
		installmentSvg: doc({
			schema: nullishToUndefined(z.string()),
			description: "URL to the installment SVG icon",
		}),
		installmentTerm: doc({
			schema: nullishToUndefined(z.string()),
			description: "Description of the installment term",
		}),
	}),
	description: "Schema for installment payment information.",
});

export const skuGetShopSchema = doc({
	schema: z.object({
		id: doc({
			schema: z.number(),
			description: "Unique identifier of the shop",
		}),
		logo: doc({
			schema: nullishToUndefined(z.string()),
			description: "URL to the shop's logo",
		}),
		name: doc({
			schema: z.string(),
			description: "Name of the shop",
		}),
		photo: doc({
			schema: z.string(),
			description: "URL to the shop's photo",
		}),
		url: doc({
			schema: z.string(),
			description: "URL to the shop's page or resource",
		}),
		isInstallment: doc({
			schema: z.boolean(),
			description: "Indicates if installment payment is available",
		}),
		qtyPurchasedInfo: doc({
			schema: nullishToUndefined(z.string()),
			description:
				'Popularity text for the shop (e.g., "\u0427\u0430\u0441\u0442\u043E \u043F\u043E\u043A\u0443\u043F\u0430\u044E\u0442", "11 \u0437\u0430\u043A\u0430\u0437\u043E\u0432")',
		}),
		rating: doc({
			schema: nullishToUndefined(z.number()),
			description: "Average rating of the shop",
		}),
		daysSinceRegistration: doc({
			schema: z.number(),
			description: "Number of days since the shop was registered",
		}),
		isMonobrand: doc({
			schema: z.boolean(),
			description: "Indicates if the shop represents a single brand",
		}),
	}),
	description: "Schema for shop details associated with a SKU.",
});

export const skuGetBrandSchema = doc({
	schema: z.object({
		id: doc({
			schema: z.number(),
			description: "Unique identifier of the brand",
		}),
		name: doc({
			schema: z.string(),
			description: "Name of the brand",
		}),
	}),
	description: "Schema for brand information.",
});

export const skuGetCategorySchema = doc({
	schema: z.object({
		id: doc({
			schema: z.number(),
			description: "Unique identifier of the category",
		}),
		name: doc({
			schema: z.string(),
			description: "Name of the category",
		}),
		isPrimary: doc({
			schema: z.boolean(),
			description: "Indicates if this is the primary category for the product",
		}),
	}),
	description: "Schema for a category item.",
});

export const skuGetAttributePropertyValueSchema = doc({
	schema: z.object({
		name: doc({
			schema: z.string(),
			description: 'Name of the property value (e.g., "Red", "XL")',
		}),
		photo: doc({
			schema: z.string(),
			description: "URL to a photo representing this property value",
		}),
	}),
	description: "Schema for an attribute property value.",
});

export const skuGetAttributePropertySchema = doc({
	schema: z.object({
		name: doc({
			schema: z.string(),
			description: 'Name of the attribute (e.g., "Color", "Size")',
		}),
		value: doc({
			schema: skuGetAttributePropertyValueSchema,
			description: "Value details for the attribute",
		}),
	}),
	description: "Schema for a product attribute.",
});

export const skuGetAttributeSchema = doc({
	schema: z.object({
		skuId: doc({
			schema: z.number(),
			description: "SKU ID associated with this specific attribute combination",
		}),
		quantity: doc({
			schema: z.number(),
			description: "Quantity available for this specific variant",
		}),
		attributeProperties: doc({
			schema: z.array(skuGetAttributePropertySchema),
			description: "List of properties defining this variant",
		}),
	}),
	description: "Schema for SKU attributes configuration.",
});

export const skuGetTagSchema = doc({
	schema: z.object({
		type: doc({
			schema: z.string(),
			description: "Type of the tag",
		}),
		name: doc({
			schema: z.string(),
			description: "Display name of the tag",
		}),
		svg: doc({
			schema: z.string(),
			description: "URL to the SVG icon for the tag",
		}),
		value: doc({
			schema: nullishToUndefined(z.string()),
			description: "Value associated with the tag",
		}),
	}),
	description: "Schema for a product tag.",
});

export const skuGetStockAvailabilityTypeSchema = doc({
	schema: z.literal("stock"),
	description: "Type literal for SKU stock availability type",
});

export const skuGetStockAvailabilitySchema = doc({
	schema: z.object({
		type: doc({
			schema: skuGetStockAvailabilityTypeSchema,
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

export const skuGetResponse200Schema = doc({
	schema: z.object({
		productId: doc({
			schema: z.number(),
			description: "Unique product identifier",
		}),
		skuId: doc({
			schema: z.number(),
			description: "Unique stock keeping unit identifier",
		}),
		description: doc({
			schema: z.string(),
			description: "Detailed product description in HTML format",
		}),
		name: doc({
			schema: z.string(),
			description: "Full display name of the product",
		}),
		photos: doc({
			schema: z.array(z.string()),
			description: "List of URLs for product photos",
		}),
		shortDescription: doc({
			schema: z.string(),
			description: "Brief summary of the product",
		}),
		discount: doc({
			schema: z.number(),
			description: "Discount amount",
		}),
		originalPrice: doc({
			schema: z.number(),
			description: "Original price before discounts",
		}),
		percentDiscount: doc({
			schema: z.number(),
			description: "Discount percentage",
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
			schema: nullishToUndefined(skuGetStockAvailabilitySchema),
			description: "Stock availability details",
		}),
		installment: doc({
			schema: nullishToUndefined(skuGetInstallmentSchema),
			description: "Installment payment options",
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
		textReviewQuantity: doc({
			schema: nullishToUndefined(z.number()),
			description: "Total number of text reviews",
		}),
		brand: doc({
			schema: nullishToUndefined(skuGetBrandSchema),
			description: "Brand information",
		}),
		categories: doc({
			schema: z.array(skuGetCategorySchema),
			description: "List of categories the product belongs to",
		}),
		shop: doc({
			schema: skuGetShopSchema,
			description: "Details of the shop selling the product",
		}),
		additionalInfo: doc({
			schema: z.record(z.string(), z.string()),
			description: "Dictionary of additional product information",
		}),
		attributes: doc({
			schema: z.array(skuGetAttributeSchema),
			description: "List of available attribute variants",
		}),
		tags: doc({
			schema: z.array(skuGetTagSchema),
			description: "List of tags associated with the product",
		}),
	}),
	description:
		"Full SKU detail response with media, pricing, attributes, shop information, categories, and tags.",
});
