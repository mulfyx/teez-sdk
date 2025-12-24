import { BannersApi } from "./api/banners/api";
import { CategoriesApi } from "./api/categories/api";
import { CollectionsApi } from "./api/collections/api";
import { FeatureFlagsApi } from "./api/feature-flags/api";
import { ProductsApi } from "./api/products/api";
import { PromoApi } from "./api/promo/api";
import { ShopsApi } from "./api/shops/api";
import { SkuApi } from "./api/sku/api";
import {
	resolveConfig,
	type ResolvedTeezClientConfig,
	type TeezClientConfig,
} from "./config";
import { HttpClient } from "./http/client";

/**
 * Main client for interacting with the Teez B2C API.
 */
export class TeezClient {
	/**
	 * Configuration used by the client.
	 */
	private readonly config: ResolvedTeezClientConfig;

	/**
	 * HTTP client for making requests.
	 */
	private readonly http: HttpClient;

	/**
	 * API for retrieving banners.
	 */
	public readonly banners: BannersApi;

	/**
	 * API for retrieving categories.
	 */
	public readonly categories: CategoriesApi;

	/**
	 * API for retrieving collections.
	 */
	public readonly collections: CollectionsApi;

	/**
	 * API for retrieving feature flags.
	 */
	public readonly featureFlags: FeatureFlagsApi;

	/**
	 * API for retrieving products.
	 */
	public readonly products: ProductsApi;

	/**
	 * API for retrieving promotions.
	 */
	public readonly promo: PromoApi;

	/**
	 * API for retrieving shops.
	 */
	public readonly shops: ShopsApi;

	/**
	 * API for retrieving SKU details.
	 */
	public readonly sku: SkuApi;

	public constructor(config?: TeezClientConfig) {
		this.config = resolveConfig(config);

		this.http = new HttpClient(this.config);

		this.banners = new BannersApi(this.http);
		this.categories = new CategoriesApi(this.http);
		this.collections = new CollectionsApi(this.http);
		this.featureFlags = new FeatureFlagsApi(this.http);
		this.products = new ProductsApi(this.http);
		this.promo = new PromoApi(this.http);
		this.shops = new ShopsApi(this.http);
		this.sku = new SkuApi(this.http);
	}

	/**
	 * Returns the current client configuration.
	 */
	public getConfig(): Readonly<ResolvedTeezClientConfig> {
		return this.config;
	}
}
