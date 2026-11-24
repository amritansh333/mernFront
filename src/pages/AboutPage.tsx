import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, MapPin, Building2, Plus } from "lucide-react";
import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import AboutUsImage from "@/assets/about-us-hero-banner.jpeg";
import aboutVideo from "@/assets/about-us.mp4";
import { useScrollFade } from "@/hooks/useScrollFade";

/* ARRAYS (UNCHANGED) */

const milestones = [
  {
    year: "1985",
    event:
      "Khanna Polyrib Pvt. Ltd. founded — began manufacturing PP and HDPE sheets in Kanpur, Uttar Pradesh",
  },
  {
    year: "1992",
    event:
      "Launch of POLYRIB V (UHMW PE) product family — extreme wear resistance polymer range",
  },
  {
    year: "1998",
    event:
      "ISO 9001 Quality Management Certification achieved — first certification cycle",
  },
  {
    year: "2003",
    event:
      "PCCLEAR polycarbonate range launched; KBK Plascon Pvt. Ltd. established; export operations begin",
  },
  {
    year: "2008",
    event:
      "KAYLON cast nylon and PAKETAL acetal brands introduced; KBK Polymer Pvt. Ltd. incorporated",
  },
  {
    year: "2012",
    event:
      "Distribution centres established in Delhi, Bhiwandi (Mumbai), and Ahmedabad",
  },
  {
    year: "2015",
    event:
      "New manufacturing plant commissioned — production capacity doubled; CNC machining division launched",
  },
  {
    year: "2020",
    event:
      "500+ product grades across all thermoplastic brand families; 20+ industries served",
  },
  {
    year: "2024",
    event:
      "Export to 50+ countries; Kanpur facility upgraded with 11 RAM extrusion lines and 7 compression moulding units",
  },
];

const groupCompanies = [
  {
    name: "Khanna Polyrib Pvt. Ltd.",
    short: "POLYRIB",
    desc: "The flagship manufacturing entity — responsible for producing the full range of POLYRIB, PCCLEAR, KAYLON, PAKETAL, DIPRA, and PLASCON thermoplastic semi-finished products. Houses the primary extrusion, compression moulding, and CNC machining facilities in Kanpur.",
    focus: [
      "Semi-finished thermoplastic sheets, rods & tubes",
      "Compression-moulded and extruded profiles",
      "CNC precision machined components",
      "Brand families: POLYRIB, KAYLON, PAKETAL, PCCLEAR",
    ],
  },
  {
    name: "KBK Plascon Pvt. Ltd.",
    short: "PLASCON",
    desc: "Specialised in engineering plastic machine components and fabricated parts. Manufactures wear strips, guide rails, conveyor components, cutting boards, fascia pads, and custom-designed parts for OEM and replacement markets.",
    focus: [
      "Thermoplastic machine components & wear parts",
      "RIPLA wear strips and guide profiles",
      "CUTRITE cutting and chopping boards",
      "Vacuum formed and fabricated plastic assemblies",
    ],
  },
  {
    name: "KBK Polymer Pvt. Ltd.",
    short: "POLYMER",
    desc: "Trading and distribution arm of the Khanna Group — responsible for nationwide supply logistics, bulk raw material sourcing, and distribution partnerships. Manages the Delhi, Bhiwandi, and Ahmedabad distribution centres.",
    focus: [
      "Nationwide distribution & logistics",
      "Raw polymer material sourcing",
      "Distribution centre operations (Delhi, Bhiwandi, Ahmedabad)",
      "Export co-ordination and international trade",
    ],
  },
];

const locations = [
  {
    city: "Kanpur, Uttar Pradesh",
    type: "Manufacturing HQ",
    detail:
      "Industrial Area, Kanpur — primary production facility with 11 RAM extrusion lines, compression moulding, and CNC workshop.",
  },
  {
    city: "Delhi (NCR)",
    type: "Distribution Centre",
    detail:
      "North India distribution hub serving industrial customers across Delhi, NCR, Haryana, Punjab, and surrounding regions.",
  },
  {
    city: "Bhiwandi, Maharashtra",
    type: "Distribution Centre",
    detail:
      "West India hub near Mumbai — serving Maharashtra, Gujarat, Goa, and export container consolidation.",
  },
  {
    city: "Ahmedabad, Gujarat",
    type: "Distribution Centre",
    detail:
      "Gujarat operations hub — serving chemical, pharmaceutical, and packaging industries across western India.",
  },
];

