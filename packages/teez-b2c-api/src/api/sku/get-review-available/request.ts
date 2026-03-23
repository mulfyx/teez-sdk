import * as v from "valibot";

export const skuGetReviewAvailableRequestPathSchema = v.pipe(
	v.object({
		skuId: v.pipe(v.number(), v.description("Unique identifier of the SKU")),
	}),
	v.description("Parameters for checking review availability."),
);
