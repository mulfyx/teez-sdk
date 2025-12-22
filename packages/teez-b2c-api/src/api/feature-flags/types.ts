import { type BaseParams } from "../../common/types";
import type {
	FeatureFlagsApiItemSchema,
	FeatureFlagsApiGetAllResponseSchema,
} from "./schemas";
import type * as v from "valibot";

/**
 * Parameters for fetching feature flags.
 */
export type FeatureFlagsApiGetAllParams = BaseParams;

/**
 * Feature flag item.
 */
export type FeatureFlagsApiItem = v.InferOutput<
	typeof FeatureFlagsApiItemSchema
>;

/**
 * Response for the list of feature flags.
 */
export type FeatureFlagsApiGetAllResponse = v.InferOutput<
	typeof FeatureFlagsApiGetAllResponseSchema
>;
