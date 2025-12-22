import { nullable } from "../../common/schemas";
import * as v from "valibot";

/**
 * Schema for installment payment information.
 */
export const SkuApiInstallmentSchema = v.object({
	/** Description of the installment term */
	installmentTerm: v.string(),

	/** URL to the installment SVG icon */
	installmentSvg: v.string(),
});

/**
 * Schema for shop details associated with a SKU.
 */
export const SkuApiShopSchema = v.object({
	/** Unique identifier of the shop */
	id: v.number(),

	/** Name of the shop */
	name: v.string(),

	/** URL to the shop's page or resource */
	url: v.string(),

	/** URL to the shop's photo */
	photo: v.string(),

	/** Indicates if installment payment is available */
	isInstallment: v.boolean(),

	/** Number of days since the shop was registered */
	daysSinceRegistration: v.number(),

	/** URL to the shop's logo */
	logo: nullable(v.string()),

	/** Indicates if the shop represents a single brand */
	isMonobrand: v.boolean(),

	/** Average rating of the shop */
	rating: nullable(v.number()),

	/** Information about purchase quantity */
	qtyPurchasedInfo: nullable(v.string()),
});

/**
 * Schema for brand information.
 */
export const SkuApiBrandSchema = v.object({
	/** Unique identifier of the brand */
	id: v.number(),

	/** Name of the brand */
	name: v.string(),
});

/**
 * Schema for a category item.
 */
export const SkuApiCategorySchema = v.object({
	/** Unique identifier of the category */
	id: v.number(),

	/** Name of the category */
	name: v.string(),

	/** Indicates if this is the primary category for the product */
	isPrimary: v.boolean(),
});

/**
 * Schema for an attribute property value.
 */
export const SkuApiAttributePropertyValueSchema = v.object({
	/** Name of the property value (e.g., "Red", "XL") */
	name: v.string(),

	/** URL to a photo representing this property value */
	photo: v.string(),
});

/**
 * Schema for a product attribute.
 */
export const SkuApiAttributePropertySchema = v.object({
	/** Name of the attribute (e.g., "Color", "Size") */
	name: v.string(),

	/** Value details for the attribute */
	value: SkuApiAttributePropertyValueSchema,
});

/**
 * Schema for SKU attributes configuration.
 */
export const SkuApiAttributeSchema = v.object({
	/** SKU ID associated with this specific attribute combination */
	skuId: v.number(),

	/** Quantity available for this specific variant */
	quantity: v.number(),

	/** List of properties defining this variant */
	attributeProperties: v.array(SkuApiAttributePropertySchema),
});

/**
 * Schema for a product tag.
 */
export const SkuApiTagSchema = v.object({
	/** Display name of the tag */
	name: v.string(),

	/** Type of the tag */
	type: v.string(),

	/** URL to the SVG icon for the tag */
	svg: v.string(),

	/** Value associated with the tag */
	value: nullable(v.string()),
});

/**
 * Schema for stock availability information.
 */
export const SkuApiStockAvailabilitySchema = v.object({
	/** Text describing stock status */
	text: v.string(),

	/** SVG icon representing stock status */
	svg: nullable(v.string()),

	/** Type of stock status */
	type: v.string(),

	/** Maximum quantity available */
	maxQty: v.number(),

	/** Reason for the maximum quantity limit */
	maxQtyReason: v.string(),
});

/**
 * Response schema for getting a specific SKU by ID.
 */
