import { useEffect, useRef, useState } from "react";
import {
  FileUp,
  Menu,
  MessageCircle,
  X,
  ChevronRight,
  PenLine,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./FloatingCTA.css";

const WHATSAPP_NUMBER = "919936794816";

const WHATSAPP_MESSAGE =
  "Hello Polyrib Team, I would like to know more about your products and services.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

const CTA_OPTIONS = [
  {
    label: "Request a Quote",
    description: "Discuss your requirements",
    href: "/contact?tab=quote",
    icon: PenLine,
    type: "internal",
  },
  {
    label: "Send Your Drawing",
    description: "Share your technical drawing",
    href: "/contact?tab=drawing",
    icon: FileUp,
    type: "internal",
  },
  {
    label: "Chat on WhatsApp",
    description: "Get in touch with our team",
    href: WHATSAPP_URL,
    icon: MessageCircle,
    type: "whatsapp",
  },
] as const;

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close on Escape and outside click.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Hide when brochure modal is open.
  useEffect(() => {
    const updateModalState = () => {
      const isModalOpen = document.body.hasAttribute(
        "data-brochure-modal-open",
      );

      setIsBrochureModalOpen(isModalOpen);

      if (isModalOpen) {
        setIsOpen(false);
      }
    };

    updateModalState();

    const observer = new MutationObserver(updateModalState);

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-brochure-modal-open"],
    });

    return () => observer.disconnect();
  }, []);

  const closePanel = () => setIsOpen(false);

  if (isBrochureModalOpen) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`floating-cta ${isOpen ? "floating-cta--open" : ""}`}
    >
      {/* EXPANDED CTA PANEL */}

      <div
        className="floating-cta__panel"
        aria-hidden={!isOpen}
        {...({ inert: !isOpen } as { inert: boolean })}
      >
        <div className="floating-cta__header">
          <p className="floating-cta__heading">How can we help?</p>

          <p className="floating-cta__subheading">
            Choose an option to get started
          </p>
        </div>

        <div className="floating-cta__options">
          {CTA_OPTIONS.map((option) => {
            const Icon = option.icon;

            const optionContent = (
              <>
                <span className="floating-cta__option-icon">
                  <Icon size={19} strokeWidth={1.8} />
                </span>

                <span className="floating-cta__option-content">
                  <span className="floating-cta__option-title">
                    {option.label}
                  </span>

                  <span className="floating-cta__option-description">
                    {option.description}
                  </span>
                </span>

                <ChevronRight
                  className="floating-cta__option-arrow"
                  size={18}
                />
              </>
            );

            if (option.type === "whatsapp") {
              return (
                <a
                  key={option.label}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="floating-cta__option floating-cta__option--whatsapp"
                  onClick={closePanel}
                >
                  {optionContent}
                </a>
              );
            }

            return (
              <Link
                key={option.label}
                to={option.href}
                className="floating-cta__option"
                onClick={closePanel}
              >
                {optionContent}
              </Link>
            );
          })}
        </div>
      </div>

      {/* COMPACT MENU / CLOSE BUTTON */}

      <button
        type="button"
        className="floating-cta__toggle"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
        aria-expanded={isOpen}
      >
        <span
          className={`floating-cta__icon ${isOpen ? "is-open" : ""}`}
        >
          <Menu className="floating-cta__menu-icon" />
          <X className="floating-cta__close-icon" />
        </span>
      </button>
    </div>
  );
}