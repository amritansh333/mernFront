import { CookieBanner } from ".";
import CookiePreferencesModal from "./CookiePreferencesModal";

import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function CookieConsentManager() {
  const {
    consent,
    isPreferencesOpen,
    closePreferences,
    savePreferences,
  } = useCookieConsent();

  return (
    <>
      <CookieBanner />

      <CookiePreferencesModal
        open={isPreferencesOpen}
        initialPreferences={consent.preferences}
        onClose={closePreferences}
        onSave={(preferences) => {
          savePreferences(preferences);
          closePreferences();
        }}
      />
    </>
  );
}