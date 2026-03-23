import * as z from "zod/mini";

import { createPaginationFields } from "../../../contracts/pagination";
import { doc } from "../../../schema/metadata";

export const shopsGetMonobrandItemSchema = doc({
	schema: z.object({
		id: doc({
			schema: z.number(),
			description: "Unique identifier of the shop",
		}),
		icon: doc({
			schema: z.string(),
			description: "URL to the shop's icon",
		}),
	}),
	description: "Monobrand shop card returned by the listing endpoint.",
});

export const shopsGetMonobrandResponse200Schema = doc({
	schema: z.object({
		items: doc({
			schema: z.array(shopsGetMonobrandItemSchema),
			description: "List of monobrand shops",
		}),
		...createPaginationFields({
			totalCountDescription: "Total number of shops found",
		}),
	}),
	description:
		"Paginated monobrand shop response with shop cards and pagination metadata.",
});
