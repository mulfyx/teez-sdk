import { apiErrorResponseSchema } from "../../../contracts/api-error-response";
import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { favoritesGetIdsResponse200Schema } from "./responses";

export const favoritesGetIdsOperation = defineHttpOperation({
	domain: "favorites",
	action: "getIds",
	auth: "required",
	safety: "read",
	summary: "Retrieve favorited SKU IDs.",
	description: "Returns the authenticated user's favorite SKU identifiers.",
	request: {
		method: "GET",
		path: "/api/v1/favorites/ids",
	},
	responses: {
		200: response({
			schema: favoritesGetIdsResponse200Schema,
		}),
		401: response({
			schema: apiErrorResponseSchema,
		}),
	},
});
