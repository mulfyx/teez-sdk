import * as v from "valibot";

export const usersRegisterDeviceSdkInformationSchema = v.pipe(
	v.object({
		type: v.pipe(
			v.string(),
			v.description('Type of tracking SDK (e.g., "Appsflyer", "Firebase")'),
		),
		deviceId: v.pipe(
			v.string(),
			v.description("Unique device identifier for the tracking service"),
		),
	}),
	v.description("SDK information for a specific tracking service"),
);
export const usersRegisterDeviceIdentitySchema = v.pipe(
	v.object({
		sdkInformation: v.pipe(
			v.array(usersRegisterDeviceSdkInformationSchema),
			v.description("Array of tracking SDK information"),
		),
	}),
	v.description("Device identity containing tracking SDK information"),
);
export const usersRegisterDeviceRequestBodySchema = v.pipe(
	v.object({
		deviceIdentity: v.pipe(
			usersRegisterDeviceIdentitySchema,
			v.description("Device identity information for analytics tracking"),
		),
	}),
	v.description(
		"Request body for registering authenticated device identity metadata used by analytics integrations.",
	),
);
