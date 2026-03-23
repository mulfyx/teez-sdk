import { authOperations } from "./api/auth";
import { bannersOperations } from "./api/banners";
import { categoriesOperations } from "./api/categories";
import { collectionsOperations } from "./api/collections";
import { favoritesOperations } from "./api/favorites";
import { featureFlagsOperations } from "./api/feature-flags";
import { productsOperations } from "./api/products";
import { promoOperations } from "./api/promo";
import { promocodesOperations } from "./api/promocodes";
import { shopsOperations } from "./api/shops";
import { skuOperations } from "./api/sku";
import { usersOperations } from "./api/users";
import { type AnyHttpOperationDef } from "./http-operation/types";

type DistributedValueOf<T> = T extends object ? T[keyof T] : never;

function flattenOperationGroups<
	T extends Record<string, Record<string, AnyHttpOperationDef>>,
>(operations: T): DistributedValueOf<T[keyof T]>[] {
	const operationList: AnyHttpOperationDef[] = [];

	for (const group of Object.values(operations)) {
		operationList.push(...Object.values(group));
	}

	return operationList as DistributedValueOf<T[keyof T]>[];
}

export const teezOperations = {
	auth: authOperations,
	banners: bannersOperations,
	categories: categoriesOperations,
	collections: collectionsOperations,
	favorites: favoritesOperations,
	featureFlags: featureFlagsOperations,
	products: productsOperations,
	promo: promoOperations,
	promocodes: promocodesOperations,
	shops: shopsOperations,
	sku: skuOperations,
	users: usersOperations,
} as const;

export type TeezOperations = typeof teezOperations;

export type TeezOperationGroup = DistributedValueOf<TeezOperations>;

export type TeezOperation = DistributedValueOf<TeezOperationGroup>;

export type TeezOperationId = TeezOperation["name"];

export const teezOperationList = flattenOperationGroups(teezOperations);

export const teezOperationsByName = Object.fromEntries(
	teezOperationList.map((operation) => [operation.name, operation]),
) as Record<TeezOperationId, TeezOperation>;

export function getTeezOperation(name: TeezOperationId): TeezOperation {
	return teezOperationsByName[name];
}
