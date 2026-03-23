import * as v from "valibot";

import { nullishToUndefined } from "../../../schema/nullish";

export const promocodesValidateValidatedItemSchema = v.pipe(
	v.object({
		productItemId: v.pipe(
			v.number(),
			v.description("Unique stock keeping unit identifier."),
		),
		qty: v.pipe(v.number(), v.description("Validated quantity.")),
		price: v.pipe(
			v.number(),
			v.description("Final item price after validation."),
		),
		originalPrice: v.pipe(
			v.number(),
			v.description("Original item price before discounts."),
		),
		discount: v.pipe(
			v.number(),
			v.description("Discount amount applied to the item."),
		),
	}),
	v.description("Schema for an item returned from promocode validation."),
);
export const promocodesValidateResponse200Schema = v.pipe(
	v.object({
		isSuccess: v.pipe(
			v.boolean(),
			v.description("Whether promocode validation succeeded."),
		),
		errorMessage: v.pipe(
			nullishToUndefined(v.string()),
			v.description("Validation error message."),
		),
		promocode: v.pipe(
			nullishToUndefined(v.string()),
			v.description("Validated promocode."),
		),
		promocodeDescription: v.pipe(
			nullishToUndefined(v.string()),
			v.description("Description of the validated promocode."),
		),
		originalTotalPrice: v.pipe(
			nullishToUndefined(v.number()),
			v.description("Cart total before discounts."),
		),
		totalPrice: v.pipe(
			nullishToUndefined(v.number()),
			v.description("Cart total after discounts."),
		),
		discount: v.pipe(
			nullishToUndefined(v.number()),
			v.description("Total discount amount."),
		),
		items: v.pipe(
			nullishToUndefined(v.array(promocodesValidateValidatedItemSchema)),
			v.description("Validated cart items."),
		),
		validationErrorMessages: v.pipe(
			nullishToUndefined(v.unknown()),
			v.description("Validation errors returned by the backend."),
		),
	}),
	v.description("Response schema for promocode validation."),
);
