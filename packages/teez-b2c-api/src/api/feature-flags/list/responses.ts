import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const featureFlagsListItemSchema = doc({
	schema: z.object({
		name: doc({
			schema: z.string(),
			description: "Name of the feature flag",
		}),
		isActive: doc({
			schema: z.boolean(),
			description: "Indicates if the feature flag is currently active",
		}),
	}),
	description: "Feature flag record returned by the backend.",
});

export const featureFlagsListResponse200Schema = doc({
	schema: z.array(featureFlagsListItemSchema),
	description:
		"List of backend feature flags exposed to the client application.",
});
