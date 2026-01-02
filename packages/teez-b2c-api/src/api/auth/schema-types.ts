/**
 * ⚠️ This file is auto-generated. Do not edit manually.
 * Run `npm run generate:schema-types` to regenerate.
 * Generated from: schemas.ts
 */

/**
 * Response schema for login.
 */
export type AuthApiLoginResponse = void | undefined;

/**
 * Response schema for OTP verification.
 */
export interface AuthApiVerifyResponse {
	/**
	 * Unique user identifier
	 */
	userId: string;
	/**
	 * JWT access token for authenticated requests
	 */
	accessToken: string;
	/**
	 * Refresh token for obtaining new access tokens
	 */
	refreshToken: string;
	/**
	 * User's phone number
	 */
	phone: string;
	/**
	 * User's default pickup point
	 */
	pickupPoint?: (unknown | null) | undefined;
	/**
	 * User's default delivery address
	 */
	address?: (unknown | null) | undefined;
	/**
	 * User's default recipient information
	 */
	recipient?: (unknown | null) | undefined;
	/**
	 * User's default payment method ID
	 */
	paymentId?: (number | null) | undefined;
}

/**
 * Response schema for token validation.
 */
export interface AuthApiCheckTokenResponse {
	/**
	 * Unique user identifier
	 */
	userId: string;
	/**
	 * User's phone number
	 */
	phoneNumber: string;
	/**
	 * User's full name
	 */
	fullName: string;
	/**
	 * User's email address
	 */
	email: string;
	/**
	 * Token expiration date (ISO 8601 format)
	 */
	expiredTokenDate: string;
	/**
	 * User's language preference (ru or kk)
	 */
	language: "ru" | "kk";
	/**
	 * Whether user has any orders in the system
	 */
	hasOrders: boolean;
	/**
	 * Whether user has any orders (alternative field)
	 */
	hasAnyOrders: boolean;
}
