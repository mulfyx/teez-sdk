import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const bannersListRequestQuerySchema = doc({
	schema: z.object({
		type: doc({
			schema: z.nullish(z.string()),
			description: "Type of banners to filter by",
		}),
	}),
	description:
		"Optional banner feed filters used by the storefront banners endpoint.",
});
