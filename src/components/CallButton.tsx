import { useEffect, useState } from "react";
import { PhoneCall } from "lucide-react";

const PHONE_NUMBER = "+919936794816";

export default function CallButton() {
  const [moveUp, setMoveUp] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  // =====================================================
  // SCROLL POSITION
  // =====================================================

  useEffect(() => {
    const handleScroll = () => {
      setMoveUp(window.scrollY > 300);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // =====================================================
  // COLLAPSE ON PAGE / WINDOW VISIBILITY CHANGES
  // =====================================================

  useEffect(() => {
    const collapse = () => setExpanded(false);

    window.addEventListener("pagehide", collapse);
    window.addEventListener("pageshow", collapse);
    window.addEventListener("focus", collapse);
    window.addEventListener("blur", collapse);

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        collapse();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pagehide", collapse);
      window.removeEventListener("pageshow", collapse);
      window.removeEventListener("focus", collapse);
      window.removeEventListener("blur", collapse);

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // =====================================================
  // BROCHURE MODAL DETECTION
  // =====================================================

  useEffect(() => {
    const updateModalState = () => {
      setIsBrochureModalOpen(
        document.body.hasAttribute("data-brochure-modal-open"),
      );
    };

    updateModalState();

    const observer = new MutationObserver(updateModalState);

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-brochure-modal-open"],
    });

    return () => observer.disconnect();
  }, []);

  // =====================================================
  // MOBILE CLICK HANDLER
  // =====================================================

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setExpanded(true);

      requestAnimationFrame(() => {
        setTimeout(() => {
          setExpanded(false);
        }, 150);
      });
    }
  };

  if (isBrochureModalOpen) {
    return null;
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <div
        className={`
          fixed
          right-6
          z-[9999]

          transition-all
          duration-300
          ease-out

          ${moveUp ? "bottom-[6.4rem]" : "bottom-6"}
        `}
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <a
          href={`tel:${PHONE_NUMBER}`}
          onClick={handleClick}
          aria-label="Call Us"
          className={`
            group
            relative

            flex
            items-center
            justify-start

            h-14

            ${expanded ? "w-[270px]" : "w-14 hover:w-[270px]"}

            origin-right
            overflow-visible
            rounded-full

            bg-gradient-to-br
            from-[#16A34A]
            via-[#22C55E]
            to-[#15803D]

            text-white

            ring-[5px]
            ring-[#22C55E]/20

            shadow-2xl
            shadow-[#22C55E]/60

            transition-all
            duration-500
            ease-out

            hover:shadow-[0_0_55px_rgba(34,197,94,.85)]
          `}
        >
          {/* =================================================
              SIMPLE EXPANDING CIRCULAR WAVE
          ================================================= */}

          <span
            aria-hidden="true"
            className="
              absolute
              right-0
              top-0

              h-14
              w-14

              rounded-full

              bg-[#22C55E]/25

              pointer-events-none

              animate-callWave
            "
          />

          {/* =================================================
              BUTTON TEXT
          ================================================= */}

          <div
            className={`
              flex
              items-center
              justify-end

              overflow-hidden

              transition-all
              duration-500

              ${expanded ? "w-[185px]" : "w-0 group-hover:w-[185px]"}
            `}
          >
            <span
              className={`
                flex
                items-center
                gap-2

                whitespace-nowrap

                text-sm
                font-semibold

                transition-all
                duration-300

                ${
                  expanded
                    ? "translate-x-0 opacity-100"
                    : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }
              `}
            >
              Stuck? We've got you!
            </span>
          </div>

          {/* =================================================
              PHONE ICON
          ================================================= */}

          <div
            className="
              relative
              z-10

              flex
              h-14
              w-14
              shrink-0

              items-center
              justify-center
            "
          >
            <PhoneCall
              className="
                h-5
                w-5
              "
            />
          </div>
        </a>
      </div>

      {/* =====================================================
          ANIMATION STYLES
      ===================================================== */}

      <style>{`

        /* Simple expanding circular wave */

        @keyframes callWave {
          0% {
            transform: scale(1);
            opacity: 0.45;
          }

          100% {
            transform: scale(1.65);
            opacity: 0;
          }
        }

        .animate-callWave {
          animation: callWave 2.2s ease-out infinite;
        }

        /* Accessibility: Respect reduced motion */

        @media (prefers-reduced-motion: reduce) {
          .animate-callWave {
            animation: none;
          }
        }

      `}</style>
    </>
  );
}
