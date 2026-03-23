import { type TeezClientConfig } from "../config/types";
import { teezOperations, type TeezOperations } from "../registry";
import { createOperationsClient } from "./operation-entry";
import { createRuntime } from "./runtime";
import { type ClientFromOperations, type OperationGroups } from "./types";

export type TeezClient = ClientFromOperations<TeezOperations>;

export function createTeezClientFromOperations<T extends OperationGroups>(
	operations: T,
	config?: TeezClientConfig,
): ClientFromOperations<T> {
	const runtime = createRuntime(config);
	const operationsClient = createOperationsClient(runtime, operations);

	return {
		...runtime,
		...operationsClient,
	} as ClientFromOperations<T>;
}

export function createTeezClient(config?: TeezClientConfig): TeezClient {
	return createTeezClientFromOperations(teezOperations, config);
}
