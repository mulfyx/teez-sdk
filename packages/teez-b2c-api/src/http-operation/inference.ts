import {
	type InferInput as SchemaInput,
	type InferOutput as SchemaOutput,
} from "valibot";

import { type AnySchema } from "../schema/types";
import { type Simplify } from "../type-utils/simplify";
import { type HttpSuccessStatusCode } from "./status";
import {
	type AnyHttpOperationDef,
	type HttpOperationResponse,
	type ObjectSchemaType,
} from "./types";

type EmptyObject = Record<never, never>;

type RequiredKeysOf<T extends object> = keyof {
	[TKey in keyof T as Omit<T, TKey> extends T ? never : TKey]: unknown;
};

type HasRequiredKeys<T> = [T] extends [readonly unknown[]]
	? true
	: [T] extends [object]
		? [RequiredKeysOf<Extract<T, object>>] extends [never]
			? false
			: true
		: true;

type PathSchemaOf<T extends AnyHttpOperationDef> =
	T["request"]["path"] extends { readonly schema: infer TPathSchema }
		? Extract<TPathSchema, ObjectSchemaType>
		: undefined;

type QuerySchemaOf<T extends AnyHttpOperationDef> = T["request"] extends {
	readonly query: { readonly schema: infer TQuerySchema };
}
	? Extract<TQuerySchema, ObjectSchemaType>
	: undefined;

type HeadersSchemaOf<T extends AnyHttpOperationDef> = T["request"] extends {
	readonly headers: { readonly schema: infer THeadersSchema };
}
	? Extract<THeadersSchema, ObjectSchemaType>
	: undefined;

type BodySchemaOf<T extends AnyHttpOperationDef> = T["request"] extends {
	readonly body: { readonly schema: infer TBodySchema };
}
	? Extract<TBodySchema, AnySchema>
	: undefined;

type RequestSectionEntry<
	TName extends string,
	TSchema extends AnySchema | undefined,
> = [TSchema] extends [AnySchema]
	? HasRequiredKeys<SchemaInput<Extract<TSchema, AnySchema>>> extends true
		? Readonly<Record<TName, SchemaInput<Extract<TSchema, AnySchema>>>>
		: Readonly<Partial<Record<TName, SchemaInput<Extract<TSchema, AnySchema>>>>>
	: EmptyObject;

type RequestSectionFlatShape<TSchema extends AnySchema | undefined> = [
	TSchema,
] extends [undefined]
	? EmptyObject
	: TSchema extends ObjectSchemaType
		? SchemaInput<TSchema>
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

type RequestArgumentsOf<TRequest> = keyof TRequest extends never
	? []
	: HasRequiredKeys<TRequest> extends true
		? [request: TRequest]
		: [request?: TRequest];

type ResponseSchemaData<TResponse extends HttpOperationResponse | undefined> =
	TResponse extends { readonly schema: infer TResponseSchema }
		? [Extract<TResponseSchema, AnySchema>] extends [AnySchema]
			? SchemaOutput<Extract<TResponseSchema, AnySchema>>
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

export type HttpOperationRequestArguments<T extends AnyHttpOperationDef> =
	RequestArgumentsOf<HttpOperationRequestSections<T>>;

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
	: RequestArgumentsOf<HttpOperationFlatRequest<T>>;

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
