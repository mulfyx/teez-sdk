import { apiErrorResponseSchema } from "../../../contracts/api-error-response";
import { defineHttpOperation } from "../../../http-operation/define";
import {
	emptyResponse,
	response,
} from "../../../http-operation/response-helpers";
import { usersRegisterDeviceRequestBodySchema } from "./request";

export const usersRegisterDeviceOperation = defineHttpOperation({
	domain: "users",
	action: "registerDevice",
	auth: "required",
	safety: "write",
	summary: "Register device identity for analytics.",
	description:
		"Registers device identity metadata for the authenticated user to support analytics and attribution integrations.",
	request: {
		method: "POST",
		path: "/api/v1/device-identities",
		body: {
			schema: usersRegisterDeviceRequestBodySchema,
		},
	},
	responses: {
		200: emptyResponse(),
		201: emptyResponse(),
		204: emptyResponse(),
		401: response({
			schema: apiErrorResponseSchema,
		}),
	},
});
