import { type BaseParams } from "../../common/types";
import type {
	BannersApiActionSchema,
	BannersApiBannerItemSchema,
	BannersApiImageSchema,
	BannersApiGetAllResponseSchema,
} from "./schemas";
import type * as v from "valibot";

/**
 * Parameters for fetching banners.
 */
export interface BannersApiGetAllParams extends BaseParams {
	/** Type of banners to filter by */
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
export type BannersApiGetAllResponse = v.InferOutput<
	typeof BannersApiGetAllResponseSchema
>;
