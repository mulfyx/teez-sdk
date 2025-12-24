import * as v from "valibot";

/**
 * Schema for a feature flag item.
 */
export const FeatureFlagsApiItemSchema = v.object({
	/** Name of the feature flag */
	name: v.string(),

	/** Indicates if the feature flag is currently active */
	isActive: v.boolean(),
});

/**
 * Response schema for the list of feature flags.
 */
export const FeatureFlagsApiListResponseSchema = v.array(
	FeatureFlagsApiItemSchema,
);
