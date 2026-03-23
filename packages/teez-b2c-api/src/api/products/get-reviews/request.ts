import * as v from "valibot";

export const productsGetReviewsRequestPathSchema = v.pipe(
	v.object({
		productId: v.pipe(
			v.number(),
			v.description("Unique identifier of the product"),
		),
	}),
	v.description("Path parameters for fetching product reviews."),
);
export const productsGetReviewsRequestQuerySchema = v.pipe(
	v.object({
		pageNumber: v.pipe(
			v.nullish(v.number()),
			v.description("Number of the page to retrieve"),
		),
		pageSize: v.pipe(
			v.nullish(v.number()),
			v.description("Number of reviews per page"),
		),
	}),
	v.description("Query parameters for fetching product reviews."),
);
