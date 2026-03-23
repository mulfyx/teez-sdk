import { apiErrorResponseSchema } from "../../../contracts/api-error-response";
import { defineHttpOperation } from "../../../http-operation/define";
import {
	emptyResponse,
	response,
} from "../../../http-operation/response-helpers";
import { favoritesRemoveRequestBodySchema } from "./request";

export const favoritesRemoveOperation = defineHttpOperation({
	domain: "favorites",
	action: "remove",
	auth: "required",
	safety: "write",
	summary: "Remove SKUs from favorites.",
	description:
		"Removes the provided SKU identifiers from the authenticated user's favorites list.",
	request: {
		method: "DELETE",
		path: "/api/v1/favorites",
		body: {
			schema: favoritesRemoveRequestBodySchema,
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
