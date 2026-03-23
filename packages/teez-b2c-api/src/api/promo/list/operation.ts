import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { promoListResponse200Schema } from "./responses";

export const promoListOperation = defineHttpOperation({
	domain: "promo",
	action: "list",
	auth: "none",
	safety: "read",
	summary: "Retrieve active promotions.",
	description:
		"Returns active promotions currently available in the storefront. The API may return an empty array when no promotions are active.",
	request: {
		method: "GET",
		path: "/api/promo",
	},
	responses: {
		200: response({
			schema: promoListResponse200Schema,
		}),
	},
});
