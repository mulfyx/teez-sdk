import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { productsAutocompleteRequestQuerySchema } from "./request";
import { productsAutocompleteResponse200Schema } from "./responses";

export const productsAutocompleteOperation = defineHttpOperation({
	domain: "products",
	action: "autocomplete",
	auth: "none",
	safety: "read",
	summary: "Retrieve product search suggestions.",
	description:
		"Returns the search suggestions shown while the user types in the storefront search box.",
	request: {
		method: "GET",
		path: "/items",
		query: {
			schema: productsAutocompleteRequestQuerySchema,
		},
	},
	responses: {
		200: response({
			schema: productsAutocompleteResponse200Schema,
		}),
	},
});
