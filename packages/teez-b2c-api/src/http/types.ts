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
	 * Relative path to the resource.
	 */
	path: string;

	/**
	 * Query parameters to append to the URL.
	 */
	params?: QueryParams;

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
export type HttpGetOptions = Omit<HttpRequestOptions, "method" | "body">;

/**
 * Options for making a POST request.
 */
export type HttpPostOptions = Omit<HttpRequestOptions, "method">;

/**
 * Options for making a PATCH request.
 */
export type HttpPatchOptions = Omit<HttpRequestOptions, "method">;

/**
 * Options for making a DELETE request.
 */
export type HttpDeleteOptions = Omit<HttpRequestOptions, "method">;
