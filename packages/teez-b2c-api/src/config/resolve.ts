import { mergeHeaders } from "../transport/headers";
import {
	defaultAppVersion,
	defaultBaseUrl,
	defaultLanguage,
	defaultTimeoutMs,
} from "./defaults";
import { type ResolvedTeezClientConfig, type TeezClientConfig } from "./types";

export const defaultConfig: ResolvedTeezClientConfig = {
	baseUrl: defaultBaseUrl,
	appVersion: defaultAppVersion,
	language: defaultLanguage,
	timeout: defaultTimeoutMs,
	headers: new Headers(),
	fetch:
		typeof globalThis.fetch === "function"
			? globalThis.fetch.bind(globalThis)
			: undefined,
};

export function resolveConfig(
	config?: TeezClientConfig,
): ResolvedTeezClientConfig {
	const headers = mergeHeaders(defaultConfig.headers, config?.headers);

	return {
		baseUrl: config?.baseUrl ?? defaultConfig.baseUrl,
		token: config?.token,
		appVersion: config?.appVersion ?? defaultConfig.appVersion,
		language: config?.language ?? defaultConfig.language,
		timeout: config?.timeout ?? defaultConfig.timeout,
		headers,
		fetch: config?.fetch ?? defaultConfig.fetch,
	};
}
