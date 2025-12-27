import { TeezError } from "./teez-error";

/**
 * Abstract representation of a validation issue.
 */
export interface TeezValidationIssue {
	/**
	 * Error code (e.g., "invalid_type", "too_small").
	 */
	code: string;

	/**
	 * The path to the invalid field (array format).
	 */
	path: (string | number | symbol)[];

	/**
	 * Human-readable error message.
	 */
	message: string;
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
