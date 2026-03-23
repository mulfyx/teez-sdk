export async function readResponseBody(response: Response): Promise<unknown> {
	if (response.status === 204) {
		return undefined;
	}

	const text = await response.text();

	if (text === "") {
		return undefined;
	}

	const contentType = response.headers.get("Content-Type");

	if (
		contentType?.includes("application/json") === true ||
		contentType?.includes("+json") === true
	) {
		try {
			return JSON.parse(text) as unknown;
		} catch {
			return text;
		}
	}

	return text;
}
