import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { productsListRequestQuerySchema } from "./request";
import { productsListResponse200Schema } from "./responses";

export const productsListOperation = defineHttpOperation({
	domain: "products",
	action: "list",
	auth: "none",
	safety: "read",
	summary: "Retrieve a filtered product list.",
	description:
		"Returns a paginated product listing with filters, product cards, and pagination metadata.",
	request: {
		method: "GET",
		path: "/api/v2/product",
		query: {
			schema: productsListRequestQuerySchema,
		},
	},
	responses: {
		200: response({
			schema: productsListResponse200Schema,
		}),
	},
});