export default function AboutPage() {
  const ref1 = useScrollFade() as React.RefObject<HTMLElement>;
  const ref2 = useScrollFade() as React.RefObject<HTMLElement>;
  const ref3 = useScrollFade() as React.RefObject<HTMLElement>;
  const ref4 = useScrollFade() as React.RefObject<HTMLElement>;
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

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
      {/* ABOUT US HEADER */}

      <PageHeroBanner
        eyebrow="Our Company"
        title="Welcome to"
        highlight="Khanna Group"
        image={AboutUsImage}
        imageAlt="Khanna Polyrib manufacturing facility"
        imagePosition="center center"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />

      {/* OUR FOUNDATION (FROM PART B) */}
      <section className="py-8 border-b border-divider">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative group csr-slider-wrapper">
  {/* Decorative top-left geometric pattern */}
  <div className="csr-decoration csr-decoration-top-left">
    <div className="csr-decoration-inner" />
  </div>

  {/* Decorative bottom-right geometric pattern */}
  <div className="csr-decoration csr-decoration-bottom-right">
    <div className="csr-decoration-inner" />
  </div>

  {/* Video container */}
  <div className="relative border border-primary/90 overflow-hidden rounded-xl shadow-sm">
    <video
      ref={videoRef}
      src={aboutVideo}
      muted
      loop
      playsInline
      className="
        w-full
        h-73
        object-cover
        opacity-90
        transition-all
        duration-500
        ease-in-out
        group-hover:opacity-100
        group-hover:scale-[1.02]
      "
    />
  </div>
</div>

            <div>
              <p className="section-label mb-3">Our Foundation</p>
              <h2 className="font-heading text-3xl text-charcoal mb-5">
                Built on polymer science and precision manufacturing
              </h2>
              <div className="space-y-4 text-muted-foreground text-lh leading-relaxed">
                <p>
                  <strong className="text-primary">
                    Khanna Polyrib Pvt. Ltd.
                  </strong>{" "}
                  manufactures engineering plastic solutions for Indian and
                  global markets. Our{" "}
                  <strong className="text-primary">ISO 9001:2015</strong>{" "}
                  certified operations are built on sound polymer science and
                  proven production practice.
                </p>
                <p>
                  With four decades in the industry, we combine material
                  know-how and careful manufacturing to make plastics that
                  perform reliably in demanding industrial applications.
                </p>
                <p>
                  We work with customers to develop materials tailored to their
                  application, delivering consistent strength, uniformity and
                  long service life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE FEATURES (MISSION & VALUES FROM PART B) */}
