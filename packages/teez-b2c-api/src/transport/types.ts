export type QueryPrimitive = boolean | number | string;

export type QueryValue =
	| QueryPrimitive
	| null
	| readonly QueryPrimitive[]
	| undefined;

export type QueryParams = Record<string, QueryValue>;

export type FetchImplementation = typeof globalThis.fetch;

export type HttpMethod = NonNullable<RequestInit["method"]>;

export type HeadersInit = NonNullable<ConstructorParameters<typeof Headers>[0]>;

export interface HttpRequestOptions extends Omit<
	RequestInit,
	"headers" | "signal" | "body" | "method"
> {
	readonly method: HttpMethod;
	readonly path: string;
	readonly query?: QueryParams;
	readonly headers?: HeadersInit;
	readonly body?: unknown;
}
