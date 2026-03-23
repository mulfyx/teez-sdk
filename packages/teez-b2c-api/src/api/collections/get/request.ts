import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const collectionsGetRequestPathSchema = doc({
	schema: z.object({
		collectionId: doc({
			schema: z.number(),
			description: "Unique identifier of the collection",
		}),
	}),
	description: "Parameters for fetching a specific collection.",
});
