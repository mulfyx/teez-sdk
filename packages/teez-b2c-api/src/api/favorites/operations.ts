import { favoritesAddOperation } from "./add";
import { favoritesGetIdsOperation } from "./get-ids";
import { favoritesRemoveOperation } from "./remove";

export const favoritesOperations = {
	getIds: favoritesGetIdsOperation,
	add: favoritesAddOperation,
	remove: favoritesRemoveOperation,
} as const;
