import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { skuGetRequestPathSchema } from "./request";
import { skuGetResponse200Schema } from "./responses";

export const skuGetOperation = defineHttpOperation({
	domain: "sku",
	action: "get",
	auth: "none",
	safety: "read",
	summary: "Retrieve SKU details.",
	description:
		"Returns the full product detail payload for a SKU, including media, pricing, attributes, shop info, categories, and tags.",
	request: {
		method: "GET",
		path: {
			template: "/api/v2/sku/{skuId}",
			schema: skuGetRequestPathSchema,
		},
	},
	responses: {
		200: response({
			schema: skuGetResponse200Schema,
		}),
	},
});
