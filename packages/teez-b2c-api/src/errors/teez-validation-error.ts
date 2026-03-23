import { TeezError } from "./teez-error";

export interface TeezValidationIssue {
	code: string;
	path: (string | number | symbol)[];
	message: string;
}

export interface TeezValidationErrorOptions extends ErrorOptions {
	issues: TeezValidationIssue[];
	data?: unknown;
}

export class TeezValidationError extends TeezError {
	public override name = "TeezValidationError";

	public readonly issues: TeezValidationIssue[];

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
