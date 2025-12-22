/**
 * The default base URL for the Teez B2C API.
 */
export const BASE_URL = "https://b2c-api.teez.kz";

/**
 * Supported languages for the API.
 */
export const LANGUAGES = {
	/** Russian language */
	RU: "ru",

	/** Kazakh language */
	KZ: "kz",
} as const;

/**
 * Standard sort options for product and collection searches
 */
export const SORT_OPTIONS = {
	/** Sort by relevance (usually for search results) */
	BY_RELEVANCE: "byRelevance",

	/** Sort by popularity descending */
	POPULARITY: "popularity",

	/** Sort by user rating descending */
	HIGHEST_RATED: "highestRated",

	/** Sort by creation date descending */
	NEW: "new",

	/** Sort by price ascending */
	PRICE: "price",

	/** Sort by price descending */
	PRICE_DESC: "priceDesc",
} as const;

/**
 * Default HTTP headers sent with API requests.
 */
export const DEFAULT_HEADERS = {
	/** Standard User-Agent for Android client */
	"user-agent": "android;kz.teez.customer;193",

	/** Application version code */
	"x-app-version": "193",
} as const;
