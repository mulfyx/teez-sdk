import { collectionsGetOperation } from "./get";
import { collectionsGetSkusOperation } from "./get-skus";
import { collectionsListOperation } from "./list";

export const collectionsOperations = {
	getSkus: collectionsGetSkusOperation,
	list: collectionsListOperation,
	get: collectionsGetOperation,
} as const;
