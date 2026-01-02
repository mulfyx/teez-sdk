import { type BaseParams } from "../../common/types";

/**
 * Parameters for initiating phone login (sends OTP).
 */
export interface AuthApiLoginParams extends BaseParams {
	/**
	 * Phone number with country code in E.164 format (e.g., "+77071234567")
	 */
	phone: string;
}

/**
 * Parameters for verifying OTP code and obtaining JWT token.
 */
export interface AuthApiVerifyParams extends BaseParams {
	/**
	 * Phone number with country code in E.164 format (e.g., "+77071234567")
	 */
	phone: string;

	/**
	 * 4-digit OTP code received via SMS
	 */
	otpCode: string;
}

/**
 * Parameters for checking token validity.
 */
export type AuthApiCheckTokenParams = BaseParams;
