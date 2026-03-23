import { apiErrorResponseSchema } from "../../../contracts/api-error-response";
import { defineHttpOperation } from "../../../http-operation/define";
import {
	emptyResponse,
	response,
} from "../../../http-operation/response-helpers";
import { favoritesAddRequestBodySchema } from "./request";

export const favoritesAddOperation = defineHttpOperation({
	domain: "favorites",
	action: "add",
	auth: "required",
	safety: "write",
	summary: "Add SKUs to favorites.",
	description:
		"Adds the provided SKU identifiers to the authenticated user's favorites list.",
	request: {
		method: "POST",
		path: "/api/v1/favorites",
		body: {
			schema: favoritesAddRequestBodySchema,
		},
	},
	responses: {
		200: emptyResponse(),
		204: emptyResponse(),
		401: response({
			schema: apiErrorResponseSchema,
		}),
	},
});
