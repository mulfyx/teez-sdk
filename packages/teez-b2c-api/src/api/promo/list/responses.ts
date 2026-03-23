import * as v from "valibot";

import { nullishToUndefined } from "../../../schema/nullish";

export const promoListItemSchema = v.pipe(
	v.object({
		id: v.pipe(v.number(), v.description("Unique identifier of the promotion")),
		name: v.pipe(v.string(), v.description("Localized name of the promotion")),
		description: v.pipe(
			nullishToUndefined(v.string()),
			v.description("Localized detailed description of the promotion"),
		),
		svgUrl: v.pipe(
			nullishToUndefined(v.string()),
			v.description("URL to the SVG icon for the promotion"),
		),
		startDate: v.pipe(v.string(), v.description("Start date of the promotion")),
		endDate: v.pipe(v.string(), v.description("End date of the promotion")),
	}),
	v.description("Promotion item returned by the active promotions endpoint."),
);
export const promoListResponse200Schema = v.pipe(
	v.array(promoListItemSchema),
	v.description(
		"List of active promotions currently available in the storefront. May be empty when no promotions are active.",
	),
);
