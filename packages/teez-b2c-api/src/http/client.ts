import { buildHeaders, type ResolvedTeezClientConfig } from "../config";
import { TeezApiError } from "../errors/teez-api-error";
import { TeezError } from "../errors/teez-error";
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
import { type output as ZodInferOutput, type ZodMiniType } from "zod/mini";

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
	public request(options: HttpRequestOptions): Promise<unknown>;

	/**
	 * Performs a low-level HTTP request with schema validation.
	 */
	public request<T extends ZodMiniType>(
		options: HttpRequestOptions,
		schema: T,
	): Promise<ZodInferOutput<T>>;

	/**
	 * Implementation of request method.
	 */
	public async request<T extends ZodMiniType>(
		{
			path,
			params,
			headers: headersRaw,
			body: bodyRaw,
			...options
		}: HttpRequestOptions,
		schema?: T,
	): Promise<unknown> {
		const url = buildUrl(path, this.config.baseUrl, params);

		const headers = new Headers({
			...this.headers,
			...headersRaw,
		});

		let body: RequestInit["body"] | undefined;

		if (bodyRaw !== undefined) {
			body = JSON.stringify(bodyRaw);

			if (!headers.has("Content-Type")) {
				headers.set("Content-Type", "application/json");
			}
		}

		const controller = new AbortController();

		const timeoutId = setTimeout(() => {
			controller.abort();
		}, this.config.timeout);

		try {
			const response = await fetch(url, {
				...options,
				headers,
				body,
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

			const data = await response.json();

			return schema != undefined ? parseResponse(schema, data) : data;
		} catch (error) {
			if (error instanceof TeezError) {
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
	 * Performs a GET request.
	 */
	public get(options: HttpGetOptions): Promise<unknown>;

	/**
	 * Performs a GET request with schema validation.
	 */
	public get<T extends ZodMiniType>(
		options: HttpGetOptions,
		schema: T,
	): Promise<ZodInferOutput<T>>;

	/**
	 * Implementation of GET method.
	 */
	public get<T extends ZodMiniType>(
		options: HttpGetOptions,
		schema?: T,
	): Promise<unknown> {
		return schema != undefined
			? this.request({ ...options, method: "GET" }, schema)
			: this.request({ ...options, method: "GET" });
	}

	/**
	 * Performs a POST request.
	 */

	/**
	 * Performs a POST request with schema validation.
	 */
	public post<T extends ZodMiniType>(
		options: HttpPostOptions,
		schema: T,
	): Promise<ZodInferOutput<T>>;

	/**
	 * Implementation of POST method.
	 */
	public post<T extends ZodMiniType>(
		options: HttpPostOptions,
		schema?: T,
	): Promise<unknown> {
		return schema != undefined
			? this.request({ ...options, method: "POST" }, schema)
			: this.request({ ...options, method: "POST" });
	}

	/**
	 * Performs a PATCH request.
	 */
	public patch(options: HttpPatchOptions): Promise<unknown>;

	/**
	 * Performs a PATCH request with schema validation.
	 */
	public patch<T extends ZodMiniType>(
		options: HttpPatchOptions,
		schema: T,
	): Promise<ZodInferOutput<T>>;

	/**
	 * Implementation of PATCH method.
	 */
	public patch<T extends ZodMiniType>(
		options: HttpPatchOptions,
		schema?: T,
	): Promise<unknown> {
		return schema != undefined
			? this.request({ ...options, method: "PATCH" }, schema)
			: this.request({ ...options, method: "PATCH" });
	}

	/**
	 * Performs a DELETE request.
	 */
	public delete(options: HttpDeleteOptions): Promise<unknown>;

	/**
	 * Performs a DELETE request with schema validation.
	 */
	public delete<T extends ZodMiniType>(
		options: HttpDeleteOptions,
		schema: T,
	): Promise<ZodInferOutput<T>>;

	/**
	 * Implementation of DELETE method.
	 */
	public delete<T extends ZodMiniType>(
		options: HttpDeleteOptions,
		schema?: T,
	): Promise<unknown> {
		return schema != undefined
			? this.request({ ...options, method: "DELETE" }, schema)
			: this.request({ ...options, method: "DELETE" });
	}
}
