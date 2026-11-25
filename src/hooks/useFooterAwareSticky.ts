import { useEffect, useState } from "react";

interface FooterAwareStickyState {
  /** 0 while the bar is viewport-fixed; otherwise the bar is docked above the footer. */
  bottomOffset: number;
  /** Document-coordinate top used once the bar docks above the footer. */
  topOffset: number;
  /** Switch from viewport-fixed to document-absolute positioning at the footer. */
  dockAtFooter: boolean;
  visible: boolean;
}

const useFooterAwareSticky = (): FooterAwareStickyState => {
  const [state, setState] = useState<FooterAwareStickyState>({
    bottomOffset: 0,
    topOffset: 0,
    dockAtFooter: false,
    visible: true,
  });

  useEffect(() => {
    let rafId = 0;

    const updatePosition = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const footer = document.querySelector<HTMLElement>("footer");
        const cta = document.querySelector<HTMLElement>(
          '[role="region"][aria-label*="actions"]',
        );

        if (!footer || !cta) {
          setState({
            bottomOffset: 0,
            topOffset: 0,
            dockAtFooter: false,
            visible: true,
          });
          return;
        }

        const footerRect = footer.getBoundingClientRect();
        const ctaHeight = cta.getBoundingClientRect().height;
        const footerDocumentTop = footerRect.top + window.scrollY;
        const shouldDock = footerRect.top <= window.innerHeight;

        if (!shouldDock) {
          setState({
            bottomOffset: 0,
            topOffset: 0,
            dockAtFooter: false,
            visible: true,
          });
          return;
        }

        // Once the footer reaches the viewport, the CTA becomes an absolute
        // element in document space, docked directly above the footer.
        // It no longer tracks the footer with a changing viewport bottom offset.
        setState({
          bottomOffset: 0,
          topOffset: Math.max(0, footerDocumentTop - ctaHeight),
          dockAtFooter: true,
          visible: true,
        });
      });
    };

    // A double RAF lets React/layout settle after refresh and initial content load.
    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(updatePosition);
    });

    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    const observer = new ResizeObserver(updatePosition);
    observer.observe(document.documentElement);
    const footer = document.querySelector<HTMLElement>("footer");
    if (footer) observer.observe(footer);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
      observer.disconnect();
    };
  }, []);

  return state;
};

export default useFooterAwareSticky;
