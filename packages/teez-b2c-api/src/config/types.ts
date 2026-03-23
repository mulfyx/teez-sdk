import { type Language } from "../language";
import { type FetchImplementation, type HeadersInit } from "../transport/types";

export interface TeezClientConfig {
	readonly baseUrl?: string;
	readonly token?: string;
	readonly appVersion?: string;
	readonly language?: Language;
	readonly timeout?: number;
	readonly headers?: HeadersInit;
	readonly fetch?: FetchImplementation;
}

export interface ResolvedTeezClientConfig {
	readonly baseUrl: string;
	readonly token?: string;
	readonly appVersion: string;
	readonly language: Language;
	readonly timeout: number;
	readonly headers: Headers;
	readonly fetch?: FetchImplementation;
}
