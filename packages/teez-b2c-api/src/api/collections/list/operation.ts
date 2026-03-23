import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { collectionsListRequestQuerySchema } from "./request";
import { collectionsListResponse200Schema } from "./responses";

export const collectionsListOperation = defineHttpOperation({
	domain: "collections",
	action: "list",
	auth: "none",
	safety: "read",
	summary: "Retrieve available collections.",
	description:
		"Returns collection cards available in the storefront, optionally filtered by type or shop.",
	request: {
		method: "GET",
		path: "/collections",
		query: {
			schema: collectionsListRequestQuerySchema,
		},
	},
	responses: {
		200: response({
			schema: collectionsListResponse200Schema,
		}),
	},
});
