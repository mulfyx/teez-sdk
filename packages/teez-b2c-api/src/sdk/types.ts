import { type ResolvedTeezClientConfig } from "../config/types";
import {
	type HttpOperationEntry,
	type HttpOperationExecutor,
} from "../http-operation/inference";
import { type AnyHttpOperationDef } from "../http-operation/types";

export interface TeezRuntime extends HttpOperationExecutor {
	getConfig(): Readonly<ResolvedTeezClientConfig>;
}

export type OperationGroup = Record<string, AnyHttpOperationDef>;

export type OperationGroups = Record<string, OperationGroup>;

export type OperationsClient<T extends OperationGroups> = {
	readonly [TDomain in keyof T]: {
		readonly [TAction in keyof T[TDomain]]: HttpOperationEntry<
			T[TDomain][TAction]
		>;
	};
};

export type ClientFromOperations<T extends OperationGroups> = TeezRuntime &
	OperationsClient<T>;
