/**
 * ⚠️ This file is auto-generated. Do not edit manually.
 * Run `npm run generate:schema-types` to regenerate.
 * Generated from: schemas.ts
 */

/**
 * Schema for a promotion item.
 */
export interface PromoApiItem {
	/**
	 * Unique identifier of the promotion
	 */
	id: number;
	/**
	 * Localized name of the promotion
	 */
	name: string;
	/**
	 * Localized detailed description of the promotion
	 */
	description?: (string | null) | undefined;
	/**
	 * URL to the SVG icon for the promotion
	 */
	svgUrl?: (string | null) | undefined;
	/**
	 * Start date of the promotion
	 */
	startDate: string;
	/**
	 * End date of the promotion
	 */
	endDate: string;
}

/**
 * Response schema for the list of promotions.
 */
export type PromoApiListResponse = PromoApiItem[];
