import { type LANGUAGES, type SORT_OPTIONS } from "./constants";

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

/**
 * Available sorting options for API listings.
 */
export type SortOption =
	| (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS]
	| (string & {});
