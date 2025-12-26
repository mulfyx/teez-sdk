import { optionalNullish } from "../../common/helpers";
import * as v from "valibot";

/**
 * Schema for installment payment information.
 */
export const SkuApiInstallmentSchema = v.object({
	/**
	 * URL to the installment SVG icon
	 */
	installmentSvg: v.string(),

	/**
	 * Description of the installment term
	 */
	installmentTerm: v.string(),
});

/**
 * Schema for shop details associated with a SKU.
 */
export const SkuApiShopSchema = v.object({
	/**
	 * Unique identifier of the shop
	 */
	id: v.number(),

	/**
	 * URL to the shop's logo
	 */
	logo: optionalNullish(v.string()),

	/**
	 * Name of the shop
	 */
	name: v.string(),

	/**
	 * URL to the shop's photo
	 */
	photo: v.string(),

	/**
	 * URL to the shop's page or resource
	 */
	url: v.string(),

	/**
	 * Indicates if installment payment is available
	 */
	isInstallment: v.boolean(),

	/**
	 * Popularity text for the shop (e.g., "Часто покупают", "11 заказов")
	 */
	qtyPurchasedInfo: optionalNullish(v.string()),

	/**
	 * Average rating of the shop
	 */
	rating: optionalNullish(v.number()),

	/**
	 * Number of days since the shop was registered
	 */
	daysSinceRegistration: v.number(),

	/**
	 * Indicates if the shop represents a single brand
	 */
	isMonobrand: v.boolean(),
});

/**
 * Schema for brand information.
 */
export const SkuApiBrandSchema = v.object({
	/**
	 * Unique identifier of the brand
	 */
	id: v.number(),

	/**
	 * Name of the brand
	 */
	name: v.string(),
});

/**
 * Schema for a category item.
 */
export const SkuApiCategorySchema = v.object({
	/**
	 * Unique identifier of the category
	 */
	id: v.number(),

	/**
	 * Name of the category
	 */
	name: v.string(),

	/**
	 * Indicates if this is the primary category for the product
	 */
	isPrimary: v.boolean(),
});

/**
 * Schema for an attribute property value.
 */
export const SkuApiAttributePropertyValueSchema = v.object({
	/**
	 * Name of the property value (e.g., "Red", "XL")
	 */
	name: v.string(),

	/**
	 * URL to a photo representing this property value
	 */
	photo: v.string(),
});

/**
 * Schema for a product attribute.
 */
export const SkuApiAttributePropertySchema = v.object({
	/**
	 * Name of the attribute (e.g., "Color", "Size")
	 */
	name: v.string(),

	/**
	 * Value details for the attribute
	 */
	value: SkuApiAttributePropertyValueSchema,
});

/**
 * Schema for SKU attributes configuration.
 */
export const SkuApiAttributeSchema = v.object({
	/**
	 * SKU ID associated with this specific attribute combination
	 */
	skuId: v.number(),

	/**
	 * Quantity available for this specific variant
	 */
	quantity: v.number(),

	/**
	 * List of properties defining this variant
	 */
	attributeProperties: v.array(SkuApiAttributePropertySchema),
});

/**
 * Schema for a product tag.
 */
export const SkuApiTagSchema = v.object({
	/**
	 * Type of the tag
	 */
	type: v.string(),

	/**
	 * Display name of the tag
	 */
	name: v.string(),

	/**
	 * URL to the SVG icon for the tag
	 */
	svg: v.string(),

	/**
	 * Value associated with the tag
	 */
	value: optionalNullish(v.string()),
});

/**
 * Schema for stock availability information.
 */
