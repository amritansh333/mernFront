import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ChevronRight, Shield, Award, Zap, Globe,
  Factory, Layers, Ruler, BadgeCheck, HeadphonesIcon,
  CheckCircle2, Cpu, Wrench, FlaskConical, Cog, LayoutGrid,
  Send, TrendingUp, Lightbulb, PackageCheck, X
} from "lucide-react";
import { useScrollFade } from "@/hooks/useScrollFade";
import heroVideo from "@/assets/hero-landingpage.mp4";
import semiFinishedImage from "@/assets/semi-finished-products.jpeg";
import machineComponentsImage from "@/assets/machine-components.jpeg";
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

import certImg from "@/assets/isoCertificate2015.jpg";


/* ─── Data ─────────────────────────────────────────────── */


const stats = [
  { value: "40+",     label: "Years of Manufacturing" },
  { value: "500+",    label: "Product Grades" },
  { value: "20+",     label: "Industries Served" },
  { value: "ISO 9001",label: "Certified" },
];

const allIndustries = [

  { abbr : "Aerospace" , slug : "aerospace" },
  { abbr : "Agro Processing" , slug : "agro-processing" },
  { abbr : "Automotive" , slug : "automotive" },
  { abbr : "Build & Construction" , slug : "build-construction" },
  { abbr : "Cement" , slug : "cement" },
  { abbr : "Chemical" , slug : "chemical" },
  { abbr : "Food & Beverage" , slug : "food-beverage" },
  { abbr : "Heavy Equipment" , slug : "heavy-equipment" },
  { abbr : "Iron & Steel" , slug : "iron-steel" },
  { abbr : "Leather" , slug : "leather" },
  { abbr : "Marine" , slug : "marine" },
  { abbr : "Material Handling" , slug : "material-handling" },
  { abbr : "Medical" , slug : "medical" },
  { abbr : "Mining" , slug : "mining" },
  { abbr : "Oil & Gas" , slug : "oil-gas" },
  { abbr : "Packaging" , slug : "packaging" },
  { abbr : "Pulp & Paper" , slug : "pulp-paper" },
  { abbr : "Signage" , slug : "signage" },
  { abbr : "Sports & Recreation" , slug : "sports-recreation" },
  { abbr : "Transportaion" , slug : "transportation" },
  { abbr : "Water & Waste Water" , slug : "water-waste-water" },

];

const brandFamilies = [
  { abbr: "POLYRIB-V",  slug:"polyrib-v",     name: "UHMW Polyethylene",          prop: "Abrasion resistance, low friction, high impact" ,  image: polyribV,},
  { abbr: "POLYRIB-P",slug:"polyrib-p", name: "Polypropylene (PP)",       prop: "Chemical tanks, acid resistance, low density"  ,  image: polyribP,},
  { abbr: "POLYRIB-H",  slug:"polyrib-h",     name: "High-Density Polyethylene",  prop: "Chemical resistance, toughness, outdoor use" ,  image: polyribH,},
  { abbr: "HITECH",  slug:"hitech",     name: "High-Density Polyethylene",  prop: "Chemical resistance, toughness, outdoor use" ,  image: hitech,},
  { abbr: "PCCLEAR",     slug:"pcclear",    name: "Engineering Grades (PC)", prop: "Machine components, sliding surfaces"  ,  image: pcclear,},
  { abbr: "CUTRITE",      slug:"cutrite",   name: "LDPE",           prop: "Wear resistance, structural strength, bearings"  ,  image: cutrite,},
  { abbr: "DIPRA",   slug:"dipra",    name: "Polypropylene (PP)",                  prop: "Automotive interiors, UV resistance, surface finish"  ,  image: dipra,},
  { abbr: "ARETE",     slug:"arete",    name: "UHMW Polyethylene",         prop: "Transparency, impact strength, UV stability" ,  image: arete, },
  { abbr: "RIPLA",     slug:"ripla",    name: "UHMW Polyethylene",         prop: "Transparency, impact strength, UV stability" ,  image: ripla, },
  { abbr: "POLYLIMB",     slug:"polylimb",   name: "Polypropylene (PP)",      prop: "Precision machining, dimensional stability"  ,  image: polylimb,},
  { abbr: "KAYLON",     slug:"pakaylon",   name: "Polypropylene (PP)",      prop: "Precision machining, dimensional stability"  ,  image: kaylon,},
  { abbr: "PLASCON-V",     slug:"plascon-v",   name: "Polypropylene (PP)",      prop: "Precision machining, dimensional stability"  ,  image: plasconV,},


];

