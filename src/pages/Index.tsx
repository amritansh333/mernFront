import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Shield,
  Award,
  Zap,
  Globe,
  Factory,
  Layers,
  Ruler,
  PenLine,
  BadgeCheck,
  HeadphonesIcon,
  CheckCircle2,
  Cpu,
  Wrench,
  FlaskConical,
  Cog,
  LayoutGrid,
  Send,
  TrendingUp,
  Lightbulb,
  PackageCheck,
  X,
  Plane,
  Sprout,
  Car,
  Building2,
  Utensils,
  Truck,
  Hammer,
  Shirt,
  Anchor,
  Package,
  HeartPulse,
  Mountain,
  Fuel,
  Boxes,
  BookOpen,
  Signpost,
  Dumbbell,
  Train,
  Droplets,
} from "lucide-react";
import { useScrollFade } from "@/hooks/useScrollFade";
import { useMachineComponentRouting } from "@/lib/product-experience/useMachineComponentRouting";
import heroVideo from "@/assets/hero-landingpage.mp4";
// Semi-finished product gallery
import semiFinishedImage1 from "@/assets/semi-finished-products_1.jpeg";
import semiFinishedImage2 from "@/assets/semi-finished-products_2.jpeg";
import semiFinishedImage3 from "@/assets/semi-finished-products_3.jpeg";
import semiFinishedImage4 from "@/assets/semi-finished-products_4.jpeg";
import semiFinishedImage5 from "@/assets/semi-finished-products_5.jpeg";

// Engineered product gallery
import machineComponentsImage1 from "@/assets/machine-components_1.jpeg";
import machineComponentsImage2 from "@/assets/machine-components_2.jpeg";
import machineComponentsImage3 from "@/assets/machine-components_3.jpeg";
import machineComponentsImage4 from "@/assets/machine-components_4.jpeg";
import machineComponentsImage5 from "@/assets/machine-components_5.jpeg";
import slider1 from "@/assets/slider1-Engineered-To-Perform.jpeg";
import slider2 from "@/assets/slider2-Engineered-To-Perform.jpeg";
import slider3 from "@/assets/slider3-Engineered-To-Perform.jpeg";
import slider4 from "@/assets/slider4-Engineered-To-Perform.jpeg";
import slider5 from "@/assets/slider5-Engineered-To-Perform.jpeg";

import polyribV from "@/assets/polyribV.png";
import polyribP from "@/assets/polyribP.png";
import polyribH from "@/assets/polyribH.png";
import hitech from "@/assets/hitech.png";
import pcclear from "@/assets/pcclear.png";
import cutrite from "@/assets/cutrite.png";
import dipra from "@/assets/dipra.png";
import arete from "@/assets/arete.png";
import ripla from "@/assets/ripla.png";
import polylimb from "@/assets/polylimb.png";
import kaylon from "@/assets/kaylon.png";
import plasconV from "@/assets/plasconV.png";

import polymerImg from "@/assets/polymer-materials.jpeg";
import isoBadge from "@/assets/iso-badge.png";
import certImg from "@/assets/isoCertificate2015.jpg";

import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

/* ─── Data ─────────────────────────────────────────────── */

const stats = [
  { value: "40+", label: "Years of Manufacturing" },
  { value: "500+", label: "Product Grades" },
  { value: "20+", label: "Industries Served" },
  { value: "ISO 9001", label: "Certified" },
];

const allIndustries = [
  { abbr: "Aerospace", slug: "aerospace" },
  { abbr: "Agro Processing", slug: "agro-processing" },
  { abbr: "Automotive", slug: "automotive" },
  { abbr: "Build & Construction", slug: "build-construction" },
  { abbr: "Cement", slug: "cement" },
  { abbr: "Chemical", slug: "chemical" },
  { abbr: "Food & Beverage", slug: "food-beverage" },
  { abbr: "Heavy Equipment", slug: "heavy-equipment" },
  { abbr: "Iron & Steel", slug: "iron-steel" },
  { abbr: "Leather", slug: "leather" },
  { abbr: "Marine", slug: "marine" },
  { abbr: "Material Handling", slug: "material-handling" },
  { abbr: "Medical", slug: "medical" },
  { abbr: "Mining", slug: "mining" },
  { abbr: "Oil & Gas", slug: "oil-gas" },
  { abbr: "Packaging", slug: "packaging" },
  { abbr: "Pulp & Paper", slug: "pulp-paper" },
  { abbr: "Signage", slug: "signage" },
  { abbr: "Sports & Recreation", slug: "sports-recreation" },
  { abbr: "Transportaion", slug: "transportation" },
  { abbr: "Water & Waste Water", slug: "water-waste-water" },
];

const industryIcons = {
  aerospace: Plane,
  "agro-processing": Sprout,
  automotive: Car,
  "build-construction": Building2,
  cement: Factory,
  chemical: FlaskConical,
  "food-beverage": Utensils,
  "heavy-equipment": Truck,
  "iron-steel": Hammer,
  leather: Shirt,
  marine: Anchor,
  "material-handling": Package,
  medical: HeartPulse,
  mining: Mountain,
  "oil-gas": Fuel,
  packaging: Boxes,
  "pulp-paper": BookOpen,
  signage: Signpost,
  "sports-recreation": Dumbbell,
  transportation: Train,
  "water-waste-water": Droplets,
} as const;

