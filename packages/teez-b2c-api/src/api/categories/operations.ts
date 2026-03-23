import { categoriesGetOperation } from "./get";
import { categoriesGetParentsOperation } from "./get-parents";
import { categoriesListOperation } from "./list";

export const categoriesOperations = {
	list: categoriesListOperation,
	get: categoriesGetOperation,
	getParents: categoriesGetParentsOperation,
} as const;
