export const supportedLanguages = ["ru", "kz"] as const;

export type Language = (typeof supportedLanguages)[number];