const brandFamilies = [
  {
    abbr: "POLYRIB V",
    slug: "polyrib-v",
    name: "UltraHigh Molecular Weight Polyethylene (UHMWPE)",
    prop: "High Performance Thermoplastic Sheets for Industrial Applications",
    image: polyribV,
  },
  {
    abbr: "PCCLEAR",
    slug: "pcclear",
    name: "Polycarbonate (PC)",
    prop: "Superior Sheets for Roofing, Glazing, Fabrication",
    image: pcclear,
  },
  {
    abbr: "POLYRIB P",
    slug: "polyrib-p",
    name: "Polypropylene (PP)",
    prop: "High Quality Crystalline Polymer for Chemical, Electroplating, Galvanizing Industry",
    image: polyribP,
  },
  {
    abbr: "POLYRIB H",
    slug: "polyrib-h",
    name: "High Density Polyethylene (HDPE)",
    prop: "Most widely used Thermoplastic for Commercial, Industrial and Food Contact Industry",
    image: polyribH,
  },
  {
    abbr: "HITECH",
    slug: "hitech",
    name: "Polypropylene (PP), High Density Polyethylene (HDPE)",
    prop: "High Temperature and Chemical Resistant Polymer Sheets",
    image: hitech,
  },
  {
    abbr: "ARETE",
    slug: "arete",
    name: "UltraHigh Molecular Weight Polyethylene (UHMWPE) , High Density Polyethylene (HDPE)",
    prop: "High Performance Thermoplastic Sheets for Lining Material for bulk solids",
    image: arete,
  },
  {
    abbr: "RIPLA",
    slug: "ripla",
    name: "Polypropylene (PP)",
    prop: "Impact Resistant Thermoplastics for High Quality Cutting Boards",
    image: ripla,
  },
  {
    abbr: "DIPRA ADD CLEAR",
    slug: "dipra",
    name: "Polymer UV Sheets",
    prop: "High Quality Polymer UV sheets for Outdoor Applications",
    image: dipra,
  },
  {
    abbr: "POLYLIMB",
    slug: "polylimb",
    name: "Speciality Thermoplastic Sheets",
    prop: "Speciality Polymer Sheets for Orthotic and Prosthetic Applications",
    image: polylimb,
  },
  {
    abbr: "CUTRITE",
    slug: "cutrite",
    name: "Low Density Polyethylene (LDPE)",
    prop: "Durable and Flexible Thermoplastic for high impact chopping boards",
    image: cutrite,
  },
  {
    abbr: "PLASCON V",
    slug: "plascon-v",
    name: "UltraHigh Molecular Weight Polyethylene (UHMWPE) Components",
    prop: "Thermoplastics with low coefficient friction and high abrasion resistance for Engineering Solutions",
    image: plasconV,
  },
  {
    abbr: "KAYLON",
    slug: "pakaylon",
    name: "Cast Nylon",
    prop: "Partially Crystalline Polyamide for Precision Machining and Exceptional Wear Ressistance",
    image: kaylon,
  },
];

const trustPoints = [
  { icon: Shield, label: "ISO 9001 Certified" },
  { icon: Award, label: "40+ Years Manufacturing" },
  { icon: Zap, label: "Fast Delivery" },
  { icon: Globe, label: "Export to 50+ Countries" },
];

const infrastructure = [
  {
    label: "RAM Extrusion Lines",
    value: "11 Lines",
    sub: "Thickness: 0.9 mm – 40 mm",
    icon: Factory,
    number: "01",
  },
  {
    label: "Plank Extrusion Lines",
    value: "Heavy Gauge",
    sub: "Sheet thickness: 25 mm – 250 mm",
    icon: Layers,
    number: "02",
  },
  {
    label: "Sheet Extrusion Lines",
    value: "6 Lines",
    sub: "Wide-format sheet production",
    icon: Ruler,
    number: "03",
  },
  {
    label: "Compression Moulding",
    value: "7 Facilities",
    sub: "Width 700–5000 mm · Thickness 6–105 mm",
    icon: FlaskConical,
    number: "04",
  },
  {
    label: "Cast Nylon Manufacturing",
    value: "In-House",
    sub: "Full monomer casting capability",
    icon: Cog,
    number: "05",
  },
  {
    label: "CNC Machining Centre",
    value: "Full Suite",
    sub: "VMC · 3 CNC Lathes · 4 CNC Routers",
    icon: Cpu,
    number: "06",
  },
];

const whyPoints = [
  {
    icon: Layers,
    title: "Three Companies, One Group",
    desc: "Khanna Group, comprising Khanna Polyrib Pvt. Ltd., KBK Plascon Pvt. Ltd., and KBK Polymer Pvt. Ltd., has been at the forefront of polymer manufacturing for over four decades.",
  },
  {
    icon: Factory,
    title: "Our Locations",
    desc: "With state-of-the-art manufacturing facilities in Uttar Pradesh and distribution centres in Delhi, Bhiwandi, and Ahmedabad, we ensure consistent quality and efficient nationwide supply.",
  },
  {
    icon: Ruler,
    title: "Our Mission & Values",
    desc: "To design superior performance polymer materials, and to have Khanna Polyrib establish standards in the quality.",
  },
  {
    icon: BadgeCheck,
    title: "ISO 9001 Quality",
    desc: "Certified manufacturing processes with consistent material properties and full traceability.",
  },
  {
    icon: Globe,
    title: "Multi-Industry Expertise",
    desc: "Over 20 industries served — from food processing to aerospace and oil & gas.",
  },
  {
    icon: HeadphonesIcon,
    title: "Technical Application Support",
    desc: "Material selection guidance, grade recommendations, and design consultation from our engineering team.",
  },
];

const processBullets = [
  "Application-driven material selection",
  "Precision machining and forming of engineering plastics",
  "Wear, sliding, and load-bearing component manufacturing",
  "Metal-to-plastic conversion for improved efficiency and service life",
  "Custom-engineered polymer components built to specification",
];

const whatWeManufacture = [
  "Machined polymer sheets",
  "Machined polymer components",
  "Wear, sliding, and guide parts",
  "Industrial liners and profiles",
  "Metal-to-plastic replacement solutions",
  "Custom-designed engineered plastic parts",
];

const whyChecks = [
  "Pioneering in Engineering Excellence",
  "Application-driven material selection",
  "Consistent quality with tight tolerances",
  "Custom and batch manufacturing capability",
  "Reliable delivery and technical support",
];

