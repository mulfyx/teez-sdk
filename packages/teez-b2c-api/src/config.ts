import { BASE_URL, DEFAULT_APP_VERSION } from "./common/constants";
import { type Language } from "./common/types";
import { type HeadersInit } from "./http/types";
import { mergeHeaders } from "./utils/merge-headers";

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
	headers?: HeadersInit;
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
	 * Resolved headers as Headers object for efficient manipulation.
	 */
	readonly headers: Headers;
}

/**
 * Default configuration values.
 */
export const DEFAULT_CONFIG: ResolvedTeezClientConfig = {
	baseUrl: BASE_URL,
	appVersion: DEFAULT_APP_VERSION,
	language: "ru",
	timeout: 30_000,
	headers: new Headers(),
};

/**
 * Merges user configuration with defaults.
 */
export function resolveConfig(
	config?: TeezClientConfig,
): ResolvedTeezClientConfig {
	const headers = mergeHeaders(DEFAULT_CONFIG.headers, config?.headers);

	return {
		baseUrl: config?.baseUrl ?? DEFAULT_CONFIG.baseUrl,
		token: config?.token,
		appVersion: config?.appVersion ?? DEFAULT_CONFIG.appVersion,
		language: config?.language ?? DEFAULT_CONFIG.language,
		timeout: config?.timeout ?? DEFAULT_CONFIG.timeout,
		headers,
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
export function buildHeaders(config: ResolvedTeezClientConfig): Headers {
	const headers = new Headers(config.headers);

	headers.set("Accept-Language", config.language);
	headers.set("User-Agent", buildUserAgent(config.appVersion));
	headers.set("X-App-Version", config.appVersion);

	if (config.token != undefined) {
		headers.set("Authorization", `Bearer ${config.token}`);
	}

	return headers;
}
