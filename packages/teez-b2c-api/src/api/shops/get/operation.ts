import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { shopsGetRequestPathSchema } from "./request";
import { shopsGetResponse200Schema } from "./responses";

export const shopsGetOperation = defineHttpOperation({
	domain: "shops",
	action: "get",
	auth: "none",
	safety: "read",
	summary: "Retrieve a shop by ID.",
	description:
		"Returns storefront information for a shop, including branding, ratings, contact info, and merchant tags.",
	request: {
		method: "GET",
		path: {
			template: "/api/v1/shops/{shopId}",
			schema: shopsGetRequestPathSchema,
		},
	},
	responses: {
		200: response({
			schema: shopsGetResponse200Schema,
		}),
	},
});
