import { useState } from "react";
import {
  Cookie,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import { useCookieConsent } from "@/hooks/useCookieConsent";


export default function CookieBanner() {

  const {
  consent,
  hasAnswered,
  acceptAll,
  declineAll,
  savePreferences,
  isPreferencesOpen,
  openPreferences,
  closePreferences,
} = useCookieConsent();

  if (hasAnswered) {
    return null;
  }

  return (
    <>
      

      <div
        className="
          fixed
          bottom-4
          left-1/2
          z-[9997]
          w-[calc(100%-2rem)]
          max-w-5xl
          -translate-x-1/2
          overflow-hidden
          rounded-3xl
          border
          border-white/40
          bg-white/40 backdrop-blur-md
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          backdrop-blur-xl
          animate-in
          slide-in-from-bottom-6
          duration-500
        "
      >
        <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}

          <div className="flex flex-1 gap-4">

            <div className="hidden h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#916b44] lg:flex">

              <Cookie className="h-7 w-7 text-[#EAF8FC]" />

            </div>

            <div>

              <div className="flex items-center gap-2">

                <ShieldCheck className="h-5 w-5 text-[#276A96]" />

                <h2 className="text-lg font-bold text-slate-900">
                  We value your privacy
                </h2>

              </div>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">

                We use essential cookies to ensure this website
                functions properly. With your permission, we
                also use optional cookies to remember your
                preferences and understand how visitors use our
                website so we can continue improving the
                experience.

              </p>

            </div>

          </div>

          {/* Right */}

          <div className="flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={openPreferences}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#29C4EA]
                px-5
                py-3
                text-sm
                font-medium
                text-[#276A96]
                transition-all
                hover:bg-[#EAF8FC]
              "
            >
              Customize

              <ChevronRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={declineAll}
              className="
                rounded-xl
                border
                border-[#276A96]
                px-6
                py-3
                text-sm
                font-medium
                transition-all
                hover:bg-slate-100
              "
            >
              Decline
            </button>

            <button
              type="button"
              onClick={acceptAll}
              className="
                rounded-xl
                bg-[#276A96]
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition-all
                hover:bg-[#1F5678]
              "
            >
              Accept All
            </button>

          </div>

        </div>
      </div>
    </>
  );
}