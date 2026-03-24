import { productsAutocompleteOperation } from "./autocomplete";
import { productsGetReviewsOperation } from "./get-reviews";
import { productsGetSortOptionsOperation } from "./get-sort-options";
import { productsListOperation } from "./list";

export const productsOperations = {
	autocomplete: productsAutocompleteOperation,
	getSortOptions: productsGetSortOptionsOperation,
	list: productsListOperation,
	getReviews: productsGetReviewsOperation,
} as const;
