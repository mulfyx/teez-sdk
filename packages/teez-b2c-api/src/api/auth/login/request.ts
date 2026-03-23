import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const authLoginRequestBodySchema = doc({
	schema: z.object({
		phone: doc({
			schema: z.string(),
			description:
				'Phone number with country code in E.164 format (e.g., "+77071234567")',
		}),
	}),
	description: "Parameters for initiating phone login (sends OTP).",
});
