# @teez-sdk/teez-b2c-api

A typed TypeScript client for the Teez B2C API.

## Features

- **Fully Typed:** Written in TypeScript with complete type definitions.
- **Runtime Validation:** Uses [Zod](https://zod.dev) to validate API responses.
- **Modular:** API endpoints are organized into logical modules (Products, Banners, etc.).
- **Error Handling:** Custom error classes for fine-grained control over API, network, and validation errors.

## Installation

```bash
npm install @teez-sdk/teez-b2c-api
# or
yarn add @teez-sdk/teez-b2c-api
# or
pnpm add @teez-sdk/teez-b2c-api

```

## Getting Started

Initialize the client and make your first request:

```typescript
import { TeezClient } from "@teez-sdk/teez-b2c-api";

// Initialize with default configuration
const client = new TeezClient();

// Or with custom configuration
const customClient = new TeezClient({
	timeout: 5000,
	language: "kk", // Request responses in Kazakh
});

try {
	// Fetch products
	const products = await client.products.list({
		pageSize: 10,
		pageNumber: 1,
	});

	console.log(products);
} catch (error) {
	console.error("Failed to fetch products:", error);
}
```

## Configuration

The `TeezClient` accepts an optional configuration object:

```typescript
interface TeezClientConfig {
	/** Base URL for the API. Default: "https://b2c-api.teez.kz" */
	baseUrl?: string;

	/** JWT bearer token for authenticated requests. */
	token?: string;

	/** Application version. Default: "193" */
	appVersion?: string;

	/** Language for API responses. Default: "ru" */
	language?: "ru" | "kk";

	/** Request timeout in milliseconds. Default: 30000 */
	timeout?: number;

	/** Custom headers to include in all requests. */
	headers?: Record<string, string>;
}
```

### Examples

**Set a custom app version:**

```typescript
const client = new TeezClient({
	appVersion: "200", // User-agent will be "android;kz.teez.customer;200"
});
```

**Use a custom user-agent:**

```typescript
const client = new TeezClient({
	headers: {
		"user-agent": "my-custom-client/1.0",
	},
});
```

## Usage Examples

### Categories

```typescript
import { TeezClient } from "@teez-sdk/teez-b2c-api";

const client = new TeezClient();

// Get all categories
const categories = await client.categories.list();

console.log(`Found ${categories.length} categories`);

// Get a specific category
const electronics = await client.categories.get({
	categoryId: 3472,
});

console.log(`Category: ${electronics.name} (level ${electronics.level})`);

// Get parent hierarchies for multiple categories
const parents = await client.categories.getParents({
	categoryId: [3472, 7665, 3431],
	level: 1, // Optional: filter by hierarchy level
});

console.log(`Found ${parents.length} parent hierarchies`);
```

### Products

```typescript
// List products with pagination
const products = await client.products.list({
	pageSize: 20,
	pageNumber: 1,
});

// Get product reviews
const reviews = await client.products.getReviews({
	productId: 12345,
	pageSize: 10,
});

// Get similar products
const similar = await client.sku.getSimilar({
	skuId: 12345,
	pageSize: 5,
});
```

### Authentication

```typescript
// Step 1: Send OTP to phone
await client.auth.login({ phone: "+77071234567" });

// Step 2: Verify OTP and get access token
const { accessToken } = await client.auth.verify({
	phone: "+77071234567",
	otpCode: "2610",
});

// Step 3: Use token for authenticated requests
const authenticatedClient = new TeezClient({ token: accessToken });
```

## Available APIs

The client exposes the following API modules:

- `client.auth` - Handle authentication, including login and OTP verification.
- `client.banners` - Retrieve promotional banners.
- `client.categories` - Browse and search product categories.
- `client.collections` - Access curated product collections.
- `client.favorites` - Manage user favorite products.
- `client.featureFlags` - Check available feature flags.
- `client.products` - Search products and view reviews.
- `client.promo` - Access information about active promotions.
- `client.shops` - Get information about shops and sellers.
- `client.sku` - Retrieve detailed SKU information.
- `client.users` - Manage user profiles and preferences.

## Error Handling

The SDK throws specific error types to help you handle failures gracefully:

- `TeezApiError`: The server returned a non-2xx status code. Contains status, status text, and response body.
- `TeezNetworkError`: Network failure (e.g., DNS resolution, offline).
- `TeezTimeoutError`: The request exceeded the configured timeout.
- `TeezValidationError`: The API response did not match the expected schema (Zod validation failed).

```typescript
import { TeezApiError, TeezTimeoutError } from "@teez-sdk/teez-b2c-api";

try {
	await client.products.list();
} catch (error) {
	if (error instanceof TeezTimeoutError) {
		console.error("Request timed out");
	} else if (error instanceof TeezApiError) {
		console.error(`API Error: ${error.status} - ${error.message}`);
	} else {
		console.error("Unknown error:", error);
	}
}
```

## License

MIT
