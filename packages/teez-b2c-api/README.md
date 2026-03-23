# @teez-sdk/teez-b2c-api

Typed SDK for the Teez B2C API built around operation definitions, `zod/mini` schemas, runtime validation, and a registry that can be reused for SDK, MCP, and documentation generation.

Use `createTeezClient()` for the full client, or `createTeezClientFromOperations(...)` to assemble a smaller client from selected operation groups for better tree-shaking.

## Installation

```bash
npm install @teez-sdk/teez-b2c-api
```

Runtime requirements:

- Node.js 20+ when relying on the built-in global `fetch`
- or any runtime where `fetch`, `Request`, `Response`, and `Headers` are available
- or a custom `fetch` implementation passed via `createTeezClient({ fetch })`

## Quick Start

```ts
import { createTeezClient } from "@teez-sdk/teez-b2c-api";

const client = createTeezClient({
	language: "kz",
	timeout: 5_000,
});

const featureFlags = await client.featureFlags.list();

const products = await client.products.list({
	pageNumber: 1,
	pageSize: 10,
});
```

Operations without an `input` section can be called without arguments:

```ts
await client.categories.list();
await client.promo.list();
await client.featureFlags.list();
```

Operations with input schemas always require an object, even when all fields are optional:

```ts
await client.products.getSortOptions({});
await client.banners.list({});
```

Operations whose successful response uses `emptyResponse()` resolve with `undefined`:

```ts
await client.auth.login({
	phone: "+77071234567",
});

await client.favorites.add.request({
	body: [12345],
});
```

## Auth Flow

Use `auth.login` to send the OTP code, `auth.verify` to exchange it for tokens, then create an authenticated client with the returned `accessToken`:

```ts
import { createTeezClient } from "@teez-sdk/teez-b2c-api";

const publicClient = createTeezClient();

await publicClient.auth.login({
	phone: "+77071234567",
});

const { accessToken, refreshToken } = await publicClient.auth.verify({
	phone: "+77071234567",
	otpCode: "1234",
});

const authClient = createTeezClient({
	token: accessToken,
});

const profile = await authClient.auth.checkToken();
```

`refreshToken` is returned by the API, but this SDK does not currently provide a refresh-token operation. Persist it only if your application uses it outside the SDK.

## Client Shapes and Tree-Shaking

`createTeezClient()` gives you the complete SDK with every operation group attached.

Create the full client:

```ts
import { createTeezClient } from "@teez-sdk/teez-b2c-api";

const client = createTeezClient();
```

If your application only needs part of the API, prefer `createTeezClientFromOperations(...)`. It lets bundlers drop unused operation groups instead of pulling in the full registry:

```ts
import {
	authOperations,
	createTeezClientFromOperations,
} from "@teez-sdk/teez-b2c-api";

const authClient = createTeezClientFromOperations({
	auth: authOperations,
});

await authClient.auth.login({
	phone: "+77071234567",
});
```

This is the recommended entry point when bundle size matters, for example in browser apps that only use a few Teez domains.

## Configuration

```ts
interface TeezClientConfig {
	baseUrl?: string;
	token?: string;
	appVersion?: string;
	language?: "ru" | "kz";
	timeout?: number;
	headers?: HeadersInit;
	fetch?: typeof globalThis.fetch;
}
```

Defaults:

- `baseUrl`: `https://b2c-api.teez.kz`
- `appVersion`: `"200"`
- `language`: `"ru"`
- `timeout`: `30_000`

Notes:

- `token` becomes an `Authorization: Bearer ...` header.
- `appVersion` is used for both `User-Agent` and `X-App-Version`.
- `headers` are merged on top of the SDK defaults.
- `fetch` defaults to `globalThis.fetch`; pass your own implementation when the runtime does not provide one.
- Kazakh is standardized as `"kz"` in request config and typed responses.

If you need the fully separated request shape instead of the flattened convenience call, use `.request(...)`:

```ts
await client.products.list.request({
	query: {
		pageNumber: 1,
		pageSize: 10,
	},
});
```

## Runtime Validation

Every operation validates:

- input before the request is sent
- success payloads after the response is received
- error response bodies before they are attached to `TeezApiError.parsedBody`

The package keeps its `zod/mini` schemas as internal validation details. Public type exports stay at the operation level:

```ts
import {
	productsListOperation,
	type ProductsListRequest,
	type ProductsListRequestParts,
	type ProductsListSuccessResponse,
} from "@teez-sdk/teez-b2c-api";
```

`FooRequest` follows the preferred client call shape, so flattenable operations use the top-level object passed to `client.foo.bar(...)`. `FooRequestParts` matches `client.foo.bar.request(...)`.

Generated schema-derived model types are intentionally not part of the package contract. If an application needs its own domain models, define them locally.

## Operation Registry

The SDK exposes the grouped registry, a flat list, and name lookup helpers:

```ts
import {
	getTeezOperation,
	teezOperationList,
	teezOperations,
} from "@teez-sdk/teez-b2c-api";

const operation = getTeezOperation("products.list");

console.log(operation.auth);
console.log(operation.safety);
console.log(operation.summary);
console.log(operation.description);
console.log(teezOperationList.length);
console.log(teezOperations.products.list === operation);
```

Operations are the main source of truth for:

- HTTP method and request mapping
- input and output schemas
- auth requirements
- read/write safety metadata
- MCP and doc-generation metadata

## Error Handling

The SDK throws dedicated error classes:

- `TeezApiError` for non-2xx responses
- `TeezNetworkError` for transport failures
- `TeezTimeoutError` for aborted requests due to timeout
- `TeezValidationError` for input, output, or error-body schema mismatches

`TeezApiError` keeps transport metadata and may also include a typed `parsedBody` when the matching error response in `responses` defines a schema.

```ts
import {
	getOperationApiError,
	skuGetReviewAvailableOperation,
	TeezApiError,
	TeezTimeoutError,
} from "@teez-sdk/teez-b2c-api";

try {
	await client.sku.getReviewAvailable({
		skuId: 12345,
	});
} catch (error) {
	if (error instanceof TeezTimeoutError) {
		console.error("Request timed out");
	} else if (error instanceof TeezApiError) {
		console.error(error.status, error.message);

		const apiError = getOperationApiError(
			error,
			skuGetReviewAvailableOperation,
		);

		if (apiError != undefined) {
			console.error(apiError.parsedBody.message);
		}
	}
}
```

## Auth Notes

Live probes without a token confirmed these operations require authentication:

- `auth.checkToken`
- `favorites.add`
- `favorites.getIds`
- `favorites.remove`
- `promocodes.validate`
- `sku.getReviewAvailable`
- `users.registerDevice`
- `users.updateLanguage`

Public read-only operations such as `banners.list`, `categories.*`, `collections.*`, `featureFlags.list`, `products.*`, `promo.list`, `shops.*`, `sku.get`, `sku.getCollections`, and `sku.getSimilar` were successfully exercised without a token.

## Package Exports

The package exports:

- `createTeezClient`, `createTeezClientFromOperations`, `createRuntime`
- `teezOperations`, `teezOperationList`, `teezOperationsByName`, `getTeezOperation`
- operation definitions for every endpoint
- type aliases from `types.ts`
- shared contracts and filter schemas such as `apiErrorResponseSchema`, `filterSchema`, `rangeFilterSchema`, and `categoryFilterSchema`

## Development

Run these commands from `packages/teez-b2c-api`. From the repository root, append `-w @teez-sdk/teez-b2c-api`.

```bash
npm run generate:types
npm run typecheck
npm run typecheck:test
npm run test
npm run lint
npm run test:coverage
npm run build
```

## License

MIT
