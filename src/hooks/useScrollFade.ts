import { useEffect, useRef } from "react";

export const useScrollFade = (dependencies: unknown[] = []) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, dependencies);

  return ref;
};
