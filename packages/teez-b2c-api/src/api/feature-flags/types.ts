import { type BaseParams } from "../../common/types";
import type {
	FeatureFlagsApiItemSchema,
	FeatureFlagsApiListResponseSchema,
} from "./schemas";
import type * as v from "valibot";

/**
 * Parameters for fetching feature flags.
 */
export type FeatureFlagsApiListParams = BaseParams;

/**
 * Feature flag item.
 */
export type FeatureFlagsApiItem = v.InferOutput<
	typeof FeatureFlagsApiItemSchema
>;

/**
 * Response for the list of feature flags.
 */
export type FeatureFlagsApiListResponse = v.InferOutput<
	typeof FeatureFlagsApiListResponseSchema
>;
