import { TeezError } from "./teez-error";

/**
 * Options for constructing a TeezTimeoutError.
 */
export interface TeezTimeoutErrorOptions extends ErrorOptions {
	/**
	 * URL of the request that timed out.
	 */
	url: URL;

	/**
	 * Timeout duration in milliseconds.
	 */
	timeout: number;
}

/**
 * Error thrown when an API request times out.
 */
export class TeezTimeoutError extends TeezError {
	public override name = "TeezTimeoutError";

	/**
	 * URL of the request that timed out.
	 */
	public readonly url: URL;

	/**
	 * Timeout duration in milliseconds.
	 */
	public readonly timeout: number;

	public constructor(
		message: string,
		{ url, timeout, ...errorOptions }: TeezTimeoutErrorOptions,
	) {
		super(message, errorOptions);

		this.url = url;
		this.timeout = timeout;
	}
}
