import { type BaseParams } from "../../common/types";

/**
 * Parameters for fetching banners.
 */
export interface BannersApiListParams extends BaseParams {
	/**
	 * Type of banners to filter by
	 */
	type?: string;
}
