import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { bannersListRequestQuerySchema } from "./request";
import { bannersListResponse200Schema } from "./responses";

export const bannersListOperation = defineHttpOperation({
	domain: "banners",
	action: "list",
	auth: "none",
	safety: "read",
	summary: "Retrieve active banners.",
	description:
		"Returns active storefront banners with image resources and action metadata for navigation, links, keys, or promocodes.",
	request: {
		method: "GET",
		path: "/api/v3/banners",
		query: {
			schema: bannersListRequestQuerySchema,
		},
	},
	responses: {
		200: response({
			schema: bannersListResponse200Schema,
		}),
	},
});
