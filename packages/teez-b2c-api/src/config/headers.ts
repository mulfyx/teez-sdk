import { type ResolvedTeezClientConfig } from "./types";

export function buildUserAgent(appVersion: string): string {
	return `android;kz.teez.customer;${appVersion}`;
}

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
