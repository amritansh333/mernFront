import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ChevronRight, Shield, Award, Zap, Globe,
  Factory, Layers, Ruler, BadgeCheck, HeadphonesIcon,
  CheckCircle2, Cpu, Wrench, FlaskConical, Cog, LayoutGrid,
  Send, TrendingUp, Lightbulb, PackageCheck
} from "lucide-react";
import heroVideo from "@/assets/hero-landingpage.mp4";
import semiFinishedImage from "@/assets/semi-finished-products.jpeg";
import machineComponentsImage from "@/assets/machine-components.jpeg";
import slider1 from "@/assets/slider1-Engineered-To-Perform.jpeg";
import slider2 from "@/assets/slider2-Engineered-To-Perform.jpeg";
import slider3 from "@/assets/slider3-Engineered-To-Perform.jpeg";
import slider4 from "@/assets/slider4-Engineered-To-Perform.jpeg";
import slider5 from "@/assets/slider5-Engineered-To-Perform.jpeg";
import { useScrollFade } from "@/hooks/useScrollFade";

/* ─── Data ─────────────────────────────────────────────── */

const stats = [
  { value: "40+",     label: "Years of Manufacturing" },
  { value: "500+",    label: "Product Grades" },
  { value: "20+",     label: "Industries Served" },
  { value: "ISO 9001",label: "Certified" },
];

const allIndustries = [
  "Aerospace", "Agro Processing", "Automotive", "Build & Construction",
  "Cement", "Chemical", "Food & Beverage", "Heavy Equipment",
  "Iron & Steel", "Leather", "Marine", "Material Handling",
  "Medical", "Mining", "Oil & Gas", "Packaging",
  "Pulp & Paper", "Signage", "Sports & Recreation", "Transportation",
  "Water & Waste Water",
];

const brandFamilies = [
  { abbr: "POLYRIB V",       name: "UHMW Polyethylene",          prop: "Abrasion resistance, low friction, high impact" },
  { abbr: "POLYRIB H",       name: "High-Density Polyethylene",  prop: "Chemical resistance, toughness, outdoor use" },
  { abbr: "POLYRIB P / DIPRA", name: "Polypropylene (PP)",       prop: "Chemical tanks, acid resistance, low density" },
  { abbr: "PCCLEAR",         name: "Polycarbonate (PC)",         prop: "Transparency, impact strength, UV stability" },
  { abbr: "KAYLON",          name: "Cast Nylon (PA6)",           prop: "Wear resistance, structural strength, bearings" },
  { abbr: "PAKETAL",         name: "Acetal / POM (Delrin)",      prop: "Precision machining, dimensional stability" },
  { abbr: "POLYRIB A",       name: "ABS / ASA",                  prop: "Automotive interiors, UV resistance, surface finish" },
  { abbr: "PLASCON",         name: "Engineering Grades (PE/PP)", prop: "Machine components, sliding surfaces" },
];

const trustPoints = [
  { icon: Shield,  label: "ISO 9001 Certified" },
  { icon: Award,   label: "40+ Years Manufacturing" },
  { icon: Zap,     label: "Fast Delivery" },
  { icon: Globe,   label: "Export to 50+ Countries" },
];

const polymers = [
  { abbr: "PP",         name: "Polypropylene",           prop: "Lightweight, chemical-resistant, cost-effective" },
  { abbr: "HDPE",       name: "High-Density Polyethylene",prop: "Tough, impact-resistant, moisture-proof" },
  { abbr: "UHMWPE",     name: "Ultra-High MW Polyethylene",prop: "Extreme wear resistance, ultra-low friction" },
  { abbr: "ABS",        name: "Acrylonitrile Butadiene Styrene", prop: "Strong, dimensionally stable, easy to machine" },
  { abbr: "PC",         name: "Polycarbonate",           prop: "High impact strength, thermal stability" },
  { abbr: "CAST NYLON", name: "Polyamide 6",             prop: "High impact resistance, self-lubricating, good chemical resistance" },
  { abbr: "POM",        name: "Acetal / Delrin",         prop: "High strength, rigidity, stability" },
  { abbr: "HIPS",       name: "High-Impact Polystyrene", prop: "Versatile, lightweight, cost-effective" },
];

