import { TeezError } from "./teez-error";

export interface TeezNetworkErrorOptions extends ErrorOptions {
	method: string;
	url: URL;
	operationName?: string;
}

export class TeezNetworkError extends TeezError {
	public override name = "TeezNetworkError";

	public readonly method: string;

	public readonly url: URL;

	public readonly operationName?: string;

	public constructor(
		message: string,
		{ method, url, operationName, ...errorOptions }: TeezNetworkErrorOptions,
	) {
		super(message, errorOptions);

		this.method = method;
		this.url = url;
		this.operationName = operationName;
	}
}
