import { apiErrorResponseSchema } from "../../../contracts/api-error-response";
import { defineHttpOperation } from "../../../http-operation/define";
import {
	emptyResponse,
	response,
} from "../../../http-operation/response-helpers";
import { authLoginRequestBodySchema } from "./request";

export const authLoginOperation = defineHttpOperation({
	domain: "auth",
	action: "login",
	auth: "none",
	safety: "write",
	summary: "Initiate phone login and send an OTP code.",
	description:
		"Validates the provided phone number and requests a one-time password to continue authentication.",
	request: {
		method: "POST",
		path: "/auth/login",
		body: {
			schema: authLoginRequestBodySchema,
		},
	},
	responses: {
		200: emptyResponse(),
		204: emptyResponse(),
		400: response({
			schema: apiErrorResponseSchema,
		}),
	},
});
