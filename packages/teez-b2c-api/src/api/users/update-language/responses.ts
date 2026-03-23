import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";
import { usersUpdateLanguageValueSchema } from "./request";

export const usersUpdateLanguageResponse200Schema = doc({
	schema: z.object({
		language: doc({
			schema: usersUpdateLanguageValueSchema,
			description: "Updated language code",
		}),
		title: doc({
			schema: z.string(),
			description: "Response title",
		}),
		message: doc({
			schema: z.string(),
			description: "Response message",
		}),
	}),
	description:
		"Confirmation payload returned after the user's preferred language is updated.",
});
