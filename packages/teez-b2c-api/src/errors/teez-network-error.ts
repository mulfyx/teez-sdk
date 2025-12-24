import { TeezError } from "./teez-error";

/**
 * Options for constructing a TeezNetworkError.
 */
export interface TeezNetworkErrorOptions extends ErrorOptions {
	/**
	 * URL of the request that failed.
	 */
	url: string;
}

/**
 * Error thrown when a network request fails (e.g., DNS resolution, connection refused).
 */
export class TeezNetworkError extends TeezError {
	public override name = "TeezNetworkError";

	/**
	 * URL of the request that failed.
	 */
	public readonly url: string;

	public constructor(
		message: string,
		{ url, ...errorOptions }: TeezNetworkErrorOptions,
	) {
		super(message, errorOptions);

		this.url = url;
	}
}
