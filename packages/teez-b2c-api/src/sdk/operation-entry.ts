import { isHttpOperationFlattenable } from "../http-operation/flattenability";
import {
	type HttpOperationEntry,
	type HttpOperationFlatArguments,
	type HttpOperationRequestArguments,
	type HttpOperationSuccessResponse,
} from "../http-operation/inference";
import { type AnyHttpOperationDef } from "../http-operation/types";
import { toRequestSections } from "./flat-request";
import {
	type OperationGroups,
	type OperationsClient,
	type TeezRuntime,
} from "./types";

function createRequestMethod<T extends AnyHttpOperationDef>(
	runtime: TeezRuntime,
	operation: T,
): (
	...args: HttpOperationRequestArguments<T>
) => Promise<HttpOperationSuccessResponse<T>> {
	return (...args: HttpOperationRequestArguments<T>) =>
		runtime.execute(operation, ...args);
}

function createOperationEntry<T extends AnyHttpOperationDef>(
	runtime: TeezRuntime,
	operation: T,
): HttpOperationEntry<T> {
	const requestMethod = createRequestMethod(runtime, operation);

	if (!isHttpOperationFlattenable(operation)) {
		return {
			request: requestMethod,
		} as HttpOperationEntry<T>;
	}

	const flatMethod = ((...args: HttpOperationFlatArguments<T>) => {
		const [flatRequest] = args;

		if (flatRequest == undefined) {
			return requestMethod(...([] as HttpOperationRequestArguments<T>));
		}

		return requestMethod(toRequestSections(operation, flatRequest));
	}) as HttpOperationEntry<T>;

	Object.defineProperty(flatMethod, "request", {
		value: requestMethod,
	});

	return flatMethod;
}

export function createOperationsClient<T extends OperationGroups>(
	runtime: TeezRuntime,
	operations: T,
): OperationsClient<T> {
	const client: Record<string, Record<string, unknown>> = {};

	for (const [domain, group] of Object.entries(operations)) {
		const domainClient = client[domain] ?? (client[domain] = {});

		for (const [action, operation] of Object.entries(group)) {
			domainClient[action] = createOperationEntry(runtime, operation);
		}
	}

	return client as OperationsClient<T>;
}
