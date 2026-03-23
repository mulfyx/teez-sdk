import * as v from "valibot";

export const featureFlagsListItemSchema = v.pipe(
	v.object({
		name: v.pipe(v.string(), v.description("Name of the feature flag")),
		isActive: v.pipe(
			v.boolean(),
			v.description("Indicates if the feature flag is currently active"),
		),
	}),
	v.description("Feature flag record returned by the backend."),
);
export const featureFlagsListResponse200Schema = v.pipe(
	v.array(featureFlagsListItemSchema),
	v.description(
		"List of backend feature flags exposed to the client application.",
	),
);
