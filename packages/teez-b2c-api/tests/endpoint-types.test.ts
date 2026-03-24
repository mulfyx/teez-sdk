import { expect, expectTypeOf, test } from "vitest";

import {
	authCheckTokenOperation,
	type AuthCheckTokenApiError,
	type AuthCheckTokenErrorResponseBody,
	type AuthCheckTokenErrorStatus,
	type AuthCheckTokenRequest,
	type AuthCheckTokenRequestParts,
	type AuthCheckTokenResponseByStatus,
	type AuthCheckTokenResponseStatus,
	type AuthCheckTokenSuccessResponse,
} from "../src/api/auth/check-token";
import {
	authLoginOperation,
	type AuthLoginApiError,
	type AuthLoginErrorResponseBody,
	type AuthLoginErrorStatus,
	type AuthLoginRequest,
	type AuthLoginRequestParts,
	type AuthLoginResponseByStatus,
	type AuthLoginResponseStatus,
	type AuthLoginSuccessResponse,
} from "../src/api/auth/login";
import {
	type productsGetReviewsOperation,
	type ProductsGetReviewsSuccessResponse,
} from "../src/api/products/get-reviews";
import { type OperationApiError } from "../src/http-operation/api-error";
import {
	type HttpOperationErrorBody,
	type HttpOperationErrorStatus,
	type HttpOperationPreferredRequest,
	type HttpOperationRequestInput,
	type HttpOperationResponseByStatus,
	type HttpOperationResponseStatus,
	type HttpOperationSuccessResponse,
} from "../src/http-operation/inference";

test("derives endpoint aliases from operations only", () => {
	expect(authLoginOperation.name).toBe("auth.login");
	expect(authCheckTokenOperation.name).toBe("auth.checkToken");

	expectTypeOf<AuthLoginRequest>().toEqualTypeOf<
		HttpOperationPreferredRequest<typeof authLoginOperation>
	>();
	expectTypeOf<AuthLoginRequest>().toEqualTypeOf<{
		phone: string;
	}>();
	expectTypeOf<AuthLoginRequestParts>().toEqualTypeOf<
		HttpOperationRequestInput<typeof authLoginOperation>
	>();
	expectTypeOf<AuthLoginRequestParts>().toEqualTypeOf<{
		readonly body: {
			phone: string;
		};
	}>();
	expectTypeOf<AuthLoginSuccessResponse>().toEqualTypeOf<
		HttpOperationSuccessResponse<typeof authLoginOperation>
	>();
	expectTypeOf<AuthLoginSuccessResponse>().toEqualTypeOf<undefined>();
	expectTypeOf<AuthLoginResponseStatus>().toEqualTypeOf<
		HttpOperationResponseStatus<typeof authLoginOperation>
	>();
	expectTypeOf<AuthLoginResponseStatus>().toEqualTypeOf<200 | 204 | 400>();
	expectTypeOf<AuthLoginErrorStatus>().toEqualTypeOf<
		HttpOperationErrorStatus<typeof authLoginOperation>
	>();
	expectTypeOf<AuthLoginErrorStatus>().toEqualTypeOf<400>();
	expectTypeOf<AuthLoginResponseByStatus>().toEqualTypeOf<
		HttpOperationResponseByStatus<
			typeof authLoginOperation,
			AuthLoginResponseStatus
		>
	>();
	expectTypeOf<
		AuthLoginResponseByStatus<200 | 204>
	>().toEqualTypeOf<undefined>();
	expectTypeOf<AuthLoginApiError>().toEqualTypeOf<
		OperationApiError<typeof authLoginOperation>
	>();
	expectTypeOf<AuthLoginApiError>().toEqualTypeOf<
		OperationApiError<typeof authLoginOperation, 400>
	>();
	expectTypeOf<AuthLoginErrorResponseBody>().toEqualTypeOf<
		HttpOperationErrorBody<typeof authLoginOperation, AuthLoginErrorStatus>
	>();
	expectTypeOf<AuthLoginErrorResponseBody>().toEqualTypeOf<
		HttpOperationErrorBody<typeof authLoginOperation, 400>
	>();

	expectTypeOf<AuthCheckTokenRequest>().toEqualTypeOf<
		HttpOperationPreferredRequest<typeof authCheckTokenOperation>
	>();
	expectTypeOf<AuthCheckTokenRequest>().toEqualTypeOf<undefined>();
	expectTypeOf<AuthCheckTokenRequestParts>().toEqualTypeOf<
		HttpOperationRequestInput<typeof authCheckTokenOperation>
	>();
	expectTypeOf<AuthCheckTokenRequestParts>().toEqualTypeOf<undefined>();
	expectTypeOf<AuthCheckTokenSuccessResponse>().toEqualTypeOf<
		HttpOperationSuccessResponse<typeof authCheckTokenOperation>
	>();
	expectTypeOf<AuthCheckTokenResponseStatus>().toEqualTypeOf<
		HttpOperationResponseStatus<typeof authCheckTokenOperation>
	>();
	expectTypeOf<AuthCheckTokenResponseByStatus>().toEqualTypeOf<
		HttpOperationResponseByStatus<
			typeof authCheckTokenOperation,
			AuthCheckTokenResponseStatus
		>
	>();
	expectTypeOf<AuthCheckTokenApiError>().toEqualTypeOf<
		OperationApiError<typeof authCheckTokenOperation>
	>();
	expectTypeOf<AuthCheckTokenErrorStatus>().toEqualTypeOf<
		HttpOperationErrorStatus<typeof authCheckTokenOperation>
	>();
	expectTypeOf<AuthCheckTokenErrorResponseBody>().toEqualTypeOf<
		HttpOperationErrorBody<
			typeof authCheckTokenOperation,
			AuthCheckTokenErrorStatus
		>
	>();

	expectTypeOf<ProductsGetReviewsSuccessResponse>().toEqualTypeOf<
		HttpOperationSuccessResponse<typeof productsGetReviewsOperation>
	>();
	expectTypeOf<ProductsGetReviewsSuccessResponse>().toEqualTypeOf<{
		pageNumber: number;
		totalPages: number;
		totalCount: number;
		hasPreviousPage: boolean;
		hasNextPage: boolean;
		items: {
			author: string;
			reviewText: string;
			scoreValue: number;
			attributes: Record<string, string>;
			createdAt: string;
		}[];
	}>();
});
