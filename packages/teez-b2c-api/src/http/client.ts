import { buildHeaders, type ResolvedTeezClientConfig } from "../config";
import { TeezApiError } from "../errors/teez-api-error";
import { TeezNetworkError } from "../errors/teez-network-error";
import { TeezTimeoutError } from "../errors/teez-timeout-error";
import { buildUrl, parseResponse } from "./helpers";
import {
	type HttpDeleteOptions,
	type HttpGetOptions,
	type HttpPatchOptions,
	type HttpPostOptions,
	type HttpRequestOptions,
} from "./types";
import type * as z from "zod/mini";

/**
 * Internal HTTP client for making API requests.
 */
export class HttpClient {
	/**
	 * Client configuration.
	 */
	private readonly config: ResolvedTeezClientConfig;

	/**
	 * Headers to include in all requests.
	 */
	private readonly headers: Record<string, string>;

	/**
	 * Initializes a new instance of the HttpClient.
	 *
	 * @param config Resolved client configuration.
	 */
	public constructor(config: ResolvedTeezClientConfig) {
		this.config = config;

		this.headers = buildHeaders(config);
	}

	/**
	 * Performs a low-level HTTP request.
	 *
	 * @param options Request options.
	 */
	public async request(options: HttpRequestOptions): Promise<unknown> {
		const { url, headers, ...fetchOptions } = options;

		const controller = new AbortController();

		const timeoutId = setTimeout(() => {
			controller.abort();
		}, this.config.timeout);

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

			if (response.status === 204) {
				return undefined;
			}

			return await response.json();
		} catch (error) {
			if (error instanceof TeezApiError) {
				throw error;
			}

			if (error instanceof DOMException && error.name === "AbortError") {
				throw new TeezTimeoutError(
					`Request timed out after ${this.config.timeout}ms`,
					{
						url,
						timeout: this.config.timeout,
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

		const url = buildUrl(path, this.config.baseUrl, params);

		const data = await this.request({
			url,
			method: "GET",
			...rest,
		});

		return parseResponse(schema, data);
	}

	/**
	 * Performs a POST request.
	 */
	public post(options: HttpPostOptions): Promise<unknown> {
		const { path, params, body, ...rest } = options;

		const url = buildUrl(path, this.config.baseUrl, params);

		return this.request({
			url,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: body != undefined ? JSON.stringify(body) : undefined,
			...rest,
		});
	}

	/**
	 * Performs a PATCH request.
	 */
	public patch(options: HttpPatchOptions): Promise<unknown> {
		const { path, params, body, ...rest } = options;

		const url = buildUrl(path, this.config.baseUrl, params);

		return this.request({
			url,
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: body != undefined ? JSON.stringify(body) : undefined,
			...rest,
		});
	}

	/**
	 * Performs a DELETE request.
	 */
	public delete(options: HttpDeleteOptions): Promise<unknown> {
		const { path, params, ...rest } = options;

		const url = buildUrl(path, this.config.baseUrl, params);

		return this.request({
			url,
			method: "DELETE",
			...rest,
		});
	}
}
