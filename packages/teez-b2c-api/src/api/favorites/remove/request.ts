import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const favoritesRemoveRequestBodySchema = doc({
	schema: z.array(z.number()),
	description:
		"Request body containing SKU identifiers to remove from the authenticated user's favorites list.",
});
