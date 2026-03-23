import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { collectionsGetSkusRequestQuerySchema } from "./request";
import { collectionsGetSkusResponse200Schema } from "./responses";

export const collectionsGetSkusOperation = defineHttpOperation({
	domain: "collections",
	action: "getSkus",
	auth: "none",
	safety: "read",
	summary: "Retrieve SKUs that belong to a collection.",
	description:
		"Returns a paginated SKU feed for a collection, including filters, product cards, and pagination metadata.",
	request: {
		method: "GET",
		path: "/api/v2/collections/skus",
		query: {
			schema: collectionsGetSkusRequestQuerySchema,
		},
	},
	responses: {
		200: response({
			schema: collectionsGetSkusResponse200Schema,
		}),
	},
});
