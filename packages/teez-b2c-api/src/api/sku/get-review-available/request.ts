import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const skuGetReviewAvailableRequestPathSchema = doc({
	schema: z.object({
		skuId: doc({
			schema: z.number(),
			description: "Unique identifier of the SKU",
		}),
	}),
	description: "Parameters for checking review availability.",
});
