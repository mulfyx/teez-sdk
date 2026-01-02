/**
 * ⚠️ This file is auto-generated. Do not edit manually.
 * Run `npm run generate:schema-types` to regenerate.
 * Generated from: schemas.ts
 */

/**
 * Supported language enum for user preference
 */
export type UsersApiLanguageEnum = "ru" | "kk";

/**
 * Response schema for language update
 */
export interface UsersApiUpdateLanguageResponse {
	/**
	 * Updated language code
	 */
	language: UsersApiLanguageEnum;
	/**
	 * Response title
	 */
	title: string;
	/**
	 * Response message
	 */
	message: string;
}

/**
 * Response schema for device registration
 */
export type UsersApiRegisterDeviceResponse = (null | null) | undefined;
