import { buildHeaders } from "../config/headers";
import { type ResolvedTeezClientConfig } from "../config/types";
import { TeezApiError } from "../errors/teez-api-error";
import { TeezError } from "../errors/teez-error";
import { TeezNetworkError } from "../errors/teez-network-error";
import { TeezTimeoutError } from "../errors/teez-timeout-error";
import {
	type HttpOperationRequestArguments,
	type HttpOperationSuccessResponse,
} from "../http-operation/inference";
import { type AnyHttpOperationDef } from "../http-operation/types";
import { mergeHeaders } from "./headers";
import {
	formatOperationMessage,
	parseErrorResponse,
	parseInput,
	parseResponse,
} from "./parsing";
import { interpolatePath } from "./path";
import { buildUrl } from "./query";
import { readResponseBody } from "./response-body";
import {
	type HeadersInit,
	type HttpRequestOptions,
	type QueryParams,
} from "./types";

interface HttpRequestContext {
	readonly operationName?: string;
}

export class HttpClient {
	private readonly config: ResolvedTeezClientConfig;

	private readonly headers: Headers;

	public constructor(config: ResolvedTeezClientConfig) {
		this.config = config;

		this.headers = buildHeaders(config);
	}

	public async request(
		{
			method,
			path,
			query,
			headers: headersRaw,
			body: bodyRaw,
			...options
		}: HttpRequestOptions,
		context?: HttpRequestContext,
	): Promise<Response> {
		const url = buildUrl(path, this.config.baseUrl, query);
		const headers = mergeHeaders(this.headers, headersRaw);

		const fetchImplementation = this.config.fetch;

		if (fetchImplementation == undefined) {
			throw new TeezError(
				"Fetch implementation is not available in the current runtime",
			);
		}

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
			return await fetchImplementation(url, {
				...options,
				method,
				headers,
				body,
				signal: controller.signal,
			});
		} catch (error) {
			if (error instanceof TeezError) {
				throw error;
			}

			if (error instanceof DOMException && error.name === "AbortError") {
				throw new TeezTimeoutError(
					formatOperationMessage(
						`request timed out after ${this.config.timeout}ms`,
						context?.operationName,
					),
					{
						method,
						url,
						operationName: context?.operationName,
						timeout: this.config.timeout,
						cause: error,
					},
				);
			}

			throw new TeezNetworkError(
				formatOperationMessage(
					"network request failed",
					context?.operationName,
				),
				{
					method,
					url,
					operationName: context?.operationName,
					cause: error,
				},
			);
		} finally {
			clearTimeout(timeoutId);
		}
	}

	public async execute<T extends AnyHttpOperationDef>(
		operation: T,
		...args: HttpOperationRequestArguments<T>
	): Promise<HttpOperationSuccessResponse<T>> {
		const requestSections = args[0];

		const pathSection =
			requestSections != undefined && "path" in requestSections
				? requestSections.path
				: undefined;

		const querySection =
			requestSections != undefined && "query" in requestSections
				? requestSections.query
				: undefined;

		const headersSection =
			requestSections != undefined && "headers" in requestSections
				? requestSections.headers
				: undefined;

		const bodySection =
			requestSections != undefined && "body" in requestSections
				? requestSections.body
				: undefined;

		const pathInput =
			operation.request.path.schema == undefined
				? undefined
				: parseInput(
						operation.request.path.schema,
						pathSection,
						operation.name,
					);

		const queryInput =
			operation.request.query?.schema == undefined
				? undefined
				: parseInput(
						operation.request.query.schema,
						querySection,
						operation.name,
					);

		const headersInput =
			operation.request.headers?.schema == undefined
				? undefined
				: parseInput(
						operation.request.headers.schema,
						headersSection,
						operation.name,
					);

		const bodyInput =
			operation.request.body?.schema == undefined
				? undefined
				: parseInput(
						operation.request.body.schema,
						bodySection,
						operation.name,
					);

		const path = interpolatePath(operation.request.path.template, pathInput);

		const query = queryInput as QueryParams | undefined;
		const headers = headersInput as HeadersInit | undefined;

		try {
			const response = await this.request(
				{
					method: operation.request.method,
					path,
					query,
					headers,
					body: bodyInput,
				},
				{
					operationName: operation.name,
				},
			);

			const data = await readResponseBody(response);

			const responseConfig = operation.responses[response.status];

			if (!response.ok) {
				throw new TeezApiError(
					formatOperationMessage(
						`API request failed (${operation.request.method} ${response.status} ${response.statusText})`,
						operation.name,
					),
					{
						method: operation.request.method,
						url: buildUrl(path, this.config.baseUrl, query),
						operationName: operation.name,
						status: response.status,
						statusText: response.statusText,
						body: data,
						parsedBody:
							responseConfig?.schema == undefined
								? undefined
								: parseErrorResponse(
										responseConfig.schema,
										data,
										operation.name,
										response.status,
									),
					},
				);
			}

			if (responseConfig == undefined) {
				throw new TeezError(
					formatOperationMessage(
						`unexpected successful response status ${response.status}`,
						operation.name,
					),
				);
			}

			if (responseConfig.schema == undefined) {
				return undefined as HttpOperationSuccessResponse<T>;
			}

			return parseResponse(
				responseConfig.schema,
				data,
				operation.name,
			) as HttpOperationSuccessResponse<T>;
		} catch (error) {
			if (error instanceof TeezApiError) {
				throw error;
			}

			throw error;
		}
	}
}
