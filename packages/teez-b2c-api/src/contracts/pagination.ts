import * as v from "valibot";

export interface PaginationFieldsOptions {
	totalCountDescription: string;
	pageNumberDescription?: string;
	totalPagesDescription?: string;
	hasPreviousPageDescription?: string;
	hasNextPageDescription?: string;
}
export interface PaginationFieldsShape {
	pageNumber: v.NumberSchema<undefined>;
	totalPages: v.NumberSchema<undefined>;
	totalCount: v.NumberSchema<undefined>;
	hasPreviousPage: v.BooleanSchema<undefined>;
	hasNextPage: v.BooleanSchema<undefined>;
}
export function createPaginationFields({
	totalCountDescription,
	pageNumberDescription = "Current page number",
	totalPagesDescription = "Total number of pages available",
	hasPreviousPageDescription = "Indicates if there is a previous page",
	hasNextPageDescription = "Indicates if there is a next page",
}: PaginationFieldsOptions): PaginationFieldsShape {
	return {
		pageNumber: v.pipe(v.number(), v.description(pageNumberDescription)),
		totalPages: v.pipe(v.number(), v.description(totalPagesDescription)),
		totalCount: v.pipe(v.number(), v.description(totalCountDescription)),
		hasPreviousPage: v.pipe(
			v.boolean(),
			v.description(hasPreviousPageDescription),
		),
		hasNextPage: v.pipe(v.boolean(), v.description(hasNextPageDescription)),
	} satisfies PaginationFieldsShape;
}
