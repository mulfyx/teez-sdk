import { BASE_URL, DEFAULT_HEADERS } from "./common/constants";
import { type Language } from "./common/types";

/**
 * Configuration options for the Teez client.
 */
export interface TeezClientConfig {
	/**
	 * Base URL for the API.
	 * @default "https://b2c-api.teez.kz"
	 */
	baseUrl?: string;

	/**
	 * Request timeout in milliseconds.
	 * @default 30000
	 */
	timeout?: number;

	/**
	 * User-Agent string to identify the client.
	 * @default "android;kz.teez.customer;193"
	 */
	userAgent?: string;

	/**
	 * Application version string.
	 * @default "193"
	 */
	appVersion?: string;

	/**
	 * Language for API responses.
	 * @default "ru"
	 */
	language?: Language;

	/**
	 * Custom headers to include in all requests.
	 */
	headers?: Record<string, string>;
}

/**
 * Fully resolved configuration with defaults applied.
 */
export interface ResolvedTeezClientConfig {
	/** Base URL for the API. */
	readonly baseUrl: string;

	/** Request timeout in milliseconds. */
	readonly timeout: number;

	/** User-Agent string. */
	readonly userAgent: string;

	/** Application version string. */
	readonly appVersion: string;

	/** Language for API responses. */
	readonly language: Language;

	/** Custom headers included in requests. */
	readonly headers: Readonly<Record<string, string>>;
}

/**
 * Default configuration values.
 */
export const DEFAULT_CONFIG: ResolvedTeezClientConfig = {
	baseUrl: BASE_URL,
	timeout: 30_000,
	userAgent: DEFAULT_HEADERS["user-agent"],
	appVersion: DEFAULT_HEADERS["x-app-version"],
	language: "ru",
	headers: {},
};

/**
 * Merges user configuration with defaults.
 */
export function resolveConfig(
	config?: TeezClientConfig,
): ResolvedTeezClientConfig {
	return {
		baseUrl: config?.baseUrl ?? DEFAULT_CONFIG.baseUrl,
		timeout: config?.timeout ?? DEFAULT_CONFIG.timeout,
		userAgent: config?.userAgent ?? DEFAULT_CONFIG.userAgent,
		appVersion: config?.appVersion ?? DEFAULT_CONFIG.appVersion,
		language: config?.language ?? DEFAULT_CONFIG.language,
		headers: {
			...DEFAULT_CONFIG.headers,
			...config?.headers,
		},
	};
}

/**
 * Builds the headers object for API requests based on configuration.
 */
export function buildHeaders(
	config: ResolvedTeezClientConfig,
): Record<string, string> {
	return {
		"user-agent": config.userAgent,
		"x-app-version": config.appVersion,
		"accept-language": config.language,
		...config.headers,
	};
}