export const SkuApiGetByIdResponseSchema = v.object({
	/** Unique stock keeping unit identifier */
	skuId: v.number(),

	/** Unique product identifier */
	productId: v.number(),

	/** Full display name of the product */
	name: v.string(),

	/** List of URLs for product photos */
	photos: v.array(v.string()),

	/** Detailed description (HTML) */
	description: v.string(),

	/** Brief summary of the product */
	shortDescription: v.string(),

	/** Current selling price */
	price: v.number(),

	/** Original price before discounts */
	originalPrice: v.number(),

	/** Discount amount */
	discount: v.number(),

	/** Quantity available in stock */
	qty: v.number(),

	/** Indicates if the product is on promotion */
	isPromo: v.boolean(),

	/** Name of the promotion */
	promoName: v.string(),

	/** Installment payment options */
	installment: nullable(SkuApiInstallmentSchema),

	/** Dictionary of additional product information */
	additionalInfo: v.record(v.string(), v.string()),

	/** Details of the shop selling the product */
	shop: SkuApiShopSchema,

	/** List of categories the product belongs to */
	categories: v.array(SkuApiCategorySchema),

	/** List of available attribute variants */
	attributes: v.array(SkuApiAttributeSchema),

	/** Brand information */
	brand: nullable(SkuApiBrandSchema),

	/** List of tags associated with the product */
	tags: v.array(SkuApiTagSchema),

	/** Discount percentage */
	percentDiscount: v.number(),

	/** Information about purchase quantity popularity */
	qtyPurchasedInfo: nullable(v.string()),

	/** Average rating score */
	rating: nullable(v.number()),

	/** Total number of ratings */
	scoreQuantity: nullable(v.number()),

	/** Total number of text reviews */
	textReviewQuantity: nullable(v.number()),

	/** List of applicable promocodes */
	promocodes: v.array(v.string()),

	/** Stock availability details */
	stockAvailability: nullable(SkuApiStockAvailabilitySchema),
});

/**
 * Schema for a similar product item.
 */
export const SkuApiSimilarItemSchema = v.object({
	/** Unique stock keeping unit identifier */
	skuId: v.number(),

	/** Unique product identifier */
	productId: v.number(),

	/** Display name of the similar product */
	name: v.string(),

	/** Brief description of the similar product */
	shortDescription: v.string(),

	/** URL for the small preview image */
	thumbnailUrl: v.string(),

	/** URL for the full-size image */
	imageUrl: v.string(),

	/** Current selling price */
	price: v.number(),

	/** Original price before discounts */
	originalPrice: v.number(),

	/** Quantity available in stock */
	qty: v.number(),

	/** Moderation status code */
	moderationStatus: v.number(),

	/** Indicates if the product is on promotion */
	isPromo: v.boolean(),

	/** Name of the promotion */
	promoName: v.string(),

	/** Information about purchase quantity popularity */
	qtyPurchasedInfo: nullable(v.string()),

	/** Average rating score */
	rating: nullable(v.number()),

	/** Total number of ratings */
	scoreQuantity: nullable(v.number()),
});

/**
 * Response schema for similar SKUs.
 */
export const SkuApiGetSimilarResponseSchema = v.object({
	/** List of similar product items */
	items: v.array(SkuApiSimilarItemSchema),

	/** Current page number */
	pageNumber: v.number(),

	/** Total number of pages available */
	totalPages: v.number(),

	/** Total number of similar items found */
	totalCount: v.number(),

	/** Indicates if there is a previous page */
	hasPreviousPage: v.boolean(),

	/** Indicates if there is a next page */
	hasNextPage: v.boolean(),
});

/**
 * Schema for a collection item.
 */
export const SkuApiCollectionItemSchema = v.object({
	/** Unique identifier of the collection */
	id: v.number(),

	/** Name of the collection */
	name: v.string(),

	/** URL to the collection's icon */
	icon: v.string(),

	/** Priority for sorting or display order */
	priority: v.number(),

	/** URL for the collection's cover image */
	cover: v.string(),

	/** Number of items in the collection */
	quantity: v.number(),
});

/**
 * Response schema for SKU collections.
 */
export const SkuApiGetCollectionsResponseSchema = v.array(
	SkuApiCollectionItemSchema,
);

/**
 * Response schema for review availability check.
 */
export const SkuApiGetReviewAvailableResponseSchema = v.object({
	/** Description of the review availability status */
	description: v.string(),

	/** Message regarding review availability */
	message: v.string(),
});
