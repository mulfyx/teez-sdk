import * as v from "valibot";

export const promocodesValidateItemSchema = v.pipe(
	v.object({
		productItemId: v.pipe(
			v.number(),
			v.description("Unique stock keeping unit identifier."),
		),
		qty: v.pipe(
			v.number(),
			v.description("Quantity requested for validation."),
		),
		price: v.pipe(v.number(), v.description("Current item price.")),
	}),
	v.description("Schema for a cart item used in promocode validation."),
);
export const promocodesValidateRequestBodySchema = v.pipe(
	v.object({
		promocodes: v.pipe(
			v.array(v.string()),
			v.description("List of promocodes to validate."),
		),
		delvieryMethodId: v.pipe(
			v.nullish(v.string()),
			v.description(
				"Delivery method identifier. The field name preserves the backend's original typo.",
			),
		),
		pickupPointId: v.pipe(
			v.nullish(v.string()),
			v.description("Pickup point identifier."),
		),
		deliveryAddressId: v.pipe(
			v.nullish(v.string()),
			v.description("Delivery address identifier."),
		),
		paymentMethodId: v.pipe(
			v.nullish(v.number()),
			v.description("Payment method identifier."),
		),
		items: v.pipe(
			v.array(promocodesValidateItemSchema),
			v.description("Cart items used for validation."),
		),
	}),
	v.description(
		"Authenticated cart validation request used to check promocodes against the current checkout payload.",
	),
);
