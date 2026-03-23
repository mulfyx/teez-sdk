import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const authVerifyRequestBodySchema = doc({
	schema: z.object({
		phone: doc({
			schema: z.string(),
			description:
				'Phone number with country code in E.164 format (e.g., "+77071234567")',
		}),
		otpCode: doc({
			schema: z.string(),
			description: "4-digit OTP code received via SMS",
		}),
	}),
	description: "Parameters for verifying OTP code and obtaining JWT token.",
});
