import { nullable } from "../../common/schemas";
import * as v from "valibot";

/**
 * Schema for shop contact information.
 */
export const ShopsApiContactInfoSchema = v.object({
	/** Legal entity type code */
	legalType: v.number(),

	/** Business Identification Number */
	bin: v.string(),

	/** Number of days since the shop was registered */
	daysSinceRegistration: v.number(),
});

/**
 * Schema for a shop tag.
 */
export const ShopsApiTagSchema = v.object({
	/** Display name of the tag */
	name: v.string(),

	/** URL to the SVG icon for the tag */
	svg: v.string(),

	/** Unique code for the tag */
	code: v.string(),

	/** Description of the tag */
	description: v.string(),

	/** URL to the raster icon for the tag */
	icon: v.string(),
});

/**
 * Response schema for getting a specific shop by ID.
 */
export const ShopsApiGetResponseSchema = v.object({
	/** Unique identifier of the shop */
	id: v.number(),

	/** Name of the shop */
	name: v.string(),

	/** Description of the shop */
	description: v.string(),

	/** URL to the shop's logo */
	logo: nullable(v.string()),

	/** URL to the shop's banner image */
	banner: nullable(v.string()),

	/** Indicates if the shop represents a single brand */
	isMonobrand: v.boolean(),

	/** Contact information for the shop */
	contactInfo: ShopsApiContactInfoSchema,

	/** Tag associated with the shop */
	tag: ShopsApiTagSchema,

	/** Average rating of the shop */
	rating: nullable(v.number()),

	/** Information about total orders/purchases */
	qtyPurchasedInfo: nullable(v.string()),

	/** Total number of reviews received */
	totalReviews: nullable(v.number()),
});

/**
 * Schema for a shop item in a list.
 */
export const ShopsApiShopItemSchema = v.object({
	/** Unique identifier of the shop */
	id: v.number(),

	/** URL to the shop's icon */
	icon: v.string(),
});

/**
 * Response schema for the monobrand shop list.
 */
export const ShopsApiGetMonobrandResponseSchema = v.object({
	/** List of monobrand shops */
	items: v.array(ShopsApiShopItemSchema),

	/** Current page number */
	pageNumber: v.number(),

	/** Total number of pages available */
	totalPages: v.number(),

	/** Total number of shops found */
	totalCount: v.number(),

	/** Indicates if there is a previous page */
	hasPreviousPage: v.boolean(),

	/** Indicates if there is a next page */
	hasNextPage: v.boolean(),
});

/**
 * Schema for a filter option.
 */
export const ShopsApiFilterOptionSchema = v.object({
	/** Display label for the filter option */
	label: nullable(v.string()),

	/** Value for the filter option */
	value: nullable(v.number()),

	/** Minimum value for range filters */
	min: nullable(v.number()),

	/** Maximum value for range filters */
	max: nullable(v.number()),
});

/**
 * Schema for a shop product filter.
 */
export const ShopsApiFilterSchema = v.object({
	/** Unique code identifying the filter type */
	code: v.string(),

	/** Display name of the filter */
	name: v.string(),

	/** Type of the filter UI element */
	type: v.string(),

	/** List of available options for this filter */
	options: v.array(ShopsApiFilterOptionSchema),
});

/**
 * Schema for stock availability information.
 */
export const ShopsApiStockAvailabilitySchema = v.object({
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
 * Schema for a product item in a shop.
 */
export const ShopsApiProductItemSchema = v.object({
	/** Unique stock keeping unit identifier */
	skuId: v.number(),

	/** Unique product identifier */
	productId: v.number(),

	/** Full display name of the product */
	name: v.string(),

	/** Brief description of the product */
	shortDescription: v.string(),

	/** URL for the small preview image */
	thumbnailUrl: v.string(),

	/** URL for the full-size image */
	imageUrl: v.string(),

	/** Current selling price */
	price: v.number(),

	/** Original price before discounts */
	originalPrice: v.number(),

	/** Indicates if the product is on promotion */
	isPromo: v.boolean(),

	/** Name of the promotion */
	promoName: v.string(),

	/** Moderation status code */
	moderationStatus: v.number(),

	/** Quantity available in stock */
	qty: v.number(),

	/** Indicates if the item is in stock */
	inStock: v.boolean(),

	/** Information about purchase quantity popularity */
	qtyPurchasedInfo: nullable(v.string()),

	/** Average rating score */
	rating: nullable(v.number()),

	/** Total number of ratings */
	scoreQuantity: nullable(v.number()),

	/** Stock availability details */
	stockAvailability: nullable(ShopsApiStockAvailabilitySchema),
});

/**
 * Response schema for products from a specific shop.
 */
export const ShopsApiGetProductsResponseSchema = v.object({
	/** List of applicable filters */
	filters: v.array(ShopsApiFilterSchema),

	/** List of product items */
	items: v.array(ShopsApiProductItemSchema),

	/** Current page number */
	pageNumber: v.number(),

	/** Total number of pages available */
	totalPages: v.number(),

	/** Total number of products found */
	totalCount: v.number(),

	/** Indicates if there is a previous page */
	hasPreviousPage: v.boolean(),

	/** Indicates if there is a next page */
	hasNextPage: v.boolean(),
});