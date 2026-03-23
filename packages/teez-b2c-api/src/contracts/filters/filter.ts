import * as v from "valibot";

import { categoryFilterSchema } from "./category";
import { rangeFilterSchema } from "./range";

export const filterSchema = v.pipe(
	v.variant("type", [rangeFilterSchema, categoryFilterSchema]),
	v.description(
		"Union filter schema that can be either range or category filter.\nThis is the recommended pattern for type-safe filters.",
	),
);
