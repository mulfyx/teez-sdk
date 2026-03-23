export function interpolatePath(
	template: string,
	pathParams?: Record<string, unknown>,
): string {
	return template.replaceAll(/{([^}]+)}/g, (_match, key: string) => {
		if (pathParams == undefined || !(key in pathParams)) {
			throw new Error(
				`Missing path parameter "${key}" for template "${template}"`,
			);
		}

		return encodeURIComponent(String(pathParams[key]));
	});
}
