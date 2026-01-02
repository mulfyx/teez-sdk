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
	 */
	public constructor(config: ResolvedTeezClientConfig) {
		this.config = config;

		this.headers = buildHeaders(config);
	}

	/**
	 * Performs a low-level HTTP request.
	 */
	public async request({
		url,
		headers,
		body,
		...options
	}: HttpRequestOptions): Promise<unknown> {
		const controller = new AbortController();

		const timeoutId = setTimeout(() => {
			controller.abort();
		}, this.config.timeout);

		const finalHeaders: Record<string, string> = {
			...this.headers,
			...headers,
		};

		let finalBody: RequestInit["body"] | undefined;

		if (body !== undefined) {
			finalBody = JSON.stringify(body);

			if (finalHeaders["Content-Type"] == undefined) {
				finalHeaders["Content-Type"] = "application/json";
			}
		}

		try {
			const response = await fetch(url, {
				...options,
				headers: finalHeaders,
				body: finalBody,
				signal: controller.signal,
			});

			if (!response.ok) {
				let errorBody;

				try {
					errorBody = await response.json();
				} catch {
					errorBody = await response.text().catch(() => undefined);
				}

				throw new TeezApiError(
					`API request failed: ${response.status} ${response.statusText}`,
					{
						url,
						status: response.status,
						statusText: response.statusText,
						body: errorBody,
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
	public async get<T extends z.ZodMiniType>({
		path,
		params,
		schema,
		...options
	}: HttpGetOptions<T>): Promise<z.output<T>> {
		const url = buildUrl(path, this.config.baseUrl, params);

		const data = await this.request({
			...options,
			url,
			method: "GET",
		});

		return parseResponse(schema, data);
	}

	/**
	 * Performs a POST request.
	 */
	public post({ path, params, ...options }: HttpPostOptions): Promise<unknown> {
		const url = buildUrl(path, this.config.baseUrl, params);

		return this.request({
			...options,
			url,
			method: "POST",
		});
	}

	/**
	 * Performs a PATCH request.
	 */
	public patch({
		path,
		params,
		...options
	}: HttpPatchOptions): Promise<unknown> {
		const url = buildUrl(path, this.config.baseUrl, params);

		return this.request({
			...options,
			url,
			method: "PATCH",
		});
	}

	/**
	 * Performs a DELETE request.
	 */
	public delete({
		path,
		params,
		...options
	}: HttpDeleteOptions): Promise<unknown> {
		const url = buildUrl(path, this.config.baseUrl, params);

		return this.request({
			...options,
			url,
			method: "DELETE",
		});
	}
}
