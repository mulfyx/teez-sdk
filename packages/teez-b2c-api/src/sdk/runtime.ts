import { resolveConfig } from "../config/resolve";
import { type TeezClientConfig } from "../config/types";
import { HttpClient } from "../transport/http-client";
import { type TeezRuntime } from "./types";

export function createRuntime(config?: TeezClientConfig): TeezRuntime {
	const resolvedConfig = resolveConfig(config);

	const http = new HttpClient(resolvedConfig);

	return {
		execute: (operation, ...args) => http.execute(operation, ...args),
		getConfig: () => resolvedConfig,
	};
}