const trustPoints = [
  { icon: Shield,  label: "ISO 9001 Certified" },
  { icon: Award,   label: "40+ Years Manufacturing" },
  { icon: Zap,     label: "Fast Delivery" },
  { icon: Globe,   label: "Export to 50+ Countries" },
];

const polymers = [
  { slug: "pp",  abbr: "PP",       name: "Polypropylene",           prop: "Lightweight, chemical-resistant, cost-effective" },
  { slug: "hdpe", abbr:"HDPE"  ,    name: "High-Density Polyethylene",prop: "Tough, impact-resistant, moisture-proof" },
  { slug: "uhmwpe", abbr: "UHMWPE",     name: "Ultra-High MW Polyethylene",prop: "Extreme wear resistance, ultra-low friction" },
  { slug: "abs", abbr:"ABS"   ,    name: "Acrylonitrile Butadiene Styrene", prop: "Strong, dimensionally stable, easy to machine" },
  { slug: "pc",   abbr:"PC"   ,   name: "Polycarbonate",           prop: "High impact strength, thermal stability" },
  { slug: "pa6", abbr:"NYLON" , name: "Polyamide 6",             prop: "High impact resistance, self-lubricating, good chemical resistance" },
  { slug: "acetal",   abbr:"ACETAL"  ,   name: "Acetal / Delrin",         prop: "High strength, rigidity, stability" },
  { slug: "hips",  abbr:"HIPS"  ,   name: "High-Impact Polystyrene", prop: "Versatile, lightweight, cost-effective" },
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
  { icon: Layers,         title: "Three Companies, One Group",         desc: "Khanna Group, comprising Khanna Polyrib Pvt. Ltd., KBK Plascon Pvt. Ltd., and KBK Polymer Pvt. Ltd., has been at the forefront of polymer manufacturing for over four decades." },
  { icon: Factory,        title: "Our Locations",        desc: "With state-of-the-art manufacturing facilities in Uttar Pradesh and distribution centres in Delhi, Bhiwandi, and Ahmedabad, we ensure consistent quality and efficient nationwide supply." },
  { icon: Ruler,          title: "Our Mission & Values",         desc: "To design superior performance polymer materials, and to have Khanna Polyrib establish standards in the quality." },
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
  "Pioneering in Engineering Excellence",
  "Application-driven material selection",
  "Consistent quality with tight tolerances",
  "Custom and batch manufacturing capability",
  "Reliable delivery and technical support",
];

