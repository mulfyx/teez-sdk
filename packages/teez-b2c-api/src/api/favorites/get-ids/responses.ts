import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const favoritesGetIdsResponse200Schema = doc({
	schema: z.object({
		skuIds: doc({
			schema: z.array(z.number()),
			description: "List of favorited SKU IDs",
		}),
	}),
	description:
		"Authenticated favorites response containing the user's favorite SKU identifiers.",
});
