import * as z from "zod/mini";

/**
 * Schema for a feature flag item.
 */
export const FeatureFlagsApiItemSchema = z.object({
	/**
	 * Name of the feature flag
	 */
	name: z.string(),

	/**
	 * Indicates if the feature flag is currently active
	 */
	isActive: z.boolean(),
});

/**
 * Response schema for the list of feature flags.
 */
export const FeatureFlagsApiListResponseSchema = z.array(
	FeatureFlagsApiItemSchema,
);
