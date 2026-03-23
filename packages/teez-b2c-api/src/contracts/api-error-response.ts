import * as v from "valibot";

export const apiErrorResponseSchema = v.pipe(
	v.object({
		description: v.pipe(
			v.string(),
			v.description(
				"Short backend error description or machine-readable reason.",
			),
		),
		message: v.pipe(
			v.string(),
			v.description("Localized human-readable error message."),
		),
	}),
	v.description(
		"Default API error body returned by many non-2xx responses, including unauthorized and validation errors.",
	),
);
