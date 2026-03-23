import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const categoriesGetRequestPathSchema = doc({
	schema: z.object({
		categoryId: doc({
			schema: z.number(),
			description: "Unique identifier of the category",
		}),
	}),
	description: "Parameters for fetching a specific category.",
});
