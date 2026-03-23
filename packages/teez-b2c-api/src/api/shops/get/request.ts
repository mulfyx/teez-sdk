import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const shopsGetRequestPathSchema = doc({
	schema: z.object({
		shopId: doc({
			schema: z.number(),
			description: "Unique identifier of the shop",
		}),
	}),
	description: "Parameters for fetching a specific shop.",
});