const promise = [
  { icon: TrendingUp,  title: "Rise to Challenges",      desc: "We rise to challenges and deliver beyond customer expectations, every time." },
  { icon: Lightbulb,  title: "Innovate with Technology", desc: "Innovate as per latest technology with world-class infrastructure facilities." },
  { icon: PackageCheck,title: "Build for the World",     desc: "Build products in India for the world — reliable, precise, globally competitive." },
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

/* Why Polyrib */
function WhyUsSection() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="fade-up py-8 bg-surface-subtle border-y border-divider overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
            <div>
              
              <h2 className="font-heading text-3xl text-charcoal">One-Stop Polymer Engineering Solutions</h2>
            </div>
            <Link to="/about" className="cta-link mt-4 md:mt-0">
              About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-divider overflow-hidden">
          {/* Facility photo */}
<div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-0 overflow-hidden">
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
  
  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-black/10 ">
    
    <p className="text-white/60 text-sm tracking-widest uppercase font-semibold mb-3">
      Established 1985
    </p>
    <div className="space-y-2">
      {whyChecks.map((c, i) => (
        <div key={i} className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary-light shrink-0" />
          <span className="text-white/80 text-sm sm:text-sm font-medium leading-snug">{c}</span>
        </div>
      ))}
    </div>
  </div>
</div>
          {/* Advantage points grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-divider">
            {whyPoints.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card p-4 flex flex-col gap-1 hover:bg-surface-subtle transition-colors duration-200">
                <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-charcoal text-lg mb-0">{title}</h4>
                  <p className="text-sm text-muted-foreground ">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCategoryCard({ title, description, href, image, tag }: {
  title: string; description: string; href: string; image: string; tag: string;
}) {
  return (
    <Link to={href} className="category-card block group">
      <div className="card-image aspect-[2/1] overflow-hidden bg-surface-subtle">
        <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-4">
        <span className="section-label text-xs block mb-2">{tag}</span>
        <h3 className="font-heading text-xl text-charcoal mb-2 group-hover:text-primary transition-colors duration-200">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{description}</p>
        <div className="cta-link pt-2 border-t border-divider">
          Explore Range
          <ArrowRight className="w-4 h-4 explore-arrow" />
        </div>
        <div className="card-border-bottom mt-1" />
      </div>
    </Link>
  );
}




/* Materials Section (Brand Portfolio) */
function MaterialsSection() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;

  return (
    <section
      ref={ref}
      className="fade-up py-8 bg-surface-subtle border-y border-divider "
    >
      <div className="container max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="font-heading text-3xl text-charcoal ">
            Our Brands
          </h2>

          <Link to="/products" className="cta-link mt-3 md:mt-0">
            Explore Brands <ArrowRight className="w-4 h-4 inline ml-1" />
            
          </Link>
        </div>

        {/* Grid */}
        <div className=" grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-6">
          {brandFamilies.map((m) => (
            <Link
              key={m.abbr}
              to={`/products/thermoplastics-semi-finished-products/sheets-blocks/${m.slug}`}
              className="category-card block group border border-border  overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="w-full h-40 overflow-hidden">
                <img
                  src={m.image} // <-- add image field in your data
                  alt={m.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
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
          ))}
        </div>
      </div>
    </section>
  );
}


/* Polymers We Work With */
function PolymersSection() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="fade-up py-8 border-b border-divider">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
          <div className="flex flex-col gap-6">
  
  {/* Heading */}
  <div>
    <h2 className="font-heading text-3xl text-charcoal mb-4">
      The Polymers We Work With
    </h2>

    <Link to="/materials" className="cta-link">
      View all Material families <ArrowRight className="w-4 h-4" />
    </Link>
  </div>

  <div className="w-full">
    <img
      src={polymerImg}  
      alt="Polymers"
      className="w-full h-[180px] sm:h-[220px] lg:h-[260px] object-cover bg-card border border-border p-4 hover:border-primary/40 transition-colors duration-200 block group overflow-hidden hover:shadow-lg transition-all duration-300"
    />
  </div>

</div>
          <div className="  lg:col-span-2 grid grid-cols-1 sm:grid-cols-2  gap-3 ">
            {polymers.map((m) => (
              <Link key={m.abbr} to={`/materials/${m.slug}`} className="bg-card border border-border p-4 hover:border-primary/40 transition-colors duration-200 block group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-3 ">
                  <span className="font-heading font-bold text-primary text-lg w-28 shrink-0 group-hover:text-primary-dark transition-colors">{m.abbr}</span>
                  <div>
                    <div className="text-sm text-charcoal font-medium mb-0.5 group-hover:text-primary">{m.name}</div>
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





/* Industries */
function IndustriesSection() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="fade-up py-8 bg-surface-subtle border-y border-divider">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          
          <h2 className="font-heading text-3xl text-charcoal">Industries We Serve</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {allIndustries.map((ind) => (
            <Link
              key={ind.abbr}
              to={`/industries/${ind.slug}`}
              className="flex items-center gap-2 px-4 py-2.5 border border-border bg-card hover:border-primary hover:text-primary text-sm font-medium text-charcoal-light transition-all duration-200"
            >
              <ChevronRight className="w-3.5 h-3.5 text-primary" />
              {ind.abbr}
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



/* Infrastructure */
function InfrastructureSection() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="fade-up py-8 border-b border-divider">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
  <h2 className="font-heading text-3xl text-charcoal">
    Infrastructure Built for Scale
  </h2>

  <p className="text-muted-foreground text-sm mt-3 max-w-xl mx-auto">
    From extrusion to precision CNC machining —{" "}
    <span className="font-semibold text-base text-primary">
      Fully equipped to deliver any polymer component at any volume.
    </span>
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
              <div className="text-sm text-muted-foreground">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

{/* COMPLIANCE */}
function CertificationSection() {
  const ref = useScrollFade();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* SECTION */}
      <section ref={ref} className="fade-up py-8 bg-surface-subtle border-b border divider">
  <div className="container max-w-7xl mx-auto px-6">
    
    {/* Heading */}
    <div className="text-center mb-8">
      <h2 className="font-heading text-3xl text-charcoal">Certifications & Standards</h2>
      <p className="text-muted-foreground text-sm mt-3 max-w-xl mx-auto">
        Khanna Polyrib Pvt. Ltd. holds
        <span className="font-semibold text-base text-primary"> ISO 9001:2015 Certification
    </span> — demonstrating commitment to consistent quality management, process control, and customer satisfaction across all product lines.
      </p>
    </div>

    {/*  YOUR BUTTON / BOX (UNCHANGED) */}
    <div className="flex justify-center">
      <div
        onClick={() => setOpen(true)}
        className="border border-border bg-card p-4 text-center hover:border-primary/40 transition-colors duration-200 cursor-pointer w-full max-w-[250px] overflow-hidden hover:shadow-lg transition-all duration-300"
      >
        <div className="w-8 h-8 bg-primary/10 flex items-center justify-center mx-auto mb-2">
          <Award className="w-4 h-4 text-primary" />
        </div>
        <div className="text-sm font-semibold text-charcoal">
          ISO 9001:2015 Certified
        </div>
      </div>
    </div>

  </div>
</section>

      {/*  MODAL OUTSIDE SECTION */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          
          {/* FULL PAGE BLUR */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* MODAL CONTENT */}
          <div className="relative z-[10000] flex justify-center items-center w-full h-full px-4">
            
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
            >
              <X className="w-5 h-5 text-black" />
            </button>

            {/* IMAGE */}
            <img
              src={certImg}
              alt="certificate"
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
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="fade-up py-8 border-b border-divider">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          
          <h2 className="font-heading text-3xl text-charcoal">The Polyrib Promise</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promise.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card border border-border p-8 text-center hover:border-primary/40 transition-colors duration-200 group overflow-hidden hover:shadow-lg transition-all duration-300 ">
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
            
            
            <h1 className="font-normal text-3xl sm:text-4xl lg:text-4xl text-white leading-tight mb-6 animate-fade-in">
            <span className="block pt-12 sm:pt-8">
              Best Engineering
            </span>

            <span className="block">
              Thermoplastics Solutions
            </span>

            <span className="block text-primary-light">
              Built For Performance
            </span>

            </h1>
            
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
  
  <Link
    to="/products"
    className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm bg-primary text-primary-foreground font-normal hover:bg-primary-light transition-colors duration-200"
  >
    Explore Products <ArrowRight className="w-3.5 h-3.5" />
  </Link>

  <Link
    to="/contact"
    className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm bg-white/10 border border-white/30 text-white font-normal hover:bg-white/20 transition-colors duration-200"
  >
    <Send className="w-3.5 h-3.5" /> Send Your Drawing
  </Link>

  <Link
    to="/tools/material-selector"
    className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm border border-white/20 text-white/80 font-normal hover:bg-white/10 transition-colors duration-200"
  >
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

      {/* Why Polyrib */}
      <WhyUsSection />

      {/* Product Categories */}
      <section className="py-8">
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
              description="Rods, tubes, sheets, blocks, welding rods, and coils in all standard and engineering-grade thermoplastics across our POLYRIB, PCCLEAR, and KAYLON brand families."
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
      <section className="bg-primary py-8">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          
          <h2 className="font-heading text-3xl text-primary-foreground mb-4">
            Upgrade to smarter thermoplastics. Partner with Polyrib
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Precision-engineered plastic sheets and components that deliver long-term performance in demanding applications. Our engineering team responds within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3 bg-primary-foreground text-primary text-sm font-bold hover:bg-surface-subtle transition-colors duration-200">
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
