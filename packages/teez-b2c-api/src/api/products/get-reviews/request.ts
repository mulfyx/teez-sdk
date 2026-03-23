import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const productsGetReviewsRequestPathSchema = doc({
	schema: z.object({
		productId: doc({
			schema: z.number(),
			description: "Unique identifier of the product",
		}),
	}),
	description: "Path parameters for fetching product reviews.",
});

export const productsGetReviewsRequestQuerySchema = doc({
	schema: z.object({
		pageNumber: doc({
			schema: z.nullish(z.number()),
			description: "Number of the page to retrieve",
		}),
		pageSize: doc({
			schema: z.nullish(z.number()),
			description: "Number of reviews per page",
		}),
	}),
	description: "Query parameters for fetching product reviews.",
});
