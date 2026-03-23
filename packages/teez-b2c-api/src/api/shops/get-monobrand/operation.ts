import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { shopsGetMonobrandRequestQuerySchema } from "./request";
import { shopsGetMonobrandResponse200Schema } from "./responses";

export const shopsGetMonobrandOperation = defineHttpOperation({
	domain: "shops",
	action: "getMonobrand",
	auth: "none",
	safety: "read",
	summary: "Retrieve monobrand shops.",
	description:
		"Returns paginated monobrand shop cards with shop identifiers and icon URLs.",
	request: {
		method: "GET",
		path: "/api/v1/shops/monobrand",
		query: {
			schema: shopsGetMonobrandRequestQuerySchema,
		},
	},
	responses: {
		200: response({
			schema: shopsGetMonobrandResponse200Schema,
		}),
	},
});
