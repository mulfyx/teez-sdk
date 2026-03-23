import * as v from "valibot";
import { describe, expect, test } from "vitest";

import { TeezValidationError } from "../../errors/teez-validation-error";
import { getObjectSchemaKeys } from "../../schema/object-schema";
import {
	formatOperationMessage,
	parseInput,
	parseResponse,
	parseSchema,
} from "../../transport/parsing";
import { interpolatePath } from "../../transport/path";
import { buildUrl } from "../../transport/query";
import { readResponseBody } from "../../transport/response-body";

describe("http helpers", () => {
	test("buildUrl serializes scalar and array query params", () => {
		const url = buildUrl("/items", "https://example.com", {
			active: true,
			ids: [1, 2],
			ignored: undefined,
			page: 3,
		});

		expect(String(url)).toBe(
			"https://example.com/items?active=true&ids=1&ids=2&page=3",
		);
	});

	test("formats operation messages consistently", () => {
		expect(formatOperationMessage("network request failed", "demo.list")).toBe(
			'Operation "demo.list": network request failed',
		);
		expect(formatOperationMessage("network request failed")).toBe(
			"network request failed",
		);
	});

	test("interpolates path templates and rejects missing path parameters", () => {
		expect(
			interpolatePath("/items/{id}/variants/{variantId}", {
				id: 1,
				variantId: "blue",
			}),
		).toBe("/items/1/variants/blue");

		expect(() => interpolatePath("/items/{id}", {})).toThrow(
			'Missing path parameter "id" for template "/items/{id}"',
		);
	});

	test("returns object schema keys", () => {
		const schema = v.object({
			id: v.number(),
			name: v.string(),
		});

		expect(getObjectSchemaKeys(schema)).toEqual(["id", "name"]);
	});

	test("reads empty and non-empty responses", async () => {
		await expect(
			readResponseBody(
				new Response(undefined, {
					status: 204,
				}),
			),
		).resolves.toBeUndefined();

		await expect(
			readResponseBody(
				new Response("", {
					headers: {
						"Content-Type": "text/plain",
					},
				}),
			),
		).resolves.toBeUndefined();

		await expect(
			readResponseBody(Response.json({ ok: true })),
		).resolves.toEqual({
			ok: true,
		});

		await expect(
			readResponseBody(
				new Response("{bad json", {
					headers: {
						"Content-Type": "application/json",
					},
				}),
			),
		).resolves.toBe("{bad json");

		await expect(
			readResponseBody(
				new Response("plain text", {
					headers: {
						"Content-Type": "text/plain",
					},
				}),
			),
		).resolves.toBe("plain text");
	});

	test("parses schemas successfully", () => {
		const schema = v.object({
			id: v.number(),
		});

		expect(parseSchema(schema, { id: 1 }, "failed")).toEqual({
			id: 1,
		});
	});

	test("throws normalized validation errors", () => {
		const schema = v.object({
			id: v.number(),
		});

		expect(() => parseSchema(schema, { id: "bad" }, "custom message")).toThrow(
			TeezValidationError,
		);

		try {
			parseSchema(schema, { id: "bad" }, "custom message");
		} catch (error) {
			expect(error).toBeInstanceOf(TeezValidationError);

			if (!(error instanceof TeezValidationError)) {
				throw error;
			}

			expect(error.message).toBe("custom message");
			expect(error.issues).toHaveLength(1);
			expect(error.issues[0]?.code).toBe("number");
			expect(error.issues[0]?.path).toEqual(["id"]);
			expect(error.issues[0]?.message).toBeTruthy();
			expect(error.data).toEqual({
				id: "bad",
			});
		}
	});

	test("adds operation-specific messages for input and response parsing", () => {
		const schema = v.object({
			id: v.number(),
		});

		expect(() => parseInput(schema, { id: "bad" }, "demo.input")).toThrow(
			'Operation "demo.input": input validation failed',
		);

		expect(() => parseResponse(schema, { id: "bad" }, "demo.output")).toThrow(
			'Operation "demo.output": response validation failed',
		);
	});
});
