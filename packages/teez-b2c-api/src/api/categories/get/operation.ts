import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { categoriesGetRequestPathSchema } from "./request";
import { categoriesGetResponse200Schema } from "./responses";

export const categoriesGetOperation = defineHttpOperation({
	domain: "categories",
	action: "get",
	auth: "none",
	safety: "read",
	summary: "Retrieve a category by ID.",
	description:
		"Returns a single category node together with its immediate subcategories.",
	request: {
		method: "GET",
		path: {
			template: "/categories/{categoryId}",
			schema: categoriesGetRequestPathSchema,
		},
	},
	responses: {
		200: response({
			schema: categoriesGetResponse200Schema,
		}),
	},
});
