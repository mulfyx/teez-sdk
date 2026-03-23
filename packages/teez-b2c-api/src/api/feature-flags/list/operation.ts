import { defineHttpOperation } from "../../../http-operation/define";
import { response } from "../../../http-operation/response-helpers";
import { featureFlagsListResponse200Schema } from "./responses";

export const featureFlagsListOperation = defineHttpOperation({
	domain: "featureFlags",
	action: "list",
	auth: "none",
	safety: "read",
	summary: "Retrieve feature flags.",
	description:
		"Returns backend-managed feature flags exposed to the client application.",
	request: {
		method: "GET",
		path: "/api/v1/feature-flags",
	},
	responses: {
		200: response({
			schema: featureFlagsListResponse200Schema,
		}),
	},
});
