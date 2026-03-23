import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { categoriesGetParentsRequestQuerySchema } from "./request";
import { categoriesGetParentsResponse200Schema } from "./responses";

export const categoriesGetParentsOperation = defineHttpOperation({
	domain: "categories",
	action: "getParents",
	auth: "none",
	safety: "read",
	summary: "Retrieve parent categories for category IDs.",
	description:
		"Returns parent category chains for the provided category identifiers, optionally filtered to a specific hierarchy level.",
	request: {
		method: "GET",
		path: "/api/v1/categories/parents",
		query: {
			schema: categoriesGetParentsRequestQuerySchema,
		},
	},
	responses: {
		200: response({
			schema: categoriesGetParentsResponse200Schema,
		}),
	},
});
