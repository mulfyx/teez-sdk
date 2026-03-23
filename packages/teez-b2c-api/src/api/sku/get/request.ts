import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const skuGetRequestPathSchema = doc({
	schema: z.object({
		skuId: doc({
			schema: z.number(),
			description: "Unique identifier of the SKU",
		}),
	}),
	description: "Parameters for fetching a specific SKU by ID.",
});
