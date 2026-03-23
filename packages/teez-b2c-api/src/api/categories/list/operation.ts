import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { categoriesListResponse200Schema } from "./responses";

export const categoriesListOperation = defineHttpOperation({
	domain: "categories",
	action: "list",
	auth: "none",
	safety: "read",
	summary: "Retrieve the full category tree.",
	description:
		"Returns the top-level storefront category tree used for navigation.",
	request: {
		method: "GET",
		path: "/categories",
	},
	responses: {
		200: response({
			schema: categoriesListResponse200Schema,
		}),
	},
});
