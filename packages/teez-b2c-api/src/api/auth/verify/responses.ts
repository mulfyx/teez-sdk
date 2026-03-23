import * as v from "valibot";

import { nullishToUndefined } from "../../../schema/nullish";

export const authVerifyResponse200Schema = v.pipe(
	v.object({
		userId: v.pipe(v.string(), v.description("Unique user identifier")),
		phone: v.pipe(
			v.string(),
			v.description("User's phone number in E.164 format"),
		),
		accessToken: v.pipe(
			v.string(),
			v.description(
				"JWT access token for API authentication (HS512 algorithm, ~24 hour expiration)",
			),
		),
		refreshToken: v.pipe(
			v.string(),
			v.description(
				"Base64-encoded refresh token for obtaining new access tokens",
			),
		),
		paymentId: v.pipe(
			nullishToUndefined(v.number()),
			v.description("User's preferred payment method ID"),
		),
		pickupPoint: v.pipe(
			nullishToUndefined(v.unknown()),
			v.description("User's default pickup point"),
		),
		address: v.pipe(
			nullishToUndefined(v.unknown()),
			v.description("User's default delivery address"),
		),
		recipient: v.pipe(
			nullishToUndefined(v.unknown()),
			v.description("User's default order recipient information"),
		),
	}),
	v.description(
		"Authentication token payload returned after successful OTP verification.",
	),
);
