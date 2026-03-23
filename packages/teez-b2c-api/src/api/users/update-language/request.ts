import * as v from "valibot";

export const usersUpdateLanguageValueSchema = v.pipe(
	v.picklist(["ru", "kz"]),
	v.description(
		'Language code accepted by the update language endpoint: "ru" or "kz".',
	),
);
export const usersUpdateLanguageRequestBodySchema = v.pipe(
	v.object({
		language: v.pipe(
			usersUpdateLanguageValueSchema,
			v.description('Language code: "ru" (Russian) or "kz" (Kazakh)'),
		),
	}),
	v.description(
		"Request body for updating the authenticated user's preferred language.",
	),
);
