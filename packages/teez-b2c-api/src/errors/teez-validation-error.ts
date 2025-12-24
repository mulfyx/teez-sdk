import { TeezError } from "./teez-error";

/**
 * Abstract representation of a validation issue, independent of any validation library.
 */
export interface TeezValidationIssue {
	/**
	 * The error message.
	 */
	message: string;

	/**
	 * The path to the invalid field (flattened for simplicity).
	 */
	path?: (string | number)[];

	/**
	 * The expected value type (optional).
	 */
	expected?: string;

	/**
	 * The received value (optional).
	 */
	received?: string;
}

/**
 * Options for constructing a TeezValidationError.
 */
export interface TeezValidationErrorOptions extends ErrorOptions {
	/**
	 * List of generic validation issues.
	 */
	issues: TeezValidationIssue[];

	/**
	 * The full data object that failed validation.
	 */
	data?: unknown;
}

/**
 * Error thrown when validation fails.
 */
export class TeezValidationError extends TeezError {
	public override name = "TeezValidationError";

	/**
	 * List of standardized validation issues.
	 */
	public readonly issues: TeezValidationIssue[];

	/**
	 * The raw data that failed validation.
	 */
	public readonly data: unknown;

	public constructor(
		message: string,
		{ issues, data, ...errorOptions }: TeezValidationErrorOptions,
	) {
		super(message, errorOptions);

		this.issues = issues;
		this.data = data;
	}
}
