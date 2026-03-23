import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import {
	shopsGetProductsRequestPathSchema,
	shopsGetProductsRequestQuerySchema,
} from "./request";
import { shopsGetProductsResponse200Schema } from "./responses";

export const shopsGetProductsOperation = defineHttpOperation({
	domain: "shops",
	action: "getProducts",
	auth: "none",
	safety: "read",
	summary: "Retrieve products for a shop.",
	description:
		"Returns a paginated product listing for a specific shop, including filters and product card metadata.",
	request: {
		method: "GET",
		path: {
			template: "/api/v2/shops/{shopId}/products",
			schema: shopsGetProductsRequestPathSchema,
		},
		query: {
			schema: shopsGetProductsRequestQuerySchema,
		},
	},
	responses: {
		200: response({
			schema: shopsGetProductsResponse200Schema,
		}),
	},
});
