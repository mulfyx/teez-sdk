import type * as schemas from "./schemas";
import type * as v from "valibot";

/**
 * Schema for a feature flag item.
 */
export type FeatureFlagsApiItem = v.InferOutput<
	typeof schemas.FeatureFlagsApiItemSchema
>;

/**
 * Response schema for the list of feature flags.
 */
export type FeatureFlagsApiListResponse = v.InferOutput<
	typeof schemas.FeatureFlagsApiListResponseSchema
>;
