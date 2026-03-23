import { apiErrorResponseSchema } from "../../../contracts/api-error-response";
import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { skuGetReviewAvailableRequestPathSchema } from "./request";
import { skuGetReviewAvailableResponse200Schema } from "./responses";

export const skuGetReviewAvailableOperation = defineHttpOperation({
	domain: "sku",
	action: "getReviewAvailable",
	auth: "required",
	safety: "read",
	summary: "Check whether the current user can review a SKU.",
	description:
		"Checks whether the authenticated user can leave a review for the specified SKU and returns a short message payload.",
	request: {
		method: "GET",
		path: {
			template: "/sku/{skuId}/review-available",
			schema: skuGetReviewAvailableRequestPathSchema,
		},
	},
	responses: {
		200: response({
			schema: skuGetReviewAvailableResponse200Schema,
		}),
		401: response({
			schema: apiErrorResponseSchema,
		}),
	},
});
