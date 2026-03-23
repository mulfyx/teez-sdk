import * as v from "valibot";

import { usersUpdateLanguageValueSchema } from "./request";

export const usersUpdateLanguageResponse200Schema = v.pipe(
	v.object({
		language: v.pipe(
			usersUpdateLanguageValueSchema,
			v.description("Updated language code"),
		),
		title: v.pipe(v.string(), v.description("Response title")),
		message: v.pipe(v.string(), v.description("Response message")),
	}),
	v.description(
		"Confirmation payload returned after the user's preferred language is updated.",
	),
);