const promise = [
  {
    icon: TrendingUp,
    title: "Rise to Challenges",
    desc: "We rise to challenges and deliver beyond customer expectations, every time.",
  },
  {
    icon: Lightbulb,
    title: "Innovate with Technology",
    desc: "Innovate as per latest technology with world-class infrastructure facilities.",
  },
  {
    icon: PackageCheck,
    title: "Build for the World",
    desc: "Build products in India for the world — reliable, precise, globally competitive.",
  },
];

/* ─── Sub-components ────────────────────────────────────── */

function StatSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);
  const hasAnimated = useRef(false);

  const statItems = [
    {
      value: 40,
      suffix: "+",
      label: "Years of Manufacturing",
      caption: "ESTABLISHED 1985",
      icon: Factory,
      accent: "blue",
    },
    {
      value: 500,
      suffix: "+",
      label: "Product Grades",
      caption: "CUSTOM FORMULATED",
      icon: FlaskConical,
      accent: "blue",
    },
    {
      value: 20,
      suffix: "+",
      label: "Industries Served",
      caption: "GLOBAL APPLICATION",
      icon: LayoutGrid,
      accent: "blue",
    },
    {
      value: "ISO 9001",
      suffix: "",
      label: "Certified",
      caption: "ISO 9001:2015",
      icon: Shield,
      accent: "green",
    },
  ] as const;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setCounts([40, 500, 20]);
      setIsVisible(true);
      hasAnimated.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -20px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;

    hasAnimated.current = true;

    const duration = 1800;
    let animationFrame = 0;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setCounts([
        Math.floor(40 * easedProgress),
        Math.floor(500 * easedProgress),
        Math.floor(20 * easedProgress),
      ]);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCounts([40, 500, 20]);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={`stats-panel ${isVisible ? "stats-panel-visible" : ""}`}
      aria-label="Khanna Polyrib company statistics"
    >
      {statItems.map((item, index) => {
        const Icon = item.icon;

        const displayValue =
          index === 3 ? item.value : `${counts[index]}${item.suffix}`;

        return (
          <article
            key={item.label}
            className={`stats-card stats-card-${item.accent}`}
            style={
              {
                "--stats-index": index,
              } as React.CSSProperties
            }
          >
            <div className="stats-card-top">
              <span className="stats-icon">
                <Icon aria-hidden="true" size={21} strokeWidth={2.2} />
              </span>
            </div>

            <div
              className="stats-value"
              aria-label={`${item.value}${item.suffix}`}
            >
              {displayValue}
            </div>

            <div className="stats-label">{item.label}</div>

            <div className="stats-caption">{item.caption}</div>
          </article>
        );
      })}
    </div>
  );
}

/* =========================================================
   WHY POLYRIB — OPTIMIZED CARD STACK

   Performance improvements:
   - GPU-friendly transforms
   - No continuously animated box-shadow
   - Lightweight scroll-linked transformations
   - Responsive card movement
   - Smooth stacking and scaling
   ========================================================= */

