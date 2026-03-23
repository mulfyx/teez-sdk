import * as z from "zod/mini";

import { doc } from "../schema/metadata";

export const apiErrorResponseSchema = doc({
	schema: z.object({
		description: doc({
			schema: z.string(),
			description:
				"Short backend error description or machine-readable reason.",
		}),
		message: doc({
			schema: z.string(),
			description: "Localized human-readable error message.",
		}),
	}),
	description:
		"Default API error body returned by many non-2xx responses, including unauthorized and validation errors.",
});
