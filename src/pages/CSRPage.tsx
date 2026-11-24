import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Recycle,
  Users,
  Award,
  Sun,
  Droplets,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";

import csrImage from "@/assets/csr-hero-banner.jpeg";
import csr1 from "@/assets/csr-slider1.jpeg";
import csr2 from "@/assets/csr-slider2.jpeg";
import csr3 from "@/assets/csr-slider3.jpeg";
import csr4 from "@/assets/csr-slider4.jpeg";

/* =========================================================
   CSR PILLARS
========================================================= */

const pillars = [
  {
    icon: Leaf,
    title: "Sustainable Manufacturing",
    desc: "We continuously invest in energy-efficient manufacturing processes, reducing our carbon footprint per unit of output year-on-year. Our production facilities operate to ISO 14001 environmental management principles.",
  },
  {
    icon: Recycle,
    title: "Material Recycling",
    desc: "Production waste and off-cuts are segregated, reprocessed, and reintroduced into non-critical grade production streams wherever possible. We target zero thermoplastic waste to landfill.",
  },
  {
    icon: Users,
    title: "Community Development",
    desc: "Polyrib supports vocational training programmes in our local community, providing apprenticeships in plastics processing, CNC machining, and quality assurance.",
  },
  {
    icon: Sun,
    title: "Renewable Energy",
    desc: "Solar panels on our manufacturing rooftops contribute to our electricity requirements, reducing our reliance on grid power and lowering our Scope 2 emissions.",
  },
  {
    icon: Droplets,
    title: "Water Stewardship",
    desc: "Closed-loop cooling water systems in our extrusion and pressing operations minimise freshwater consumption. Effluent is monitored and treated before discharge.",
  },
  {
    icon: Award,
    title: "Responsible Sourcing",
    desc: "We work exclusively with raw material suppliers who comply with REACH, RoHS, and our internal responsible sourcing code of conduct, ensuring ethical supply chains.",
  },
];

const csrImages = [csr1, csr2, csr3, csr4];

/* =========================================================
   ANIMATED METRIC
   Counts from 0 when the element enters the viewport.
   Runs only once.
========================================================= */

function AnimatedMetric({
  value,
  suffix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.6,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let animationFrame: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Smooth ease-out
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const nextValue = Math.round(easedProgress * value);

      setCount(nextValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, value, duration]);

  return (
    <div ref={ref}>
      {count}
      {suffix}
    </div>
  );
}

/* =========================================================
   CSR PAGE
========================================================= */

