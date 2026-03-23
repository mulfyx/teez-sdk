import * as z from "zod/mini";

import { createPaginationFields } from "../../../contracts/pagination";
import { doc } from "../../../schema/metadata";

export const productsGetReviewsItemSchema = doc({
	schema: z.object({
		author: doc({
			schema: z.string(),
			description: "Name of the review author",
		}),
		reviewText: doc({
			schema: z.string(),
			description: "Text content of the review",
		}),
		scoreValue: doc({
			schema: z.number(),
			description: "Rating score given in the review",
		}),
		attributes: doc({
			schema: z.record(z.string(), z.string()),
			description: "Additional attributes associated with the review",
		}),
		createdAt: doc({
			schema: z.string(),
			description: "Date and time when the review was created",
		}),
	}),
	description: "Public product review returned by the reviews endpoint.",
});

export const productsGetReviewsResponse200Schema = doc({
	schema: z.object({
		items: doc({
			schema: z.array(productsGetReviewsItemSchema),
			description: "List of review items",
		}),
		...createPaginationFields({
			totalCountDescription: "Total number of reviews",
		}),
	}),
	description:
		"Paginated product review response with review items and pagination metadata.",
});