<section ref={ref4} className="fade-up py-12 border-b border-divider">
  <div className="container max-w-7xl mx-auto px-6">
    <div className="text-center mb-12">
      <p className="section-label mb-3">Explore Features</p>

      <h2 className="font-heading text-3xl text-charcoal">
        Our Mission & Values
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-5 text-left items-stretch">
      {[
        {
          number: "01",
          title: "Our Mission",
          sub: "Material Expertise",
          desc: "To deliver innovative, high-quality polymer solutions that empower modern infrastructure, driven by integrity, customer focus, sustainability, and continuous innovation—building lasting partnerships through reliability, performance, and responsible growth.",
          label: "TECHNICAL KNOW-HOW",
        },
        {
          number: "02",
          title: "Our Vision",
          sub: "Quality in Every Detail",
          desc: "To set the standard for quality, application performance and responsible polymer engineering in global industry.",
          label: "QUALITY FOCUS",
        },
        {
          number: "03",
          title: "Our Values",
          sub: "Application-Driven Solutions",
          desc: "Integrity, consistent quality and continuous improvement guide every product we make and every relationship we build.",
          label: "CUSTOMER APPLICATIONS",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="group relative flex flex-col h-full overflow-hidden border border-primary/50 bg-card transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:bg-primary/3 hover:shadow-[0_8px_24px_rgba(39,158,206,0.08)] rounded-xl"
        >
          {/* Subtle technical background pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: `
                linear-gradient(#279ECE 1px, transparent 1px),
                linear-gradient(90deg, #279ECE 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Top accent */}
          <div className="absolute top-0 left-0 w-12 h-[3px] bg-primary transition-all duration-300 group-hover:w-full" />

          <div className="relative flex flex-col flex-1 p-7 sm:p-8">
            {/* Number + Decorative line */}
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-sm font-semibold tracking-wider text-primary">
                {item.number}
              </span>

              <div className="h-px flex-1 bg-divider transition-colors duration-300 group-hover:bg-primary/30" />

              <span className="text-[10px] font-medium tracking-[0.18em] text-muted-foreground">
                {item.sub}
              </span>
            </div>

            {/* Heading */}
            <h3 className="font-heading text-xl text-charcoal mb-4 transition-colors duration-300 group-hover:text-primary">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-7 text-muted-foreground">
              {item.desc}
            </p>

            {/* Bottom marker - pushed to the bottom */}
            <div className="mt-auto pt-8 flex items-center justify-between">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-primary/70" />
                <span className="w-1.5 h-1.5 bg-primary/30" />
                <span className="w-1.5 h-1.5 bg-primary/15" />
              </div>

              <span className="font-mono text-[10px] tracking-widest text-muted-foreground/60">
                {item.label}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ========================= */}
      {/* BELOW THIS: EXACT PART A */}
      {/* DO NOT MODIFIED SECTIONS */}
      {/* ========================= */}

      {/* GROUP STRUCTURE */}
      <section ref={ref1} className="fade-up py-8 border-b border-divider">
  <div className="container max-w-7xl mx-auto px-6">
    <div className="text-center mb-8">
      <p className="section-label mb-3">Group Structure</p>

      <h2 className="font-heading text-3xl text-charcoal">
        Three Companies, One Group
      </h2>

      <p className="text-muted-foreground text-sm mt-3 max-w-xl mx-auto">
        Each entity within the Khanna Group serves a distinct function —
        together covering manufacturing, fabrication, and distribution of
        engineering thermoplastics across India and beyond.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {groupCompanies.map((co) => (
        <div
          key={co.name}
          className="group relative flex flex-col h-full overflow-hidden border border-primary/50 bg-card transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:bg-primary/3 hover:shadow-[0_8px_24px_rgba(39,158,206,0.08)] rounded-xl"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 w-12 h-[3px] bg-primary transition-all duration-300 group-hover:w-full" />

          <div className="relative flex flex-col flex-1 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 rounded-full">
    <Building2 className="w-5 h-5 text-primary" />
  </div>

  <div>
    <span className="text-[10px] font-semibold tracking-wider text-primary uppercase">
      {co.short}
    </span>

    <h3 className="font-heading font-semibold text-charcoal text-lg leading-snug">
      {co.name}
    </h3>
  </div>
</div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {co.desc}
            </p>

            <ul className="space-y-1.5 mt-auto">
              {co.focus.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-charcoal-light"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* OUR LOCATIONS */}
      <section className="py-8 border-b border-divider">
  <div className="container max-w-7xl mx-auto px-6">
    <div className="text-center mb-8">
      <p className="section-label mb-3">Our Locations</p>

      <h2 className="font-heading text-3xl text-charcoal">
        Manufacturing & Distribution Network
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {locations.map((loc) => (
        <div
          key={loc.city}
          className="group relative flex h-full overflow-hidden border border-primary/50 bg-card transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:bg-primary/3 hover:shadow-[0_8px_24px_rgba(39,158,206,0.08)] rounded-xl"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 w-12 h-[3px] bg-primary transition-all duration-300 group-hover:w-full" />

          <div className="relative flex items-start gap-4 p-6 sm:p-7 w-full">
            {/* Location Icon */}
            <div className="w-11 h-11 bg-primary/10 flex items-center justify-center shrink-0 rounded-full transition-colors duration-300 group-hover:bg-primary/15">
              <MapPin className="w-5 h-5 text-primary" />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-primary">
                {loc.type}
              </span>

              <h3 className="font-heading font-semibold text-charcoal text-lg mt-1 mb-2 transition-colors duration-300 group-hover:text-primary">
                {loc.city}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {loc.detail}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
}
