import * as z from "zod/mini";

import { nullishToUndefined } from "../../../schema/codecs";
import { doc } from "../../../schema/metadata";

export const authVerifyResponse200Schema = doc({
	schema: z.object({
		userId: doc({
			schema: z.string(),
			description: "Unique user identifier",
		}),
		phone: doc({
			schema: z.string(),
			description: "User's phone number in E.164 format",
		}),
		accessToken: doc({
			schema: z.string(),
			description:
				"JWT access token for API authentication (HS512 algorithm, ~24 hour expiration)",
		}),
		refreshToken: doc({
			schema: z.string(),
			description:
				"Base64-encoded refresh token for obtaining new access tokens",
		}),
		paymentId: doc({
			schema: nullishToUndefined(z.number()),
			description: "User's preferred payment method ID",
		}),
		pickupPoint: doc({
			schema: nullishToUndefined(z.unknown()),
			description: "User's default pickup point",
		}),
		address: doc({
			schema: nullishToUndefined(z.unknown()),
			description: "User's default delivery address",
		}),
		recipient: doc({
			schema: nullishToUndefined(z.unknown()),
			description: "User's default order recipient information",
		}),
	}),
	description:
		"Authentication token payload returned after successful OTP verification.",
});
