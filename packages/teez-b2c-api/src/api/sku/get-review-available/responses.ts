import * as v from "valibot";

export const skuGetReviewAvailableResponse200Schema = v.pipe(
	v.object({
		description: v.pipe(
			v.string(),
			v.description("Description of the review availability status"),
		),
		message: v.pipe(
			v.string(),
			v.description("Message regarding review availability"),
		),
	}),
	v.description(
		"Short message payload returned by the review availability endpoint and its unauthorized error body.",
	),
);