const infrastructure = [
  { label: "RAM Extrusion Lines",           value: "11 Lines",     sub: "Thickness: 0.9 mm – 40 mm" },
  { label: "Plank Extrusion Lines",         value: "Heavy Gauge",  sub: "Sheet thickness: 25 mm – 250 mm" },
  { label: "Sheet Extrusion Lines",         value: "6 Lines",      sub: "Wide-format sheet production" },
  { label: "Compression Moulding",          value: "7 Facilities", sub: "Width 700–5000 mm · Thickness 6–105 mm" },
  { label: "Cast Nylon Manufacturing",      value: "In-House",     sub: "Full monomer casting capability" },
  { label: "CNC Machining Centre",          value: "Full Suite",   sub: "VMC · 3 CNC Lathes · 4 CNC Routers" },
];

const whyPoints = [
  { icon: Factory,        title: "In-House Manufacturing",        desc: "Full control over quality — we manufacture our own branded thermoplastic sheets, rods, and tubes." },
  { icon: Layers,         title: "Extensive Brand Range",         desc: "POLYRIB, PCCLEAR, KAYLON, PAKETAL, DIPRA, PLASCON and more — all under one roof." },
  { icon: Ruler,          title: "Custom Sizes & Grades",         desc: "Standard stock plus custom-sized sheets, speciality grades, and machined-to-drawing components." },
  { icon: BadgeCheck,     title: "ISO 9001 Quality",              desc: "Certified manufacturing processes with consistent material properties and full traceability." },
  { icon: Globe,          title: "Multi-Industry Expertise",      desc: "Over 20 industries served — from food processing to aerospace and oil & gas." },
  { icon: HeadphonesIcon, title: "Technical Application Support", desc: "Material selection guidance, grade recommendations, and design consultation from our engineering team." },
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
  "One-stop polymer engineering solutions",
  "Application-driven material selection",
  "Consistent quality with tight tolerances",
  "Custom and batch manufacturing capability",
  "Reliable delivery and technical support",
];

const promise = [
  { icon: TrendingUp,  title: "Rise to Challenges",      desc: "We rise to challenges and deliver beyond customer expectations, every time." },
  { icon: Lightbulb,  title: "Innovate with Technology", desc: "Innovate as per latest technology with world-class infrastructure facilities." },
  { icon: PackageCheck,title: "Built for the World",     desc: "Build products in India for the world — reliable, precise, globally competitive." },
];

/* ─── Sub-components ────────────────────────────────────── */

