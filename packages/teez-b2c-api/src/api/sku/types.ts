import { type BaseParams } from "../../common/types";
import type {
	SkuApiAttributePropertySchema,
	SkuApiAttributePropertyValueSchema,
	SkuApiAttributeSchema,
	SkuApiBrandSchema,
	SkuApiCategorySchema,
	SkuApiCollectionItemSchema,
	SkuApiGetResponseSchema,
	SkuApiGetCollectionsResponseSchema,
	SkuApiGetReviewAvailableResponseSchema,
	SkuApiGetSimilarResponseSchema,
	SkuApiInstallmentSchema,
	SkuApiShopSchema,
	SkuApiSimilarItemSchema,
	SkuApiStockAvailabilitySchema,
	SkuApiTagSchema,
} from "./schemas";
import type * as v from "valibot";

/**
 * Parameters for fetching a specific SKU by ID.
 */
export interface SkuApiGetParams extends BaseParams {
	/** Unique identifier of the SKU */
	skuId: number;
}

/**
 * Installment payment information.
 */
export type SkuApiInstallment = v.InferOutput<typeof SkuApiInstallmentSchema>;

/**
 * Shop details associated with a SKU.
 */
export type SkuApiShop = v.InferOutput<typeof SkuApiShopSchema>;

/**
 * Category item.
 */
export type SkuApiCategory = v.InferOutput<typeof SkuApiCategorySchema>;

/**
 * Attribute property value.
 */
export type SkuApiAttributePropertyValue = v.InferOutput<
	typeof SkuApiAttributePropertyValueSchema
>;

/**
 * Product attribute property.
 */
export type SkuApiAttributeProperty = v.InferOutput<
	typeof SkuApiAttributePropertySchema
>;

/**
 * SKU attributes configuration.
 */
export type SkuApiAttribute = v.InferOutput<typeof SkuApiAttributeSchema>;

/**
 * Brand information.
 */
export type SkuApiBrand = v.InferOutput<typeof SkuApiBrandSchema>;

/**
 * Product tag.
 */
export type SkuApiTag = v.InferOutput<typeof SkuApiTagSchema>;

/**
 * Stock availability information.
 */
export type SkuApiStockAvailability = v.InferOutput<
	typeof SkuApiStockAvailabilitySchema
>;

/**
 * Response for getting a specific SKU by ID.
 */
export type SkuApiGetResponse = v.InferOutput<
	typeof SkuApiGetResponseSchema
>;

/**
 * Parameters for fetching similar SKUs.
 */
export interface SkuApiGetSimilarParams extends BaseParams {
	/** Unique identifier of the SKU to find similarities for */
	skuId: number;

	/** Number of the page to retrieve */
	pageNumber?: number;

	/** Number of items per page */
	pageSize?: number;
}

/**
 * Similar product item.
 */
export type SkuApiSimilarItem = v.InferOutput<typeof SkuApiSimilarItemSchema>;

/**
 * Response for similar SKUs.
 */
export type SkuApiGetSimilarResponse = v.InferOutput<
	typeof SkuApiGetSimilarResponseSchema
>;

/**
 * Parameters for fetching collections for a SKU.
 */
export interface SkuApiGetCollectionsParams extends BaseParams {
	/** Unique identifier of the SKU */
	skuId: number;
}

/**
 * Collection item.
 */
export type SkuApiCollectionItem = v.InferOutput<
	typeof SkuApiCollectionItemSchema
>;

/**
 * Response for SKU collections.
 */
export type SkuApiGetCollectionsResponse = v.InferOutput<
	typeof SkuApiGetCollectionsResponseSchema
>;

/**
 * Parameters for checking review availability.
 */
export interface SkuApiGetReviewAvailableParams extends BaseParams {
	/** Unique identifier of the SKU */
	skuId: number;
}

/**
 * Response for review availability check.
 */
export type SkuApiGetReviewAvailableResponse = v.InferOutput<
	typeof SkuApiGetReviewAvailableResponseSchema
>;
