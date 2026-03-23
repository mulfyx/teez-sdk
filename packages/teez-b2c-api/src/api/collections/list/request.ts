import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const collectionsListRequestQuerySchema = doc({
	schema: z.object({
		type: doc({
			schema: z.nullish(z.string()),
			description: "Type of collections to filter by",
		}),
		shopId: doc({
			schema: z.nullish(z.number()),
			description: "Filter collections by shop ID",
		}),
	}),
	description: "Parameters for fetching the list of collections.",
});
