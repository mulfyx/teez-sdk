import { apiErrorResponseSchema } from "../../../contracts/api-error-response";
import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { authVerifyRequestBodySchema } from "./request";
import { authVerifyResponse200Schema } from "./responses";

export const authVerifyOperation = defineHttpOperation({
	domain: "auth",
	action: "verify",
	auth: "none",
	safety: "write",
	summary: "Verify OTP and receive authentication tokens.",
	description:
		"Exchanges a phone number and OTP code for access and refresh tokens plus default checkout-related profile data.",
	request: {
		method: "POST",
		path: "/auth/verify",
		body: {
			schema: authVerifyRequestBodySchema,
		},
	},
	responses: {
		200: response({
			schema: authVerifyResponse200Schema,
		}),
		400: response({
			schema: apiErrorResponseSchema,
		}),
	},
});
