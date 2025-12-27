import { FilterSchema } from "../../common/schemas";
import * as z from "zod/mini";

/**
 * Schema for shop contact information.
 */
export const ShopsApiContactInfoSchema = z.object({
	/**
	 * Business Identification Number
	 */
	bin: z.string(),

	/**
	 * Number of days since the shop was registered
	 */
	daysSinceRegistration: z.number(),

	/**
	 * Legal entity type code
	 */
	legalType: z.number(),
});

/**
 * Schema for a shop tag.
 */
export const ShopsApiTagSchema = z.object({
	/**
	 * Description of the tag
	 */
	description: z.string(),

	/**
	 * URL to the raster icon for the tag
	 */
	icon: z.string(),

	/**
	 * Display name of the tag
	 */
	name: z.string(),

	/**
	 * URL to the SVG icon for the tag
	 */
	svg: z.string(),

	/**
	 * Unique code for the tag
	 */
	code: z.string(),
});

/**
 * Response schema for getting a specific shop by ID.
 */
export const ShopsApiGetResponseSchema = z.object({
	/**
	 * Unique identifier of the shop
	 */
	id: z.number(),

	/**
	 * URL to the shop's banner image
	 */
	banner: z.nullish(z.string()),

	/**
	 * Description of the shop
	 */
	description: z.string(),

	/**
	 * URL to the shop's logo
	 */
	logo: z.nullish(z.string()),

	/**
	 * Name of the shop
	 */
	name: z.string(),

	/**
	 * Text about total orders/purchases (e.g., "11 заказов", "930 заказов")
	 */
	qtyPurchasedInfo: z.nullish(z.string()),

	/**
	 * Average rating of the shop
	 */
	rating: z.nullish(z.number()),

	/**
	 * Total number of reviews received
	 */
	totalReviews: z.nullish(z.number()),

	/**
	 * Contact information for the shop
	 */
	contactInfo: ShopsApiContactInfoSchema,

	/**
	 * Indicates if the shop represents a single brand
	 */
	isMonobrand: z.boolean(),

	/**
	 * Tag associated with the shop
	 */
	tag: ShopsApiTagSchema,
});

/**
 * Schema for a shop item in a list.
 */
export const ShopsApiShopItemSchema = z.object({
	/**
	 * Unique identifier of the shop
	 */
	id: z.number(),

	/**
	 * URL to the shop's icon
	 */
	icon: z.string(),
});

/**
 * Response schema for the monobrand shop list.
 */
export const ShopsApiGetMonobrandResponseSchema = z.object({
	/**
	 * List of monobrand shops
	 */
	items: z.array(ShopsApiShopItemSchema),

	/**
	 * Current page number
	 */
	pageNumber: z.number(),

	/**
	 * Total number of pages available
	 */
	totalPages: z.number(),

	/**
	 * Total number of shops found
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
 * Type literal for shops stock availability type
 */
export const ShopsStockAvailabilityTypeSchema = z.literal("stock");

/**
 * Schema for stock availability information.
 */
export const ShopsApiStockAvailabilitySchema = z.object({
	/**
	 * Type of stock status (known value: "stock")
	 */
	type: ShopsStockAvailabilityTypeSchema,

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
 * Schema for a product item in a shop.
 */
export const ShopsApiProductItemSchema = z.object({
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
	 * Indicates if the item is in stock
	 */
	inStock: z.boolean(),

	/**
	 * Quantity available in stock
	 */
	qty: z.number(),

	/**
	 * Stock availability details
	 */
	stockAvailability: z.nullish(ShopsApiStockAvailabilitySchema),

	/**
	 * Indicates if the product is on promotion
	 */
	isPromo: z.boolean(),

	/**
	 * Name of the promotion
	 */
	promoName: z.string(),

	/**
	 * Popularity text indicating purchase frequency (e.g., "Часто покупают")
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
	 * Moderation status code
	 */
	moderationStatus: z.number(),
});

/**
 * Response schema for products from a specific shop.
 */
export const ShopsApiGetProductsResponseSchema = z.object({
	/**
	 * List of applicable filters
	 */
	filters: z.array(FilterSchema),

	/**
	 * List of product items
	 */
	items: z.array(ShopsApiProductItemSchema),

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
