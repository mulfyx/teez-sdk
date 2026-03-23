import { apiErrorResponseSchema } from "../../../contracts/api-error-response";
import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { promocodesValidateRequestBodySchema } from "./request";
import { promocodesValidateResponse200Schema } from "./responses";

export const promocodesValidateOperation = defineHttpOperation({
	domain: "promocodes",
	action: "validate",
	auth: "required",
	safety: "read",
	summary: "Validate promocodes against cart items.",
	description:
		"Validates cart items and promocodes for the authenticated user and returns recalculated totals, discounts, and validation errors.",
	request: {
		method: "POST",
		path: "/api/v2/promocode/validate",
		body: {
			schema: promocodesValidateRequestBodySchema,
		},
	},
	responses: {
		200: response({
			schema: promocodesValidateResponse200Schema,
		}),
		401: response({
			schema: apiErrorResponseSchema,
		}),
	},
});
