export type CookieCategory =
  | "necessary"
  | "preferences"
  | "analytics"
  | "marketing";

export interface CookiePreferences {
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}

export type ConsentStatus =
  | "accepted"
  | "declined"
  | "custom"
  | "unknown";

export interface CookieConsentState {
  status: ConsentStatus;
  preferences: CookiePreferences;
  updatedAt: number;
}