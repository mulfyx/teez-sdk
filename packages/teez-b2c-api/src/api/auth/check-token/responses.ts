import * as v from "valibot";

export const authCheckTokenLanguageSchema = v.pipe(
	v.union([v.literal("ru"), v.literal("kz")]),
	v.description(
		'Language code returned for the authenticated user: "ru" or "kz".',
	),
);
export const authCheckTokenResponse200Schema = v.pipe(
	v.object({
		userId: v.pipe(v.string(), v.description("Unique user identifier")),
		phoneNumber: v.pipe(
			v.string(),
			v.description("User's phone number in E.164 format"),
		),
		fullName: v.pipe(v.string(), v.description("User's full name")),
		email: v.pipe(v.string(), v.description("User's email address")),
		expiredTokenDate: v.pipe(
			v.string(),
			v.description(
				'Token expiration datetime in ISO 8601 format (e.g., "2025-12-30T13:08:44+00:00")',
			),
		),
		language: v.pipe(
			authCheckTokenLanguageSchema,
			v.description('User\'s preferred language: "ru" or "kz".'),
		),
		hasOrders: v.pipe(
			v.boolean(),
			v.description("Whether user has active orders in progress"),
		),
		hasAnyOrders: v.pipe(
			v.boolean(),
			v.description(
				"Whether user has any order history (including completed orders)",
			),
		),
	}),
	v.description(
		"Authenticated user profile returned by the token validation endpoint.",
	),
);
