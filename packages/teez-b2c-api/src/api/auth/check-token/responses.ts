import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const authCheckTokenLanguageSchema = doc({
	schema: z.union([z.literal("ru"), z.literal("kz")]),
	description:
		'Language code returned for the authenticated user: "ru" or "kz".',
});

export const authCheckTokenResponse200Schema = doc({
	schema: z.object({
		userId: doc({
			schema: z.string(),
			description: "Unique user identifier",
		}),
		phoneNumber: doc({
			schema: z.string(),
			description: "User's phone number in E.164 format",
		}),
		fullName: doc({
			schema: z.string(),
			description: "User's full name",
		}),
		email: doc({
			schema: z.string(),
			description: "User's email address",
		}),
		expiredTokenDate: doc({
			schema: z.string(),
			description:
				'Token expiration datetime in ISO 8601 format (e.g., "2025-12-30T13:08:44+00:00")',
		}),
		language: doc({
			schema: authCheckTokenLanguageSchema,
			description: 'User\'s preferred language: "ru" or "kz".',
		}),
		hasOrders: doc({
			schema: z.boolean(),
			description: "Whether user has active orders in progress",
		}),
		hasAnyOrders: doc({
			schema: z.boolean(),
			description:
				"Whether user has any order history (including completed orders)",
		}),
	}),
	description:
		"Authenticated user profile returned by the token validation endpoint.",
});
