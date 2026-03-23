import { type ZodMiniObject, type ZodMiniType } from "zod/mini";

import { type Simplify } from "../type-utils/simplify";

export type HttpOperationMethod = "DELETE" | "GET" | "PATCH" | "POST";

export type HttpOperationAuth = "none" | "optional" | "required";

export type HttpOperationSafety = "read" | "write";

export type ZodObjectSchema = ZodMiniObject<Record<string, ZodMiniType>>;

export interface HttpOperationRequestPath {
	readonly template: string;
	readonly schema?: ZodObjectSchema;
}

export type HttpOperationRequestPathConfig = string | HttpOperationRequestPath;

export interface HttpOperationRequestQuery {
	readonly schema: ZodObjectSchema;
}

export interface HttpOperationRequestHeaders {
	readonly schema: ZodObjectSchema;
}

export interface HttpOperationRequestBody {
	readonly schema: ZodMiniType;
	readonly contentType?: string;
}

export interface HttpOperationRequest {
	readonly method: HttpOperationMethod;
	readonly path: HttpOperationRequestPath;
	readonly query?: HttpOperationRequestQuery;
	readonly headers?: HttpOperationRequestHeaders;
	readonly body?: HttpOperationRequestBody;
}

export interface HttpOperationRequestConfig {
	readonly method: HttpOperationMethod;
	readonly path: HttpOperationRequestPathConfig;
	readonly query?: HttpOperationRequestQuery;
	readonly headers?: HttpOperationRequestHeaders;
	readonly body?: HttpOperationRequestBody;
}

export type NormalizeHttpOperationRequestPath<
	TPath extends HttpOperationRequestPathConfig,
> = TPath extends string
	? {
			readonly template: TPath;
			readonly schema?: undefined;
		}
	: TPath;

export type NormalizeHttpOperationRequest<
	TRequest extends HttpOperationRequestConfig,
> = Simplify<
	Omit<TRequest, "path"> & {
		readonly path: NormalizeHttpOperationRequestPath<TRequest["path"]>;
	}
>;

export interface HttpOperationJsonResponse<
	TSchema extends ZodMiniType = ZodMiniType,
> {
	readonly kind?: "json";
	readonly schema: TSchema;
	readonly description?: string;
	readonly contentType?: string;
}

export interface HttpOperationJsonResponseOptions<
	TSchema extends ZodMiniType = ZodMiniType,
> {
	readonly schema: TSchema;
	readonly description?: string;
	readonly contentType?: string;
}

export interface HttpOperationEmptyResponse {
	readonly kind?: "empty";
	readonly schema?: undefined;
	readonly description?: string;
	readonly contentType?: undefined;
}

export interface HttpOperationEmptyResponseOptions {
	readonly description?: string;
}

export type HttpOperationResponse =
	| HttpOperationJsonResponse
	| HttpOperationEmptyResponse;

export type HttpOperationResponses = Readonly<
	Partial<Record<number, HttpOperationResponse>>
>;

export interface HttpOperationConfig<
	TDomain extends string = string,
	TAction extends string = string,
	TRequest extends HttpOperationRequestConfig = HttpOperationRequestConfig,
	TResponses extends HttpOperationResponses = HttpOperationResponses,
> {
	readonly domain: TDomain;
	readonly action: TAction;
	readonly auth: HttpOperationAuth;
	readonly safety?: HttpOperationSafety;
	readonly summary: string;
	readonly description: string;
	readonly request: TRequest;
	readonly responses: TResponses;
}

export interface HttpOperationDef<
	TDomain extends string = string,
	TAction extends string = string,
	TRequest extends HttpOperationRequest = HttpOperationRequest,
	TResponses extends HttpOperationResponses = HttpOperationResponses,
> {
	readonly domain: TDomain;
	readonly action: TAction;
	readonly name: `${TDomain}.${TAction}`;
	readonly auth: HttpOperationAuth;
	readonly safety: HttpOperationSafety;
	readonly summary: string;
	readonly description: string;
	readonly request: TRequest;
	readonly responses: TResponses;
}

export type AnyHttpOperationDef = HttpOperationDef;
