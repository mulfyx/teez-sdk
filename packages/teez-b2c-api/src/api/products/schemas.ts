import { nullable } from "../../common/schemas";
import * as v from "valibot";

/**
 * Enum for product sort option keys.
 * Known values: "popularity", "highestRated", "new", "price", "priceDesc"
 */
export const ProductsApiSortKeyEnum = v.union([
	v.literal("popularity"),
	v.literal("highestRated"),
	v.literal("new"),
	v.literal("price"),
	v.literal("priceDesc"),
	v.string(),
]);

/**
 * Enum for product filter types.
 * Known values: "category" (category selector), "alphabetic_search_list" (brand picker), "range" (price slider)
 */
export const ProductsApiFilterTypeEnum = v.union([
	v.literal("category"),
	v.literal("alphabetic_search_list"),
	v.literal("range"),
	v.string(),
]);

/**
 * Enum for stock availability types.
 * Known values: "stock" (in stock with quantity info)
 */
export const ProductsApiStockAvailabilityTypeEnum = v.union([
	v.literal("stock"),
	v.string(),
]);

/**
 * Schema for a sort option.
 */
export const ProductsApiSortOptionSchema = v.object({
	/**
	 * Sort key - "popularity", "highestRated", "new", "price", or "priceDesc"
	 */
	key: ProductsApiSortKeyEnum,

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
	 * Rating score given in the review
	 */
	scoreValue: v.number(),

	/**
	 * Date and time when the review was created
	 */
	createdAt: v.string(),

	/**
	 * Text content of the review
	 */
	reviewText: v.string(),

	/**
	 * Name of the review author
	 */
	author: v.string(),

	/**
	 * Additional attributes associated with the review
	 */
	attributes: v.record(v.string(), v.string()),
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
 * Schema for a filter option.
 */
export const ProductsApiFilterOptionSchema = v.object({
	/**
	 * Display label for the filter option
	 */
	label: nullable(v.string()),

	/**
	 * Value for the filter option
	 */
	value: nullable(v.number()),

	/**
	 * Minimum value for range filters
	 */
	min: nullable(v.number()),

	/**
	 * Maximum value for range filters
	 */
	max: nullable(v.number()),
});

/**
 * Schema for a product filter.
 */
export const ProductsApiFilterSchema = v.object({
	/**
	 * Unique code identifying the filter type
	 */
	code: v.string(),

	/**
	 * Localized display name of the filter
	 */
	name: v.string(),

	/**
	 * Filter UI type - "category" for category selector, "alphabetic_search_list" for brand picker, "range" for price slider
	 */
	type: ProductsApiFilterTypeEnum,

	/**
	 * List of available options for this filter
	 */
	options: v.array(ProductsApiFilterOptionSchema),
});

/**
 * Schema for a product badge.
 */
export const ProductsApiBadgeSchema = v.object({
	/**
	 * Text label of the badge
	 */
	label: v.string(),

	/**
	 * Text color code
	 */
	textColor: v.number(),

	/**
	 * Background color code
	 */
	backgroundColor: v.number(),
});

/**
 * Schema for stock availability information.
 */
export const ProductsApiStockAvailabilitySchema = v.object({
	/**
	 * Localized text describing stock status (e.g., "В наличии - осталось всего 16 штук")
	 */
	text: v.string(),

	/**
	 * SVG icon representing stock status
	 */
	svg: nullable(v.string()),

	/**
	 * Type of stock status (known value: "stock")
	 */
	type: ProductsApiStockAvailabilityTypeEnum,

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
	 * Unique stock keeping unit identifier
	 */
	skuId: v.number(),

	/**
	 * Unique product identifier
	 */
	productId: v.number(),

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
	 * URL for the full-size image
	 */
	imageUrl: v.string(),

	/**
	 * Current selling price
	 */
	price: v.number(),

	/**
	 * Original price before discounts
	 */
	originalPrice: v.number(),

	/**
	 * Quantity available in stock
	 */
	qty: v.number(),

	/**
	 * Moderation status code
	 */
	moderationStatus: v.number(),

	/**
	 * Indicates if the product is on promotion
	 */
	isPromo: v.boolean(),

	/**
	 * Name of the promotion
	 */
	promoName: v.string(),

	/**
	 * Popularity text indicating purchase frequency (e.g., "Часто покупают", "11 заказов", "930 заказов")
	 */
	qtyPurchasedInfo: nullable(v.string()),

	/**
	 * Average rating score
	 */
	rating: nullable(v.number()),

	/**
	 * Total number of ratings
	 */
	scoreQuantity: nullable(v.number()),

	/**
	 * List of applicable promocodes
	 */
	promocodes: v.array(v.string()),

	/**
	 * Badge information for the product
	 */
	badge: ProductsApiBadgeSchema,

	/**
	 * Stock availability details
	 */
	stockAvailability: nullable(ProductsApiStockAvailabilitySchema),
});

/**
 * Response schema for the product list.
 */
export const ProductsApiListResponseSchema = v.object({
	/**
	 * List of applicable filters
	 */
	filters: v.array(ProductsApiFilterSchema),

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
