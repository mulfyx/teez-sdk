import * as v from "valibot";

export const skuGetRequestPathSchema = v.pipe(
	v.object({
		skuId: v.pipe(v.number(), v.description("Unique identifier of the SKU")),
	}),
	v.description("Parameters for fetching a specific SKU by ID."),
);
