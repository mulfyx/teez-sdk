import { TeezError } from "./teez-error";

/**
 * Options for constructing a TeezApiError.
 */
export interface TeezApiErrorOptions extends ErrorOptions {
	/**
	 * URL of the request that failed.
	 */
	url: URL;

	/**
	 * HTTP status code.
	 */
	status: number;

	/**
	 * HTTP status text.
	 */
	statusText: string;

	/**
	 * Response body, if any.
	 */
	body?: unknown;
}

/**
 * Error thrown when the API response indicates a failure (4xx or 5xx status).
 */
export class TeezApiError extends TeezError {
	public override name = "TeezApiError";

	/**
	 * URL of the request that failed.
	 */
	public readonly url: URL;

	/**
	 * HTTP status code.
	 */
	public readonly status: number;

	/**
	 * HTTP status text.
	 */
	public readonly statusText: string;

	/**
	 * Response body, if available.
	 */
	public readonly body?: unknown;

	public constructor(
		message: string,
		{ url, status, statusText, body, ...errorOptions }: TeezApiErrorOptions,
	) {
		super(message, errorOptions);

		this.url = url;
		this.status = status;
		this.statusText = statusText;
		this.body = body;
	}

	/**
	 * Checks if the status code is a client error (4xx).
	 */
	public get isClientError(): boolean {
		return this.status >= 400 && this.status < 500;
	}

	/**
	 * Checks if the status code is a server error (5xx).
	 */
	public get isServerError(): boolean {
		return this.status >= 500;
	}

	/**
	 * Checks if the status code indicates a Not Found error (404).
	 */
	public get isNotFound(): boolean {
		return this.status === 404;
	}
}
