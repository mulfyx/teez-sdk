import * as z from "zod/mini";

/**
 * Response schema for initiating phone login.
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
	 * User's phone number in E.164 format
	 */
	phone: z.string(),

	/**
	 * JWT access token for API authentication (HS512 algorithm, ~24 hour expiration)
	 */
	accessToken: z.string(),

	/**
	 * Base64-encoded refresh token for obtaining new access tokens
	 */
	refreshToken: z.string(),

	/**
	 * User's preferred payment method ID
	 */
	paymentId: z.nullish(z.number()),

	/**
	 * User's default pickup point
	 */
	pickupPoint: z.nullish(z.unknown()),

	/**
	 * User's default delivery address
	 */
	address: z.nullish(z.unknown()),

	/**
	 * User's default order recipient information
	 */
	recipient: z.nullish(z.unknown()),
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
	 * User's phone number in E.164 format
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
	 * Token expiration datetime in ISO 8601 format (e.g., "2025-12-30T13:08:44+00:00")
	 */
	expiredTokenDate: z.string(),

	/**
	 * User's preferred language: "ru" (Russian) or "kk" (Kazakh)
	 */
	language: z.enum(["ru", "kk"]),

	/**
	 * Whether user has active orders in progress
	 */
	hasOrders: z.boolean(),

	/**
	 * Whether user has any order history (including completed orders)
	 */
	hasAnyOrders: z.boolean(),
});