function StatSection() {
  const ref = useScrollFade() as React.RefObject<HTMLDivElement>;
  return (
    <div ref={ref} className="stagger-children grid grid-cols-2 md:grid-cols-4 divide-x divide-divider border-x border-divider">
      {stats.map((s) => (
        <div key={s.label} className="px-6 py-8 text-center">
          <div className="font-heading text-3xl font-bold text-primary mb-1">{s.value}</div>
          <div className="text-sm text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function ProductCategoryCard({ title, description, href, image, tag }: {
  title: string; description: string; href: string; image: string; tag: string;
}) {
  return (
    <Link to={href} className="category-card block group">
      <div className="card-image aspect-[4/3] overflow-hidden bg-surface-subtle">
        <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-6">
        <span className="section-label text-xs block mb-3">{tag}</span>
        <h3 className="font-heading text-xl text-charcoal mb-2 group-hover:text-primary transition-colors duration-200">{title}</h3>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{description}</p>
        <div className="flex items-center gap-1.5 cta-link">
          Explore Range
          <ArrowRight className="w-4 h-4 explore-arrow" />
        </div>
        <div className="card-border-bottom mt-4" />
      </div>
    </Link>
  );
}

/* Polyrib Advantage banner */
function PolyribAdvantageSection() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="fade-up py-20 bg-charcoal overflow-hidden relative">
      {/* subtle grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,hsl(197 68% 48%)  39px,hsl(197 68% 48%) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,hsl(197 68% 48%) 39px,hsl(197 68% 48%) 40px)" }} />
      <div className="relative container max-w-7xl mx-auto px-6 text-center">
        <p className="section-label text-primary mb-3">The Polyrib Advantage</p>
        <h2 className="font-heading text-4xl lg:text-5xl text-white mb-5 leading-tight">
          Where <span className="text-primary-light">Polymers</span> Meet Performance
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto text-base leading-relaxed mb-10">
          Polyrib delivers engineered plastic solutions for demanding industrial applications. We specialize in high-performance polymers, enabling reliable metal-replacement components with superior wear resistance, strength, and cost efficiency.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground text-sm font-bold hover:bg-primary-light transition-colors duration-200">
            Request a Quote <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors duration-200">
            <Send className="w-4 h-4" /> Send Your Drawing
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Polymers We Work With */
function PolymersSection() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="fade-up py-20 border-b border-divider">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div>
            <p className="section-label mb-3">Material Expertise</p>
            <h2 className="font-heading text-3xl text-charcoal mb-4">The Polymers We Work With</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Manufactured as per customer drawings, samples, or application-specific requirements. Each material grade is selected for optimal performance in your environment.
            </p>
            <Link to="/materials" className="cta-link">
              Explore all grades <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {polymers.map((m) => (
              <Link key={m.abbr} to="/materials" className="bg-card border border-border p-4 hover:border-primary/40 transition-colors duration-200 block group">
                <div className="flex items-start gap-3">
                  <span className="font-heading font-bold text-primary text-sm w-28 shrink-0 group-hover:text-primary-dark transition-colors">{m.abbr}</span>
                  <div>
                    <div className="text-xs text-charcoal font-medium mb-0.5">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.prop}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Materials Section (Brand Portfolio) */
function MaterialsSection() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="fade-up py-20 bg-surface-subtle border-y border-divider">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div>
            <p className="section-label mb-3">Brand Portfolio</p>
            <h2 className="font-heading text-3xl text-charcoal mb-4">Our proprietary thermoplastic brands</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              From UHMW PE to Polycarbonate, our in-house brands cover the full spectrum of engineering thermoplastic requirements — manufactured to consistent quality standards.
            </p>
            <Link to="/materials" className="cta-link">
              View all material families <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {brandFamilies.map((m) => (
              <Link key={m.abbr} to="/materials" className="bg-card border border-border p-4 hover:border-primary/40 transition-colors duration-200 block group">
                <div className="flex items-start gap-3">
                  <span className="font-heading font-bold text-primary text-sm w-28 shrink-0 group-hover:text-primary-dark transition-colors">{m.abbr}</span>
                  <div>
                    <div className="text-xs text-charcoal font-medium mb-0.5">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.prop}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* About Us */
function AboutSection() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="fade-up py-20 border-b border-divider">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="section-label mb-3">About Us</p>
            <h2 className="font-heading text-3xl text-charcoal mb-5">Four Decades of Polymer Excellence</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              Khanna Group, comprising <strong className="text-charcoal">Khanna Polyrib Pvt. Ltd.</strong>, <strong className="text-charcoal">KBK Plascon Pvt. Ltd.</strong>, and <strong className="text-charcoal">KBK Polymer Pvt. Ltd.</strong>, has been at the forefront of polymer manufacturing for over four decades.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              With state-of-the-art manufacturing facilities in Uttar Pradesh and distribution centres in Delhi, Bhiwandi, and Ahmedabad, we ensure consistent quality and efficient nationwide supply. An <strong className="text-charcoal">ISO 9001:2008 certified</strong> company, POLYRIB is one of the most trusted brands in thermoplastic semi-finished products.
            </p>
            <Link to="/about" className="cta-link">
              Learn our story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {/* How we work — process steps */}
          <div>
            <p className="section-label mb-4">How We Turn Polymers into Performance</p>
            <div className="space-y-3">
              {processBullets.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-surface-subtle border border-divider">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-sm text-charcoal-light leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* What We Manufacture */
function WhatWeManufactureSection() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="fade-up py-20 bg-surface-subtle border-b border-divider">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">What We Manufacture</p>
          <h2 className="font-heading text-3xl text-charcoal">Precision-Engineered Plastic Sheets & Components</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whatWeManufacture.map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-card border border-border p-5 hover:border-primary/40 transition-colors duration-200">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm text-charcoal font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Industries */
function IndustriesSection() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="fade-up py-20">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Industries Served</p>
          <h2 className="font-heading text-3xl text-charcoal">Trusted across demanding sectors</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {allIndustries.map((ind) => (
            <Link
              key={ind}
              to="/industries"
              className="flex items-center gap-2 px-4 py-2.5 border border-border bg-card hover:border-primary hover:text-primary text-sm font-medium text-charcoal-light transition-all duration-200"
            >
              <ChevronRight className="w-3.5 h-3.5 text-primary" />
              {ind}
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/industries" className="cta-link">
            View all industries <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Why Polyrib */
function WhyUsSection() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="fade-up py-20 bg-surface-subtle border-y border-divider overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Why Polyrib</p>
          <h2 className="font-heading text-3xl text-charcoal">Engineered to Perform. Built to Last.</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-divider overflow-hidden">
          {/* Facility photo */}
<div className="relative min-h-[420px] lg:min-h-0 overflow-hidden">
  {/* Image Slider */}
  <div className="absolute inset-0 animate-fade-slider">
    {[slider1, slider2, slider3, slider4, slider5].map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`Engineered To Perform ${index + 1}`}
        className="absolute inset-0 w-full h-full object-cover opacity-0 animate-slide-fade"
        style={{
          animationDelay: `${index * 6}s`,
        }}
      />
    ))}
  </div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-transparent" />

  {/* Text Overlay (UNCHANGED) */}
  <div className="absolute bottom-0 left-0 right-0 p-8">
    <p className="text-white/60 text-xs tracking-widest uppercase font-semibold mb-3">
      Established 1985
    </p>
    <p className="font-heading text-white text-xl font-bold mb-5">
      40+ Years of Engineering Excellence
    </p>
    <div className="space-y-2">
      {whyChecks.map((c, i) => (
        <div key={i} className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary-light shrink-0" />
          <span className="text-white/80 text-xs font-medium">{c}</span>
        </div>
      ))}
    </div>
  </div>
</div>
          {/* Advantage points grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-divider">
            {whyPoints.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card p-6 flex flex-col gap-3 hover:bg-surface-subtle transition-colors duration-200">
                <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-charcoal text-sm mb-1">{title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Infrastructure */
function InfrastructureSection() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="fade-up py-20 border-b border-divider">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Manufacturing Capabilities</p>
          <h2 className="font-heading text-3xl text-charcoal">Infrastructure Built for Scale</h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-xl mx-auto">
            From extrusion to precision CNC machining — fully equipped to deliver any polymer component at any volume.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-divider border border-divider">
          {infrastructure.map((item) => (
            <div key={item.label} className="bg-card p-8 hover:bg-surface-subtle transition-colors duration-200">
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
                <Cog className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div className="font-heading text-2xl font-bold text-primary mb-1">{item.value}</div>
              <div className="font-semibold text-charcoal text-sm mb-1">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Polyrib Promise */
function PolyribPromiseSection() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="fade-up py-20 bg-surface-subtle border-b border-divider">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">The Polyrib Promise</p>
          <h2 className="font-heading text-3xl text-charcoal">Our Commitment to You</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promise.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card border border-border p-8 text-center hover:border-primary/40 transition-colors duration-200 group">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-200">
                <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading font-bold text-charcoal text-base mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
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
  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" />
  <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 to-transparent" />
</div>
        <div className="relative container max-w-7xl mx-auto px-6 pb-20 pt-32">
          <div className="max-w-2xl">
            <p className="section-label text-white/60 mb-2 animate-fade-in">Advanced Polymer Engineering Solutions</p>
            <p className="text-white/50 text-xs font-medium mb-4 animate-fade-in" style={{ animationDelay: "50ms" }}>
              One-stop manufacturing partner · PP · HDPE · UHMWPE · ABS · PC · POM · Cast Nylon
            </p>
            <h1 className="font-heading text-5xl lg:text-6xl text-white leading-tight mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Precision Thermoplastics
              <span className="text-primary-light block">for Every Industry</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-3 max-w-xl animate-fade-in" style={{ animationDelay: "200ms" }}>
              Semi-finished products and precision machine components across our proprietary POLYRIB, PCCLEAR, KAYLON, and PAKETAL brand families.
            </p>
            <p className="text-primary-light text-sm font-semibold mb-8 animate-fade-in" style={{ animationDelay: "250ms" }}>
              Engineered for performance. Manufactured for reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-light transition-colors duration-200">
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white text-sm font-semibold hover:bg-white/20 transition-colors duration-200">
                <Send className="w-4 h-4" /> Send Your Drawing
              </Link>
              <Link to="/tools/material-selector" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/80 text-sm font-semibold hover:bg-white/10 transition-colors duration-200">
                Material Selector
              </Link>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-10 animate-fade-in" style={{ animationDelay: "400ms" }}>
              {trustPoints.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary-light" />
                  <span className="text-white/60 text-xs font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="container max-w-7xl mx-auto px-6 -mt-px">
        <div className="bg-card border border-border shadow-card">
          <StatSection />
        </div>
      </div>

      {/* Product Categories */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
            <div>
              <p className="section-label mb-3">Product Range</p>
              <h2 className="font-heading text-3xl text-charcoal">Two core product divisions</h2>
            </div>
            <Link to="/products" className="cta-link mt-4 md:mt-0">
              View all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductCategoryCard
              title="Thermoplastic Semi-Finished Products"
              description="Rods, tubes, sheets, blocks, welding rods, and coils in all standard and engineering-grade thermoplastics across our POLYRIB, PCCLEAR, KAYLON, and PAKETAL brand families."
              href="/products/thermoplastics-semi-finished-products"
              image={semiFinishedImage}
              tag="Semi-Finished"
            />
            <ProductCategoryCard
              title="Thermoplastic Machine Components"
              description="Strips & profiles, vacuum formed parts, RIPLA cutting boards, CUTRITE chopping boards, fascia pads, and precision machined thermoplastic components."
              href="/products/thermoplastics-machine-components"
              image={machineComponentsImage}
              tag="Machine Components"
            />
          </div>
        </div>
      </section>

      {/* Polyrib Advantage — dark banner */}
      <PolyribAdvantageSection />

      {/* Polymers We Work With */}
      <PolymersSection />

      {/* Brand Portfolio */}
      <MaterialsSection />

      {/* About + How We Work */}
      <AboutSection />

      {/* What We Manufacture */}
      <WhatWeManufactureSection />

      {/* Industries */}
      <IndustriesSection />

      {/* Why Polyrib */}
      <WhyUsSection />

      {/* Infrastructure */}
      <InfrastructureSection />

      {/* Polyrib Promise */}
      <PolyribPromiseSection />

      {/* CTA Banner */}
      <section className="bg-primary py-16">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <p className="text-primary-foreground/60 text-sm tracking-widest uppercase font-semibold mb-3">
            Looking for a Reliable Polymer Manufacturer?
          </p>
          <h2 className="font-heading text-3xl text-primary-foreground mb-4">
            Partner with Polyrib for long-term performance
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Precision-engineered plastic sheets and components that deliver long-term performance in demanding applications. Our engineering team responds within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3 bg-primary-foreground text-primary text-sm font-bold hover:bg-surface-subtle transition-colors duration-200">
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-primary-foreground text-sm font-semibold hover:bg-white/10 transition-colors duration-200">
              <Send className="w-4 h-4" /> Send Your Drawing
            </Link>
            <Link to="/tools/material-selector" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-primary-foreground/80 text-sm font-semibold hover:bg-white/10 transition-colors duration-200">
              Use Material Selector
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
