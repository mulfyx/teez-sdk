import * as v from "valibot";
import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { defineHttpOperation } from "../src/http-operation/define";
import {
	emptyResponse,
	response,
} from "../src/http-operation/response-helpers";
import { createTeezClientFromOperations } from "../src/sdk/create-client";
import { createRuntime } from "../src/sdk/runtime";

const pingOperation = defineHttpOperation({
	domain: "demo",
	action: "ping",
	auth: "none",
	summary: "Ping the demo endpoint.",
	description: "Returns a successful ping response from the demo endpoint.",
	request: {
		method: "GET",
		path: "/ping",
	},
	responses: {
		200: response({
			schema: v.object({
				ok: v.boolean(),
			}),
		}),
	},
});
const searchOperation = defineHttpOperation({
	domain: "demo",
	action: "search",
	auth: "none",
	summary: "Search demo entities.",
	description: "Searches demo entities using query parameters.",
	request: {
		method: "GET",
		path: "/search",
		query: {
			schema: v.object({
				value: v.optional(v.string()),
			}),
		},
	},
	responses: {
		200: response({
			schema: v.object({
				ok: v.boolean(),
			}),
		}),
	},
});
const echoOperation = defineHttpOperation({
	domain: "demo",
	action: "echo",
	auth: "none",
	summary: "Echo a demo value.",
	description: "Echoes the provided demo payload back to the caller.",
	request: {
		method: "POST",
		path: "/echo",
		body: {
			schema: v.object({
				value: v.string(),
			}),
		},
	},
	responses: {
		200: response({
			schema: v.object({
				value: v.string(),
			}),
		}),
	},
});
const rawBodyOperation = defineHttpOperation({
	domain: "demo",
	action: "raw",
	auth: "none",
	summary: "Send a raw demo payload.",
	description: "Sends a raw array payload to the demo endpoint.",
	request: {
		method: "POST",
		path: "/raw",
		body: {
			schema: v.array(v.number()),
		},
	},
	responses: {
		204: emptyResponse(),
	},
});
const secureItemOperation = defineHttpOperation({
	domain: "demo",
	action: "secureItem",
	auth: "required",
	summary: "Retrieve a secured demo item.",
	description:
		"Retrieves a secured demo item using path parameters and headers.",
	request: {
		method: "GET",
		path: {
			template: "/secure-items/{id}",
			schema: v.object({
				id: v.number(),
			}),
		},
		headers: {
			schema: v.object({
				token: v.string(),
			}),
		},
	},
	responses: {
		200: response({
			schema: v.object({
				id: v.number(),
				ok: v.boolean(),
			}),
		}),
	},
});
describe("client runtime", () => {
	test("creates a runtime that executes operations", async () => {
		const fetchSpy = vi.fn(() => Promise.resolve(Response.json({ ok: true })));
		const runtime = createRuntime({
			baseUrl: "https://example.com",
			fetch: fetchSpy as unknown as typeof fetch,
			timeout: 50,
		});
		await expect(runtime.execute(pingOperation)).resolves.toEqual({
			ok: true,
		});
		expect(runtime.getConfig().baseUrl).toBe("https://example.com");
		expect(runtime.getConfig().timeout).toBe(50);
	});
	test("creates grouped clients from operation registries", async () => {
		const fetchSpy = vi.fn((input: unknown, init?: RequestInit) => {
			if (String(input).endsWith("/ping")) {
				return Promise.resolve(Response.json({ ok: true }));
			}
			if (String(input).includes("/search")) {
				return Promise.resolve(Response.json({ ok: true }));
			}
			if (String(input).endsWith("/echo")) {
				const requestBody =
					typeof init?.body === "string" ? init.body : '{"value":""}';
				return Promise.resolve(
					new Response(requestBody, {
						headers: {
							"Content-Type": "application/json",
						},
					}),
				);
			}
			if (String(input).includes("/secure-items/")) {
				return Promise.resolve(Response.json({ id: 1, ok: true }));
			}
			return Promise.resolve(
				new Response(undefined, {
					status: 204,
				}),
			);
		});
		const client = createTeezClientFromOperations(
			{
				demo: {
					echo: echoOperation,
					ping: pingOperation,
					raw: rawBodyOperation,
					secureItem: secureItemOperation,
					search: searchOperation,
				},
			},
			{
				baseUrl: "https://example.com",
				fetch: fetchSpy as unknown as typeof fetch,
			},
		);
		await expect(client.demo.ping()).resolves.toEqual({
			ok: true,
		});
		await expect(
			client.demo.search({
				value: "search",
			}),
		).resolves.toEqual({
			ok: true,
		});
		await expect(client.demo.search({})).resolves.toEqual({
			ok: true,
		});
		await expect(
			client.demo.echo({
				value: "hello",
			}),
		).resolves.toEqual({
			value: "hello",
		});
		await expect(
			client.demo.raw.request({
				body: [1, 2, 3],
			}),
		).resolves.toBeUndefined();
		await expect(
			client.demo.secureItem({
				id: 1,
				token: "secret",
			}),
		).resolves.toEqual({
			id: 1,
			ok: true,
		});
		expect(fetchSpy.mock.calls).toHaveLength(6);
		const [
			pingCall,
			searchCall,
			emptySearchCall,
			echoCall,
			rawCall,
			secureCall,
		] = fetchSpy.mock.calls;
		if (
			pingCall == undefined ||
			searchCall == undefined ||
			emptySearchCall == undefined ||
			echoCall == undefined ||
			rawCall == undefined ||
			secureCall == undefined
		) {
			throw new Error("Expected operation calls to be recorded");
		}
		expect(String(pingCall[0])).toBe("https://example.com/ping");
		expect(String(searchCall[0])).toBe(
			"https://example.com/search?value=search",
		);
		expect(String(emptySearchCall[0])).toBe("https://example.com/search");
		expect(String(echoCall[0])).toBe("https://example.com/echo");
		expect(String(rawCall[0])).toBe("https://example.com/raw");
		expect(String(secureCall[0])).toBe("https://example.com/secure-items/1");
		expect(new Headers(secureCall[1]?.headers).get("token")).toBe("secret");
		expect(typeof client.getConfig).toBe("function");
		expect(typeof client.demo.raw).toBe("object");
		expect(typeof client.demo.raw.request).toBe("function");
	});
	test("infers flat methods only for flattenable operations", () => {
		const client = createTeezClientFromOperations({
			demo: {
				echo: echoOperation,
				ping: pingOperation,
				raw: rawBodyOperation,
				secureItem: secureItemOperation,
				search: searchOperation,
			},
		});
		expectTypeOf(client.demo.ping).parameters.toEqualTypeOf<[]>();
		expectTypeOf(client.demo.search).parameters.toEqualTypeOf<
			[
				input: {
					value?: string | undefined;
				},
			]
		>();
		expectTypeOf(client.demo.echo).parameters.toEqualTypeOf<
			[
				input: {
					value: string;
				},
			]
		>();
		expectTypeOf(client.demo.secureItem).parameters.toEqualTypeOf<
			[
				input: {
					id: number;
					token: string;
				},
			]
		>();
	});
});
