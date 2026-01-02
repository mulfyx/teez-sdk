import * as z from "zod/mini";

/**
 * Supported language enum for user preference
 */
export const UsersApiLanguageEnumSchema = z.enum(["ru", "kk"]);

/**
 * Response schema for language update
 */
export const UsersApiUpdateLanguageResponseSchema = z.object({
	/**
	 * Updated language code
	 */
	language: UsersApiLanguageEnumSchema,

	/**
	 * Response title
	 */
	title: z.string(),

	/**
	 * Response message
	 */
	message: z.string(),
});

/**
 * Response schema for device registration
 */
export const UsersApiRegisterDeviceResponseSchema = z.nullish(z.null());
