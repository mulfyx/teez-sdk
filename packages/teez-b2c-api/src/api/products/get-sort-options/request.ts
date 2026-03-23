import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const productsGetSortOptionsRequestQuerySchema = doc({
	schema: z.object({
		IsSearch: doc({
			schema: z.nullish(z.boolean()),
			description: "Indicates if the context is a search result",
		}),
		IsPromo: doc({
			schema: z.nullish(z.boolean()),
			description: "Indicates if the context is a promotional listing",
		}),
	}),
	description: "Parameters for fetching product sort options.",
});
