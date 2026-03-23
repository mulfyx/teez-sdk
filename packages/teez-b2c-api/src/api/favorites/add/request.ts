import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const favoritesAddRequestBodySchema = doc({
	schema: z.array(z.number()),
	description:
		"Request body containing SKU identifiers to add to the authenticated user's favorites list.",
});
