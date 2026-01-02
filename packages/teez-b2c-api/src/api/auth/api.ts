import { type HttpClient } from "../../http/client";
import {
	type AuthApiCheckTokenResponse,
	type AuthApiLoginResponse,
	type AuthApiVerifyResponse,
} from "./schema-types";
import {
	AuthApiCheckTokenResponseSchema,
	AuthApiLoginResponseSchema,
	AuthApiVerifyResponseSchema,
} from "./schemas";
import {
	type AuthApiCheckTokenParams,
	type AuthApiLoginParams,
	type AuthApiVerifyParams,
} from "./types";

/**
 * API for authentication operations.
 */
export class AuthApi {
	/**
	 * Initializes a new instance of the AuthApi.
	 *
	 * @param http HTTP client instance.
	 */
	public constructor(private http: HttpClient) {}

	/**
	 * Initiates phone login by sending an OTP code to the specified phone number.
	 *
	 * @example
	 * await client.auth.login({
	 *   phone: "+77071234567"
	 * });
	 */
	public login(params: AuthApiLoginParams): Promise<AuthApiLoginResponse> {
		return this.http.post(
			{
				path: "/auth/login",
				body: params,
			},
			AuthApiLoginResponseSchema,
		);
	}

	/**
	 * Verifies OTP code and obtains JWT access and refresh tokens.
	 *
	 * @example
	 * const response = await client.auth.verify({
	 *   phone: "+77071234567",
	 *   otpCode: "2610"
	 * });
	 */
	public verify(params: AuthApiVerifyParams): Promise<AuthApiVerifyResponse> {
		return this.http.post(
			{
				path: "/auth/verify",
				body: params,
			},
			AuthApiVerifyResponseSchema,
		);
	}

	/**
	 * Validates the current JWT token and retrieves user information.
	 *
	 * @example
	 * const response = await client.auth.checkToken();
	 */
	public checkToken(
		params: AuthApiCheckTokenParams = {},
	): Promise<AuthApiCheckTokenResponse> {
		return this.http.get(
			{
				path: "/auth/check-token",
				params,
			},
			AuthApiCheckTokenResponseSchema,
		);
	}
}
