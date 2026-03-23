import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const usersUpdateLanguageValueSchema = doc({
	schema: z.enum(["ru", "kz"]),
	description:
		'Language code accepted by the update language endpoint: "ru" or "kz".',
});

export const usersUpdateLanguageRequestBodySchema = doc({
	schema: z.object({
		language: doc({
			schema: usersUpdateLanguageValueSchema,
			description: 'Language code: "ru" (Russian) or "kz" (Kazakh)',
		}),
	}),
	description:
		"Request body for updating the authenticated user's preferred language.",
});
