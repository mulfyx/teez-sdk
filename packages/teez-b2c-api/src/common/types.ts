import { type LANGUAGES } from "./constants";

/**
 * Supported languages for the API.
 */
export type Language =
	| (typeof LANGUAGES)[keyof typeof LANGUAGES]
	| (string & {});

/**
 * Base parameters for API requests.
 */
export type BaseParams = Record<string, unknown>;
