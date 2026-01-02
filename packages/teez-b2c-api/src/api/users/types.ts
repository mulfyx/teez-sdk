import { type BaseParams } from "../../common/types";

/**
 * Parameters for updating user's preferred language
 */
export interface UsersApiUpdateLanguageParams extends BaseParams {
	/**
	 * Language code: "ru" (Russian) or "kk" (Kazakh)
	 */
	language: "ru" | "kk";
}

/**
 * SDK information for a specific tracking service
 */
export interface UsersApiDeviceSdkInformation {
	/**
	 * Type of tracking SDK (e.g., "Appsflyer", "Firebase")
	 */
	type: string;

	/**
	 * Unique device identifier for the tracking service
	 */
	deviceId: string;
}

/**
 * Device identity containing tracking SDK information
 */
export interface UsersApiDeviceIdentity {
	/**
	 * Array of tracking SDK information
	 */
	sdkInformation: UsersApiDeviceSdkInformation[];
}

/**
 * Parameters for registering device identity
 */
export interface UsersApiRegisterDeviceParams extends BaseParams {
	/**
	 * Device identity information for analytics tracking
	 */
	deviceIdentity: UsersApiDeviceIdentity;
}
