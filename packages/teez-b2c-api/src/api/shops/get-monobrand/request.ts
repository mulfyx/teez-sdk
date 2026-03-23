import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const shopsGetMonobrandRequestQuerySchema = doc({
	schema: z.object({
		seed: doc({
			schema: z.nullish(z.number()),
			description: "Random seed for consistent pagination",
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
	description: "Parameters for fetching monobrand shops.",
});
