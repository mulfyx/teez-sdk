import * as v from "valibot";

import { createPaginationFields } from "../../../contracts/pagination";

export const shopsGetMonobrandItemSchema = v.pipe(
	v.object({
		id: v.pipe(v.number(), v.description("Unique identifier of the shop")),
		icon: v.pipe(v.string(), v.description("URL to the shop's icon")),
	}),
	v.description("Monobrand shop card returned by the listing endpoint."),
);
export const shopsGetMonobrandResponse200Schema = v.pipe(
	v.object({
		items: v.pipe(
			v.array(shopsGetMonobrandItemSchema),
			v.description("List of monobrand shops"),
		),
		...createPaginationFields({
			totalCountDescription: "Total number of shops found",
		}),
	}),
	v.description(
		"Paginated monobrand shop response with shop cards and pagination metadata.",
	),
);
