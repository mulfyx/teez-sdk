import * as v from "valibot";
import { describe, expect, test } from "vitest";

import { TeezApiError } from "../src/errors/teez-api-error";
import { TeezError } from "../src/errors/teez-error";
import { TeezNetworkError } from "../src/errors/teez-network-error";
import { TeezTimeoutError } from "../src/errors/teez-timeout-error";
import {
	TeezValidationError,
	type TeezValidationIssue,
} from "../src/errors/teez-validation-error";
import {
	getOperationApiError,
	isOperationApiError,
} from "../src/http-operation/api-error";
import { defineHttpOperation } from "../src/http-operation/define";
import { isHttpOperationFlattenable } from "../src/http-operation/flattenability";
import {
	emptyResponse,
	response,
} from "../src/http-operation/response-helpers";
import { nullishToUndefined } from "../src/schema/nullish";

describe("valibot metadata", () => {
	test("stores title, description, and examples directly on the schema", () => {
		const schema = v.object({
			name: v.string(),
		});
		const documentedSchema = v.pipe(
			schema,
			v.title("Example"),
			v.description("Example schema"),
			v.examples([
				{
					name: "teez",
				},
			]),
		);
		expect(documentedSchema).not.toBe(schema);
		expect(v.getTitle(documentedSchema)).toBe("Example");
		expect(v.getDescription(documentedSchema)).toBe("Example schema");
		expect(v.getExamples(documentedSchema)).toEqual([
			{
				name: "teez",
			},
		]);
	});
});
describe("nullishToUndefined", () => {
	test("normalizes nullish values to undefined while preserving concrete values", () => {
		const schema = nullishToUndefined(v.string());
		const parsedNull = v.parse(schema, JSON.parse("null") as null);
		const parsedUndefined = v.parse(schema, undefined);
		expect(v.parse(schema, "teez")).toBe("teez");
		expect(parsedNull).toBeUndefined();
		expect(parsedUndefined).toBeUndefined();
	});
});
describe("defineHttpOperation", () => {
	test("creates an operation name and derives read safety for GET", () => {
		const operation = defineHttpOperation({
			domain: "demo",
			action: "search",
			auth: "none",
			summary: "Search demo entities.",
			description: "Searches demo entities using query parameters.",
			request: {
				method: "GET",
				path: {
					template: "/items/{id}",
					schema: v.object({
						id: v.number(),
					}),
				},
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
		expect(operation.name).toBe("demo.search");
		expect(operation.summary).toBe("Search demo entities.");
		expect(operation.auth).toBe("none");
		expect(operation.safety).toBe("read");
		expect(operation.request.method).toBe("GET");
		expect(operation.request.path.template).toBe("/items/{id}");
		expect(operation.request.path.schema).toBeDefined();
		expect(operation.request.query.schema).toBeDefined();
		expect(operation.responses[200].schema).toBeDefined();
	});
	test("derives write safety for non-GET operations", () => {
		const operation = defineHttpOperation({
			domain: "demo",
			action: "create",
			auth: "required",
			summary: "Create a demo entity.",
			description: "Creates a demo entity using a request body payload.",
			request: {
				method: "POST",
				path: "/items",
				body: {
					schema: v.object({
						value: v.string(),
					}),
				},
			},
			responses: {
				201: emptyResponse(),
			},
		});
		expect(operation.safety).toBe("write");
	});
	test("uses explicit safety overrides for read-only POST operations", () => {
		const operation = defineHttpOperation({
			domain: "demo",
			action: "validate",
			auth: "required",
			safety: "read",
			summary: "Validate demo entities.",
			description: "Validates a demo payload without mutating server state.",
			request: {
				method: "POST",
				path: "/items/validate",
				body: {
					schema: v.object({
						value: v.string(),
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
		expect(operation.safety).toBe("read");
	});
	test("supports operations without request schemas", () => {
		const operation = defineHttpOperation({
			domain: "demo",
			action: "ping",
			auth: "none",
			summary: "Ping the demo endpoint.",
			description: "Pings the demo endpoint without a request body.",
			request: {
				method: "GET",
				path: "/ping",
			},
			responses: {
				204: emptyResponse(),
			},
		});
		expect(operation.request.path.template).toBe("/ping");
		expect(operation.responses[204]).toMatchObject({
			kind: "empty",
		});
	});
	test("rejects path schemas without template parameters", () => {
		expect(() =>
			defineHttpOperation({
				domain: "demo",
				action: "invalid",
				auth: "none",
				summary: "Invalid demo operation.",
				description: "Defines a path schema without template parameters.",
				request: {
					method: "GET",
					path: {
						template: "/items",
						schema: v.object({
							id: v.number(),
						}),
					},
				},
				responses: {
					200: emptyResponse(),
				},
			}),
		).toThrow(
			'Operation "demo.invalid" defines request.path.schema without path parameters in the template',
		);
	});
	test("rejects missing or mismatched path schemas", () => {
		expect(() =>
			defineHttpOperation({
				domain: "demo",
				action: "missingPathSchema",
				auth: "none",
				summary: "Missing path schema.",
				description: "Omits a required path schema.",
				request: {
					method: "GET",
					path: "/items/{id}",
				},
				responses: {
					200: emptyResponse(),
				},
			}),
		).toThrow(
			'Operation "demo.missingPathSchema" is missing request.path.schema for template parameters',
		);
		expect(() =>
			defineHttpOperation({
				domain: "demo",
				action: "mismatchedPathSchema",
				auth: "none",
				summary: "Mismatched path schema.",
				description: "Uses path schema keys that do not match the template.",
				request: {
					method: "GET",
					path: {
						template: "/items/{id}",
						schema: v.object({
							itemId: v.number(),
						}),
					},
				},
				responses: {
					200: emptyResponse(),
				},
			}),
		).toThrow(
			'Operation "demo.mismatchedPathSchema" request.path.schema keys must exactly match request.path.template parameters',
		);
	});
	test("requires at least one successful response", () => {
		expect(() =>
			defineHttpOperation({
				domain: "demo",
				action: "missingSuccess",
				auth: "required",
				summary: "Missing success response.",
				description: "Defines only error responses.",
				request: {
					method: "GET",
					path: "/items",
				},
				responses: {
					401: response({
						schema: v.object({
							message: v.string(),
						}),
					}),
				},
			}),
		).toThrow(
			'Operation "demo.missingSuccess" must define at least one successful HTTP response',
		);
	});
	test("detects whether an operation can be flattened", () => {
		const flattenableOperation = defineHttpOperation({
			domain: "demo",
			action: "flattenable",
			auth: "none",
			summary: "Flattenable operation.",
			description: "Uses unique object-like request sections.",
			request: {
				method: "PATCH",
				path: {
					template: "/items/{id}",
					schema: v.object({
						id: v.number(),
					}),
				},
				query: {
					schema: v.object({
						page: v.optional(v.number()),
					}),
				},
				body: {
					schema: v.object({
						value: v.string(),
					}),
				},
			},
			responses: {
				200: emptyResponse(),
			},
		});
		const duplicateKeyOperation = defineHttpOperation({
			domain: "demo",
			action: "duplicateKey",
			auth: "required",
			summary: "Duplicate key operation.",
			description: "Repeats the same key in path and body sections.",
			request: {
				method: "PATCH",
				path: {
					template: "/items/{id}",
					schema: v.object({
						id: v.number(),
					}),
				},
				body: {
					schema: v.object({
						id: v.number(),
					}),
				},
			},
			responses: {
				200: emptyResponse(),
			},
		});
		const rawBodyOperation = defineHttpOperation({
			domain: "demo",
			action: "rawBody",
			auth: "required",
			summary: "Raw body operation.",
			description: "Uses a non-object request body schema.",
			request: {
				method: "POST",
				path: "/items",
				body: {
					schema: v.array(v.number()),
				},
			},
			responses: {
				204: emptyResponse(),
			},
		});
		expect(isHttpOperationFlattenable(flattenableOperation)).toBe(true);
		expect(isHttpOperationFlattenable(duplicateKeyOperation)).toBe(false);
		expect(isHttpOperationFlattenable(rawBodyOperation)).toBe(false);
	});
	test("rejects body schemas for empty-body HTTP statuses", () => {
		expect(() =>
			defineHttpOperation({
				domain: "demo",
				action: "invalidNoContent",
				auth: "none",
				summary: "Invalid no-content response.",
				description: "Defines a 204 response with a body schema.",
				request: {
					method: "GET",
					path: "/items",
				},
				responses: {
					204: response({
						schema: v.object({
							ok: v.boolean(),
						}),
					}),
				},
			}),
		).toThrow(
			'Operation "demo.invalidNoContent" response 204 must not define a body schema',
		);
	});
	test("supports helper-based empty and json responses", () => {
		const operation = defineHttpOperation({
			domain: "demo",
			action: "helperResponses",
			auth: "required",
			summary: "Use helper-based responses.",
			description:
				"Uses response() and emptyResponse() helpers for response declarations.",
			request: {
				method: "POST",
				path: "/items",
			},
			responses: {
				201: emptyResponse({
					description: "Entity created successfully.",
				}),
				401: response({
					schema: v.object({
						message: v.string(),
					}),
					description: "Unauthorized request.",
				}),
			},
		});
		expect(operation.responses[201]).toEqual({
			kind: "empty",
			description: "Entity created successfully.",
		});
		expect(operation.responses[401]).toMatchObject({
			kind: "json",
			description: "Unauthorized request.",
		});
	});
});
describe("errors", () => {
	test("expose expected fields and derived helpers", () => {
		const cause = new Error("root cause");
		const url = new URL("https://example.com/items");
		const issues: TeezValidationIssue[] = [
			{
				code: "number",
				message: "Expected number",
				path: ["id"],
			},
		];
		const baseError = new TeezError("base");
		const clientError = new TeezApiError("failed", {
			body: {
				error: "missing",
			},
			cause,
			method: "GET",
			operationName: "demo.get",
			parsedBody: {
				code: "AUTH_REQUIRED",
			},
			status: 404,
			statusText: "Not Found",
			url,
		});
		const serverError = new TeezApiError("failed", {
			body: undefined,
			method: "POST",
			status: 500,
			statusText: "Internal Server Error",
			url,
		});
		const networkError = new TeezNetworkError("offline", {
			cause,
			method: "GET",
			operationName: "demo.list",
			url,
		});
		const timeoutError = new TeezTimeoutError("timeout", {
			cause,
			method: "PATCH",
			operationName: "demo.patch",
			timeout: 1234,
			url,
		});
		const validationError = new TeezValidationError("bad input", {
			data: {
				id: "oops",
			},
			issues,
		});
		expect(baseError.name).toBe("TeezError");
		expect(clientError.name).toBe("TeezApiError");
		expect(clientError.cause).toBe(cause);
		expect(clientError.method).toBe("GET");
		expect(clientError.url).toBe(url);
		expect(clientError.operationName).toBe("demo.get");
		expect(clientError.status).toBe(404);
		expect(clientError.statusText).toBe("Not Found");
		expect(clientError.body).toEqual({
			error: "missing",
		});
		expect(clientError.parsedBody).toEqual({
			code: "AUTH_REQUIRED",
		});
		expect(serverError.parsedBody).toBeUndefined();
		expect(networkError.name).toBe("TeezNetworkError");
		expect(networkError.method).toBe("GET");
		expect(networkError.url).toBe(url);
		expect(networkError.operationName).toBe("demo.list");
		expect(networkError.cause).toBe(cause);
		expect(timeoutError.name).toBe("TeezTimeoutError");
		expect(timeoutError.method).toBe("PATCH");
		expect(timeoutError.url).toBe(url);
		expect(timeoutError.operationName).toBe("demo.patch");
		expect(timeoutError.timeout).toBe(1234);
		expect(timeoutError.cause).toBe(cause);
		expect(validationError.name).toBe("TeezValidationError");
		expect(validationError.issues).toEqual(issues);
		expect(validationError.data).toEqual({
			id: "oops",
		});
	});
	test("narrows parsed api errors by operation response schema", () => {
		const operation = defineHttpOperation({
			domain: "demo",
			action: "getReviewAvailable",
			auth: "required",
			summary: "Check demo review availability.",
			description: "Checks whether the demo item can be reviewed.",
			request: {
				method: "GET",
				path: {
					template: "/items/{id}/review-available",
					schema: v.object({
						id: v.number(),
					}),
				},
			},
			responses: {
				200: response({
					schema: v.object({
						ok: v.boolean(),
					}),
				}),
				401: response({
					schema: v.object({
						message: v.string(),
					}),
				}),
			},
		});
		const error = new TeezApiError("failed", {
			method: "GET",
			operationName: operation.name,
			parsedBody: {
				message: "Unauthorized",
			},
			status: 401,
			statusText: "Unauthorized",
			url: new URL("https://example.com/items/1/review-available"),
		});
		expect(operation.safety).toBe("read");
		expect(isOperationApiError(error, operation)).toBe(true);
		expect(getOperationApiError(error, operation)?.parsedBody).toEqual({
			message: "Unauthorized",
		});
	});
	test("does not narrow unrelated values into operation api errors", () => {
		const operation = defineHttpOperation({
			domain: "demo",
			action: "getReviewAvailable",
			auth: "required",
			summary: "Check demo review availability.",
			description: "Checks whether the demo item can be reviewed.",
			request: {
				method: "GET",
				path: {
					template: "/items/{id}/review-available",
					schema: v.object({
						id: v.number(),
					}),
				},
			},
			responses: {
				200: response({
					schema: v.object({
						ok: v.boolean(),
					}),
				}),
				401: response({
					schema: v.object({
						message: v.string(),
					}),
				}),
			},
		});
		const error = new TeezApiError("failed", {
			method: "GET",
			operationName: "demo.otherOperation",
			parsedBody: {
				message: "Unauthorized",
			},
			status: 401,
			statusText: "Unauthorized",
			url: new URL("https://example.com/items/1/review-available"),
		});
		expect(isOperationApiError("bad", operation)).toBe(false);
		expect(isOperationApiError(error, operation)).toBe(false);
		expect(getOperationApiError(error, operation)).toBeUndefined();
	});
});
