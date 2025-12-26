// -----------------------------------------------------------------------------
// 🚫 THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY IT MANUALLY.
//    Run `npm run generate:schema-types` to update this file.
// -----------------------------------------------------------------------------

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
