import { nullable } from "../../common/schemas";
import * as v from "valibot";

/**
 * Schema for a promotion item.
 */
export const PromoApiItemSchema = v.object({
	/** Unique identifier of the promotion */
	id: v.number(),

	/** Name of the promotion */
	name: v.string(),

	/** Detailed description of the promotion */
	description: nullable(v.string()),

	/** URL to the SVG icon for the promotion */
	svgUrl: nullable(v.string()),

	/** Start date of the promotion */
	startDate: v.string(),

	/** End date of the promotion */
	endDate: v.string(),
});

/**
 * Response schema for the list of promotions.
 */
export const PromoApiListResponseSchema = v.array(PromoApiItemSchema);
