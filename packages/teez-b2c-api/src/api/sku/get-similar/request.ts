import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const skuGetSimilarRequestQuerySchema = doc({
	schema: z.object({
		skuId: doc({
			schema: z.number(),
			description: "Unique identifier of the SKU to find similarities for",
		}),
		pageNumber: doc({
			schema: z.nullish(z.number()),
			description: "Number of the page to retrieve",
		}),
		pageSize: doc({
			schema: z.nullish(z.number()),
			description: "Number of items per page",
		}),
	}),
	description: "Parameters for fetching similar SKUs.",
});
