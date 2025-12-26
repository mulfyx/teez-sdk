import { optionalNullish } from "../../common/helpers";
import { FilterSchema } from "../../common/schemas";
import * as v from "valibot";

/**
 * Schema for a sort option.
 */
export const ProductsApiSortOptionSchema = v.object({
	/**
	 * Sort key - "popularity", "highestRated", "new", "price", or "priceDesc"
	 */
	key: v.union([
		v.literal("popularity"),
		v.literal("highestRated"),
		v.literal("new"),
		v.literal("price"),
		v.literal("priceDesc"),
	]),

	/**
	 * Localized display name of the sort option
	 */
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
	/**
	 * Name of the review author
	 */
	author: v.string(),

	/**
	 * Text content of the review
	 */
	reviewText: v.string(),

	/**
	 * Rating score given in the review
	 */
	scoreValue: v.number(),

	/**
	 * Additional attributes associated with the review
	 */
	attributes: v.record(v.string(), v.string()),

	/**
	 * Date and time when the review was created
	 */
	createdAt: v.string(),
});

/**
 * Response schema for product reviews.
 */
export const ProductsApiGetReviewsResponseSchema = v.object({
	/**
	 * List of review items
	 */
	items: v.array(ProductsApiReviewItemSchema),

	/**
	 * Current page number
	 */
	pageNumber: v.number(),

	/**
	 * Total number of pages available
	 */
	totalPages: v.number(),

	/**
	 * Total number of reviews
	 */
	totalCount: v.number(),

	/**
	 * Indicates if there is a previous page
	 */
	hasPreviousPage: v.boolean(),

	/**
	 * Indicates if there is a next page
	 */
	hasNextPage: v.boolean(),
});

/**
 * Schema for a product badge.
 */
export const ProductsApiBadgeSchema = v.object({
	/**
	 * Background color code
	 */
	backgroundColor: v.number(),

	/**
	 * Text label of the badge
	 */
	label: v.string(),

	/**
	 * Text color code
	 */
	textColor: v.number(),
});

/**
 * Schema for stock availability information.
 */
export const ProductsApiStockAvailabilitySchema = v.object({
	/**
	 * Type of stock status (known value: "stock")
	 */
	type: v.literal("stock"),

	/**
	 * SVG icon representing stock status
	 */
	svg: optionalNullish(v.string()),

	/**
	 * Localized text describing stock status (e.g., "В наличии - осталось всего 16 штук")
	 */
	text: v.string(),

	/**
	 * Maximum quantity available
	 */
	maxQty: v.number(),

	/**
	 * Localized reason text for quantity limit (e.g., "В наличии только 16 штук")
	 */
	maxQtyReason: v.string(),
});

/**
 * Schema for a product item.
 */
export const ProductsApiProductItemSchema = v.object({
	/**
	 * Unique product identifier
	 */
	productId: v.number(),

	/**
	 * Unique stock keeping unit identifier
	 */
	skuId: v.number(),

	/**
	 * URL for the full-size image
	 */
	imageUrl: v.string(),

	/**
	 * Full display name of the product
	 */
	name: v.string(),

	/**
	 * Brief description of the product
	 */
	shortDescription: v.string(),

	/**
	 * URL for the small preview image
	 */
	thumbnailUrl: v.string(),

	/**
	 * Original price before discounts
	 */
	originalPrice: v.number(),

	/**
	 * Current selling price
	 */
	price: v.number(),

	/**
	 * Quantity available in stock
	 */
	qty: v.number(),

	/**
	 * Stock availability details
	 */
	stockAvailability: optionalNullish(ProductsApiStockAvailabilitySchema),

	/**
	 * Indicates if the product is on promotion
	 */
	isPromo: v.boolean(),

	/**
	 * Name of the promotion
	 */
	promoName: v.string(),

	/**
	 * List of applicable promocodes
	 */
	promocodes: v.array(v.string()),

	/**
	 * Popularity text indicating purchase frequency (e.g., "Часто покупают", "11 заказов", "930 заказов")
	 */
	qtyPurchasedInfo: optionalNullish(v.string()),

	/**
	 * Average rating score
	 */
	rating: optionalNullish(v.number()),

	/**
	 * Total number of ratings
	 */
	scoreQuantity: optionalNullish(v.number()),

	/**
	 * Badge information for the product
	 */
	badge: ProductsApiBadgeSchema,

	/**
	 * Moderation status code
	 */
	moderationStatus: v.number(),
});

/**
 * Response schema for the product list.
 */
export const ProductsApiListResponseSchema = v.object({
	/**
	 * List of applicable filters
	 */
	filters: v.array(FilterSchema),

	/**
	 * List of product items
	 */
	items: v.array(ProductsApiProductItemSchema),

	/**
	 * Current page number
	 */
	pageNumber: v.number(),

	/**
	 * Total number of pages available
	 */
	totalPages: v.number(),

	/**
	 * Total number of products found
	 */
	totalCount: v.number(),

	/**
	 * Indicates if there is a previous page
	 */
	hasPreviousPage: v.boolean(),

	/**
	 * Indicates if there is a next page
	 */
	hasNextPage: v.boolean(),
});
