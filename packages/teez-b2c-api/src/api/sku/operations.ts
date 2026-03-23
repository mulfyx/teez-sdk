import { skuGetOperation } from "./get";
import { skuGetCollectionsOperation } from "./get-collections";
import { skuGetReviewAvailableOperation } from "./get-review-available";
import { skuGetSimilarOperation } from "./get-similar";

export const skuOperations = {
	get: skuGetOperation,
	getSimilar: skuGetSimilarOperation,
	getCollections: skuGetCollectionsOperation,
	getReviewAvailable: skuGetReviewAvailableOperation,
} as const;
