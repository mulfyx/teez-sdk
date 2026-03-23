import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { collectionsGetRequestPathSchema } from "./request";
import { collectionsGetResponse200Schema } from "./responses";

export const collectionsGetOperation = defineHttpOperation({
	domain: "collections",
	action: "get",
	auth: "none",
	safety: "read",
	summary: "Retrieve a collection by ID.",
	description:
		"Returns presentation metadata for a collection, including type, cover image, copy, and display priority.",
	request: {
		method: "GET",
		path: {
			template: "/collections/{collectionId}",
			schema: collectionsGetRequestPathSchema,
		},
	},
	responses: {
		200: response({
			schema: collectionsGetResponse200Schema,
		}),
	},
});
