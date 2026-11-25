import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLocation } from "react-router-dom";

const ScrollToTopButton: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  const location = useLocation();

  // Product detail pages:
  // /products/category/subcategory/brand/product-slug
  const isProductDetail = /^\/products\/[^/]+\/[^/]+\/[^/]+\/[^/]+$/.test(
    location.pathname,
  );

  // Machine component subcategory pages:
  // /products/thermoplastics-machine-components/strips
  // /products/thermoplastics-machine-components/profiles
  // /products/thermoplastics-machine-components/cutting-board
  const isMachineComponentSubcategory =
    /^\/products\/thermoplastics-machine-components\/[^/]+$/.test(
      location.pathname,
    );

  // Raise the Scroll-to-Top button on pages that have sticky CTAs
  const hasStickyProductCTAs =
    isProductDetail || isMachineComponentSubcategory;

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;

      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(progress);
      setVisible(scrollTop > 300);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed z-[50]
        ${
          hasStickyProductCTAs
            ? "bottom-[calc(8.25rem+env(safe-area-inset-bottom))] right-6"
            : "bottom-6 right-6"
        }
        w-14 h-14 rounded-full
        flex items-center justify-center
        bg-primary text-white
        shadow-lg
        transition-all duration-300
        hover:scale-110 hover:shadow-xl
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      {/* SVG Progress Ring */}
      <svg
        className="absolute w-full h-full -rotate-90"
        viewBox="0 0 56 56"
      >
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="3"
          fill="transparent"
        />

        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="white"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.2s linear",
          }}
        />
      </svg>

      <ArrowUp size={20} className="relative z-10" />
    </button>
  );
};

export default ScrollToTopButton;