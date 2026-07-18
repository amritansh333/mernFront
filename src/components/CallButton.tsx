import { useEffect, useState } from "react";
import { PhoneCall } from "lucide-react";

const PHONE_NUMBER = "+919936794816";

export default function CallButton() {
  const [moveUp, setMoveUp] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setMoveUp(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  const collapse = () => {
    setExpanded(false);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      collapse();
    }
  };

  window.addEventListener("blur", collapse);
  window.addEventListener("focus", collapse);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    window.removeEventListener("blur", collapse);
    window.removeEventListener("focus", collapse);
    document.removeEventListener(
      "visibilitychange",
      handleVisibilityChange
    );
  };
}, []);

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setExpanded(true);
    }
  };

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

          ${
            moveUp
              ? "bottom-[6.4rem]"
              : "bottom-6"
          }
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

            ${
              expanded
                ? "w-[270px]"
                : "w-14 hover:w-[270px] sm:hover:w-[270px] md:hover:w-[270px]"
            }

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

            animate-callPulse
          `}
        >
          {/* Halo */}

          <span
            className="
              absolute
              -inset-3
              rounded-full
              bg-[#22C55E]/20
              pointer-events-none
              animate-[halo_5.5s_ease-out_infinite]
            "
          />

          {/* Text */}

          <div
            className={`
              overflow-hidden
              transition-all
              duration-500

              flex
              items-center
              justify-end

              ${
                expanded
                  ? "w-[185px]"
                  : "w-0 group-hover:w-[185px]"
              }
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
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }
              `}
            >
              Stuck? We've got you!
            </span>
          </div>

          {/* Icon */}

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
              style={{
                transformOrigin: "35% 70%",
              }}
              className="
                h-5
                w-5

                transform-gpu
                will-change-transform

                animate-[ring_5.5s_ease-in-out_infinite]
              "
            />
          </div>
        </a>
      </div>

      <style>{`
      @keyframes callPulse{

  0%,100%{

    transform:scale(1);

    filter:brightness(1);

    box-shadow:
      0 12px 28px rgba(34,197,94,.42),
      0 0 18px rgba(34,197,94,.18);

  }

  35%{

    transform:scale(1.05);

    filter:brightness(1.05);

    box-shadow:
      0 18px 42px rgba(34,197,94,.58),
      0 0 34px rgba(34,197,94,.30);

  }

  50%{

    transform:scale(1.08);

    filter:brightness(1.08);

    box-shadow:
      0 24px 54px rgba(34,197,94,.70),
      0 0 46px rgba(34,197,94,.42);

  }

  70%{

    transform:scale(1.03);

  }

}

.animate-callPulse{

  animation:callPulse 5.5s cubic-bezier(.22,.61,.36,1) infinite;

}

@keyframes halo{

  0%{

    transform:scale(.9);
    opacity:.22;

  }

  30%{

    transform:scale(1.15);
    opacity:.15;

  }

  55%{

    transform:scale(1.65);
    opacity:0;

  }

  100%{

    transform:scale(1.65);
    opacity:0;

  }

}

@keyframes ring{

  0%,82%,100%{

    transform:rotate(0deg);

  }

  84%{

    transform:rotate(-1deg);

  }

  86%{

    transform:rotate(1.5deg);

  }

  88%{

    transform:rotate(-2deg);

  }

  90%{

    transform:rotate(2deg);

  }

  92%{

    transform:rotate(-1.5deg);

  }

  94%{

    transform:rotate(1deg);

  }

  96%{

    transform:rotate(-0.5deg);

  }

}

      `}</style>
    </>
  );
}