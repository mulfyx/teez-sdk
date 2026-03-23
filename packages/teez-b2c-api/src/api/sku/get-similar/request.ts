import * as v from "valibot";

export const skuGetSimilarRequestQuerySchema = v.pipe(
	v.object({
		skuId: v.pipe(
			v.number(),
			v.description("Unique identifier of the SKU to find similarities for"),
		),
		pageNumber: v.pipe(
			v.nullish(v.number()),
			v.description("Number of the page to retrieve"),
		),
		pageSize: v.pipe(
			v.nullish(v.number()),
			v.description("Number of items per page"),
		),
	}),
	v.description("Parameters for fetching similar SKUs."),
);
