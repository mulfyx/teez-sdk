/**
 * ⚠️ This file is auto-generated. Do not edit manually.
 * Run `npm run generate:schema-types` to regenerate.
 * Generated from: schemas.ts
 */

/**
 * Response schema for initiating phone login.
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
	 * User's phone number in E.164 format
	 */
	phone: string;
	/**
	 * JWT access token for API authentication (HS512 algorithm, ~24 hour expiration)
	 */
	accessToken: string;
	/**
	 * Base64-encoded refresh token for obtaining new access tokens
	 */
	refreshToken: string;
	/**
	 * User's preferred payment method ID
	 */
	paymentId?: (number | null) | undefined;
	/**
	 * User's default pickup point
	 */
	pickupPoint?: (unknown | null) | undefined;
	/**
	 * User's default delivery address
	 */
	address?: (unknown | null) | undefined;
	/**
	 * User's default order recipient information
	 */
	recipient?: (unknown | null) | undefined;
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
	 * User's phone number in E.164 format
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
	 * Token expiration datetime in ISO 8601 format (e.g., "2025-12-30T13:08:44+00:00")
	 */
	expiredTokenDate: string;
	/**
	 * User's preferred language: "ru" (Russian) or "kk" (Kazakh)
	 */
	language: "ru" | "kk";
	/**
	 * Whether user has active orders in progress
	 */
	hasOrders: boolean;
	/**
	 * Whether user has any order history (including completed orders)
	 */
	hasAnyOrders: boolean;
}
