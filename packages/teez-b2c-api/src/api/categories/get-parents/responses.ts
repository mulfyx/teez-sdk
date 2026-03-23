import * as v from "valibot";

import { nullishToUndefined } from "../../../schema/nullish";

export interface CategoriesGetParentsItemInput {
	id: number;
	name: string;
	level: number;
	hasSubcategories: boolean;
	subcategories?: CategoriesGetParentsItemInput[] | null | undefined;
}
export interface CategoriesGetParentsItemOutput {
	id: number;
	name: string;
	level: number;
	hasSubcategories: boolean;
	subcategories?: CategoriesGetParentsItemOutput[] | undefined;
}
function createCategoriesGetParentsSubcategoriesSchema(): v.GenericSchema<
	CategoriesGetParentsItemInput[] | null | undefined,
	CategoriesGetParentsItemOutput[] | undefined
> {
	return v.pipe(
		nullishToUndefined(v.array(v.lazy(() => categoriesGetParentsItemSchema))),
		v.description("List of nested subcategories."),
	);
}
export const categoriesGetParentsItemSchema: v.GenericSchema<
	CategoriesGetParentsItemInput,
	CategoriesGetParentsItemOutput
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
		hasSubcategories: v.pipe(
			v.boolean(),
			v.description("Indicates if there are nested subcategories"),
		),
		subcategories: createCategoriesGetParentsSubcategoriesSchema(),
	}),
	v.description(
		"Category node used inside parent-category chains, including nested subcategories.",
	),
);
export const categoriesGetParentsResponse200Schema = v.pipe(
	v.array(categoriesGetParentsItemSchema),
	v.description(
		"Parent category chains returned for the requested category identifiers.",
	),
);
