import * as v from "valibot";

export const shopsGetRequestPathSchema = v.pipe(
	v.object({
		shopId: v.pipe(v.number(), v.description("Unique identifier of the shop")),
	}),
	v.description("Parameters for fetching a specific shop."),
);
