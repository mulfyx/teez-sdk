import { type BaseIssue, type BaseSchema } from "valibot";

export type AnySchema = BaseSchema<unknown, unknown, BaseIssue<unknown>>;
