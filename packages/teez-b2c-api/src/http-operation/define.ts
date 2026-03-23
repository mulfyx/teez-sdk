import {
	type HttpOperationConfig,
	type HttpOperationDef,
	type HttpOperationRequestConfig,
	type HttpOperationRequestPathConfig,
	type HttpOperationResponses,
	type NormalizeHttpOperationRequest,
	type NormalizeHttpOperationRequestPath,
} from "./types";
import { validatePathSchema, validateResponses } from "./validation";

function normalizeRequestPath<TPath extends HttpOperationRequestPathConfig>(
	path: TPath,
): NormalizeHttpOperationRequestPath<TPath> {
	return (
		typeof path === "string" ? { template: path } : path
	) as NormalizeHttpOperationRequestPath<TPath>;
}

function normalizeRequest<TRequest extends HttpOperationRequestConfig>(
	request: TRequest,
): NormalizeHttpOperationRequest<TRequest> {
	return {
		...request,
		path: normalizeRequestPath(request.path),
	} as unknown as NormalizeHttpOperationRequest<TRequest>;
}

export function defineHttpOperation<
	const TDomain extends string,
	const TAction extends string,
	const TRequest extends HttpOperationRequestConfig,
	const TResponses extends HttpOperationResponses,
>(
	operation: HttpOperationConfig<TDomain, TAction, TRequest, TResponses>,
): HttpOperationDef<
	TDomain,
	TAction,
	NormalizeHttpOperationRequest<TRequest>,
	TResponses
> {
	const name = `${operation.domain}.${operation.action}` as const;
	const request = normalizeRequest(operation.request);
	const safety =
		operation.safety ?? (request.method === "GET" ? "read" : "write");

	validatePathSchema(request, name);
	validateResponses(operation.responses, name);

	return {
		domain: operation.domain,
		action: operation.action,
		name,
		auth: operation.auth,
		safety,
		summary: operation.summary,
		description: operation.description,
		request,
		responses: operation.responses,
	};
}
