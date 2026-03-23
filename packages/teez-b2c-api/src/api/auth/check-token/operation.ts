import { apiErrorResponseSchema } from "../../../contracts/api-error-response";
import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { authCheckTokenResponse200Schema } from "./responses";

export const authCheckTokenOperation = defineHttpOperation({
	domain: "auth",
	action: "checkToken",
	auth: "required",
	safety: "read",
	summary: "Validate the current JWT token.",
	description:
		"Returns the authenticated user's profile summary, preferred language, and order history flags for the current access token.",
	request: {
		method: "GET",
		path: "/auth/check-token",
	},
	responses: {
		200: response({
			schema: authCheckTokenResponse200Schema,
		}),
		401: response({
			schema: apiErrorResponseSchema,
		}),
	},
});
