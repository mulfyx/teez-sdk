import { FilterSchema } from "../../common/schemas";
import * as z from "zod/mini";

/**
 * Type literal for collections stock availability type
 */
export const CollectionsStockAvailabilityTypeSchema = z.literal("stock");

/**
 * Schema for stock availability information.
 */
export const CollectionsApiStockAvailabilitySchema = z.object({
	/**
	 * Type of stock status (known value: "stock")
	 */
	type: CollectionsStockAvailabilityTypeSchema,

	/**
	 * SVG icon representing stock status
	 */
	svg: z.nullish(z.string()),

	/**
	 * Localized text describing stock status (e.g., "В наличии - осталось всего 16 штук")
	 */
	text: z.string(),

	/**
	 * Maximum quantity available for purchase
	 */
	maxQty: z.number(),

	/**
	 * Localized reason text for quantity limit (e.g., "В наличии только 16 штук")
	 */
	maxQtyReason: z.string(),
});

/**
 * Schema for a SKU item within a collection.
 */
export const CollectionsApiSkuItemSchema = z.object({
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
	 * Display name of the product
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
	stockAvailability: z.nullish(CollectionsApiStockAvailabilitySchema),

	/**
	 * Indicates if the item is on promotion
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
});

/**
 * Response schema for getting SKUs from a collection.
 */
export const CollectionsApiGetSkusResponseSchema = z.object({
	/**
	 * List of applicable filters for the collection
	 */
	filters: z.array(FilterSchema),

	/**
	 * List of SKU items in the collection
	 */
	items: z.array(CollectionsApiSkuItemSchema),

	/**
	 * Current page number
	 */
	pageNumber: z.number(),

	/**
	 * Total number of pages available
	 */
	totalPages: z.number(),

	/**
	 * Total number of items in the collection
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
 * Schema for a collection list item.
 */
export const CollectionsApiListItemSchema = z.object({
	/**
	 * Unique identifier of the collection
	 */
	id: z.number(),

	/**
	 * URL or path to the collection's icon
	 */
	icon: z.nullish(z.string()),

	/**
	 * Name of the collection
	 */
	name: z.string(),

	/**
	 * Priority for sorting or display order
	 */
	priority: z.number(),
});

/**
 * Response schema for the list of collections.
 */
export const CollectionsApiListResponseSchema = z.array(
	CollectionsApiListItemSchema,
);

/**
 * Type literal for collection type identifier
 */
export const CollectionTypeSchema = z.literal("Collection");

/**
 * Response schema for getting a specific collection by ID.
 */
export const CollectionsApiGetResponseSchema = z.object({
	/**
	 * Type of the collection (known value: "Collection")
	 */
	type: CollectionTypeSchema,

	/**
	 * Unique identifier of the collection
	 */
	id: z.number(),

	/**
	 * URL for the cover image
	 */
	cover: z.string(),

	/**
	 * Description of the collection
	 */
	description: z.string(),

	/**
	 * Name of the collection
	 */
	name: z.string(),

	/**
	 * Priority for sorting or display order
	 */
	priority: z.number(),
});
