import {
	type ZodMiniType,
	type input as ZodSchemaInput,
	type output as ZodSchemaOutput,
} from "zod/mini";

import { type Simplify } from "../type-utils/simplify";
import { type HttpSuccessStatusCode } from "./status";
import {
	type AnyHttpOperationDef,
	type HttpOperationResponse,
	type ZodObjectSchema,
} from "./types";

type EmptyObject = Record<never, never>;

type PathSchemaOf<T extends AnyHttpOperationDef> =
	T["request"]["path"] extends { readonly schema: infer TPathSchema }
		? Extract<TPathSchema, ZodObjectSchema>
		: undefined;

type QuerySchemaOf<T extends AnyHttpOperationDef> = T["request"] extends {
	readonly query: { readonly schema: infer TQuerySchema };
}
	? Extract<TQuerySchema, ZodObjectSchema>
	: undefined;

type HeadersSchemaOf<T extends AnyHttpOperationDef> = T["request"] extends {
	readonly headers: { readonly schema: infer THeadersSchema };
}
	? Extract<THeadersSchema, ZodObjectSchema>
	: undefined;

type BodySchemaOf<T extends AnyHttpOperationDef> = T["request"] extends {
	readonly body: { readonly schema: infer TBodySchema };
}
	? Extract<TBodySchema, ZodMiniType>
	: undefined;

type RequestSectionEntry<
	TName extends string,
	TSchema extends ZodMiniType | undefined,
> = [TSchema] extends [ZodMiniType]
	? Readonly<Record<TName, ZodSchemaInput<Extract<TSchema, ZodMiniType>>>>
	: EmptyObject;

type RequestSectionFlatShape<TSchema extends ZodMiniType | undefined> = [
	TSchema,
] extends [undefined]
	? EmptyObject
	: TSchema extends ZodObjectSchema
		? ZodSchemaInput<TSchema>
		: never;

type MergeWithoutOverlaps<TLeft, TRight> = [TLeft] extends [never]
	? never
	: [TRight] extends [never]
		? never
		: Extract<keyof TLeft, keyof TRight> extends never
			? Simplify<TLeft & TRight>
			: never;

type FlatRequestOf<T extends AnyHttpOperationDef> = MergeWithoutOverlaps<
	MergeWithoutOverlaps<
		MergeWithoutOverlaps<
			RequestSectionFlatShape<PathSchemaOf<T>>,
			RequestSectionFlatShape<QuerySchemaOf<T>>
		>,
		RequestSectionFlatShape<HeadersSchemaOf<T>>
	>,
	RequestSectionFlatShape<BodySchemaOf<T>>
>;

type RequestInputOf<TRequest> = keyof TRequest extends never
	? undefined
	: TRequest;

type ResponseSchemaData<TResponse extends HttpOperationResponse | undefined> =
	TResponse extends { readonly schema: infer TResponseSchema }
		? [Extract<TResponseSchema, ZodMiniType>] extends [ZodMiniType]
			? ZodSchemaOutput<Extract<TResponseSchema, ZodMiniType>>
			: undefined
		: undefined;

export type HttpOperationResponseStatus<T extends AnyHttpOperationDef> =
	Extract<keyof T["responses"], number>;

export type HttpOperationSuccessStatus<T extends AnyHttpOperationDef> = Extract<
	HttpOperationResponseStatus<T>,
	HttpSuccessStatusCode
>;

export type HttpOperationResponseByStatus<
	T extends AnyHttpOperationDef,
	TStatus extends HttpOperationResponseStatus<T>,
> = ResponseSchemaData<T["responses"][TStatus]>;

export type HttpOperationRequestSections<T extends AnyHttpOperationDef> =
	Simplify<
		RequestSectionEntry<"path", PathSchemaOf<T>> &
			RequestSectionEntry<"query", QuerySchemaOf<T>> &
			RequestSectionEntry<"headers", HeadersSchemaOf<T>> &
			RequestSectionEntry<"body", BodySchemaOf<T>>
	>;

export type HttpOperationRequestInput<T extends AnyHttpOperationDef> =
	RequestInputOf<HttpOperationRequestSections<T>>;

export type HttpOperationRequestArguments<T extends AnyHttpOperationDef> = [
	HttpOperationRequestInput<T>,
] extends [undefined]
	? []
	: [request: HttpOperationRequestSections<T>];

export type HttpOperationFlatRequest<T extends AnyHttpOperationDef> =
	FlatRequestOf<T>;

export type HttpOperationFlatInput<T extends AnyHttpOperationDef> = [
	HttpOperationFlatRequest<T>,
] extends [never]
	? never
	: RequestInputOf<HttpOperationFlatRequest<T>>;

export type HttpOperationPreferredRequest<T extends AnyHttpOperationDef> = [
	HttpOperationFlatInput<T>,
] extends [never]
	? HttpOperationRequestInput<T>
	: HttpOperationFlatInput<T>;

export type HttpOperationFlatArguments<T extends AnyHttpOperationDef> = [
	HttpOperationFlatInput<T>,
] extends [never]
	? never
	: [HttpOperationFlatInput<T>] extends [undefined]
		? []
		: [request: HttpOperationFlatRequest<T>];

export type HttpOperationSuccessResponse<T extends AnyHttpOperationDef> =
	HttpOperationResponseByStatus<T, HttpOperationSuccessStatus<T>>;

export type HttpOperationErrorStatus<T extends AnyHttpOperationDef> = Exclude<
	HttpOperationResponseStatus<T>,
	HttpSuccessStatusCode
>;

export type HttpOperationErrorBody<
	T extends AnyHttpOperationDef,
	TStatus extends HttpOperationErrorStatus<T> = HttpOperationErrorStatus<T>,
> = HttpOperationResponseByStatus<T, TStatus>;

export type HttpOperationRequestMethod<T extends AnyHttpOperationDef> = (
	...args: HttpOperationRequestArguments<T>
) => Promise<HttpOperationSuccessResponse<T>>;

export type HttpOperationFlatMethod<T extends AnyHttpOperationDef> = (
	...args: HttpOperationFlatArguments<T>
) => Promise<HttpOperationSuccessResponse<T>>;

export type HttpOperationEntry<T extends AnyHttpOperationDef> = [
	HttpOperationFlatRequest<T>,
] extends [never]
	? {
			readonly request: HttpOperationRequestMethod<T>;
		}
	: HttpOperationFlatMethod<T> & {
			readonly request: HttpOperationRequestMethod<T>;
		};

export interface HttpOperationExecutor {
	execute<T extends AnyHttpOperationDef>(
		operation: T,
		...args: HttpOperationRequestArguments<T>
	): Promise<HttpOperationSuccessResponse<T>>;
}
