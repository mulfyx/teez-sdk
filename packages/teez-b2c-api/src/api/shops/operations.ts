import { shopsGetOperation } from "./get";
import { shopsGetMonobrandOperation } from "./get-monobrand";
import { shopsGetProductsOperation } from "./get-products";

export const shopsOperations = {
	get: shopsGetOperation,
	getMonobrand: shopsGetMonobrandOperation,
	getProducts: shopsGetProductsOperation,
} as const;
