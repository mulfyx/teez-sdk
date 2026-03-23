import { authCheckTokenOperation } from "./check-token";
import { authLoginOperation } from "./login";
import { authVerifyOperation } from "./verify";

export const authOperations = {
	login: authLoginOperation,
	verify: authVerifyOperation,
	checkToken: authCheckTokenOperation,
} as const;
