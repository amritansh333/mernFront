import type {
  CookieConsentState,
  CookiePreferences,
} from "@/types/cookieConsent";

const STORAGE_KEY = "polyrib_cookie_consent";

export const defaultPreferences: CookiePreferences = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
};

export const defaultConsent: CookieConsentState = {
  status: "unknown",
  preferences: defaultPreferences,
  updatedAt: 0,
};

export function getCookieConsent(): CookieConsentState {
  try {
    const value = localStorage.getItem(STORAGE_KEY);

    if (!value) {
      return defaultConsent;
    }

    return JSON.parse(value) as CookieConsentState;
  } catch {
    return defaultConsent;
  }
}

export function saveCookieConsent(
  consent: CookieConsentState
): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

export function clearCookieConsent(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function acceptAllConsent(): CookieConsentState {
  return {
    status: "accepted",
    updatedAt: Date.now(),
    preferences: {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    },
  };
}

export function declineAllConsent(): CookieConsentState {
  return {
    status: "declined",
    updatedAt: Date.now(),
    preferences: {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    },
  };
}

export function customConsent(
  preferences: CookiePreferences
): CookieConsentState {
  return {
    status: "custom",
    updatedAt: Date.now(),
    preferences: {
      ...preferences,
      necessary: true,
    },
  };
}

export function hasAnsweredConsent(): boolean {
  return getCookieConsent().status !== "unknown";
}