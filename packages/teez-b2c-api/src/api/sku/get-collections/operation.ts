import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { skuGetCollectionsRequestPathSchema } from "./request";
import { skuGetCollectionsResponse200Schema } from "./responses";

export const skuGetCollectionsOperation = defineHttpOperation({
	domain: "sku",
	action: "getCollections",
	auth: "none",
	safety: "read",
	summary: "Retrieve collections for a SKU.",
	description: "Returns collection cards associated with a specific SKU.",
	request: {
		method: "GET",
		path: {
			template: "/sku/{skuId}/collections",
			schema: skuGetCollectionsRequestPathSchema,
		},
	},
	responses: {
		200: response({
			schema: skuGetCollectionsResponse200Schema,
		}),
	},
});
