import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const usersRegisterDeviceSdkInformationSchema = doc({
	schema: z.object({
		type: doc({
			schema: z.string(),
			description: 'Type of tracking SDK (e.g., "Appsflyer", "Firebase")',
		}),
		deviceId: doc({
			schema: z.string(),
			description: "Unique device identifier for the tracking service",
		}),
	}),
	description: "SDK information for a specific tracking service",
});

export const usersRegisterDeviceIdentitySchema = doc({
	schema: z.object({
		sdkInformation: doc({
			schema: z.array(usersRegisterDeviceSdkInformationSchema),
			description: "Array of tracking SDK information",
		}),
	}),
	description: "Device identity containing tracking SDK information",
});

export const usersRegisterDeviceRequestBodySchema = doc({
	schema: z.object({
		deviceIdentity: doc({
			schema: usersRegisterDeviceIdentitySchema,
			description: "Device identity information for analytics tracking",
		}),
	}),
	description:
		"Request body for registering authenticated device identity metadata used by analytics integrations.",
});
