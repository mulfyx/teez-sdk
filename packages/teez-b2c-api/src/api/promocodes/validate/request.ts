import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const promocodesValidateItemSchema = doc({
	schema: z.object({
		productItemId: doc({
			schema: z.number(),
			description: "Unique stock keeping unit identifier.",
		}),
		qty: doc({
			schema: z.number(),
			description: "Quantity requested for validation.",
		}),
		price: doc({
			schema: z.number(),
			description: "Current item price.",
		}),
	}),
	description: "Schema for a cart item used in promocode validation.",
});

export const promocodesValidateRequestBodySchema = doc({
	schema: z.object({
		promocodes: doc({
			schema: z.array(z.string()),
			description: "List of promocodes to validate.",
		}),
		delvieryMethodId: doc({
			schema: z.nullish(z.string()),
			description:
				"Delivery method identifier. The field name preserves the backend's original typo.",
		}),
		pickupPointId: doc({
			schema: z.nullish(z.string()),
			description: "Pickup point identifier.",
		}),
		deliveryAddressId: doc({
			schema: z.nullish(z.string()),
			description: "Delivery address identifier.",
		}),
		paymentMethodId: doc({
			schema: z.nullish(z.number()),
			description: "Payment method identifier.",
		}),
		items: doc({
			schema: z.array(promocodesValidateItemSchema),
			description: "Cart items used for validation.",
		}),
	}),
	description:
		"Authenticated cart validation request used to check promocodes against the current checkout payload.",
});
