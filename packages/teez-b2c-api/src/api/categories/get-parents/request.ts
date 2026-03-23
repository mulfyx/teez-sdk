import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const categoriesGetParentsRequestQuerySchema = doc({
	schema: z.object({
		categoryId: doc({
			schema: z.array(z.number()),
			description: "List of category IDs to find parents for",
		}),
		level: doc({
			schema: z.nullish(z.number()),
			description: "Hierarchy level to filter by",
		}),
	}),
	description: "Parameters for fetching parent categories.",
});