function WhyUsStackCard({
  item,
  index,
  progress,
}: {
  item: (typeof whyPoints)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  // Calculate card distance from the active position.
  const distance = useTransform(
    progress,
    (value) => index - value * (whyPoints.length - 1),
  );

  // Responsive vertical movement.
  const y = useTransform(distance, (value) => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1280;

    const step =
      width <= 380 ? 112 : width <= 639 ? 122 : width <= 1023 ? 150 : 166;

    return value * step;
  });

  // Card scaling.
  const scale = useTransform(distance, (value) => {
    const absoluteDistance = Math.abs(value);

    return Math.max(0.68, 1.045 - absoluteDistance * 0.175);
  });

  // Card visibility.
  const opacity = useTransform(distance, (value) => {
    const absoluteDistance = Math.abs(value);

    return Math.max(0, 1 - Math.max(0, absoluteDistance - 1) * 2.5);
  });

  // Maintain correct stacking order.
  const zIndex = useTransform(
    distance,
    (value) => 100 - Math.round(Math.abs(value) * 10),
  );

  const { icon: Icon, title, desc } = item;

  return (
    <motion.article
      className="why-us-card"
      aria-label={title}
      style={{
        y,
        scale,
        opacity,
        zIndex,
      }}
    >
      <Link
        to="/about"
        className="why-us-card-link"
        aria-label={`Learn more about Khanna Polyrib: ${title}`}
      >
        {/* Top line */}
        <div className="why-us-card-topline">
          <span className="why-us-card-index">
            WHY POLYRIB <span>{String(index + 1).padStart(2, "0")}</span>
          </span>

          <span className="why-us-card-indicator" aria-hidden="true" />
        </div>

        {/* Main content */}
        <div className="why-us-card-content">
          <div className="why-us-card-icon">
            <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
          </div>

          <div className="why-us-card-copy">
            <h3 className="font-heading">{title}</h3>
            <p>{desc}</p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="why-us-card-bottomline" aria-hidden="true">
          <span>KHANNA POLYRIB PVT. LTD.</span>

          <span className="why-us-card-arrow">
            <ArrowRight size={17} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

/* =========================================================
   FACILITY IMAGE AND CHECKLIST
   ========================================================= */

function WhyUsFacility() {
  return (
    <div className="why-us-facility relative min-h-0 overflow-hidden">
      {/* Facility images sliding from right to left */}
      <div className="why-us-slider absolute inset-0">
        {[slider1, slider2, slider3, slider4, slider5].map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Khanna Polyrib manufacturing facility ${index + 1}`}
            className="why-us-slide absolute inset-0 h-full w-full object-cover"
            style={{
              animationDelay: `${index * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Dark overlay for readable text */}
      <div className="why-us-facility-overlay absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-transparent" />

      {/* Facility details */}
      <div className="why-us-facility-content absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-black/10">
        {/* Established year — first */}
        <p
          className="why-us-typewriter why-us-established"
          style={{ animationDelay: "0s" }}
        >
          Established 1985
        </p>

        {/* Checklist — sequential typing */}
        <div className="space-y-2">
          {whyChecks.map((check, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />

              <span
                className="why-us-typewriter why-us-check-text"
                style={{
                  animationDelay: `${(index + 1) * 1.5}s`,
                }}
              >
                {check}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CARD PANEL AND PROGRESS INDICATOR
   ========================================================= */

function WhyUsCardPanel({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="why-us-card-panel">
      <div className="why-us-card-stage" aria-label="Why choose Khanna Polyrib">
        <div className="why-us-card-grid-glow" aria-hidden="true" />

        {whyPoints.map((item, index) => (
          <WhyUsStackCard
            key={item.title}
            item={item}
            index={index}
            progress={progress}
          />
        ))}
      </div>

      <div className="why-us-progress" aria-hidden="true">
        <motion.span
          className="why-us-progress-fill"
          style={{
            scaleX: progress,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   MAIN WHY US SECTION
   Optimized scroll-linked animation
   ========================================================= */

function WhyUsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Track section scrolling.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
   * Lightweight spring smoothing.
   *
   * High stiffness:
   * Responds quickly to scrolling.
   *
   * High damping:
   * Prevents unnecessary oscillation.
   *
   * Low mass:
   * Keeps the animation responsive.
   */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 45,
    mass: 0.15,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      className="why-us-scroll-section bg-white border-y border-divider"
      aria-label="Why choose Khanna Polyrib"
    >
      <div className="why-us-pin">
        <div className="container max-w-7xl mx-auto px-6 why-us-pin-container">
          {/* Section heading */}
          <div className="why-us-heading flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <h2 className="font-heading text-3xl text-charcoal">
                One-Stop Polymer Engineering Solutions
              </h2>
            </div>

            <Link to="/about" className="cta-link mt-3 md:mt-0">
              About Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Facility + Animated Cards */}
          <div className="why-us-layout grid rounded-2xl">
            <WhyUsFacility />

            <WhyUsCardPanel progress={smoothProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCategoryCard({
  title,
  description,
  href,
  images,
  tag,
}: {
  title: string;
  description: string;
  href: string;
  images: string[];
  tag: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      setReduceMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || images.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [images.length, reduceMotion]);

  return (
    <Link to={href} className="category-card block group rounded-2xl">
      {/* Image with a matching wavy blue border */}
      <div className="card-image relative aspect-[2/1] bg-surface-subtle">
        <div className="product-image-wave-clip">
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <img
                key={image}
                src={image}
                alt={`${title} - Image ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
                className={`product-gallery-image absolute inset-0 w-full h-full object-cover ${
                  isActive ? "product-gallery-image-active" : ""
                }`}
                style={{
                  transform: isActive
                    ? "translateX(0)"
                    : index < activeIndex
                      ? "translateX(-100%)"
                      : "translateX(100%)",
                  transition: reduceMotion
                    ? "none"
                    : "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)",
                  zIndex: isActive ? 2 : 1,
                }}
              />
            );
          })}
        </div>

        {/* Two closely spaced blue strokes trace the clipped image edge. */}
        <svg
          className="product-image-wave-border"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Primary line follows the clip-path boundary exactly. */}
          <path
            className="product-image-wave-primary"
            d="M0 96 L5 95.5 L12 96 L20 97.5 L28 99 L36 98.5 L44 96.5 L52 95 L60 95.5 L68 97 L76 98.5 L84 98 L92 96.5 L100 95"
          />

          {/* Secondary line sits just below the primary line. */}
          <path
            className="product-image-wave-secondary"
            d="M0 97 L5 96.5 L12 97 L20 98.5 L28 100 L36 99.5 L44 97.5 L52 96 L60 96.5 L68 98 L76 99.5 L84 99 L92 97.5 L100 96"
          />
        </svg>
      </div>

      {/* Existing card content preserved */}
      <div className="p-4">
        <span className="section-label text-xs block mb-2">{tag}</span>

        <h3 className="font-heading text-xl text-charcoal mb-2 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          {description}
        </p>

        <div className="cta-link category-card-cta">
          Explore Range
          <ArrowRight className="w-4 h-4 explore-arrow" />
        </div>

        <div className="card-border-bottom mt-1" />
      </div>
    </Link>
  );
}

/* ─── Materials Section (Brand Portfolio) ───────────────── */

function MaterialsSection() {
  const ref = useScrollFade() as React.Ref<HTMLElement>;

  const [columns, setColumns] = useState(4);

  // Preserve the four-column desktop and two-column mobile layouts.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const updateColumns = () => {
      setColumns(mediaQuery.matches ? 2 : 4);
    };

    updateColumns();

    mediaQuery.addEventListener("change", updateColumns);

    return () => {
      mediaQuery.removeEventListener("change", updateColumns);
    };
  }, []);

  /*
   * Distribute individual brands into independent columns.
   *
   * Desktop: 4 independent stacks.
   * Mobile:  2 independent stacks.
   *
   * The original visual ordering is preserved across rows.
   */
  const brandColumns = Array.from({ length: columns }, (_, columnIndex) =>
    brandFamilies.filter(
      (_, brandIndex) => brandIndex % columns === columnIndex,
    ),
  );

  const isMobile = columns === 2;

  return (
    <section
      ref={ref}
      className="brand-portfolio-section bg-white border-y border-divider"
    >
      <div className="container max-w-7xl mx-auto px-6">
        {/* Keep the heading and link together. */}
        <div className="brand-portfolio-heading flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="font-heading text-3xl text-charcoal">Our Brands</h2>

          <Link to="/products" className="cta-link mt-3 md:mt-0">
            Explore Brands
            <ArrowRight className="w-4 h-4 inline ml-1" />
          </Link>
        </div>

        {/* Independent card stacks. */}
        <div
          className={`polyrib-brand-columns ${
            isMobile
              ? "polyrib-brand-columns-mobile"
              : "polyrib-brand-columns-desktop"
          }`}
        >
          {brandColumns.map((brands, columnIndex) => (
            <div
              key={`brand-column-${columns}-${columnIndex}`}
              className="polyrib-brand-column"
            >
              <ScrollStack
                className="polyrib-brand-stack"
                useWindowScroll={true}
                smoothScroll={false}
                snap={false}
                itemDistance={isMobile ? 105 : 145}
                itemStackDistance={isMobile ? 14 : 22}
                stackPosition={isMobile ? 145 : 145}
                itemScale={isMobile ? 0.025 : 0.035}
                baseScale={isMobile ? 0.92 : 0.88}
                dimAmount={0}
                blurAmount={0}
                tiltAmount={0}
                rotationAmount={0}
                holdDistance={isMobile ? 70 : 110}
              >
                {brands.map((m) => (
                  <ScrollStackItem
                    key={m.abbr}
                    itemClassName="polyrib-brand-card"
                  >
                    <Link
                      to={`/products/thermoplastics-semi-finished-products/sheets-blocks/${m.slug}`}
                      className="category-card block group border border-border overflow-hidden rounded-xl"
                    >
                      {/* Brand image */}
                      <div className="polyrib-brand-image">
                        <img
                          src={m.image}
                          alt={m.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>

                      {/* Brand information */}
                      <div className="p-4">
                        <h3 className="font-heading text-lg text-primary group-hover:text-primary-dark transition-colors cta-link">
                          {m.abbr}

                          <ArrowRight className="w-4 h-4 explore-arrow" />
                        </h3>

                        <p className="text-sm text-charcoal font-medium mt-1 group-hover:text-primary">
                          {m.name}
                        </p>

                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {m.prop}
                        </p>

                        <div className="card-border-bottom mt-1" />
                      </div>
                    </Link>
                  </ScrollStackItem>
                ))}
              </ScrollStack>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Polymers We Work With ─────────────────────────────── */

function PolymersSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  // Typewriter text states.
  const [typedHeading, setTypedHeading] = useState("");
  const [typedDescription, setTypedDescription] = useState("");
  const [typedResin, setTypedResin] = useState("");
  const [typedStandards, setTypedStandards] = useState("");

  const headingText = "Polymer Compounding Lab";

  const descriptionText =
    "Our in-house analytical lab measures melt flow index (MFI), density distribution, Shore hardness, and glass transition temperatures across every production batch.";

  const resinText = "VIRGIN FORMULATION";

  const standardsText = "ASTM D790 / ISO 178";

  // Detect when the section enters the viewport.
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      setIsVisible(true);

      setTypedHeading(headingText);
      setTypedDescription(descriptionText);
      setTypedResin(resinText);
      setTypedStandards(standardsText);

      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Typewriter animation for the Polymer Compounding Lab.
  useEffect(() => {
    if (!isVisible) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    let cancelled = false;

    const timers: ReturnType<typeof setTimeout>[] = [];

    const typeText = (
      text: string,
      setter: (value: string) => void,
      delay: number,
      speed: number,
    ): number => {
      for (let i = 1; i <= text.length; i++) {
        const timer = setTimeout(
          () => {
            if (!cancelled) {
              setter(text.slice(0, i));
            }
          },
          delay + i * speed,
        );

        timers.push(timer);
      }

      return delay + text.length * speed;
    };

    // Heading types first.
    const headingDuration = typeText(headingText, setTypedHeading, 250, 42);

    // Description follows the heading.
    const descriptionStart = headingDuration + 180;

    const descriptionDuration = typeText(
      descriptionText,
      setTypedDescription,
      descriptionStart,
      13,
    );

    // Technical information follows the description.
    const resinStart = descriptionStart + descriptionDuration + 180;

    const resinDuration = typeText(resinText, setTypedResin, resinStart, 38);

    const standardsStart = resinStart + resinDuration + 140;

    typeText(standardsText, setTypedStandards, standardsStart, 38);

    return () => {
      cancelled = true;

      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [isVisible]);

  // Material families.
  const materials = [
    {
      brand: "POLYRIB V",
      base: "PE / UHMW PE",
      slug: "uhmwpe",
      colour: "bg-blue-50 text-blue-700 border-blue-200",
      tagline: "Ultra-High Molecular Weight Polyethylene",
      desc: "Self-lubricating, exceptional abrasion resistance, high impact strength. Widely used in conveyor liners, wear strips, and food processing equipment.",
    },
    {
      brand: "PCCLEAR",
      base: "PC",
      slug: "pc",
      colour: "bg-sky-50 text-sky-700 border-sky-200",
      tagline: "Polycarbonate",
      desc: "High-clarity PC sheets with outstanding impact strength. Available in transparent, embossed, shaded, and UV-stabilised variants.",
    },
    {
      brand: "POLYRIB P",
      base: "PP",
      slug: "pp",
      colour: "bg-orange-50 text-orange-700 border-orange-200",
      tagline: "Polypropylene",
      desc: "High-impact and chemical-resistant PP sheets for acid and chemical tanks, galvanising, anodising, and food processing.",
    },
    {
      brand: "POLYRIB H",
      base: "HDPE",
      slug: "hdpe",
      colour: "bg-green-50 text-green-700 border-green-200",
      tagline: "High-Density Polyethylene",
      desc: "Tough, corrosion-resistant HDPE sheets for chemical tanks, crate partitions, fabrication, and structural applications.",
    },
    {
      brand: "KAYLON",
      base: "CAST NYLON (PA6)",
      slug: "pa6",
      colour: "bg-purple-50 text-purple-700 border-purple-200",
      tagline: "Cast Nylon / Polyamide 6",
      desc: "Oil-filled, MoS₂-filled, and heat-stabilised cast nylon for gears, bearings, wear pads, and high-strength engineering components.",
    },
    {
      brand: "PAKETAL",
      base: "ACETAL / POM",
      slug: "acetal",
      colour: "bg-red-50 text-red-700 border-red-200",
      tagline: "Acetal / Polyoxymethylene",
      desc: "Excellent machinability, dimensional stability, and low friction for precision gears, cams, bearings, and industrial components.",
    },
    {
      brand: "POLYRIB A",
      base: "ABS / ASA",
      slug: "abs",
      colour: "bg-yellow-50 text-yellow-700 border-yellow-200",
      tagline: "ABS & ASA Sheets",
      desc: "Automotive-grade ABS and ASA sheets for interior and exterior trim, display systems, and rapid prototyping.",
    },
    {
      brand: "PLASCON-V",
      base: "UHMWPE ENGINEERING",
      slug: "pe",
      colour: "bg-teal-50 text-teal-700 border-teal-200",
      tagline: "Engineering Polymer Grades",
      desc: "Specialised engineering polymers designed for CNC-machined components, industrial sliders, wear parts, and demanding sliding applications.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`materials-motion-section py-8 border-b border-divider bg-white ${
        isVisible ? "materials-motion-visible" : ""
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
          {/* ───────────── LEFT COLUMN ───────────── */}

          <div className="materials-intro flex flex-col gap-6">
            <div>
              <h2 className="font-heading text-3xl text-charcoal mb-4">
                The Polymers We Work With
              </h2>

              <Link to="/materials" className="cta-link">
                View all Material families
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Polymer Compounding Lab */}
            <div className="polymer-lab-card w-full p-4 sm:p-5 rounded-xl overflow-hidden">
              {/* Polymer image */}
              <div className="w-full overflow-hidden rounded-lg border border-slate-700/60">
                <img
                  src={polymerImg}
                  alt="Polymer materials in different colours"
                  className="materials-feature-image w-full h-[180px] sm:h-[220px] lg:h-[260px] object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Typewriter content */}
              <div className="pt-5">
                <h3
                  className="font-heading text-lg font-bold text-white mb-2"
                  aria-label={headingText}
                >
                  {typedHeading}

                  {isVisible && typedHeading.length < headingText.length && (
                    <span className="lab-typewriter-cursor" aria-hidden="true">
                      |
                    </span>
                  )}
                </h3>

                <p
                  className="text-sm text-slate-300 leading-relaxed"
                  aria-label={descriptionText}
                >
                  {typedDescription}

                  {isVisible &&
                    typedHeading.length === headingText.length &&
                    typedDescription.length < descriptionText.length && (
                      <span
                        className="lab-typewriter-cursor"
                        aria-hidden="true"
                      >
                        |
                      </span>
                    )}
                </p>

                {/* Technical information */}
                <div className="lab-technical-panel mt-5 p-3 sm:p-4 rounded-lg space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sky-400">
                      Resin Grade:
                    </span>

                    <span className="text-[10px] sm:text-xs font-bold font-mono text-white text-right">
                      {typedResin}

                      {typedDescription.length === descriptionText.length &&
                        typedResin.length < resinText.length && (
                          <span
                            className="lab-typewriter-cursor"
                            aria-hidden="true"
                          >
                            |
                          </span>
                        )}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sky-400">
                      Test Standards:
                    </span>

                    <span className="text-[10px] sm:text-xs font-bold font-mono text-white text-right">
                      {typedStandards}

                      {typedResin.length === resinText.length &&
                        typedStandards.length < standardsText.length && (
                          <span
                            className="lab-typewriter-cursor"
                            aria-hidden="true"
                          >
                            |
                          </span>
                        )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ───────────── RIGHT COLUMN ───────────── */}

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {materials.map((m, index) => (
              <Link
                key={m.slug}
                to={`/materials/${m.slug}`}
                className={`material-family-card group block text-left p-5 border-2 border-border bg-card transition-all duration-300 rounded-xl ${
                  isVisible ? "material-family-card-visible" : ""
                }`}
                data-material-glow={m.slug}
                style={
                  {
                    "--material-index": index,
                  } as React.CSSProperties
                }
              >
                {/* Material badge and chevron */}
                <div className="flex items-start justify-between mb-2">
                  <span
                    className={`text-[10px] px-2.5 py-1 font-bold border ${m.colour}`}
                  >
                    {m.base}
                  </span>

                  <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                </div>

                {/* Brand */}
                <h3 className="font-heading font-bold text-charcoal text-lg mb-1 group-hover:text-primary transition-colors duration-200">
                  {m.brand}
                </h3>

                {/* Tagline */}
                <p className="text-xs text-primary font-semibold mb-2">
                  {m.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {m.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Industries */
function IndustriesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Respect accessibility preferences.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`industries-motion-section py-8 bg-white border-y border-divider ${
        isVisible ? "industries-motion-visible" : ""
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="industries-motion-heading text-center mb-8">
          <h2 className="font-heading text-3xl text-charcoal">
            Industries We Serve
          </h2>
        </div>

        {/* Original layout: unchanged */}
        <div className="flex flex-wrap justify-center gap-3">
          {allIndustries.map((ind, index) => {
            const Icon = industryIcons[ind.slug as keyof typeof industryIcons];

            return (
              <Link
                key={ind.abbr}
                to={`/industries/${ind.slug}`}
                className="industries-motion-card group flex items-center gap-2.5 px-4 py-2.5 border border-border bg-card hover:border-primary hover:text-primary text-sm font-medium text-charcoal-light transition-all duration-200 rounded-lg"
                style={
                  {
                    "--industry-index": index,
                    "--industry-delay": `${180 + index * 150}ms`,
                  } as React.CSSProperties
                }
              >
                <Icon
                  className="w-4 h-4 text-primary shrink-0 transition-transform duration-200 group-hover:scale-110"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span>{ind.abbr}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="industries-motion-footer text-center mt-8">
          <Link to="/industries" className="cta-link">
            View all industries <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Infrastructure */
function InfrastructureSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`infrastructure-motion-section py-8 border-b border-divider bg-[#161F2D] ${
        isVisible ? "infrastructure-motion-visible" : ""
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6">
        {/* Heading and description */}
        <div className="infrastructure-motion-heading text-center mb-8">
          <h2 className="font-heading text-3xl text-white">
            Infrastructure Built for Scale
          </h2>

          <p className="text-muted-foreground text-sm mt-3 max-w-xl mx-auto">
            From extrusion to precision CNC machining —{" "}
            <span className="font-semibold text-base text-primary">
              Fully equipped to deliver any polymer component at any volume.
            </span>
          </p>
        </div>

        {/* Grid layout with increased gap and separate rounded cards */}

        {/* Continuous Infrastructure Card Marquee */}
        <div
          className="infrastructure-marquee"
          role="region"
          aria-label="Manufacturing infrastructure and capabilities"
        >
          <div className="infrastructure-marquee-track">
            {/* First set of six cards */}
            <div className="infrastructure-marquee-group">
              {infrastructure.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.number}
                    className="infrastructure-marquee-card"
                  >
                    {/* Top row */}
                    <div className="infrastructure-card-top">
                      <div className="infrastructure-card-icon">
                        <Icon
                          className="w-5 h-5"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      </div>

                      <span className="infrastructure-card-number">
                        CAPABILITY / {item.number}
                      </span>
                    </div>

                    {/* Main information */}
                    <div className="infrastructure-card-content">
                      <p className="infrastructure-card-label">{item.label}</p>

                      <h3 className="infrastructure-card-value">
                        {item.value}
                      </h3>

                      <p className="infrastructure-card-description">
                        {item.sub}
                      </p>
                    </div>

                    {/* Bottom accent */}
                    <div className="infrastructure-card-footer">
                      <span className="infrastructure-card-status">
                        <span className="infrastructure-status-dot" />
                        KHANNA POLYRIB PVT. LTD.
                      </span>

                      <span className="infrastructure-card-arrow">↗</span>
                    </div>

                    {/* Decorative gradient glow */}
                    <div
                      className="infrastructure-card-glow"
                      aria-hidden="true"
                    />
                  </article>
                );
              })}
            </div>

            {/* Duplicate set for seamless infinite scrolling */}
            <div className="infrastructure-marquee-group" aria-hidden="true">
              {infrastructure.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={`duplicate-${item.number}`}
                    className="infrastructure-marquee-card"
                  >
                    <div className="infrastructure-card-top">
                      <div className="infrastructure-card-icon">
                        <Icon className="w-5 h-5" strokeWidth={1.7} />
                      </div>

                      <span className="infrastructure-card-number">
                        CAPABILITY / {item.number}
                      </span>
                    </div>

                    <div className="infrastructure-card-content">
                      <p className="infrastructure-card-label">{item.label}</p>

                      <h3 className="infrastructure-card-value">
                        {item.value}
                      </h3>

                      <p className="infrastructure-card-description">
                        {item.sub}
                      </p>
                    </div>

                    <div className="infrastructure-card-footer">
                      <span className="infrastructure-card-status">
                        <span className="infrastructure-status-dot" />
                        Khanna Polyrib Pvt. Ltd.
                      </span>

                      <span className="infrastructure-card-arrow">↗</span>
                    </div>

                    <div className="infrastructure-card-glow" />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* COMPLIANCE */
function CertificationSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -20px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className={`certification-motion-section py-8 bg-white border-b border-divider ${
          isVisible ? "certification-visible" : ""
        }`}
      >
        <div className="container max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-8 certification-heading">
            <h2 className="font-heading text-3xl text-charcoal">
              Certifications & Standards
            </h2>

            <p className="text-muted-foreground text-sm mt-3 max-w-xl mx-auto">
              Khanna Polyrib Pvt. Ltd. holds
              <span className="font-semibold text-base text-primary">
                {" "}
                ISO 9001:2015 Certification
              </span>{" "}
              — demonstrating commitment to consistent quality management,
              process control, and customer satisfaction across all product
              lines.
            </p>
          </div>

          {/* Animated ISO Badge */}
          <div className="flex justify-center items-center iso-badge-container">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="View ISO 9001:2015 certification"
              aria-haspopup="dialog"
              className={`iso-badge-button ${
                isVisible ? "iso-badge-active" : ""
              }`}
            >
              <img
                src={isoBadge}
                alt="ISO 9001:2015 certification badge"
                className="iso-badge-image"
                width={740}
                height={740}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="ISO 9001:2015 certificate preview"
        >
          <button
            type="button"
            aria-label="Close certificate preview"
            className="absolute inset-0 bg-black/40 backdrop-blur-md cursor-default"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-[10000] flex justify-center items-center w-full h-full px-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close certificate"
              className="absolute top-6 right-6 bg-white rounded-full p-2 shadow-md hover:bg-blue-200 transition-colors"
            >
              <X className="w-5 h-5 text-black" />
            </button>

            <img
              src={certImg}
              alt="ISO 9001:2015 certificate"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}

/* Polyrib Promise */
function PolyribPromiseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -20px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`polyrib-promise-section py-8 border-b border-divider ${
        isVisible ? "promise-visible" : ""
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-8 promise-heading">
          <h2 className="font-heading text-3xl text-charcoal">
            The Polyrib Promise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promise.map(({ icon: Icon, title, desc }, index) => (
            <div
              key={title}
              className="promise-bubble-card bg-card border border-border p-8 text-center group rounded-xl"
              style={
                {
                  "--promise-delay": `${index * 500}ms`,
                } as React.CSSProperties
              }
            >
              <div className="promise-icon w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-200">
                <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>

              <h3 className="font-heading font-bold text-charcoal text-base mb-3">
                {title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

const Index = () => {
  const _heroRef = useRef(null);
  const machineComponents = useMachineComponentRouting();

  // CTA animation state
  const ctaRef = useRef<HTMLElement | null>(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  // Trigger the CTA animation when it enters the viewport
  useEffect(() => {
    const section = ctaRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCtaVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const [typedText, setTypedText] = useState(["", "", ""]);

  useEffect(() => {
    const lines = [
      "Best Engineering",
      "Thermoplastics Solutions",
      "Built For Performance",
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];

    lines.forEach((line, lineIndex) => {
      for (let charIndex = 1; charIndex <= line.length; charIndex++) {
        const timer = setTimeout(
          () => {
            setTypedText((previous) => {
              const updated = [...previous];
              updated[lineIndex] = line.slice(0, charIndex);
              return updated;
            });
          },
          300 + charIndex * 65,
        );

        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0 overflow-hidden">
          <video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Overlay gradients — unchanged effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/35 to-transparent" />
        </div>
        <div className="relative container max-w-7xl mx-auto px-6 pb-20 pt-32">
          <div className="max-w-2xl">
            {/* Hero Heading — Mask Reveal + Cyan Highlight Sweep */}

            <h1 className="hero-cyan-heading font-heading text-3xl sm:text-4xl lg:text-4xl leading-tight mb-6">
              <span className="block pt-12 sm:pt-8">Best Engineering</span>

              <span className="block">Thermoplastics Solutions</span>

              <span className="block">Built For Performance</span>
            </h1>

            <div
              className="flex flex-col items-start sm:flex-row sm:items-center gap-2 sm:gap-3 animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <Link
                to="/products"
                className="inline-flex w-[172px] sm:w-auto items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-primary text-primary-foreground font-normal hover:bg-primary-light transition-colors duration-200 rounded-lg whitespace-nowrap"
              >
                Explore Products
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>

              <Link
                to="/contact?tab=drawing"
                className="inline-flex w-[172px] sm:w-auto items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white/10 border border-white/30 text-white font-normal hover:bg-white/20 transition-colors duration-200 rounded-lg whitespace-nowrap"
              >
                <Send className="w-3.5 h-3.5 shrink-0" />
                Send Your Drawing
              </Link>

              <Link
                to="/tools/material-selector"
                className="inline-flex w-[172px] sm:w-auto items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm border border-white/20 text-white/80 font-normal hover:bg-white/10 transition-colors duration-200 rounded-lg whitespace-nowrap"
              >
                <PenLine className="w-3.5 h-3.5 shrink-0" />
                Material Selector
              </Link>
            </div>
            {/* Trust badges */}
            <div
              className="flex flex-wrap gap-4 mt-10 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              {trustPoints.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary-light" />
                  <span className="text-white/60 text-xs font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Floating Stats Bar */}{" "}
      <div className="container max-w-7xl mx-auto px-6 -mt-8 sm:-mt-10 lg:-mt-12 relative z-20">
        {" "}
        <StatSection />{" "}
      </div>
      {/* Why Polyrib */}
      <WhyUsSection />
      {/* Product Categories */}
      <section className="py-8">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
            <div>
              <p className="section-label mb-3">Product Range</p>
              <h2 className="font-heading text-3xl text-charcoal">
                Two core product divisions
              </h2>
            </div>
            <Link to="/products" className="cta-link mt-4 md:mt-0">
              View all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductCategoryCard
              title="Thermoplastic Semi-Finished Products"
              description="Extruded and Compression-moulded Sheets, Blocks, Rods, Tubes, Welding Rods and Rolls across our full brand portfolio — POLYRIB V, H, P; DIPRA, PCCLEAR, KAYLON, PAKETAL, HITECH, ARETE, POLYLIMB and more. Available ex-stock in standard dimensions — Custom Sizes on request."
              href="/products/thermoplastics-semi-finished-products"
              images={[
                semiFinishedImage1,
                semiFinishedImage2,
                semiFinishedImage3,
                semiFinishedImage4,
                semiFinishedImage5,
              ]}
              tag="Semi-Finished"
            />

            <ProductCategoryCard
              title="Thermoplastic Engineered Products"
              description="RIPLA cutting boards, CUTRITE chopping boards, ARETE composite liners, POLYLIMB Orthopaedic Sheets, Strips & Profiles, Vacuum Formed Parts and Precision Machined Plastic Components — all manufactured in Polyrib's proprietary grades."
              href={machineComponents.rootPath}
              images={[
                machineComponentsImage1,
                machineComponentsImage2,
                machineComponentsImage3,
                machineComponentsImage4,
                machineComponentsImage5,
              ]}
              tag="Engineered Products"
            />
          </div>
        </div>
      </section>
      {/* Brand Portfolio */}
      <MaterialsSection />
      {/* Polymers We Work With */}
      <PolymersSection />
      {/* Industries */}
      <IndustriesSection />
      {/* Infrastructure */}
      <InfrastructureSection />
      {/* COMPLIANCE */}
      <CertificationSection />
      {/* Polyrib Promise */}
      <PolyribPromiseSection />
      {/* CTA Banner */}
      {/* CTA Banner */}
      <section
        ref={ctaRef}
        className={`polyrib-cta-section bg-primary py-8 ${
          ctaVisible ? "cta-visible" : ""
        }`}
      >
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <h2 className="polyrib-cta-heading font-heading text-3xl text-primary-foreground mb-4">
            Upgrade to smarter thermoplastics. Partner with Polyrib
          </h2>

          <p className="polyrib-cta-description text-primary-foreground/70 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Precision-engineered plastic sheets and components that deliver
            long-term performance in demanding applications. Our engineering
            team responds within 24 hours.
          </p>

          <div className="polyrib-cta-button-wrapper flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact?tab=quote"
              className="inline-flex items-center gap-2 px-7 py-3 bg-primary-foreground text-primary text-sm font-bold hover:bg-surface-subtle transition-colors duration-200 rounded-lg"
            >
              Request a Quote <PenLine className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
