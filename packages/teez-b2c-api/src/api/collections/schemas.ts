import { FilterSchema, nullable } from "../../common/schemas";
import * as v from "valibot";

/**
 * Schema for stock availability information.
 */
export const CollectionsApiStockAvailabilitySchema = v.object({
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
	 * Maximum quantity available for purchase
	 */
	maxQty: v.number(),

	/**
	 * Localized reason text for quantity limit (e.g., "В наличии только 16 штук")
	 */
	maxQtyReason: v.string(),
});

/**
 * Schema for a SKU item within a collection.
 */
export const CollectionsApiSkuItemSchema = v.object({
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
	 * Display name of the product
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
	stockAvailability: nullable(CollectionsApiStockAvailabilitySchema),

	/**
	 * Indicates if the item is on promotion
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
});

/**
 * Response schema for getting SKUs from a collection.
 */
export const CollectionsApiGetSkusResponseSchema = v.object({
	/**
	 * List of applicable filters for the collection
	 */
	filters: v.array(FilterSchema),

	/**
	 * List of SKU items in the collection
	 */
	items: v.array(CollectionsApiSkuItemSchema),

	/**
	 * Current page number
	 */
	pageNumber: v.number(),

	/**
	 * Total number of pages available
	 */
	totalPages: v.number(),

	/**
	 * Total number of items in the collection
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
 * Schema for a collection list item.
 */
export const CollectionsApiListItemSchema = v.object({
	/**
	 * Unique identifier of the collection
	 */
	id: v.number(),

	/**
	 * URL or path to the collection's icon
	 */
	icon: nullable(v.string()),

	/**
	 * Name of the collection
	 */
	name: v.string(),

	/**
	 * Priority for sorting or display order
	 */
	priority: v.number(),
});

/**
 * Response schema for the list of collections.
 */
export const CollectionsApiListResponseSchema = v.array(
	CollectionsApiListItemSchema,
);

/**
 * Response schema for getting a specific collection by ID.
 */
export const CollectionsApiGetResponseSchema = v.object({
	/**
	 * Type of the collection (known value: "Collection")
	 */
	type: v.literal("Collection"),

	/**
	 * Unique identifier of the collection
	 */
	id: v.number(),

	/**
	 * URL for the cover image
	 */
	cover: v.string(),

	/**
	 * Description of the collection
	 */
	description: v.string(),

	/**
	 * Name of the collection
	 */
	name: v.string(),

	/**
	 * Priority for sorting or display order
	 */
	priority: v.number(),
});
