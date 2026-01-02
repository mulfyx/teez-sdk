import type * as z from "zod/mini";

/**
 * Type representing URL query parameters.
 */
export type QueryParams = Record<string, unknown>;

/**
 * Options for making a generic HTTP request.
 */
export interface HttpRequestOptions extends Omit<
	RequestInit,
	"headers" | "signal" | "body"
> {
	/**
	 * Full URL for the request.
	 */
	url: string;

	/**
	 * Additional headers for this specific request.
	 */
	headers?: Record<string, string>;

	/**
	 * Request body to send.
	 * It will be strictly serialized to JSON.
	 */
	body?: unknown;
}

/**
 * Options for making a GET request.
 */
export interface HttpGetOptions<T extends z.ZodMiniType> extends Omit<
	HttpRequestOptions,
	"url" | "method" | "body"
> {
	/**
	 * Relative path to the resource.
	 */
	path: string;

	/**
	 * Query parameters to append to the URL.
	 */
	params?: QueryParams;

	/**
	 * Zod schema to validate the response.
	 */
	schema: T;
}

/**
 * Options for making a POST request.
 */
export interface HttpPostOptions extends Omit<
	HttpRequestOptions,
	"url" | "method"
> {
	/**
	 * Relative path to the resource.
	 */
	path: string;

	/**
	 * Query parameters to append to the URL.
	 */
	params?: QueryParams;
}

/**
 * Options for making a PATCH request.
 */
export interface HttpPatchOptions extends Omit<
	HttpRequestOptions,
	"url" | "method"
> {
	/**
	 * Relative path to the resource.
	 */
	path: string;

	/**
	 * Query parameters to append to the URL.
	 */
	params?: QueryParams;
}

/**
 * Options for making a DELETE request.
 */
export interface HttpDeleteOptions extends Omit<
	HttpRequestOptions,
	"url" | "method"
> {
	/**
	 * Relative path to the resource.
	 */
	path: string;

	/**
	 * Query parameters to append to the URL.
	 */
	params?: QueryParams;
}
