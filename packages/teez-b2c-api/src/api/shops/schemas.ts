import { FilterSchema, nullable } from "../../common/schemas";
import * as v from "valibot";

/**
 * Schema for shop contact information.
 */
export const ShopsApiContactInfoSchema = v.object({
	/**
	 * Business Identification Number
	 */
	bin: v.string(),

	/**
	 * Number of days since the shop was registered
	 */
	daysSinceRegistration: v.number(),

	/**
	 * Legal entity type code
	 */
	legalType: v.number(),
});

/**
 * Schema for a shop tag.
 */
export const ShopsApiTagSchema = v.object({
	/**
	 * Description of the tag
	 */
	description: v.string(),

	/**
	 * URL to the raster icon for the tag
	 */
	icon: v.string(),

	/**
	 * Display name of the tag
	 */
	name: v.string(),

	/**
	 * URL to the SVG icon for the tag
	 */
	svg: v.string(),

	/**
	 * Unique code for the tag
	 */
	code: v.string(),
});

/**
 * Response schema for getting a specific shop by ID.
 */
export const ShopsApiGetResponseSchema = v.object({
	/**
	 * Unique identifier of the shop
	 */
	id: v.number(),

	/**
	 * URL to the shop's banner image
	 */
	banner: nullable(v.string()),

	/**
	 * Description of the shop
	 */
	description: v.string(),

	/**
	 * URL to the shop's logo
	 */
	logo: nullable(v.string()),

	/**
	 * Name of the shop
	 */
	name: v.string(),

	/**
	 * Text about total orders/purchases (e.g., "11 заказов", "930 заказов")
	 */
	qtyPurchasedInfo: nullable(v.string()),

	/**
	 * Average rating of the shop
	 */
	rating: nullable(v.number()),

	/**
	 * Total number of reviews received
	 */
	totalReviews: nullable(v.number()),

	/**
	 * Contact information for the shop
	 */
	contactInfo: ShopsApiContactInfoSchema,

	/**
	 * Indicates if the shop represents a single brand
	 */
	isMonobrand: v.boolean(),

	/**
	 * Tag associated with the shop
	 */
	tag: ShopsApiTagSchema,
});

/**
 * Schema for a shop item in a list.
 */
export const ShopsApiShopItemSchema = v.object({
	/**
	 * Unique identifier of the shop
	 */
	id: v.number(),

	/**
	 * URL to the shop's icon
	 */
	icon: v.string(),
});

/**
 * Response schema for the monobrand shop list.
 */
export const ShopsApiGetMonobrandResponseSchema = v.object({
	/**
	 * List of monobrand shops
	 */
	items: v.array(ShopsApiShopItemSchema),

	/**
	 * Current page number
	 */
	pageNumber: v.number(),

	/**
	 * Total number of pages available
	 */
	totalPages: v.number(),

	/**
	 * Total number of shops found
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
 * Schema for stock availability information.
 */
export const ShopsApiStockAvailabilitySchema = v.object({
	/**
	 * Type of stock status (known value: "stock")
	 */
	type: v.literal("stock"),

	/**
	 * SVG icon representing stock status
	 */
	svg: nullable(v.string()),

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
 * Schema for a product item in a shop.
 */
export const ShopsApiProductItemSchema = v.object({
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
	 * Indicates if the item is in stock
	 */
	inStock: v.boolean(),

	/**
	 * Quantity available in stock
	 */
	qty: v.number(),

	/**
	 * Stock availability details
	 */
	stockAvailability: nullable(ShopsApiStockAvailabilitySchema),

	/**
	 * Indicates if the product is on promotion
	 */
	isPromo: v.boolean(),

	/**
	 * Name of the promotion
	 */
	promoName: v.string(),

	/**
	 * Popularity text indicating purchase frequency (e.g., "Часто покупают")
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
	 * Moderation status code
	 */
	moderationStatus: v.number(),
});

/**
 * Response schema for products from a specific shop.
 */
export const ShopsApiGetProductsResponseSchema = v.object({
	/**
	 * List of applicable filters
	 */
	filters: v.array(FilterSchema),

	/**
	 * List of product items
	 */
	items: v.array(ShopsApiProductItemSchema),

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