export default function CSRPage() {
  const [current, setCurrent] = useState(0);

  /* =========================================================
     SLIDER AUTO PLAY
  ========================================================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % csrImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? csrImages.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % csrImages.length);
  };

  /* =========================================================
     PAGE BACKGROUND
  ========================================================= */

  const pageTexture = {
    backgroundColor: "#FFFFFF",
    backgroundImage: `
      linear-gradient(
        90deg,
        #FFFFFF 0%,
        #FDFEFF 25%,
        #F5FAFC 55%,
        #EAF5F9 80%,
        #E3F1F7 100%
      )
    `,
  };

  return (
    <div className="min-h-screen bg-white pt-16" style={pageTexture}>
      {/* =====================================================
          HERO
      ====================================================== */}

      <PageHeroBanner
        eyebrow="Responsibility"
        title="CSR"
        highlight="& Sustainability"
        image={csrImage}
        imageAlt="Khanna Polyrib manufacturing facility"
        imagePosition="center center"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "CSR & Sustainability" },
        ]}
      />

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="py-8 border-b border-gray-200">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* LEFT CONTENT */}

            <div>
              <p className="section-label mb-4">Our Commitment</p>

              <div className="relative mb-6">
                <div className="absolute -left-4 top-2 w-1 h-16 bg-primary" />

                <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-tight">
                  Manufacturing responsibly for the long term
                </h2>
              </div>

              <div className="space-y-5 text-muted-foreground text-lh leading-relaxed">
                <p>
                  At <strong className="text-primary">Polyrib</strong>, we
                  believe that responsible manufacturing and commercial success
                  are inseparable. Our{" "}
                  <strong className="text-primary">CSR</strong> programme covers
                  environmental stewardship, employee development, community
                  investment, and ethical supply chain management.
                </p>

                <p>
                  As a manufacturer of polymer materials, we recognise our
                  responsibility to manage our{" "}
                  <strong className="text-primary">
                    environmental impact
                  </strong>{" "}
                  thoughtfully — from responsible raw material sourcing to
                  energy-efficient processing and end-of-life material recovery.
                </p>

                <p>
                  This page summarises our key{" "}
                  <strong className="text-primary">
                    CSR commitments
                  </strong>
                  . We publish an{" "}
                  <strong className="text-primary">
                    Annual Sustainability Update
                  </strong>{" "}
                  for customers, investors, and community stakeholders.
                </p>
              </div>
            </div>

            {/* RIGHT SLIDER */}

            <div className="relative group csr-slider-wrapper">
              {/* Top-left decoration */}

              <div className="csr-decoration csr-decoration-top-left">
                <div className="csr-decoration-inner" />
              </div>

              {/* Bottom-right decoration */}

              <div className="csr-decoration csr-decoration-bottom-right">
                <div className="csr-decoration-inner" />
              </div>

              {/* SLIDER */}

              <div className="relative h-[380px] overflow-hidden shadow-xl rounded-2xl csr-slider">
                {csrImages.map((img, index) => {
                  const offset = index - current;
                  const isActive = index === current;

                  return (
                    <img
                      key={index}
                      src={img}
                      alt={`CSR and sustainability image ${index + 1}`}
                      className={`
                        absolute inset-0
                        w-full h-full
                        object-cover
                        rounded-2xl
                        border border-primary
                        transition-transform
                        duration-1000
                        ease-in-out
                        ${isActive ? "csr-slide-active" : ""}
                      `}
                      style={{
                        transform: `translateX(${offset * 100}%)`,
                      }}
                    />
                  );
                })}

                {/* OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                {/* PREVIOUS BUTTON */}

                <button
                  onClick={prevSlide}
                  className="
                    absolute left-4 top-1/2 -translate-y-1/2 z-20
                    flex items-center justify-center
                    w-9 h-9
                    rounded-full
                    bg-white/30
                    backdrop-blur-md
                    border border-white/50
                    shadow-lg shadow-black/10
                    text-white
                    transition-all duration-300
                    hover:bg-white/50
                    hover:scale-105
                    active:scale-95
                  "
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* NEXT BUTTON */}

                <button
                  onClick={nextSlide}
                  className="
                    absolute right-4 top-1/2 -translate-y-1/2 z-20
                    flex items-center justify-center
                    w-9 h-9
                    rounded-full
                    bg-white/30
                    backdrop-blur-md
                    border border-white/50
                    shadow-lg shadow-black/10
                    text-white
                    transition-all duration-300
                    hover:bg-white/50
                    hover:scale-105
                    active:scale-95
                  "
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CSR PILLARS
      ====================================================== */}

      <section className="py-12 border-b border-gray-200 relative overflow-hidden">
        {/* Background decoration */}

        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-emerald-400/5 blur-3xl pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          {/* Section heading */}

          <div className="mb-10">
            <p className="section-label mb-3">Key Pillars</p>

            <h2 className="font-heading text-2xl md:text-3xl text-charcoal">
              Our CSR Commitments
            </h2>
          </div>

          {/* CSR Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((p, index) => (
              <div
                key={p.title}
                className="
                  group relative
                  overflow-hidden
                  bg-white
                  border border-primary/20
                  rounded-2xl
                  p-6 md:p-7
                  shadow-sm
                  transition-all duration-300 ease-out
                  hover:-translate-y-1.5
                  hover:border-primary/40
                  hover:shadow-[0_12px_35px_rgba(39,158,206,0.10)]
                "
              >
                {/* Top accent */}

                <div
                  className="
                    absolute top-0 left-0
                    h-[3px] w-full
                    bg-gradient-to-r
                    from-primary
                    via-primary/40
                    to-emerald-400/60
                    opacity-70
                    transition-all duration-300
                    group-hover:opacity-100
                  "
                />

                {/* Decorative corner */}

                <div
                  className="
                    absolute -top-12 -right-12
                    w-32 h-32
                    rounded-full
                    bg-primary/5
                    transition-transform duration-500
                    group-hover:scale-150
                  "
                />

                {/* Card Header */}

                <div className="relative flex items-center justify-between mb-6">
                  {/* Icon */}

                  <div
                    className="
                      relative
                      w-12 h-12
                      rounded-full
                      flex items-center justify-center
                      bg-gradient-to-br
                      from-primary/10
                      to-emerald-500/10
                      border border-primary/10
                      transition-all duration-300
                      group-hover:from-primary/15
                      group-hover:to-emerald-500/15
                      group-hover:scale-105
                    "
                  >
                    <p.icon className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Number */}

                  <span
                    className="
                      font-heading
                      text-3xl
                      font-bold
                      text-primary/10
                      transition-colors duration-300
                      group-hover:text-primary/20
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}

                <h3
                  className="
                    relative
                    text-lg
                    font-heading
                    font-semibold
                    text-charcoal
                    mb-3
                    transition-colors duration-300
                    group-hover:text-primary
                  "
                >
                  {p.title}
                </h3>

                {/* Description */}

                <p className="relative text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>

                {/* Bottom accent */}

                <div className="relative mt-6 flex items-center gap-2">
                  <div className="h-1 w-8 rounded-full bg-primary/40 transition-all duration-300 group-hover:w-12 group-hover:bg-primary" />

                  <div className="h-1 w-2 rounded-full bg-emerald-400/50" />

                  <div className="h-1 w-2 rounded-full bg-primary/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SUSTAINABILITY METRICS
          Counts animate when section enters viewport.
      ====================================================== */}

      <section className="py-8 border-b border-gray-200">
        <div className="container max-w-7xl mx-auto px-6">
          <p className="section-label mb-3">Progress</p>

          <h2 className="font-heading text-2xl text-charcoal mb-8">
            2024 Sustainability Metrics
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                value: 30,
                suffix: "%",
                label: "Renewable Energy Use",
              },
              {
                value: 95,
                suffix: "%",
                label: "Production Waste Recovered",
              },
              {
                value: 0,
                suffix: "",
                label: "Non-Compliance Incidents",
                zeroLabel: "Zero",
              },
              {
                value: 50,
                suffix: "+",
                label: "Apprentices Trained",
              },
            ].map((metric) => (
              <div
                key={metric.label}
                className="
                  group
                  relative
                  overflow-hidden
                  border border-primary/50
                  bg-white
                  shadow-sm
                  p-6
                  text-center
                  rounded-xl
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                  hover:shadow-primary/10
                  hover:border-primary
                "
              >
                {/* Top accent */}

                <div
                  className="
                    absolute top-0 left-0
                    h-1 w-full
                    bg-gradient-to-r
                    from-primary/40
                    via-primary
                    to-emerald-400/50
                    opacity-60
                    group-hover:opacity-100
                    transition-opacity duration-300
                  "
                />

                {/* Animated value */}

                <div
                  className="
                    font-heading
                    font-bold
                    text-primary
                    text-3xl
                    md:text-4xl
                    mb-2
                  "
                >
                  {metric.zeroLabel ? (
                    metric.zeroLabel
                  ) : (
                    <AnimatedMetric
                      value={metric.value}
                      suffix={metric.suffix}
                      duration={2}
                    />
                  )}
                </div>

                {/* Label */}

                <div className="text-sm text-muted-foreground leading-relaxed">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="py-14 bg-primary">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-heading text-2xl text-primary-foreground mb-3">
            Download our CSR Report
          </h2>

          <p className="text-primary-foreground/70 text-sm mb-6">
            Our latest annual sustainability report is available to download.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-foreground text-primary text-sm font-bold hover:bg-gray-100 transition-colors duration-200 rounded-xl"
            >
              Download Report <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-primary-foreground text-sm font-semibold hover:bg-white/10 transition-colors duration-200 rounded-xl"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}