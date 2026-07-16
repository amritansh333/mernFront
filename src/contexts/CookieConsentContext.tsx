import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  CookieConsentState,
  CookiePreferences,
} from "@/types/cookieConsent";

import {
  acceptAllConsent,
  customConsent,
  declineAllConsent,
  getCookieConsent,
  saveCookieConsent,
} from "@/lib/cookieConsent";

interface CookieConsentContextValue {
  consent: CookieConsentState;

  hasAnswered: boolean;

  isPreferencesOpen: boolean;

  acceptAll: () => void;

  declineAll: () => void;

  savePreferences: (
    preferences: CookiePreferences
  ) => void;

  resetConsent: () => void;

  openPreferences: () => void;

  closePreferences: () => void;
}



const CookieConsentContext =
  createContext<CookieConsentContextValue | null>(null);

interface ProviderProps {
  children: ReactNode;
}

export function CookieConsentProvider({
  children,
}: ProviderProps) {
  const [consent, setConsent] =
    useState<CookieConsentState>(getCookieConsent);

    const [isPreferencesOpen, setIsPreferencesOpen] =
  useState(false);

  useEffect(() => {
    saveCookieConsent(consent);
  }, [consent]);

    const openPreferences = useCallback(() => {
  setIsPreferencesOpen(true);
}, []);

const closePreferences = useCallback(() => {
  setIsPreferencesOpen(false);
}, []);

  const acceptAll = useCallback(() => {
    setConsent(acceptAllConsent());
  }, []);

  const declineAll = useCallback(() => {
    setConsent(declineAllConsent());
  }, []);

  const savePreferences = useCallback(
    (preferences: CookiePreferences) => {
      setConsent(customConsent(preferences));
    },
    []
  );

  const resetConsent = useCallback(() => {
    setConsent({
      status: "unknown",
      updatedAt: 0,
      preferences: {
        necessary: true,
        preferences: false,
        analytics: false,
        marketing: false,
      },
    });
  }, []);



  const value = useMemo(
  () => ({
    consent,

    hasAnswered:
      consent.status !== "unknown",

    isPreferencesOpen,

    acceptAll,

    declineAll,

    savePreferences,

    resetConsent,

    openPreferences,

    closePreferences,
  }),
  [
    consent,
    isPreferencesOpen,
    acceptAll,
    declineAll,
    savePreferences,
    resetConsent,
    openPreferences,
    closePreferences,
  ]
);

  return (
    <CookieConsentContext.Provider
      value={value}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsentContext() {
  const context = useContext(
    CookieConsentContext
  );

  if (!context) {
    throw new Error(
      "useCookieConsentContext must be used inside CookieConsentProvider."
    );
  }

  return context;
}