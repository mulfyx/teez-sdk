import { usersRegisterDeviceOperation } from "./register-device";
import { usersUpdateLanguageOperation } from "./update-language";

export const usersOperations = {
	updateLanguage: usersUpdateLanguageOperation,
	registerDevice: usersRegisterDeviceOperation,
} as const;
