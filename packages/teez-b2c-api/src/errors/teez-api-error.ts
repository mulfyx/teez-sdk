import { TeezError } from "./teez-error";

export interface TeezApiErrorOptions extends ErrorOptions {
	method: string;
	url: URL;
	operationName?: string;
	status: number;
	statusText: string;
	body?: unknown;
	parsedBody?: unknown;
}

export class TeezApiError extends TeezError {
	public override name = "TeezApiError";

	public readonly method: string;

	public readonly url: URL;

	public readonly operationName?: string;

	public readonly status: number;

	public readonly statusText: string;

	public readonly body?: unknown;

	public parsedBody?: unknown;

	public constructor(
		message: string,
		{
			method,
			url,
			operationName,
			status,
			statusText,
			body,
			parsedBody,
			...errorOptions
		}: TeezApiErrorOptions,
	) {
		super(message, errorOptions);

		this.method = method;
		this.url = url;
		this.operationName = operationName;
		this.status = status;
		this.statusText = statusText;
		this.body = body;
		this.parsedBody = parsedBody;
	}
}
