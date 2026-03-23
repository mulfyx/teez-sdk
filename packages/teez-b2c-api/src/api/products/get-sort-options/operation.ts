import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { productsGetSortOptionsRequestQuerySchema } from "./request";
import { productsGetSortOptionsResponse200Schema } from "./responses";

export const productsGetSortOptionsOperation = defineHttpOperation({
	domain: "products",
	action: "getSortOptions",
	auth: "none",
	safety: "read",
	summary: "Retrieve available product sort options.",
	description:
		"Returns sort keys and localized labels supported by product listing endpoints.",
	request: {
		method: "GET",
		path: "/api/product/sort-options",
		query: {
			schema: productsGetSortOptionsRequestQuerySchema,
		},
	},
	responses: {
		200: response({
			schema: productsGetSortOptionsResponse200Schema,
		}),
	},
});
