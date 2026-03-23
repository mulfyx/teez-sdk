import * as v from "valibot";

import { createPaginationFields } from "../../../contracts/pagination";

export const productsGetReviewsItemSchema = v.pipe(
	v.object({
		author: v.pipe(v.string(), v.description("Name of the review author")),
		reviewText: v.pipe(v.string(), v.description("Text content of the review")),
		scoreValue: v.pipe(
			v.number(),
			v.description("Rating score given in the review"),
		),
		attributes: v.pipe(
			v.record(v.string(), v.string()),
			v.description("Additional attributes associated with the review"),
		),
		createdAt: v.pipe(
			v.string(),
			v.description("Date and time when the review was created"),
		),
	}),
	v.description("Public product review returned by the reviews endpoint."),
);
export const productsGetReviewsResponse200Schema = v.pipe(
	v.object({
		items: v.pipe(
			v.array(productsGetReviewsItemSchema),
			v.description("List of review items"),
		),
		...createPaginationFields({
			totalCountDescription: "Total number of reviews",
		}),
	}),
	v.description(
		"Paginated product review response with review items and pagination metadata.",
	),
);
