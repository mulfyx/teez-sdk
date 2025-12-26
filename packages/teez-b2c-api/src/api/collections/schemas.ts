import { nullable } from "../../common/schemas";
import * as v from "valibot";

/**
 * Schema for a filter option.
 */
export const CollectionsApiFilterOptionSchema = v.object({
	/**
	 * Display label for the filter option
	 */
	label: nullable(v.string()),

	/**
	 * Minimum value for range filters
	 */
	min: nullable(v.number()),

	/**
	 * Maximum value for range filters
	 */
	max: nullable(v.number()),

	/**
	 * Value for the filter option
	 */
	value: nullable(v.number()),
});

/**
 * Enum for collection filter types.
 * Known values: "category" (category selector), "alphabetic_search_list" (brand picker), "range" (price slider)
 */
export const CollectionsApiFilterTypeEnum = v.union([
	v.literal("category"),
	v.literal("alphabetic_search_list"),
	v.literal("range"),
	v.string(),
]);

/**
 * Schema for a product filter.
 */
export const CollectionsApiFilterSchema = v.object({
	/**
	 * Filter UI type - "category" for category selector, "alphabetic_search_list" for brand picker, "range" for price slider
	 */
	type: CollectionsApiFilterTypeEnum,

	/**
	 * Localized display name of the filter
	 */
	name: v.string(),

	/**
	 * Unique code identifying the filter type
	 */
	code: v.string(),

	/**
	 * List of available options for this filter
	 */
	options: v.array(CollectionsApiFilterOptionSchema),
});

/**
 * Enum for stock availability types.
 * Known values: "stock" (in stock with quantity info)
 */
export const CollectionsApiStockAvailabilityTypeEnum = v.union([
	v.literal("stock"),
	v.string(),
]);

/**
 * Schema for stock availability information.
 */
export const CollectionsApiStockAvailabilitySchema = v.object({
	/**
	 * Type of stock status (known value: "stock")
	 */
	type: CollectionsApiStockAvailabilityTypeEnum,

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
	filters: v.array(CollectionsApiFilterSchema),

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
 * Enum for collection types.
 * Known values: "Collection"
 */
export const CollectionsApiCollectionTypeEnum = v.union([
	v.literal("Collection"),
	v.string(),
]);

/**
 * Response schema for getting a specific collection by ID.
 */
export const CollectionsApiGetResponseSchema = v.object({
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

	/**
	 * Type of the collection (known value: "Collection")
	 */
	type: CollectionsApiCollectionTypeEnum,
});
