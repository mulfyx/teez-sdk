import { nullable } from "../../common/schemas";
import * as v from "valibot";

/**
 * Schema for a filter option.
 */
export const CollectionsApiFilterOptionSchema = v.object({
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
export const CollectionsApiFilterSchema = v.object({
	/** Unique code identifying the filter type */
	code: v.string(),

	/** Display name of the filter */
	name: v.string(),

	/** Type of the filter UI element */
	type: v.string(),

	/** List of available options for this filter */
	options: v.array(CollectionsApiFilterOptionSchema),
});

/**
 * Schema for stock availability information.
 */
export const CollectionsApiStockAvailabilitySchema = v.object({
	/** Text describing stock status (e.g., "In stock") */
	text: v.string(),

	/** SVG icon representing stock status */
	svg: nullable(v.string()),

	/** Type of stock status */
	type: v.string(),

	/** Maximum quantity available for purchase */
	maxQty: v.number(),

	/** Reason for the maximum quantity limit */
	maxQtyReason: v.string(),
});

/**
 * Schema for a SKU item within a collection.
 */
export const CollectionsApiSkuItemSchema = v.object({
	/** Unique stock keeping unit identifier */
	skuId: v.number(),

	/** Unique product identifier */
	productId: v.number(),

	/** Display name of the product */
	name: v.string(),

	/** Brief description of the product */
	shortDescription: v.string(),

	/** URL for the small preview image */
	thumbnailUrl: v.string(),

	/** URL for the full-size image */
	imageUrl: v.string(),

	/** Original price before discounts */
	originalPrice: v.number(),

	/** Current selling price */
	price: v.number(),

	/** Quantity available in stock */
	qty: v.number(),

	/** Indicates if the item is on promotion */
	isPromo: v.boolean(),

	/** Name of the promotion */
	promoName: v.string(),

	/** Information about purchase quantity popularity */
	qtyPurchasedInfo: nullable(v.string()),

	/** Average rating score */
	rating: nullable(v.number()),

	/** Total number of ratings */
	scoreQuantity: nullable(v.number()),

	/** Stock availability details */
	stockAvailability: nullable(CollectionsApiStockAvailabilitySchema),
});

/**
 * Response schema for getting SKUs from a collection.
 */
export const CollectionsApiGetSkusResponseSchema = v.object({
	/** List of applicable filters for the collection */
	filters: v.array(CollectionsApiFilterSchema),

	/** List of SKU items in the collection */
	items: v.array(CollectionsApiSkuItemSchema),

	/** Current page number */
	pageNumber: v.number(),

	/** Total number of pages available */
	totalPages: v.number(),

	/** Total number of items in the collection */
	totalCount: v.number(),

	/** Indicates if there is a previous page */
	hasPreviousPage: v.boolean(),

	/** Indicates if there is a next page */
	hasNextPage: v.boolean(),
});

/**
 * Schema for a collection list item.
 */
export const CollectionsApiListItemSchema = v.object({
	/** Unique identifier of the collection */
	id: v.number(),

	/** Name of the collection */
	name: v.string(),

	/** URL or path to the collection's icon */
	icon: nullable(v.string()),

	/** Priority for sorting or display order */
	priority: v.number(),
});

/**
 * Response schema for the list of collections.
 */
export const CollectionsApiGetAllResponseSchema = v.array(
	CollectionsApiListItemSchema,
);

/**
 * Response schema for getting a specific collection by ID.
 */
export const CollectionsApiGetByIdResponseSchema = v.object({
	/** Unique identifier of the collection */
	id: v.number(),

	/** Name of the collection */
	name: v.string(),

	/** Description of the collection */
	description: v.string(),

	/** URL for the cover image */
	cover: v.string(),

	/** Priority for sorting or display order */
	priority: v.number(),

	/** Type of the collection */
	type: v.string(),
});