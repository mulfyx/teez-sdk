import * as z from "zod/mini";

import { doc } from "../schema/metadata";

export interface PaginationFieldsOptions {
	totalCountDescription: string;
	pageNumberDescription?: string;
	totalPagesDescription?: string;
	hasPreviousPageDescription?: string;
	hasNextPageDescription?: string;
}

export interface PaginationFieldsShape {
	pageNumber: z.ZodMiniNumber;
	totalPages: z.ZodMiniNumber;
	totalCount: z.ZodMiniNumber;
	hasPreviousPage: z.ZodMiniBoolean;
	hasNextPage: z.ZodMiniBoolean;
}

export function createPaginationFields({
	totalCountDescription,
	pageNumberDescription = "Current page number",
	totalPagesDescription = "Total number of pages available",
	hasPreviousPageDescription = "Indicates if there is a previous page",
	hasNextPageDescription = "Indicates if there is a next page",
}: PaginationFieldsOptions): PaginationFieldsShape {
	return {
		pageNumber: doc({
			schema: z.number(),
			description: pageNumberDescription,
		}),
		totalPages: doc({
			schema: z.number(),
			description: totalPagesDescription,
		}),
		totalCount: doc({
			schema: z.number(),
			description: totalCountDescription,
		}),
		hasPreviousPage: doc({
			schema: z.boolean(),
			description: hasPreviousPageDescription,
		}),
		hasNextPage: doc({
			schema: z.boolean(),
			description: hasNextPageDescription,
		}),
	} satisfies PaginationFieldsShape;
}
