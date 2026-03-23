import * as v from "valibot";

import { nullishToUndefined } from "../../../schema/nullish";

export interface CategoriesGetItemInput {
	id: number;
	name: string;
	level: number;
	parentId: number;
	hasSubcategories: boolean;
	isAdult: boolean;
	subcategories?: CategoriesGetItemInput[] | null | undefined;
}
export interface CategoriesGetItemOutput {
	id: number;
	name: string;
	level: number;
	parentId: number;
	hasSubcategories: boolean;
	isAdult: boolean;
	subcategories?: CategoriesGetItemOutput[] | undefined;
}
function createCategoriesGetSubcategoriesSchema(): v.GenericSchema<
	CategoriesGetItemInput[] | null | undefined,
	CategoriesGetItemOutput[] | undefined
> {
	return v.pipe(
		nullishToUndefined(v.array(v.lazy(() => categoriesGetItemSchema))),
		v.description("List of nested subcategories."),
	);
}
export const categoriesGetItemSchema: v.GenericSchema<
	CategoriesGetItemInput,
	CategoriesGetItemOutput
> = v.pipe(
	v.object({
		id: v.pipe(v.number(), v.description("Unique identifier of the category")),
		name: v.pipe(
			v.string(),
			v.description("Localized display name of the category"),
		),
		level: v.pipe(
			v.number(),
			v.description("Depth level in the category tree"),
		),
		parentId: v.pipe(
			v.number(),
			v.description("Identifier of the parent category"),
		),
		hasSubcategories: v.pipe(
			v.boolean(),
			v.description("Indicates if there are nested subcategories"),
		),
		isAdult: v.pipe(
			v.boolean(),
			v.description("Indicates if the category contains adult content"),
		),
		subcategories: createCategoriesGetSubcategoriesSchema(),
	}),
	v.description(
		"Category node returned by the category detail endpoint, including immediate subcategories.",
	),
);
export const categoriesGetResponse200Schema = v.pipe(
	categoriesGetItemSchema,
	v.description(
		"Category detail response with the selected category and its immediate subcategories.",
	),
);
