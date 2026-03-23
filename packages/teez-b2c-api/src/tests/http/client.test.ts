import { afterEach, describe, expect, test, vi } from "vitest";
import * as z from "zod/mini";

import { type ResolvedTeezClientConfig } from "../../config/types";
import { type TeezApiError } from "../../errors/teez-api-error";
import { TeezError } from "../../errors/teez-error";
import { type TeezNetworkError } from "../../errors/teez-network-error";
import { type TeezTimeoutError } from "../../errors/teez-timeout-error";
import { TeezValidationError } from "../../errors/teez-validation-error";
import { defineHttpOperation } from "../../http-operation/define";
import { emptyResponse, response } from "../../http-operation/response-helpers";
import { HttpClient } from "../../transport/http-client";

function createResolvedConfig(
	overrides: Partial<ResolvedTeezClientConfig> = {},
): ResolvedTeezClientConfig {
	return {
		appVersion: "200",
		baseUrl: "https://example.com",
		fetch: undefined,
		headers: new Headers(),
		language: "ru",
		timeout: 25,
		token: undefined,
		...overrides,
	};
}
describe("HttpClient", () => {
	afterEach(() => {
		vi.restoreAllMocks();
		vi.useRealTimers();
	});
	test("throws when fetch is not available", async () => {
		const client = new HttpClient(createResolvedConfig());
		await expect(
			client.request({
				method: "GET",
				path: "/items",
			}),
		).rejects.toBeInstanceOf(TeezError);
	});
	test("serializes request bodies and injects default json content-type", async () => {
		const fetchSpy = vi.fn<
			(input: unknown, init?: RequestInit) => Promise<Response>
		>(() => Promise.resolve(Response.json({ ok: true })));
		const client = new HttpClient(
			createResolvedConfig({
				fetch: fetchSpy as unknown as typeof fetch,
			}),
		);
		const response = await client.request({
			body: {
				name: "demo",
			},
			headers: {
				"X-Test": "1",
			},
			method: "POST",
			path: "/items",
		});
		await expect(response.json()).resolves.toEqual({
			ok: true,
		});
		const [url, init] = fetchSpy.mock.calls[0] ?? [];
		const headers = new Headers(init?.headers);
		expect(String(url)).toBe("https://example.com/items");
		expect(init?.method).toBe("POST");
		expect(init?.body).toBe('{"name":"demo"}');
		expect(headers.get("content-type")).toBe("application/json");
		expect(headers.get("x-test")).toBe("1");
	});
	test("preserves explicit content-type headers", async () => {
		const fetchSpy = vi.fn<
			(input: unknown, init?: RequestInit) => Promise<Response>
		>(() => Promise.resolve(Response.json({ ok: true })));
		const client = new HttpClient(
			createResolvedConfig({
				fetch: fetchSpy as unknown as typeof fetch,
			}),
		);
		await client.request({
			body: {
				name: "demo",
			},
			headers: {
				"Content-Type": "application/merge-patch+json",
			},
			method: "PATCH",
			path: "/items/1",
		});
		const [, init] = fetchSpy.mock.calls[0] ?? [];
		const headers = new Headers(init?.headers);
		expect(headers.get("content-type")).toBe("application/merge-patch+json");
	});
	test("returns raw non-ok responses without throwing", async () => {
		const fetchSpy = vi.fn<
			(input: unknown, init?: RequestInit) => Promise<Response>
		>(() =>
			Promise.resolve(
				Response.json(
					{ message: "unauthorized" },
					{
						status: 401,
						statusText: "Unauthorized",
					},
				),
			),
		);
		const client = new HttpClient(
			createResolvedConfig({
				fetch: fetchSpy as unknown as typeof fetch,
			}),
		);
		const response = await client.request(
			{
				method: "GET",
				path: "/secure",
			},
			{
				operationName: "demo.secure",
			},
		);
		expect(response.status).toBe(401);
		await expect(response.json()).resolves.toEqual({
			message: "unauthorized",
		});
	});
	test("throws timeout errors", async () => {
		vi.useFakeTimers();
		const fetchSpy = vi.fn(
			(_input: unknown, init?: RequestInit) =>
				new Promise<Response>((_resolve, reject) => {
					init?.signal?.addEventListener("abort", () => {
						reject(new DOMException("Aborted", "AbortError"));
					});
				}),
		);
		const client = new HttpClient(
			createResolvedConfig({
				fetch: fetchSpy as unknown as typeof fetch,
				timeout: 5,
			}),
		);
		const requestPromise = client.request(
			{
				method: "GET",
				path: "/slow",
			},
			{
				operationName: "demo.slow",
			},
		);
		const expectation = expect(requestPromise).rejects.toMatchObject({
			method: "GET",
			name: "TeezTimeoutError",
			operationName: "demo.slow",
			timeout: 5,
		} satisfies Partial<TeezTimeoutError>);
		await vi.advanceTimersByTimeAsync(5);
		await expectation;
	});
	test("throws network errors", async () => {
		const fetchSpy = vi.fn(() => {
			throw new Error("offline");
		});
		const client = new HttpClient(
			createResolvedConfig({
				fetch: fetchSpy as unknown as typeof fetch,
			}),
		);
		await expect(
			client.request(
				{
					method: "GET",
					path: "/offline",
				},
				{
					operationName: "demo.offline",
				},
			),
		).rejects.toMatchObject({
			method: "GET",
			name: "TeezNetworkError",
			operationName: "demo.offline",
		} satisfies Partial<TeezNetworkError>);
	});
	test("rethrows TeezError instances raised by the fetch implementation", async () => {
		const fetchSpy = vi.fn<
			(input: unknown, init?: RequestInit) => Promise<Response>
		>(() => {
			throw new TeezError("custom");
		});
		const client = new HttpClient(
			createResolvedConfig({
				fetch: fetchSpy as unknown as typeof fetch,
			}),
		);
		await expect(
			client.request({
				method: "GET",
				path: "/custom-error",
			}),
		).rejects.toThrow("custom");
	});
	test("executes operations and validates request sections and success output", async () => {
		const fetchSpy = vi.fn<
			(input: unknown, init?: RequestInit) => Promise<Response>
		>(() => Promise.resolve(Response.json({ id: 1 })));
		const client = new HttpClient(
			createResolvedConfig({
				fetch: fetchSpy as unknown as typeof fetch,
			}),
		);
		const operation = defineHttpOperation({
			domain: "demo",
			action: "get",
			auth: "none",
			summary: "Retrieve a demo item.",
			description: "Retrieves a demo item by identifier.",
			request: {
				method: "GET",
				path: {
					template: "/items/{id}",
					schema: z.object({
						id: z.number(),
					}),
				},
				query: {
					schema: z.object({
						includeArchived: z.optional(z.boolean()),
					}),
				},
			},
			responses: {
				200: response({
					schema: z.object({
						id: z.number(),
					}),
				}),
			},
		});
		await expect(
			client.execute(operation, {
				path: {
					id: 1,
				},
				query: {
					includeArchived: true,
				},
			}),
		).resolves.toEqual({
			id: 1,
		});
		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(String(fetchSpy.mock.calls[0]?.[0])).toBe(
			"https://example.com/items/1?includeArchived=true",
		);
	});
	test("returns undefined for operations without a success response schema", async () => {
		const fetchSpy = vi.fn<
			(input: unknown, init?: RequestInit) => Promise<Response>
		>(() =>
			Promise.resolve(
				new Response(undefined, {
					status: 204,
				}),
			),
		);
		const client = new HttpClient(
			createResolvedConfig({
				fetch: fetchSpy as unknown as typeof fetch,
			}),
		);
		const operation = defineHttpOperation({
			domain: "demo",
			action: "addFavorite",
			auth: "required",
			summary: "Add demo favorite.",
			description: "Adds a demo favorite without returning a response body.",
			request: {
				method: "POST",
				path: "/favorites",
				body: {
					schema: z.object({
						id: z.number(),
					}),
				},
			},
			responses: {
				204: emptyResponse(),
			},
		});
		await expect(
			client.execute(operation, {
				body: {
					id: 1,
				},
			}),
		).resolves.toBeUndefined();
	});
	test("attaches parsed error bodies for operations with typed error responses", async () => {
		const fetchSpy = vi.fn<
			(input: unknown, init?: RequestInit) => Promise<Response>
		>(() =>
			Promise.resolve(
				Response.json(
					{
						description: "unauthorized",
						message: "Требуется аутентификация",
					},
					{
						status: 401,
						statusText: "Unauthorized",
					},
				),
			),
		);
		const client = new HttpClient(
			createResolvedConfig({
				fetch: fetchSpy as unknown as typeof fetch,
			}),
		);
		const unauthorizedSchema = z.object({
			description: z.string(),
			message: z.string(),
		});
		const operation = defineHttpOperation({
			domain: "demo",
			action: "getReviewAvailable",
			auth: "required",
			summary: "Check demo review availability.",
			description: "Checks whether the current user can review a demo item.",
			request: {
				method: "GET",
				path: {
					template: "/items/{id}/review-available",
					schema: z.object({
						id: z.number(),
					}),
				},
			},
			responses: {
				200: response({
					schema: z.object({
						ok: z.boolean(),
					}),
				}),
				401: response({
					schema: unauthorizedSchema,
				}),
			},
		});
		await expect(
			client.execute(operation, {
				path: {
					id: 1,
				},
			}),
		).rejects.toMatchObject({
			body: {
				description: "unauthorized",
				message: "Требуется аутентификация",
			},
			name: "TeezApiError",
			operationName: "demo.getReviewAvailable",
			parsedBody: {
				description: "unauthorized",
				message: "Требуется аутентификация",
			},
			status: 401,
		} satisfies Partial<TeezApiError>);
	});
	test("keeps throwing api errors when no typed error response is declared", async () => {
		const fetchSpy = vi.fn<
			(input: unknown, init?: RequestInit) => Promise<Response>
		>(() =>
			Promise.resolve(
				Response.json(
					{ message: "unauthorized" },
					{
						status: 401,
						statusText: "Unauthorized",
					},
				),
			),
		);
		const client = new HttpClient(
			createResolvedConfig({
				fetch: fetchSpy as unknown as typeof fetch,
			}),
		);
		const operation = defineHttpOperation({
			domain: "demo",
			action: "secure",
			auth: "required",
			summary: "Call a secure demo endpoint.",
			description: "Calls a secured demo endpoint.",
			request: {
				method: "GET",
				path: "/secure",
			},
			responses: {
				200: response({
					schema: z.object({
						ok: z.boolean(),
					}),
				}),
			},
		});
		await expect(client.execute(operation)).rejects.toMatchObject({
			body: {
				message: "unauthorized",
			},
			name: "TeezApiError",
			operationName: "demo.secure",
			status: 401,
		} satisfies Partial<TeezApiError>);
	});
	test("fails fast on invalid operation input", async () => {
		const fetchSpy = vi.fn<
			(input: unknown, init?: RequestInit) => Promise<Response>
		>(() => Promise.resolve(Response.json({ id: 1 })));
		const client = new HttpClient(
			createResolvedConfig({
				fetch: fetchSpy as unknown as typeof fetch,
			}),
		);
		const operation = defineHttpOperation({
			domain: "demo",
			action: "get",
			auth: "none",
			summary: "Retrieve a demo item.",
			description: "Retrieves a demo item by identifier.",
			request: {
				method: "GET",
				path: {
					template: "/items/{id}",
					schema: z.object({
						id: z.number(),
					}),
				},
			},
			responses: {
				200: response({
					schema: z.object({
						id: z.number(),
					}),
				}),
			},
		});
		await expect(
			client.execute(operation, {
				path: {
					id: "bad",
				},
			} as never),
		).rejects.toThrow(TeezValidationError);
		expect(fetchSpy).not.toHaveBeenCalled();
	});
	test("fails on invalid operation output", async () => {
		const fetchSpy = vi.fn<
			(input: unknown, init?: RequestInit) => Promise<Response>
		>(() => Promise.resolve(Response.json({ id: "bad" })));
		const client = new HttpClient(
			createResolvedConfig({
				fetch: fetchSpy as unknown as typeof fetch,
			}),
		);
		const operation = defineHttpOperation({
			domain: "demo",
			action: "get",
			auth: "none",
			summary: "Retrieve a demo item.",
			description: "Retrieves a demo item by identifier.",
			request: {
				method: "GET",
				path: {
					template: "/items/{id}",
					schema: z.object({
						id: z.number(),
					}),
				},
			},
			responses: {
				200: response({
					schema: z.object({
						id: z.number(),
					}),
				}),
			},
		});
		await expect(
			client.execute(operation, {
				path: {
					id: 1,
				},
			}),
		).rejects.toThrow(TeezValidationError);
	});
	test("fails on unexpected successful response statuses", async () => {
		const fetchSpy = vi.fn<
			(input: unknown, init?: RequestInit) => Promise<Response>
		>(() =>
			Promise.resolve(
				Response.json(
					{ ok: true },
					{
						status: 202,
						statusText: "Accepted",
					},
				),
			),
		);
		const client = new HttpClient(
			createResolvedConfig({
				fetch: fetchSpy as unknown as typeof fetch,
			}),
		);
		const operation = defineHttpOperation({
			domain: "demo",
			action: "create",
			auth: "required",
			summary: "Create a demo item.",
			description: "Creates a demo item and expects a 200 response payload.",
			request: {
				method: "POST",
				path: "/items",
			},
			responses: {
				200: response({
					schema: z.object({
						ok: z.boolean(),
					}),
				}),
			},
		});
		await expect(client.execute(operation)).rejects.toThrow(
			'Operation "demo.create": unexpected successful response status 202',
		);
	});
});
