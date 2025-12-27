/**
 * ⚠️ This file is auto-generated. Do not edit manually.
 * Run `npm run generate:schema-types` to regenerate.
 * Generated from: schemas.ts
 */

interface Auxiliary_1 {
	/**
	 * Unique identifier of the category
	 */
	id: number;
	/**
	 * Localized display name of the category
	 */
	name: string;
	/**
	 * Depth level in the category tree
	 */
	level: number;
	/**
	 * Identifier of the parent category
	 */
	parentId: number;
	/**
	 * Indicates if there are nested subcategories
	 */
	hasSubcategories: boolean;
	/**
	 * Indicates if the category contains adult content
	 */
	isAdult: boolean;
	/**
	 * List of nested subcategories.
	 */
	subcategories?: (Auxiliary_1[] | null) | undefined;
}

interface Auxiliary_2 {
	/**
	 * Unique identifier of the category
	 */
	id: number;
	/**
	 * Localized display name of the category
	 */
	name: string;
	/**
	 * Depth level in the category tree
	 */
	level: number;
	/**
	 * Indicates if there are nested subcategories
	 */
	hasSubcategories: boolean;
	/**
	 * List of nested subcategories.
	 */
	subcategories?: (Auxiliary_2[] | null) | undefined;
}

/**
 * Schema for a category list item.
 */
export interface CategoriesApiListResponseItem {
	/**
	 * Unique identifier of the category
	 */
	id: number;
	/**
	 * Localized display name of the category
	 */
	name: string;
	/**
	 * Depth level in the category tree
	 */
	level: number;
	/**
	 * Identifier of the parent category
	 */
	parentId: number;
	/**
	 * Indicates if there are nested subcategories
	 */
	hasSubcategories: boolean;
	/**
	 * Indicates if the category contains adult content
	 */
	isAdult: boolean;
}

/**
 * Response schema for the list of categories.
 */
export type CategoriesApiListResponse = CategoriesApiListResponseItem[];

/**
 * Response schema for getting a specific category by ID.
 */
export type CategoriesApiGetResponse = Auxiliary_1;

/**
 * Schema for a parent category item with nesting.
 */
export type CategoriesApiGetParentsResponseItem = Auxiliary_2;

/**
 * Response schema for getting parent categories.
 */
export type CategoriesApiGetParentsResponse =
	CategoriesApiGetParentsResponseItem[];
