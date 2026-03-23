import type { TeezApiError } from "../errors/teez-api-error";
import { TeezApiError as RuntimeTeezApiError } from "../errors/teez-api-error";
import type {
	HttpOperationErrorBody,
	HttpOperationErrorStatus,
} from "./inference";
import type { AnyHttpOperationDef } from "./types";

export interface TypedTeezApiError<
	TStatus extends number = number,
	TParsedBody = unknown,
> extends TeezApiError {
	readonly status: TStatus;
	parsedBody: TParsedBody;
}

export type OperationApiError<
	T extends AnyHttpOperationDef,
	TStatus extends HttpOperationErrorStatus<T> = HttpOperationErrorStatus<T>,
> =
	TStatus extends HttpOperationErrorStatus<T>
		? TypedTeezApiError<TStatus, HttpOperationErrorBody<T, TStatus>>
		: never;

export function isOperationApiError<T extends AnyHttpOperationDef>(
	error: unknown,
	operation: T,
): error is OperationApiError<T> {
	if (!(error instanceof RuntimeTeezApiError)) {
		return false;
	}

	if (
		error.operationName !== operation.name ||
		error.parsedBody === undefined
	) {
		return false;
	}

	return operation.responses[error.status]?.schema != undefined;
}

export function getOperationApiError<T extends AnyHttpOperationDef>(
	error: unknown,
	operation: T,
): OperationApiError<T> | undefined {
	return isOperationApiError(error, operation) ? error : undefined;
}
