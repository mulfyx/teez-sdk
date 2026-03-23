import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import {
	productsGetReviewsRequestPathSchema,
	productsGetReviewsRequestQuerySchema,
} from "./request";
import { productsGetReviewsResponse200Schema } from "./responses";

export const productsGetReviewsOperation = defineHttpOperation({
	domain: "products",
	action: "getReviews",
	auth: "none",
	safety: "read",
	summary: "Retrieve reviews for a product.",
	description:
		"Returns paginated public reviews and rating attributes for a product.",
	request: {
		method: "GET",
		path: {
			template: "/api/v1/product/{productId}/review",
			schema: productsGetReviewsRequestPathSchema,
		},
		query: {
			schema: productsGetReviewsRequestQuerySchema,
		},
	},
	responses: {
		200: response({
			schema: productsGetReviewsResponse200Schema,
		}),
	},
});
