import { buildHeaders, type ResolvedTeezClientConfig } from "../config";
import { TeezApiError } from "../errors/teez-api-error";
import { TeezNetworkError } from "../errors/teez-network-error";
import { TeezTimeoutError } from "../errors/teez-timeout-error";
import { buildUrl, parseResponse } from "./helpers";
import { type HttpGetOptions, type HttpRequestOptions } from "./types";
import type * as z from "zod/mini";

/**
 * Internal HTTP client for making API requests.
 */
export class HttpClient {
	/**
	 * Base URL for all requests.
	 */
	private readonly baseUrl: string;

	/**
	 * Headers to include in all requests.
	 */
	private readonly headers: Record<string, string>;

	/**
	 * Request timeout in milliseconds.
	 */
	private readonly timeout: number;

	public constructor(config: ResolvedTeezClientConfig) {
		this.baseUrl = config.baseUrl;

		this.headers = buildHeaders(config);

		this.timeout = config.timeout;
	}

	/**
	 * Performs a low-level HTTP request.
	 */
	public async request(options: HttpRequestOptions): Promise<unknown> {
		const { url, headers, ...fetchOptions } = options;

		const controller = new AbortController();

		const timeoutId = setTimeout(() => {
			controller.abort();
		}, this.timeout);

		try {
			const response = await fetch(url, {
				...fetchOptions,
				headers: {
					...this.headers,
					...headers,
				},
				signal: controller.signal,
			});

			if (!response.ok) {
				let body;

				try {
					body = await response.json();
				} catch {
					body = await response.text().catch(() => undefined);
				}

				throw new TeezApiError(
					`API request failed: ${response.status} ${response.statusText}`,
					{
						url,
						status: response.status,
						statusText: response.statusText,
						body,
					},
				);
			}

			return await response.json();
		} catch (error) {
			if (error instanceof TeezApiError) {
				throw error;
			}

			if (error instanceof DOMException && error.name === "AbortError") {
				throw new TeezTimeoutError(
					`Request timed out after ${this.timeout}ms`,
					{
						url,
						timeout: this.timeout,
						cause: error,
					},
				);
			}

			throw new TeezNetworkError(`Network request failed`, {
				url,
				cause: error,
			});
		} finally {
			clearTimeout(timeoutId);
		}
	}

	/**
	 * Performs a GET request and validates the response.
	 */
	public async get<T extends z.ZodMiniType>(
		options: HttpGetOptions<T>,
	): Promise<z.output<T>> {
		const { path, params, schema, ...rest } = options;

		const url = buildUrl(path, this.baseUrl, params);

		const data = await this.request({
			url,
			method: "GET",
			...rest,
		});

		return parseResponse(schema, data);
	}
}
