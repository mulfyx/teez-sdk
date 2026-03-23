import { apiErrorResponseSchema } from "../../../contracts/api-error-response";
import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { usersUpdateLanguageRequestBodySchema } from "./request";
import { usersUpdateLanguageResponse200Schema } from "./responses";

export const usersUpdateLanguageOperation = defineHttpOperation({
	domain: "users",
	action: "updateLanguage",
	auth: "required",
	safety: "write",
	summary: "Update the user's language.",
	description: "Updates the authenticated user's preferred response language.",
	request: {
		method: "PATCH",
		path: "/api/v1/users/me/language",
		body: {
			schema: usersUpdateLanguageRequestBodySchema,
		},
	},
	responses: {
		200: response({
			schema: usersUpdateLanguageResponse200Schema,
		}),
		401: response({
			schema: apiErrorResponseSchema,
		}),
	},
});
