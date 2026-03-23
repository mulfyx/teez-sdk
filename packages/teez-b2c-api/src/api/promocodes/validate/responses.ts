import * as z from "zod/mini";

import { nullishToUndefined } from "../../../schema/codecs";
import { doc } from "../../../schema/metadata";

export const promocodesValidateValidatedItemSchema = doc({
	schema: z.object({
		productItemId: doc({
			schema: z.number(),
			description: "Unique stock keeping unit identifier.",
		}),
		qty: doc({
			schema: z.number(),
			description: "Validated quantity.",
		}),
		price: doc({
			schema: z.number(),
			description: "Final item price after validation.",
		}),
		originalPrice: doc({
			schema: z.number(),
			description: "Original item price before discounts.",
		}),
		discount: doc({
			schema: z.number(),
			description: "Discount amount applied to the item.",
		}),
	}),
	description: "Schema for an item returned from promocode validation.",
});

export const promocodesValidateResponse200Schema = doc({
	schema: z.object({
		isSuccess: doc({
			schema: z.boolean(),
			description: "Whether promocode validation succeeded.",
		}),
		errorMessage: doc({
			schema: nullishToUndefined(z.string()),
			description: "Validation error message.",
		}),
		promocode: doc({
			schema: nullishToUndefined(z.string()),
			description: "Validated promocode.",
		}),
		promocodeDescription: doc({
			schema: nullishToUndefined(z.string()),
			description: "Description of the validated promocode.",
		}),
		originalTotalPrice: doc({
			schema: nullishToUndefined(z.number()),
			description: "Cart total before discounts.",
		}),
		totalPrice: doc({
			schema: nullishToUndefined(z.number()),
			description: "Cart total after discounts.",
		}),
		discount: doc({
			schema: nullishToUndefined(z.number()),
			description: "Total discount amount.",
		}),
		items: doc({
			schema: nullishToUndefined(
				z.array(promocodesValidateValidatedItemSchema),
			),
			description: "Validated cart items.",
		}),
		validationErrorMessages: doc({
			schema: nullishToUndefined(z.unknown()),
			description: "Validation errors returned by the backend.",
		}),
	}),
	description: "Response schema for promocode validation.",
});
