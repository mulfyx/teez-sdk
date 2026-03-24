import { afterEach, describe, expect, test, vi } from "vitest";

import {
	defaultAppVersion,
	defaultBaseUrl,
	defaultLanguage,
	defaultTimeoutMs,
} from "../src/config/defaults";
import { buildHeaders, buildUserAgent } from "../src/config/headers";
import { defaultConfig, resolveConfig } from "../src/config/resolve";
import { supportedLanguages } from "../src/language";
import { mergeHeaders } from "../src/transport/headers";

function toArray<T>(value: T | T[]): T[] {
	return Array.isArray(value) ? value : [value];
}

describe("constants", () => {
	test("expose expected runtime values", () => {
		expect(defaultBaseUrl).toBe("https://b2c-api.teez.kz");
		expect(defaultAppVersion).toBe("200");
		expect(defaultLanguage).toBe("ru");
		expect(defaultTimeoutMs).toBe(30_000);
		expect(supportedLanguages).toEqual(["ru", "kz"]);
	});
});

describe("config", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	test("exports the expected default config", () => {
		expect(defaultConfig.baseUrl).toBe(defaultBaseUrl);
		expect(defaultConfig.appVersion).toBe(defaultAppVersion);
		expect(defaultConfig.language).toBe(defaultLanguage);
		expect(defaultConfig.timeout).toBe(defaultTimeoutMs);
		expect(defaultConfig.headers).toBeInstanceOf(Headers);
		expect(defaultConfig.fetch).toBeTypeOf("function");
	});

	test("resolves config overrides and merges headers", () => {
		const fetchImplementation = vi.fn() as unknown as typeof fetch;
		const config = resolveConfig({
			appVersion: "999",
			baseUrl: "https://example.com",
			fetch: fetchImplementation,
			headers: {
				"X-Test": "1",
			},
			language: "kz",
			timeout: 1234,
			token: "token-123",
		});

		expect(config.baseUrl).toBe("https://example.com");
		expect(config.appVersion).toBe("999");
		expect(config.language).toBe("kz");
		expect(config.timeout).toBe(1234);
		expect(config.token).toBe("token-123");
		expect(config.fetch).toBe(fetchImplementation);
		expect(config.headers.get("x-test")).toBe("1");
	});

	test("falls back to defaults when config is omitted", () => {
		expect(resolveConfig()).toEqual(defaultConfig);
	});

	test("omits default fetch when runtime fetch is unavailable", async () => {
		vi.resetModules();
		vi.stubGlobal("fetch", undefined);

		const { defaultConfig: defaultConfigWithoutFetch } =
			await import("../src/config/resolve");

		expect(defaultConfigWithoutFetch.fetch).toBeUndefined();
	});

	test("builds the expected user agent string", () => {
		expect(buildUserAgent("321")).toBe("android;kz.teez.customer;321");
	});

	test("builds headers with auth and custom values", () => {
		const headers = buildHeaders(
			resolveConfig({
				appVersion: "321",
				headers: {
					"X-Test": "1",
				},
				language: "kz",
				token: "secret",
			}),
		);

		expect(headers.get("accept-language")).toBe("kz");
		expect(headers.get("user-agent")).toBe("android;kz.teez.customer;321");
		expect(headers.get("x-app-version")).toBe("321");
		expect(headers.get("authorization")).toBe("Bearer secret");
		expect(headers.get("x-test")).toBe("1");
	});

	test("builds headers without auth when token is missing", () => {
		const headers = buildHeaders(resolveConfig());

		expect(headers.has("authorization")).toBe(false);
	});
});

describe("utils", () => {
	test("merges headers without mutating the source", () => {
		const source = new Headers({
			"X-Base": "1",
			"X-Shared": "before",
		});

		const result = mergeHeaders(source, {
			"X-Extra": "2",
			"X-Shared": "after",
		});

		expect(result).not.toBe(source);
		expect(source.get("x-shared")).toBe("before");
		expect(result.get("x-base")).toBe("1");
		expect(result.get("x-shared")).toBe("after");
		expect(result.get("x-extra")).toBe("2");
	});

	test("merges headers when overrides are omitted", () => {
		const result = mergeHeaders({
			"X-Test": "1",
		});

		expect(result.get("x-test")).toBe("1");
	});

	test("normalizes values to arrays", () => {
		const values = [1, 2, 3];

		expect(toArray(1)).toEqual([1]);
		expect(toArray(values)).toBe(values);
	});
});
