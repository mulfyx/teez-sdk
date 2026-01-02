import { FilterSchema } from "../../common/schemas";
import * as z from "zod/mini";

/**
 * Type union for product sort keys
 */
export const ProductSortKeySchema = z.union([
	z.literal("byRelevance"),
	z.literal("popularity"),
	z.literal("highestRated"),
	z.literal("new"),
	z.literal("price"),
	z.literal("priceDesc"),
]);

/**
 * Schema for a sort option.
 */
export const ProductsApiSortOptionSchema = z.object({
	/**
	 * Sort key - "popularity", "highestRated", "new", "price", or "priceDesc"
	 */
	key: ProductSortKeySchema,

	/**
	 * Localized display name of the sort option
	 */
	name: z.string(),
});

/**
 * Response schema for available sort options.
 */
export const ProductsApiGetSortOptionsResponseSchema = z.array(
	ProductsApiSortOptionSchema,
);

/**
 * Schema for a product review item.
 */
export const ProductsApiReviewItemSchema = z.object({
	/**
	 * Name of the review author
	 */
	author: z.string(),

	/**
	 * Text content of the review
	 */
	reviewText: z.string(),

	/**
	 * Rating score given in the review
	 */
	scoreValue: z.number(),

	/**
	 * Additional attributes associated with the review
	 */
	attributes: z.record(z.string(), z.string()),

	/**
	 * Date and time when the review was created
	 */
	createdAt: z.string(),
});

/**
 * Response schema for product reviews.
 */
export const ProductsApiGetReviewsResponseSchema = z.object({
	/**
	 * List of review items
	 */
	items: z.array(ProductsApiReviewItemSchema),

	/**
	 * Current page number
	 */
	pageNumber: z.number(),

	/**
	 * Total number of pages available
	 */
	totalPages: z.number(),

	/**
	 * Total number of reviews
	 */
	totalCount: z.number(),

	/**
	 * Indicates if there is a previous page
	 */
	hasPreviousPage: z.boolean(),

	/**
	 * Indicates if there is a next page
	 */
	hasNextPage: z.boolean(),
});

/**
 * Schema for a product badge.
 */
export const ProductsApiBadgeSchema = z.object({
	/**
	 * Text label of the badge
	 */
	label: z.string(),

	/**
	 * Text color code
	 */
	textColor: z.number(),

	/**
	 * Background color code
	 */
	backgroundColor: z.nullish(z.number()),
});

/**
 * Type literal for products stock availability type
 */
export const ProductsStockAvailabilityTypeSchema = z.literal("stock");

/**
 * Schema for stock availability information.
 */
export const ProductsApiStockAvailabilitySchema = z.object({
	/**
	 * Type of stock status (known value: "stock")
	 */
	type: ProductsStockAvailabilityTypeSchema,

	/**
	 * SVG icon representing stock status
	 */
	svg: z.nullish(z.string()),

	/**
	 * Localized text describing stock status (e.g., "В наличии - осталось всего 16 штук")
	 */
	text: z.string(),

	/**
	 * Maximum quantity available
	 */
	maxQty: z.number(),

	/**
	 * Localized reason text for quantity limit (e.g., "В наличии только 16 штук")
	 */
	maxQtyReason: z.string(),
});

/**
 * Schema for a product item.
 */
export const ProductsApiProductItemSchema = z.object({
	/**
	 * Unique product identifier
	 */
	productId: z.number(),

	/**
	 * Unique stock keeping unit identifier
	 */
	skuId: z.number(),

	/**
	 * URL for the full-size image
	 */
	imageUrl: z.string(),

	/**
	 * Full display name of the product
	 */
	name: z.string(),

	/**
	 * Brief description of the product
	 */
	shortDescription: z.string(),

	/**
	 * URL for the small preview image
	 */
	thumbnailUrl: z.string(),

	/**
	 * Original price before discounts
	 */
	originalPrice: z.number(),

	/**
	 * Current selling price
	 */
	price: z.number(),

	/**
	 * Quantity available in stock
	 */
	qty: z.number(),

	/**
	 * Stock availability details
	 */
	stockAvailability: z.nullish(ProductsApiStockAvailabilitySchema),

	/**
	 * Indicates if the product is on promotion
	 */
	isPromo: z.boolean(),

	/**
	 * Name of the promotion
	 */
	promoName: z.nullish(z.string()),

	/**
	 * List of applicable promocodes
	 */
	promocodes: z.array(z.string()),

	/**
	 * Popularity text indicating purchase frequency (e.g., "Часто покупают", "11 заказов", "930 заказов")
	 */
	qtyPurchasedInfo: z.nullish(z.string()),

	/**
	 * Average rating score
	 */
	rating: z.nullish(z.number()),

	/**
	 * Total number of ratings
	 */
	scoreQuantity: z.nullish(z.number()),

	/**
	 * Badge information for the product
	 */
	badge: z.nullish(ProductsApiBadgeSchema),

	/**
	 * Moderation status code
	 */
	moderationStatus: z.number(),
});

/**
 * Response schema for the product list.
 */
export const ProductsApiListResponseSchema = z.object({
	/**
	 * List of applicable filters
	 */
	filters: z.array(FilterSchema),

	/**
	 * List of product items
	 */
	items: z.array(ProductsApiProductItemSchema),

	/**
	 * Current page number
	 */
	pageNumber: z.number(),

	/**
	 * Total number of pages available
	 */
	totalPages: z.number(),

	/**
	 * Total number of products found
	 */
	totalCount: z.number(),

	/**
	 * Indicates if there is a previous page
	 */
	hasPreviousPage: z.boolean(),

	/**
	 * Indicates if there is a next page
	 */
	hasNextPage: z.boolean(),
});
