import * as z from "zod/mini";

/**
 * Response schema for login.
 */
export const AuthApiLoginResponseSchema = z.void();

/**
 * Response schema for OTP verification.
 */
export const AuthApiVerifyResponseSchema = z.object({
	/**
	 * Unique user identifier
	 */
	userId: z.string(),

	/**
	 * JWT access token for authenticated requests
	 */
	accessToken: z.string(),

	/**
	 * Refresh token for obtaining new access tokens
	 */
	refreshToken: z.string(),

	/**
	 * User's phone number
	 */
	phone: z.string(),

	/**
	 * User's default pickup point
	 */
	pickupPoint: z.nullish(z.unknown()),

	/**
	 * User's default delivery address
	 */
	address: z.nullish(z.unknown()),

	/**
	 * User's default recipient information
	 */
	recipient: z.nullish(z.unknown()),

	/**
	 * User's default payment method ID
	 */
	paymentId: z.nullish(z.number()),
});

/**
 * Response schema for token validation.
 */
export const AuthApiCheckTokenResponseSchema = z.object({
	/**
	 * Unique user identifier
	 */
	userId: z.string(),

	/**
	 * User's phone number
	 */
	phoneNumber: z.string(),

	/**
	 * User's full name
	 */
	fullName: z.string(),

	/**
	 * User's email address
	 */
	email: z.string(),

	/**
	 * Token expiration date (ISO 8601 format)
	 */
	expiredTokenDate: z.string(),

	/**
	 * User's language preference (ru or kk)
	 */
	language: z.enum(["ru", "kk"]),

	/**
	 * Whether user has any orders in the system
	 */
	hasOrders: z.boolean(),

	/**
	 * Whether user has any orders (alternative field)
	 */
	hasAnyOrders: z.boolean(),
});
