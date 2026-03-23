import * as v from "valibot";

export const authLoginRequestBodySchema = v.pipe(
	v.object({
		phone: v.pipe(
			v.string(),
			v.description(
				'Phone number with country code in E.164 format (e.g., "+77071234567")',
			),
		),
	}),
	v.description("Parameters for initiating phone login (sends OTP)."),
);
