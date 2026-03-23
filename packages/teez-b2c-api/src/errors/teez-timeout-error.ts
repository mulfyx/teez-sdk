import { TeezError } from "./teez-error";

export interface TeezTimeoutErrorOptions extends ErrorOptions {
	method: string;
	url: URL;
	operationName?: string;
	timeout: number;
}

export class TeezTimeoutError extends TeezError {
	public override name = "TeezTimeoutError";

	public readonly method: string;

	public readonly url: URL;

	public readonly operationName?: string;

	public readonly timeout: number;

	public constructor(
		message: string,
		{
			method,
			url,
			operationName,
			timeout,
			...errorOptions
		}: TeezTimeoutErrorOptions,
	) {
		super(message, errorOptions);

		this.method = method;
		this.url = url;
		this.operationName = operationName;
		this.timeout = timeout;
	}
}
