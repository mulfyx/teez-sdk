/**
 * ⚠️ This file is auto-generated. Do not edit manually.
 * Run `npm run generate:schema-types` to regenerate.
 * Generated from: schemas.ts
 */

/**
 * Schema for shop contact information.
 */
export interface ShopsApiContactInfo {
	/**
	 * Business Identification Number
	 */
	bin: string;
	/**
	 * Number of days since the shop was registered
	 */
	daysSinceRegistration: number;
	/**
	 * Legal entity type code
	 */
	legalType: number;
}

/**
 * Schema for a shop tag.
 */
export interface ShopsApiTag {
	/**
	 * Description of the tag
	 */
	description: string;
	/**
	 * URL to the raster icon for the tag
	 */
	icon: string;
	/**
	 * Display name of the tag
	 */
	name: string;
	/**
	 * URL to the SVG icon for the tag
	 */
	svg: string;
	/**
	 * Unique code for the tag
	 */
	code: string;
}

/**
 * Response schema for getting a specific shop by ID.
 */
export interface ShopsApiGetResponse {
	/**
	 * Unique identifier of the shop
	 */
	id: number;
	/**
	 * URL to the shop's banner image
	 */
	banner?: (string | null) | undefined;
	/**
	 * Description of the shop
	 */
	description: string;
	/**
	 * URL to the shop's logo
	 */
	logo?: (string | null) | undefined;
	/**
	 * Name of the shop
	 */
	name: string;
	/**
	 * Text about total orders/purchases (e.g., "11 заказов", "930 заказов")
	 */
	qtyPurchasedInfo?: (string | null) | undefined;
	/**
	 * Average rating of the shop
	 */
	rating?: (number | null) | undefined;
	/**
	 * Total number of reviews received
	 */
	totalReviews?: (number | null) | undefined;
	/**
	 * Contact information for the shop
	 */
	contactInfo: ShopsApiContactInfo;
	/**
	 * Indicates if the shop represents a single brand
	 */
	isMonobrand: boolean;
	/**
	 * Tag associated with the shop
	 */
	tag: ShopsApiTag;
}

/**
 * Schema for a shop item in a list.
 */
export interface ShopsApiShopItem {
	/**
	 * Unique identifier of the shop
	 */
	id: number;
	/**
	 * URL to the shop's icon
	 */
	icon: string;
}

/**
 * Response schema for the monobrand shop list.
 */
export interface ShopsApiGetMonobrandResponse {
	/**
	 * List of monobrand shops
	 */
	items: ShopsApiShopItem[];
	/**
	 * Current page number
	 */
	pageNumber: number;
	/**
	 * Total number of pages available
	 */
	totalPages: number;
	/**
	 * Total number of shops found
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
 * Type literal for shops stock availability type
 */
export type ShopsStockAvailabilityType = "stock";

/**
 * Schema for stock availability information.
 */
export interface ShopsApiStockAvailability {
	/**
	 * Type of stock status (known value: "stock")
	 */
	type: ShopsStockAvailabilityType;
	/**
	 * SVG icon representing stock status
	 */
	svg?: (string | null) | undefined;
	/**
	 * Localized text describing stock status (e.g., "В наличии - осталось всего 16 штук")
	 */
	text: string;
	/**
	 * Maximum quantity available
	 */
	maxQty: number;
	/**
	 * Localized reason text for quantity limit (e.g., "В наличии только 16 штук")
	 */
	maxQtyReason: string;
}

/**
 * Schema for a product item in a shop.
 */
export interface ShopsApiProductItem {
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
	 * Full display name of the product
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
	 * Indicates if the item is in stock
	 */
	inStock: boolean;
	/**
	 * Quantity available in stock
	 */
	qty: number;
	/**
	 * Stock availability details
	 */
	stockAvailability?: (ShopsApiStockAvailability | null) | undefined;
	/**
	 * Indicates if the product is on promotion
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
	/**
	 * Moderation status code
	 */
	moderationStatus: number;
}

/**
 * Response schema for products from a specific shop.
 */
export interface ShopsApiGetProductsResponse {
	/**
	 * List of applicable filters
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
	 * List of product items
	 */
	items: ShopsApiProductItem[];
	/**
	 * Current page number
	 */
	pageNumber: number;
	/**
	 * Total number of pages available
	 */
	totalPages: number;
	/**
	 * Total number of products found
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
