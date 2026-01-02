/**
 * ⚠️ This file is auto-generated. Do not edit manually.
 * Run `npm run generate:schema-types` to regenerate.
 * Generated from: schemas.ts
 */

/**
 * Type union for product sort keys
 */
export type ProductSortKey =
	| "byRelevance"
	| "popularity"
	| "highestRated"
	| "new"
	| "price"
	| "priceDesc";

/**
 * Schema for a sort option.
 */
export interface ProductsApiSortOption {
	/**
	 * Sort key - "popularity", "highestRated", "new", "price", or "priceDesc"
	 */
	key: ProductSortKey;
	/**
	 * Localized display name of the sort option
	 */
	name: string;
}

/**
 * Response schema for available sort options.
 */
export type ProductsApiGetSortOptionsResponse = ProductsApiSortOption[];

/**
 * Schema for a product review item.
 */
export interface ProductsApiReviewItem {
	/**
	 * Name of the review author
	 */
	author: string;
	/**
	 * Text content of the review
	 */
	reviewText: string;
	/**
	 * Rating score given in the review
	 */
	scoreValue: number;
	/**
	 * Additional attributes associated with the review
	 */
	attributes: Record<string, string>;
	/**
	 * Date and time when the review was created
	 */
	createdAt: string;
}

/**
 * Response schema for product reviews.
 */
export interface ProductsApiGetReviewsResponse {
	/**
	 * List of review items
	 */
	items: ProductsApiReviewItem[];
	/**
	 * Current page number
	 */
	pageNumber: number;
	/**
	 * Total number of pages available
	 */
	totalPages: number;
	/**
	 * Total number of reviews
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
 * Schema for a product badge.
 */
export interface ProductsApiBadge {
	/**
	 * Text label of the badge
	 */
	label: string;
	/**
	 * Text color code
	 */
	textColor: number;
	/**
	 * Background color code
	 */
	backgroundColor?: (number | null) | undefined;
}

/**
 * Type literal for products stock availability type
 */
export type ProductsStockAvailabilityType = "stock";

/**
 * Schema for stock availability information.
 */
export interface ProductsApiStockAvailability {
	/**
	 * Type of stock status (known value: "stock")
	 */
	type: ProductsStockAvailabilityType;
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
 * Schema for a product item.
 */
export interface ProductsApiProductItem {
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
	 * Quantity available in stock
	 */
	qty: number;
	/**
	 * Stock availability details
	 */
	stockAvailability?: (ProductsApiStockAvailability | null) | undefined;
	/**
	 * Indicates if the product is on promotion
	 */
	isPromo: boolean;
	/**
	 * Name of the promotion
	 */
	promoName?: (string | null) | undefined;
	/**
	 * List of applicable promocodes
	 */
	promocodes: string[];
	/**
	 * Popularity text indicating purchase frequency (e.g., "Часто покупают", "11 заказов", "930 заказов")
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
	 * Badge information for the product
	 */
	badge?: (ProductsApiBadge | null) | undefined;
	/**
	 * Moderation status code
	 */
	moderationStatus: number;
}

/**
 * Response schema for the product list.
 */
export interface ProductsApiListResponse {
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
	items: ProductsApiProductItem[];
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
