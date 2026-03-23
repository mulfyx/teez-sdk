import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { skuGetSimilarRequestQuerySchema } from "./request";
import { skuGetSimilarResponse200Schema } from "./responses";

export const skuGetSimilarOperation = defineHttpOperation({
	domain: "sku",
	action: "getSimilar",
	auth: "none",
	safety: "read",
	summary: "Retrieve similar SKUs.",
	description:
		"Returns paginated product cards for SKUs considered similar to the specified SKU.",
	request: {
		method: "GET",
		path: "/api/v2/sku/similar-skus",
		query: {
			schema: skuGetSimilarRequestQuerySchema,
		},
	},
	responses: {
		200: response({
			schema: skuGetSimilarResponse200Schema,
		}),
	},
});
