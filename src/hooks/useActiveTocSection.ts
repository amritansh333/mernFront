import { useEffect, useState } from "react";

export function useActiveTocSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (!sectionIds.length) return;

    const updateActiveSection = () => {
      const activationOffset = 180;

      let currentSection = sectionIds[0];

      for (const id of sectionIds) {
        const element = document.getElementById(id);

        if (!element) continue;

        const sectionTop = element.getBoundingClientRect().top;

        if (sectionTop <= activationOffset) {
          currentSection = id;
        } else {
          break;
        }
      }

      // Activate the last section when the user reaches page bottom.
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;

      if (isAtBottom) {
        currentSection = sectionIds[sectionIds.length - 1];
      }

      setActiveSection((previous) =>
        previous === currentSection ? previous : currentSection,
      );
    };

    // Set the correct active section on initial load.
    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds]);

  return activeSection;
}
