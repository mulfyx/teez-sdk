/**
 * ⚠️ This file is auto-generated. Do not edit manually.
 * Run `npm run generate:schema-types` to regenerate.
 * Generated from: schemas.ts
 */

/**
 * Schema for installment payment information.
 */
export interface SkuApiInstallment {
	/**
	 * URL to the installment SVG icon
	 */
	installmentSvg: string;
	/**
	 * Description of the installment term
	 */
	installmentTerm: string;
}

/**
 * Schema for shop details associated with a SKU.
 */
export interface SkuApiShop {
	/**
	 * Unique identifier of the shop
	 */
	id: number;
	/**
	 * URL to the shop's logo
	 */
	logo?: (string | null) | undefined;
	/**
	 * Name of the shop
	 */
	name: string;
	/**
	 * URL to the shop's photo
	 */
	photo: string;
	/**
	 * URL to the shop's page or resource
	 */
	url: string;
	/**
	 * Indicates if installment payment is available
	 */
	isInstallment: boolean;
	/**
	 * Popularity text for the shop (e.g., "Часто покупают", "11 заказов")
	 */
	qtyPurchasedInfo?: (string | null) | undefined;
	/**
	 * Average rating of the shop
	 */
	rating?: (number | null) | undefined;
	/**
	 * Number of days since the shop was registered
	 */
	daysSinceRegistration: number;
	/**
	 * Indicates if the shop represents a single brand
	 */
	isMonobrand: boolean;
}

/**
 * Schema for brand information.
 */
export interface SkuApiBrand {
	/**
	 * Unique identifier of the brand
	 */
	id: number;
	/**
	 * Name of the brand
	 */
	name: string;
}

/**
 * Schema for a category item.
 */
export interface SkuApiCategory {
	/**
	 * Unique identifier of the category
	 */
	id: number;
	/**
	 * Name of the category
	 */
	name: string;
	/**
	 * Indicates if this is the primary category for the product
	 */
	isPrimary: boolean;
}

/**
 * Schema for an attribute property value.
 */
export interface SkuApiAttributePropertyValue {
	/**
	 * Name of the property value (e.g., "Red", "XL")
	 */
	name: string;
	/**
	 * URL to a photo representing this property value
	 */
	photo: string;
}

/**
 * Schema for a product attribute.
 */
export interface SkuApiAttributeProperty {
	/**
	 * Name of the attribute (e.g., "Color", "Size")
	 */
	name: string;
	/**
	 * Value details for the attribute
	 */
	value: SkuApiAttributePropertyValue;
}

/**
 * Schema for SKU attributes configuration.
 */
export interface SkuApiAttribute {
	/**
	 * SKU ID associated with this specific attribute combination
	 */
	skuId: number;
	/**
	 * Quantity available for this specific variant
	 */
	quantity: number;
	/**
	 * List of properties defining this variant
	 */
	attributeProperties: SkuApiAttributeProperty[];
}

/**
 * Schema for a product tag.
 */
export interface SkuApiTag {
	/**
	 * Type of the tag
	 */
	type: string;
	/**
	 * Display name of the tag
	 */
	name: string;
	/**
	 * URL to the SVG icon for the tag
	 */
	svg: string;
	/**
	 * Value associated with the tag
	 */
	value?: (string | null) | undefined;
}

/**
 * Type literal for SKU stock availability type
 */
export type SkuStockAvailabilityType = "stock";

/**
 * Schema for stock availability information.
 */
export interface SkuApiStockAvailability {
	/**
	 * Type of stock status (known value: "stock")
	 */
	type: SkuStockAvailabilityType;
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
 * Response schema for getting a specific SKU by ID.
 */
export interface SkuApiGetResponse {
	/**
	 * Unique product identifier
	 */
	productId: number;
	/**
	 * Unique stock keeping unit identifier
	 */
	skuId: number;
	/**
	 * Detailed product description in HTML format
	 */
	description: string;
	/**
	 * Full display name of the product
	 */
	name: string;
	/**
	 * List of URLs for product photos
	 */
	photos: string[];
	/**
	 * Brief summary of the product
	 */
	shortDescription: string;
	/**
	 * Discount amount
	 */
	discount: number;
	/**
	 * Original price before discounts
	 */
	originalPrice: number;
	/**
	 * Discount percentage
	 */
	percentDiscount: number;
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
	stockAvailability?: (SkuApiStockAvailability | null) | undefined;
	/**
	 * Installment payment options
	 */
	installment?: (SkuApiInstallment | null) | undefined;
	/**
	 * Indicates if the product is on promotion
	 */
	isPromo: boolean;
	/**
	 * Name of the promotion
	 */
	promoName: string;
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
	 * Total number of text reviews
	 */
	textReviewQuantity?: (number | null) | undefined;
	/**
	 * Brand information
	 */
	brand?: (SkuApiBrand | null) | undefined;
	/**
	 * List of categories the product belongs to
	 */
	categories: SkuApiCategory[];
	/**
	 * Details of the shop selling the product
	 */
	shop: SkuApiShop;
	/**
	 * Dictionary of additional product information
	 */
	additionalInfo: Record<string, string>;
	/**
	 * List of available attribute variants
	 */
	attributes: SkuApiAttribute[];
	/**
	 * List of tags associated with the product
	 */
	tags: SkuApiTag[];
}

/**
 * Schema for a similar product item.
 */
export interface SkuApiSimilarItem {
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
	 * Display name of the similar product
	 */
	name: string;
	/**
	 * Brief description of the similar product
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
 * Response schema for similar SKUs.
 */
export interface SkuApiGetSimilarResponse {
	/**
	 * List of similar product items
	 */
	items: SkuApiSimilarItem[];
	/**
	 * Current page number
	 */
	pageNumber: number;
	/**
	 * Total number of pages available
	 */
	totalPages: number;
	/**
	 * Total number of similar items found
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
 * Schema for a collection item.
 */
export interface SkuApiCollectionItem {
	/**
	 * Unique identifier of the collection
	 */
	id: number;
	/**
	 * URL for the collection's cover image
	 */
	cover: string;
	/**
	 * URL to the collection's icon
	 */
	icon: string;
	/**
	 * Name of the collection
	 */
	name: string;
	/**
	 * Number of items in the collection
	 */
	quantity: number;
	/**
	 * Priority for sorting or display order
	 */
	priority: number;
}

/**
 * Response schema for SKU collections.
 */
export type SkuApiGetCollectionsResponse = SkuApiCollectionItem[];

/**
 * Response schema for review availability check.
 */
export interface SkuApiGetReviewAvailableResponse {
	/**
	 * Description of the review availability status
	 */
	description: string;
	/**
	 * Message regarding review availability
	 */
	message: string;
}
