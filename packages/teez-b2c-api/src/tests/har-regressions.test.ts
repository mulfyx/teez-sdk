import { safeParse } from "valibot";
import { describe, expect, test } from "vitest";

import { bannersListResponse200Schema } from "../api/banners/list/responses";
import { collectionsGetResponse200Schema } from "../api/collections/get/responses";

describe("HAR regressions", () => {
	test("accepts promocode banner actions observed in HAR", () => {
		const result = safeParse(bannersListResponse200Schema, [
			{
				image: {
					type: "network",
					url: "https://cdn.teez.kz/public/2025_12_21_LUCKY_RU.png",
				},
				action: {
					type: "promocode",
					value: "LUCKY",
					analyticsKey: "2025_12_21_LUCKY",
				},
			},
		]);

		expect(result.success).toBe(true);

		if (!result.success) {
			throw new Error(JSON.stringify(result.issues, undefined, 2));
		}

		expect(result.output[0]?.action.type).toBe("promocode");
	});

	test('accepts collection type "ProductShelf" observed in HAR', () => {
		const result = safeParse(collectionsGetResponse200Schema, {
			id: 363,
			name: "Ёлочки",
			description: "Выбирайте самую пушистую!",
			cover:
				"https://media.cdn.teez.kz/general/photo/1f70892b76724f70a1e103251462c41a.png",
			priority: 2,
			type: "ProductShelf",
		});

		expect(result.success).toBe(true);

		if (!result.success) {
			throw new Error(JSON.stringify(result.issues, undefined, 2));
		}

		expect(result.output.type).toBe("ProductShelf");
	});
});