export const SkuApiStockAvailabilitySchema = v.object({
	/**
	 * Type of stock status (known value: "stock")
	 */
	type: v.literal("stock"),

	/**
	 * SVG icon representing stock status
	 */
	svg: optionalNullish(v.string()),

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
 * Response schema for getting a specific SKU by ID.
 */
export const SkuApiGetResponseSchema = v.object({
	/**
	 * Unique product identifier
	 */
	productId: v.number(),

	/**
	 * Unique stock keeping unit identifier
	 */
	skuId: v.number(),

	/**
	 * Detailed product description in HTML format
	 */
	description: v.string(),

	/**
	 * Full display name of the product
	 */
	name: v.string(),

	/**
	 * List of URLs for product photos
	 */
	photos: v.array(v.string()),

	/**
	 * Brief summary of the product
	 */
	shortDescription: v.string(),

	/**
	 * Discount amount
	 */
	discount: v.number(),

	/**
	 * Original price before discounts
	 */
	originalPrice: v.number(),

	/**
	 * Discount percentage
	 */
	percentDiscount: v.number(),

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
	stockAvailability: optionalNullish(SkuApiStockAvailabilitySchema),

	/**
	 * Installment payment options
	 */
	installment: optionalNullish(SkuApiInstallmentSchema),

	/**
	 * Indicates if the product is on promotion
	 */
	isPromo: v.boolean(),

	/**
	 * Name of the promotion
	 */
	promoName: v.string(),

	/**
	 * List of applicable promocodes
	 */
	promocodes: v.array(v.string()),

	/**
	 * Popularity text indicating purchase frequency (e.g., "Часто покупают", "11 заказов", "930 заказов")
	 */
	qtyPurchasedInfo: optionalNullish(v.string()),

	/**
	 * Average rating score
	 */
	rating: optionalNullish(v.number()),

	/**
	 * Total number of ratings
	 */
	scoreQuantity: optionalNullish(v.number()),

	/**
	 * Total number of text reviews
	 */
	textReviewQuantity: optionalNullish(v.number()),

	/**
	 * Brand information
	 */
	brand: optionalNullish(SkuApiBrandSchema),

	/**
	 * List of categories the product belongs to
	 */
	categories: v.array(SkuApiCategorySchema),

	/**
	 * Details of the shop selling the product
	 */
	shop: SkuApiShopSchema,

	/**
	 * Dictionary of additional product information
	 */
	additionalInfo: v.record(v.string(), v.string()),

	/**
	 * List of available attribute variants
	 */
	attributes: v.array(SkuApiAttributeSchema),

	/**
	 * List of tags associated with the product
	 */
	tags: v.array(SkuApiTagSchema),
});

/**
 * Schema for a similar product item.
 */
export const SkuApiSimilarItemSchema = v.object({
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
	 * Display name of the similar product
	 */
	name: v.string(),

	/**
	 * Brief description of the similar product
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
	qtyPurchasedInfo: optionalNullish(v.string()),

	/**
	 * Average rating score
	 */
	rating: optionalNullish(v.number()),

	/**
	 * Total number of ratings
	 */
	scoreQuantity: optionalNullish(v.number()),

	/**
	 * Moderation status code
	 */
	moderationStatus: v.number(),
});

/**
 * Response schema for similar SKUs.
 */
export const SkuApiGetSimilarResponseSchema = v.object({
	/**
	 * List of similar product items
	 */
	items: v.array(SkuApiSimilarItemSchema),

	/**
	 * Current page number
	 */
	pageNumber: v.number(),

	/**
	 * Total number of pages available
	 */
	totalPages: v.number(),

	/**
	 * Total number of similar items found
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
 * Schema for a collection item.
 */
export const SkuApiCollectionItemSchema = v.object({
	/**
	 * Unique identifier of the collection
	 */
	id: v.number(),

	/**
	 * URL for the collection's cover image
	 */
	cover: v.string(),

	/**
	 * URL to the collection's icon
	 */
	icon: v.string(),

	/**
	 * Name of the collection
	 */
	name: v.string(),

	/**
	 * Number of items in the collection
	 */
	quantity: v.number(),

	/**
	 * Priority for sorting or display order
	 */
	priority: v.number(),
});

/**
 * Response schema for SKU collections.
 */
export const SkuApiGetCollectionsResponseSchema = v.array(
	SkuApiCollectionItemSchema,
);

/**
 * Response schema for review availability check.
 */
export const SkuApiGetReviewAvailableResponseSchema = v.object({
	/**
	 * Description of the review availability status
	 */
	description: v.string(),

	/**
	 * Message regarding review availability
	 */
	message: v.string(),
});
