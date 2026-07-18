import { useEffect, useState } from "react";
import { ShieldCheck, X } from "lucide-react";

import CookieCategory from "./CookieCategory";

import type { CookiePreferences } from "@/types/cookieConsent";

interface CookiePreferencesModalProps {
  open: boolean;
  initialPreferences: CookiePreferences;
  onClose: () => void;
  onSave: (preferences: CookiePreferences) => void;
}

export default function CookiePreferencesModal({
  open,
  initialPreferences,
  onClose,
  onSave,
}: CookiePreferencesModalProps) {
  const [preferences, setPreferences] =
    useState<CookiePreferences>(initialPreferences);

  useEffect(() => {
    setPreferences(initialPreferences);
  }, [initialPreferences]);

  if (!open) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}

      <div className="fixed left-1/2 top-1/2 z-[9999] w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-white/50 backdrop-blur-md p-2">

              <ShieldCheck className="h-6 w-6 text-[#276A96]" />

            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Cookie Preferences
              </h2>

              <p className="text-sm text-slate-600">
                Choose which cookies you want to allow.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-4 p-6">

          <CookieCategory
            title="Necessary Cookies"
            description="Required for the website to function correctly. These cannot be disabled."
            checked
            disabled
          />

          <CookieCategory
            title="Preferences"
            description="Remember your settings and improve your browsing experience."
            checked={preferences.preferences}
            onCheckedChange={(value) =>
              setPreferences({
                ...preferences,
                preferences: value,
              })
            }
          />

          <CookieCategory
            title="Analytics"
            description="Help us understand how visitors interact with our website."
            checked={preferences.analytics}
            onCheckedChange={(value) =>
              setPreferences({
                ...preferences,
                analytics: value,
              })
            }
          />

          <CookieCategory
            title="Marketing"
            description="Used for advertising and remarketing. (Currently not used.)"
            checked={preferences.marketing}
            onCheckedChange={(value) =>
              setPreferences({
                ...preferences,
                marketing: value,
              })
            }
          />

        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 p-6 sm:flex-row sm:justify-end">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(preferences)}
            className="rounded-xl bg-[#4BB3DD] px-6 py-3 font-semibold text-white transition hover:bg-[#1F5678]"
          >
            Save Preferences
          </button>

        </div>

      </div>
    </>
  );
}