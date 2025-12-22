import { nullable } from "../../common/schemas";
import * as v from "valibot";

/**
 * Schema for a sort option.
 */
export const ProductsApiSortOptionSchema = v.object({
	/** Identifier key for the sort option */
	key: v.string(),

	/** Display name of the sort option */
	name: v.string(),
});

/**
 * Response schema for available sort options.
 */
export const ProductsApiGetSortOptionsResponseSchema = v.array(
	ProductsApiSortOptionSchema,
);

/**
 * Schema for a product review item.
 */
export const ProductsApiReviewItemSchema = v.object({
	/** Rating score given in the review */
	scoreValue: v.number(),

	/** Date and time when the review was created */
	createdAt: v.string(),

	/** Text content of the review */
	reviewText: v.string(),

	/** Name of the review author */
	author: v.string(),

	/** Additional attributes associated with the review */
	attributes: v.record(v.string(), v.string()),
});

/**
 * Response schema for product reviews.
 */
export const ProductsApiGetReviewsResponseSchema = v.object({
	/** List of review items */
	items: v.array(ProductsApiReviewItemSchema),

	/** Current page number */
	pageNumber: v.number(),

	/** Total number of pages available */
	totalPages: v.number(),

	/** Total number of reviews */
	totalCount: v.number(),

	/** Indicates if there is a previous page */
	hasPreviousPage: v.boolean(),

	/** Indicates if there is a next page */
	hasNextPage: v.boolean(),
});

/**
 * Schema for a filter option.
 */
export const ProductsApiFilterOptionSchema = v.object({
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
 * Schema for a product filter.
 */
export const ProductsApiFilterSchema = v.object({
	/** Unique code identifying the filter type */
	code: v.string(),

	/** Display name of the filter */
	name: v.string(),

	/** Type of the filter UI element */
	type: v.string(),

	/** List of available options for this filter */
	options: v.array(ProductsApiFilterOptionSchema),
});

/**
 * Schema for a product badge.
 */
export const ProductsApiBadgeSchema = v.object({
	/** Text label of the badge */
	label: v.string(),

	/** Text color code */
	textColor: v.number(),

	/** Background color code */
	backgroundColor: v.number(),
});

/**
 * Schema for stock availability information.
 */
export const ProductsApiStockAvailabilitySchema = v.object({
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
 * Schema for a product item.
 */
export const ProductsApiProductItemSchema = v.object({
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

	/** List of applicable promocodes */
	promocodes: v.array(v.string()),

	/** Badge information for the product */
	badge: ProductsApiBadgeSchema,

	/** Stock availability details */
	stockAvailability: nullable(ProductsApiStockAvailabilitySchema),
});

/**
 * Response schema for the product list.
 */
export const ProductsApiGetProductsResponseSchema = v.object({
	/** List of applicable filters */
	filters: v.array(ProductsApiFilterSchema),

	/** List of product items */
	items: v.array(ProductsApiProductItemSchema),

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
