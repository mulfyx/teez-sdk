import { type BaseParams } from "../../common/types";
import type {
	BannersApiActionSchema,
	BannersApiBannerItemSchema,
	BannersApiImageSchema,
	BannersApiListResponseSchema,
} from "./schemas";
import type * as v from "valibot";

/**
 * Parameters for fetching banners.
 */
export interface BannersApiListParams extends BaseParams {
	/**
	 * Type of banners to filter by
	 */
	type?: string;
}

/**
 * Banner image.
 */
export type BannersApiImage = v.InferOutput<typeof BannersApiImageSchema>;

/**
 * Banner action.
 */
export type BannersApiAction = v.InferOutput<typeof BannersApiActionSchema>;

/**
 * Banner item containing an image and an action.
 */
export type BannersApiBannerItem = v.InferOutput<
	typeof BannersApiBannerItemSchema
>;

/**
 * Response for the list of banners.
 */
export type BannersApiListResponse = v.InferOutput<
	typeof BannersApiListResponseSchema
>;
