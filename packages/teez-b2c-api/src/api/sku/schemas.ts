import * as z from "zod/mini";

/**
 * Schema for installment payment information.
 */
export const SkuApiInstallmentSchema = z.object({
	/**
	 * URL to the installment SVG icon
	 */
	installmentSvg: z.string(),

	/**
	 * Description of the installment term
	 */
	installmentTerm: z.string(),
});

/**
 * Schema for shop details associated with a SKU.
 */
export const SkuApiShopSchema = z.object({
	/**
	 * Unique identifier of the shop
	 */
	id: z.number(),

	/**
	 * URL to the shop's logo
	 */
	logo: z.nullish(z.string()),

	/**
	 * Name of the shop
	 */
	name: z.string(),

	/**
	 * URL to the shop's photo
	 */
	photo: z.string(),

	/**
	 * URL to the shop's page or resource
	 */
	url: z.string(),

	/**
	 * Indicates if installment payment is available
	 */
	isInstallment: z.boolean(),

	/**
	 * Popularity text for the shop (e.g., "Часто покупают", "11 заказов")
	 */
	qtyPurchasedInfo: z.nullish(z.string()),

	/**
	 * Average rating of the shop
	 */
	rating: z.nullish(z.number()),

	/**
	 * Number of days since the shop was registered
	 */
	daysSinceRegistration: z.number(),

	/**
	 * Indicates if the shop represents a single brand
	 */
	isMonobrand: z.boolean(),
});

/**
 * Schema for brand information.
 */
export const SkuApiBrandSchema = z.object({
	/**
	 * Unique identifier of the brand
	 */
	id: z.number(),

	/**
	 * Name of the brand
	 */
	name: z.string(),
});

/**
 * Schema for a category item.
 */
export const SkuApiCategorySchema = z.object({
	/**
	 * Unique identifier of the category
	 */
	id: z.number(),

	/**
	 * Name of the category
	 */
	name: z.string(),

	/**
	 * Indicates if this is the primary category for the product
	 */
	isPrimary: z.boolean(),
});

/**
 * Schema for an attribute property value.
 */
export const SkuApiAttributePropertyValueSchema = z.object({
	/**
	 * Name of the property value (e.g., "Red", "XL")
	 */
	name: z.string(),

	/**
	 * URL to a photo representing this property value
	 */
	photo: z.string(),
});

/**
 * Schema for a product attribute.
 */
export const SkuApiAttributePropertySchema = z.object({
	/**
	 * Name of the attribute (e.g., "Color", "Size")
	 */
	name: z.string(),

	/**
	 * Value details for the attribute
	 */
	value: SkuApiAttributePropertyValueSchema,
});

/**
 * Schema for SKU attributes configuration.
 */
export const SkuApiAttributeSchema = z.object({
	/**
	 * SKU ID associated with this specific attribute combination
	 */
	skuId: z.number(),

	/**
	 * Quantity available for this specific variant
	 */
	quantity: z.number(),

	/**
	 * List of properties defining this variant
	 */
	attributeProperties: z.array(SkuApiAttributePropertySchema),
});

/**
 * Schema for a product tag.
 */
export const SkuApiTagSchema = z.object({
	/**
	 * Type of the tag
	 */
	type: z.string(),

	/**
	 * Display name of the tag
	 */
	name: z.string(),

	/**
	 * URL to the SVG icon for the tag
	 */
	svg: z.string(),

	/**
	 * Value associated with the tag
	 */
	value: z.nullish(z.string()),
});

/**
 * Type literal for SKU stock availability type
 */
export const SkuStockAvailabilityTypeSchema = z.literal("stock");

/**
 * Schema for stock availability information.
 */
export const SkuApiStockAvailabilitySchema = z.object({
	/**
	 * Type of stock status (known value: "stock")
	 */
	type: SkuStockAvailabilityTypeSchema,

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
 * Response schema for getting a specific SKU by ID.
 */
export const SkuApiGetResponseSchema = z.object({
	/**
	 * Unique product identifier
	 */
	productId: z.number(),

	/**
	 * Unique stock keeping unit identifier
	 */
	skuId: z.number(),

	/**
	 * Detailed product description in HTML format
	 */
	description: z.string(),

	/**
	 * Full display name of the product
	 */
	name: z.string(),

	/**
	 * List of URLs for product photos
	 */
	photos: z.array(z.string()),

	/**
	 * Brief summary of the product
	 */
	shortDescription: z.string(),

	/**
	 * Discount amount
	 */
	discount: z.number(),

	/**
	 * Original price before discounts
	 */
	originalPrice: z.number(),

	/**
	 * Discount percentage
	 */
	percentDiscount: z.number(),

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
	stockAvailability: z.nullish(SkuApiStockAvailabilitySchema),

	/**
	 * Installment payment options
	 */
	installment: z.nullish(SkuApiInstallmentSchema),

	/**
	 * Indicates if the product is on promotion
	 */
	isPromo: z.boolean(),

	/**
	 * Name of the promotion
	 */
	promoName: z.string(),

	/**
	 * List of applicable promocodes
	 */
	promocodes: z.array(z.string()),

	/**
	 * Popularity text indicating purchase frequency (e.g., "Часто покупают", "11 заказов", "930 заказов")
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
	 * Total number of text reviews
	 */
	textReviewQuantity: z.nullish(z.number()),

	/**
	 * Brand information
	 */
	brand: z.nullish(SkuApiBrandSchema),

	/**
	 * List of categories the product belongs to
	 */
	categories: z.array(SkuApiCategorySchema),

	/**
	 * Details of the shop selling the product
	 */
	shop: SkuApiShopSchema,

	/**
	 * Dictionary of additional product information
	 */
	additionalInfo: z.record(z.string(), z.string()),

	/**
	 * List of available attribute variants
	 */
	attributes: z.array(SkuApiAttributeSchema),

	/**
	 * List of tags associated with the product
	 */
	tags: z.array(SkuApiTagSchema),
});

/**
 * Schema for a similar product item.
 */
export const SkuApiSimilarItemSchema = z.object({
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
	 * Display name of the similar product
	 */
	name: z.string(),

	/**
	 * Brief description of the similar product
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
 * Response schema for similar SKUs.
 */
export const SkuApiGetSimilarResponseSchema = z.object({
	/**
	 * List of similar product items
	 */
	items: z.array(SkuApiSimilarItemSchema),

	/**
	 * Current page number
	 */
	pageNumber: z.number(),

	/**
	 * Total number of pages available
	 */
	totalPages: z.number(),

	/**
	 * Total number of similar items found
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
 * Schema for a collection item.
 */
export const SkuApiCollectionItemSchema = z.object({
	/**
	 * Unique identifier of the collection
	 */
	id: z.number(),

	/**
	 * URL for the collection's cover image
	 */
	cover: z.string(),

	/**
	 * URL to the collection's icon
	 */
	icon: z.string(),

	/**
	 * Name of the collection
	 */
	name: z.string(),

	/**
	 * Number of items in the collection
	 */
	quantity: z.number(),

	/**
	 * Priority for sorting or display order
	 */
	priority: z.number(),
});

/**
 * Response schema for SKU collections.
 */
export const SkuApiGetCollectionsResponseSchema = z.array(
	SkuApiCollectionItemSchema,
);

/**
 * Response schema for review availability check.
 */
export const SkuApiGetReviewAvailableResponseSchema = z.object({
	/**
	 * Description of the review availability status
	 */
	description: z.string(),

	/**
	 * Message regarding review availability
	 */
	message: z.string(),
});
