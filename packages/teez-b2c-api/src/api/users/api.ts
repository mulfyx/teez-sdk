import { type HttpClient } from "../../http/client";
import {
	type UsersApiRegisterDeviceResponse,
	type UsersApiUpdateLanguageResponse,
} from "./schema-types";
import {
	UsersApiRegisterDeviceResponseSchema,
	UsersApiUpdateLanguageResponseSchema,
} from "./schemas";
import {
	type UsersApiRegisterDeviceParams,
	type UsersApiUpdateLanguageParams,
} from "./types";

/**
 * API for user management operations.
 */
export class UsersApi {
	/**
	 * Initializes a new instance of the UsersApi.
	 *
	 * @param http HTTP client instance.
	 */
	public constructor(private http: HttpClient) {}

	/**
	 * Updates the user's preferred language.
	 *
	 * @example
	 * await client.users.updateLanguage({
	 *   language: "ru"
	 * });
	 */
	public updateLanguage(
		params: UsersApiUpdateLanguageParams,
	): Promise<UsersApiUpdateLanguageResponse> {
		return this.http.patch(
			{
				path: "/api/v1/users/me/language",
				body: params,
			},
			UsersApiUpdateLanguageResponseSchema,
		);
	}

	/**
	 * Registers device identity for analytics tracking.
	 *
	 * @example
	 * await client.users.registerDevice({
	 *   deviceIdentity: {
	 *     sdkInformation: [
	 *       {
	 *         type: "Appsflyer",
	 *         deviceId: "1765694307025-6267413661002574019"
	 *       }
	 *     ]
	 *   }
	 * });
	 */
	public registerDevice(
		params: UsersApiRegisterDeviceParams,
	): Promise<UsersApiRegisterDeviceResponse> {
		return this.http.post(
			{
				path: "/api/v1/device-identities",
				body: params,
			},
			UsersApiRegisterDeviceResponseSchema,
		);
	}
}
