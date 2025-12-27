/**
 * ⚠️ This file is auto-generated. Do not edit manually.
 * Run `npm run generate:schema-types` to regenerate.
 * Generated from: schemas.ts
 */

/**
 * Schema for a feature flag item.
 */
export interface FeatureFlagsApiItem {
	/**
	 * Name of the feature flag
	 */
	name: string;
	/**
	 * Indicates if the feature flag is currently active
	 */
	isActive: boolean;
}

/**
 * Response schema for the list of feature flags.
 */
export type FeatureFlagsApiListResponse = FeatureFlagsApiItem[];
