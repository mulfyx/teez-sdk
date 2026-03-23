import { productsGetReviewsOperation } from "./get-reviews";
import { productsGetSortOptionsOperation } from "./get-sort-options";
import { productsListOperation } from "./list";

export const productsOperations = {
	getSortOptions: productsGetSortOptionsOperation,
	list: productsListOperation,
	getReviews: productsGetReviewsOperation,
} as const;
