/**
 * ⚠️ This file is auto-generated. Do not edit manually.
 * Run `npm run generate:schema-types` to regenerate.
 * Generated from: schemas.ts
 */

/**
 * Type literal for collections stock availability type
 */
export type CollectionsStockAvailabilityType = "stock";

/**
 * Schema for stock availability information.
 */
export interface CollectionsApiStockAvailability {
	/**
	 * Type of stock status (known value: "stock")
	 */
	type: CollectionsStockAvailabilityType;
	/**
	 * SVG icon representing stock status
	 */
	svg?: (string | null) | undefined;
	/**
	 * Localized text describing stock status (e.g., "В наличии - осталось всего 16 штук")
	 */
	text: string;
	/**
	 * Maximum quantity available for purchase
	 */
	maxQty: number;
	/**
	 * Localized reason text for quantity limit (e.g., "В наличии только 16 штук")
	 */
	maxQtyReason: string;
}

/**
 * Schema for a SKU item within a collection.
 */
export interface CollectionsApiSkuItem {
	/**
	 * Unique product identifier
	 */
	productId: number;
	/**
	 * Unique stock keeping unit identifier
	 */
	skuId: number;
	/**
	 * URL for the full-size image
	 */
	imageUrl: string;
	/**
	 * Display name of the product
	 */
	name: string;
	/**
	 * Brief description of the product
	 */
	shortDescription: string;
	/**
	 * URL for the small preview image
	 */
	thumbnailUrl: string;
	/**
	 * Original price before discounts
	 */
	originalPrice: number;
	/**
	 * Current selling price
	 */
	price: number;
	/**
	 * Quantity available in stock
	 */
	qty: number;
	/**
	 * Stock availability details
	 */
	stockAvailability?: (CollectionsApiStockAvailability | null) | undefined;
	/**
	 * Indicates if the item is on promotion
	 */
	isPromo: boolean;
	/**
	 * Name of the promotion
	 */
	promoName: string;
	/**
	 * Popularity text indicating purchase frequency (e.g., "Часто покупают")
	 */
	qtyPurchasedInfo?: (string | null) | undefined;
	/**
	 * Average rating score
	 */
	rating?: (number | null) | undefined;
	/**
	 * Total number of ratings
	 */
	scoreQuantity?: (number | null) | undefined;
}

/**
 * Response schema for getting SKUs from a collection.
 */
export interface CollectionsApiGetSkusResponse {
	/**
	 * List of applicable filters for the collection
	 */
	filters: (
		| {
				type: "range";
				name: string;
				code: string;
				options: {
					min: number;
					max: number;
				}[];
		  }
		| {
				type: "category" | "alphabetic_search_list";
				name: string;
				code: string;
				options: {
					label: string;
					value: number;
				}[];
		  }
	)[];
	/**
	 * List of SKU items in the collection
	 */
	items: CollectionsApiSkuItem[];
	/**
	 * Current page number
	 */
	pageNumber: number;
	/**
	 * Total number of pages available
	 */
	totalPages: number;
	/**
	 * Total number of items in the collection
	 */
	totalCount: number;
	/**
	 * Indicates if there is a previous page
	 */
	hasPreviousPage: boolean;
	/**
	 * Indicates if there is a next page
	 */
	hasNextPage: boolean;
}

/**
 * Schema for a collection list item.
 */
export interface CollectionsApiListItem {
	/**
	 * Unique identifier of the collection
	 */
	id: number;
	/**
	 * URL or path to the collection's icon
	 */
	icon?: (string | null) | undefined;
	/**
	 * Name of the collection
	 */
	name: string;
	/**
	 * Priority for sorting or display order
	 */
	priority: number;
}

/**
 * Response schema for the list of collections.
 */
export type CollectionsApiListResponse = CollectionsApiListItem[];

/**
 * Type literal for collection type identifier
 */
export type CollectionType = "Collection";

/**
 * Response schema for getting a specific collection by ID.
 */
export interface CollectionsApiGetResponse {
	/**
	 * Type of the collection (known value: "Collection")
	 */
	type: CollectionType;
	/**
	 * Unique identifier of the collection
	 */
	id: number;
	/**
	 * URL for the cover image
	 */
	cover: string;
	/**
	 * Description of the collection
	 */
	description: string;
	/**
	 * Name of the collection
	 */
	name: string;
	/**
	 * Priority for sorting or display order
	 */
	priority: number;
}
