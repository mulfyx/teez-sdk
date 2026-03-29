import { getObjectSchemaKeys } from "../schema/object-schema";
import { isHttpSuccessStatus } from "./status";
import {
	type HttpOperationRequest,
	type HttpOperationResponse,
	type HttpOperationResponses,
} from "./types";

function getPathTemplateParameters(template: string): string[] {
	return [...template.matchAll(/{([^}]+)}/g)].map(
		([, parameter = ""]) => parameter,
	);
}

export function validatePathSchema(
	request: HttpOperationRequest,
	operationName: string,
): void {
	const pathParameterNames = getPathTemplateParameters(request.path.template);
	const pathSchema = request.path.schema;

	if (pathParameterNames.length === 0) {
		if (pathSchema != undefined) {
			throw new Error(
				`Operation "${operationName}" defines request.path.schema without path parameters in the template`,
			);
		}

		return;
	}

	if (pathSchema == undefined) {
		throw new Error(
			`Operation "${operationName}" is missing request.path.schema for template parameters`,
		);
	}

	const schemaKeys = getObjectSchemaKeys(pathSchema);

	// oxlint-disable-next-line unicorn/no-array-sort -- preserve toSorted semantics
	const sortedPathParameterNames = [...pathParameterNames].sort();

	// oxlint-disable-next-line unicorn/no-array-sort -- preserve toSorted semantics
	const sortedSchemaKeys = [...schemaKeys].sort();

	if (
		sortedPathParameterNames.length !== sortedSchemaKeys.length ||
		sortedPathParameterNames.some(
			(key, index) => key !== sortedSchemaKeys[index],
		)
	) {
		throw new Error(
			`Operation "${operationName}" request.path.schema keys must exactly match request.path.template parameters`,
		);
	}
}

export function validateResponses(
	responses: HttpOperationResponses,
	operationName: string,
): void {
	const responseEntries = Object.entries(responses) as readonly (readonly [
		string,
		HttpOperationResponse,
	])[];

	const statuses = responseEntries.map(([status]) => Number(status));

	if (!statuses.some((status) => isHttpSuccessStatus(status))) {
		throw new Error(
			`Operation "${operationName}" must define at least one successful HTTP response`,
		);
	}

	for (const [statusKey, response] of responseEntries) {
		const status = Number(statusKey);

		if (
			(status === 204 || status === 205 || status === 304) &&
			response.schema != undefined
		) {
			throw new Error(
				`Operation "${operationName}" response ${status} must not define a body schema`,
			);
		}
	}
}
