import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const skuGetReviewAvailableResponse200Schema = doc({
	schema: z.object({
		description: doc({
			schema: z.string(),
			description: "Description of the review availability status",
		}),
		message: doc({
			schema: z.string(),
			description: "Message regarding review availability",
		}),
	}),
	description:
		"Short message payload returned by the review availability endpoint and its unauthorized error body.",
});
