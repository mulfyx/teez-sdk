export type HttpSuccessStatusCode =
	| 200
	| 201
	| 202
	| 203
	| 204
	| 205
	| 206
	| 207
	| 208
	| 226;

export function isHttpSuccessStatus(
	status: number,
): status is HttpSuccessStatusCode {
	return status >= 200 && status < 300;
}
