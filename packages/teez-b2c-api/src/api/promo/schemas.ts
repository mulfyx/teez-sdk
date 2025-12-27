import * as z from "zod/mini";

/**
 * Schema for a promotion item.
 */
export const PromoApiItemSchema = z.object({
	/**
	 * Unique identifier of the promotion
	 */
	id: z.number(),

	/**
	 * Localized name of the promotion
	 */
	name: z.string(),

	/**
	 * Localized detailed description of the promotion
	 */
	description: z.nullish(z.string()),

	/**
	 * URL to the SVG icon for the promotion
	 */
	svgUrl: z.nullish(z.string()),

	/**
	 * Start date of the promotion
	 */
	startDate: z.string(),

	/**
	 * End date of the promotion
	 */
	endDate: z.string(),
});

/**
 * Response schema for the list of promotions.
 */
export const PromoApiListResponseSchema = z.array(PromoApiItemSchema);
