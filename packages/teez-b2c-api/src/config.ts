import { BASE_URL, DEFAULT_APP_VERSION } from "./common/constants";
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
	 * JWT bearer token for authenticated requests.
	 */
	token?: string;

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
	 * Request timeout in milliseconds.
	 * @default 30000
	 */
	timeout?: number;

	/**
	 * Custom headers to include in all requests.
	 */
	headers?: Record<string, string>;
}

/**
 * Fully resolved configuration with defaults applied.
 */
export interface ResolvedTeezClientConfig {
	/**
	 * Base URL for the API.
	 */
	readonly baseUrl: string;

	/**
	 * JWT bearer token for authenticated requests.
	 */
	readonly token?: string;

	/**
	 * Application version string.
	 */
	readonly appVersion: string;

	/**
	 * Language for API responses.
	 */
	readonly language: Language;

	/**
	 * Request timeout in milliseconds.
	 */
	readonly timeout: number;

	/**
	 * Custom headers included in requests.
	 */
	readonly headers: Readonly<Record<string, string>>;
}

/**
 * Default configuration values.
 */
export const DEFAULT_CONFIG: ResolvedTeezClientConfig = {
	baseUrl: BASE_URL,
	appVersion: DEFAULT_APP_VERSION,
	language: "ru",
	timeout: 30_000,
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
		token: config?.token,
		appVersion: config?.appVersion ?? DEFAULT_CONFIG.appVersion,
		language: config?.language ?? DEFAULT_CONFIG.language,
		timeout: config?.timeout ?? DEFAULT_CONFIG.timeout,
		headers: {
			...DEFAULT_CONFIG.headers,
			...config?.headers,
		},
	};
}

/**
 * Builds a standard user-agent string for the Teez client.
 */
export function buildUserAgent(appVersion: string): string {
	return `android;kz.teez.customer;${appVersion}`;
}

/**
 * Builds the headers object for API requests based on configuration.
 */
export function buildHeaders(
	config: ResolvedTeezClientConfig,
): Record<string, string> {
	const headers: Record<string, string> = {
		"accept-language": config.language,
		"user-agent": buildUserAgent(config.appVersion),
		"x-app-version": config.appVersion,
		...config.headers,
	};

	if (config.token != undefined) {
		headers["authorization"] = `Bearer ${config.token}`;
	}

	return headers;
}
