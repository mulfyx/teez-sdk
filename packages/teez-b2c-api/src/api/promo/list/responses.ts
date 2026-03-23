import * as z from "zod/mini";

import { nullishToUndefined } from "../../../schema/codecs";
import { doc } from "../../../schema/metadata";

export const promoListItemSchema = doc({
	schema: z.object({
		id: doc({
			schema: z.number(),
			description: "Unique identifier of the promotion",
		}),
		name: doc({
			schema: z.string(),
			description: "Localized name of the promotion",
		}),
		description: doc({
			schema: nullishToUndefined(z.string()),
			description: "Localized detailed description of the promotion",
		}),
		svgUrl: doc({
			schema: nullishToUndefined(z.string()),
			description: "URL to the SVG icon for the promotion",
		}),
		startDate: doc({
			schema: z.string(),
			description: "Start date of the promotion",
		}),
		endDate: doc({
			schema: z.string(),
			description: "End date of the promotion",
		}),
	}),
	description: "Promotion item returned by the active promotions endpoint.",
});

export const promoListResponse200Schema = doc({
	schema: z.array(promoListItemSchema),
	description:
		"List of active promotions currently available in the storefront. May be empty when no promotions are active.",
});
