import { describe, expect, test, vi } from "vitest";

import {
	getTeezOperation,
	teezOperationList,
	teezOperations,
	teezOperationsByName,
} from "../src/registry";
import { createTeezClient } from "../src/sdk/create-client";

describe("operations registry", () => {
	test("keeps grouped and flattened registries in sync", () => {
		const expectedLength = Object.values(teezOperations).reduce(
			(total, group) => total + Object.keys(group).length,
			0,
		);
		const firstOperation = teezOperationList[0];

		expect(teezOperationList).toHaveLength(expectedLength);
		expect(firstOperation).toBeDefined();
		if (firstOperation == undefined) {
			throw new Error("Expected at least one operation");
		}
		expect(teezOperationsByName[firstOperation.name]).toBe(firstOperation);
		expect(getTeezOperation(firstOperation.name)).toBe(firstOperation);
	});

	test("exposes operation metadata for docs and auth handling", () => {
		expect(getTeezOperation("products.list")).toMatchObject({
			auth: "none",
			safety: "read",
			summary: "Retrieve a filtered product list.",
			description:
				"Returns a paginated product listing with filters, product cards, and pagination metadata.",
		});

		expect(getTeezOperation("favorites.getIds")).toMatchObject({
			auth: "required",
			safety: "read",
			summary: "Retrieve favorited SKU IDs.",
			description: "Returns the authenticated user's favorite SKU identifiers.",
		});

		expect(
			Object.hasOwn(getTeezOperation("favorites.getIds").responses, 401),
		).toBe(true);
		expect(Object.hasOwn(getTeezOperation("auth.login").responses, 400)).toBe(
			true,
		);
	});
});

describe("full client", () => {
	test("creates a client with the full registry", () => {
		const client = createTeezClient({
			fetch: vi.fn() as unknown as typeof fetch,
		});

		expect(typeof client.getConfig).toBe("function");
		expect(typeof client.execute).toBe("function");
		expect(typeof client.auth.login).toBe("function");
		expect(typeof client.favorites.add).toBe("object");
		expect(typeof client.favorites.add.request).toBe("function");
		expect(typeof client.products.list).toBe("function");
		expect(typeof client.promocodes.validate).toBe("function");
	});
});
