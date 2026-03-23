import * as z from "zod/mini";

import { doc } from "../../schema/metadata";
import { categoryFilterSchema } from "./category";
import { rangeFilterSchema } from "./range";

export const filterSchema = doc({
	schema: z.discriminatedUnion("type", [
		rangeFilterSchema,
		categoryFilterSchema,
	]),
	description:
		"Union filter schema that can be either range or category filter.\nThis is the recommended pattern for type-safe filters.",
});
