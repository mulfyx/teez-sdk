import * as v from "valibot";

export const authVerifyRequestBodySchema = v.pipe(
	v.object({
		phone: v.pipe(
			v.string(),
			v.description(
				'Phone number with country code in E.164 format (e.g., "+77071234567")',
			),
		),
		otpCode: v.pipe(
			v.string(),
			v.description("4-digit OTP code received via SMS"),
		),
	}),
	v.description("Parameters for verifying OTP code and obtaining JWT token."),
);
