import { useState , useEffect} from "react";
import { Link, useParams} from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useScrollFade } from "@/hooks/useScrollFade";

const MATERIAL_FAMILIES = [
  {
    brand: "POLYRIB V",
    base: "PE / UHMW PE",
    slug: "polyrib-v",
    colour: "bg-blue-50 text-blue-700 border-blue-200",
    tagline: "Ultra-High Molecular Weight Polyethylene",
    desc: "Self-lubricating, exceptional abrasion resistance, high impact strength. Widely used in conveyor liners, wear strips, and food processing equipment.",
    grades: ["POLYRIB-V005", "POLYRIB-L-V", "POLYRIB-V030", "POLYRIB-V SUPERSLIDE", "POLYRIB-V-AS (Antistatic)", "POLYRIB-V-FR (Flame Retardant)", "POLYRIB-V FG (Food Grade)", "POLYRIB-C"],
    industries: ["Food & Beverage", "Mining", "Material Handling", "Medical", "Pulp & Paper", "Automotive"],
    keyProps: ["Outstanding abrasion resistance", "Self-lubricating surface", "FDA food-grade grades", "Antistatic and FR grades", "Cryogenic service (−200°C)", "High impact strength"],
    maxTemp: "+80°C", minTemp: "−200°C",
  },
  {
    brand: "POLYRIB H",
    base: "HDPE",
    slug: "polyrib-h",
    colour: "bg-green-50 text-green-700 border-green-200",
    tagline: "High-Density Polyethylene",
    desc: "Tough, corrosion-resistant HDPE sheets for chemical tanks, crate partitions, and structural applications. Available in standard and glass-lined grades.",
    grades: ["POLYRIB-H EXT", "POLYRIB-H CED", "POLYRIB-H 452 (Thermoforming)", "POLYRIB-H 92", "POLYRIB-HGX-266-EXT (Glass Lined)", "POLYRIB-ARETE L-H", "POLYRIB-HXM-001 EXT (PE100)", "POLYRIB-H-PLAY EMB UV", "POLYRIB CUTRITE EMB", "POLYRIB- LD (LDPE)", "POLYRIB-H WR (Welding Rod)"],
    industries: ["Aerospace", "Agriculture", "Automotive", "Chemical", "Food & Beverage", "Marine", "Signage", "Mining"],
    keyProps: ["Chemical and corrosion resistance", "Excellent toughness", "UV-stabilised grades", "Glass-lined (FRP tank) grades", "PE100 ESCR grades", "Thermoforming grades"],
    maxTemp: "+80°C", minTemp: "−50°C",
  },
  {
    brand: "POLYRIB P / DIPRA",
    base: "PP",
    slug: "polyrib-p",
    colour: "bg-orange-50 text-orange-700 border-orange-200",
    tagline: "Polypropylene",
    desc: "High-impact and chemical-resistant PP sheets for acid/chemical tanks, galvanising, anodising, and food processing. Includes UV-stabilised DIPRA speciality grades.",
    grades: ["POLYRIB PPX-258 (Chemical tanks)", "POLYRIB PPX-259 (High impact)", "POLYRIB PGX-266 (PP/FRP glass-backed)", "POLYRIB PGX-226", "POLYRIB HITECH", "POLYRIB HITECH GL", "POLYRIB RIPLA HIH", "POLYRIB RIPLA HIK", "POLYRIB RIPLA HITECH", "POLYRIB-P-HIH CED", "POLYRIB-PPC-CED", "POLYRIB PP AS (Antistatic)", "DIPRA AD CLEAR", "DIPRA EMBOSSED GATE LINER", "DIPRA PPGL UVIOFAST ROOF LINER", "POLYRIB PP UV", "POLYRIB PP DUAL", "POLYRIB PP TF"],
    industries: ["Chemical", "Agriculture", "Food & Beverage", "Automotive", "Signage", "Mining", "Material Handling"],
    keyProps: ["Excellent acid/alkali resistance", "High impact grades", "Glass-backed FRP tank grades", "UV-stabilised outdoor grades", "Antistatic PP", "Low density / lightweight"],
    maxTemp: "+100°C", minTemp: "−10°C",
  },
  {
    brand: "PCCLEAR",
    base: "PC",
    slug: "pcclear",
    colour: "bg-sky-50 text-sky-700 border-sky-200",
    tagline: "Polycarbonate",
    desc: "High-clarity PC sheets with outstanding impact strength. Available in transparent, embossed, shaded, and opal variants — with and without UV stabilisation.",
    grades: ["PCCLEAR LIGHT (Transparent, no UV)", "PCCLEAR UV LIGHT (Transparent + UV)", "PCCLEAR GLAZE (Embossed, no UV)", "PCCLEAR GLAZE UV (Embossed + UV)", "PCCLEAR GLAZE DIAMOND (Diamond embossed)", "PCCLEAR SHADE (Tinted)", "PCCLEAR OPAL (Opaque)", "PCCLEAR BASE PLATE", "PCCLEAR RIB", "PCCLEAR LOUVERS"],
    industries: ["Aerospace", "Agriculture", "Build & Construction", "Food & Beverage", "Marine", "Medical", "Signage", "Heavy Equipment"],
    keyProps: ["250× stronger than glass", "UV-stabilised grades", "High optical clarity", "Impact and shatter resistant", "Embossed and shaped variants", "Roofing and glazing applications"],
    maxTemp: "+120°C", minTemp: "−40°C",
  },
  {
    brand: "KAYLON",
    base: "Cast Nylon (PA6)",
    slug: "kaylon",
    colour: "bg-purple-50 text-purple-700 border-purple-200",
    tagline: "Cast Nylon / Polyamide 6",
    desc: "Oil-filled, MoS₂-filled, and heat-stabilised cast nylon for gears, bearings, wear pads, and structural components. Superior wear resistance and mechanical strength.",
    grades: ["KAYLON NATURAL", "KAYLON OILON (Oil-filled, improved PV)", "KAYLON HS BLUE (Heat & UV stabilised)", "KAYLON MOLY (MoS₂ filled, low CoF)", "KAYLON BLACK (Heat stabilised)"],
    industries: ["Automotive", "Food & Beverage", "Heavy Equipment", "Marine"],
    keyProps: ["Excellent wear resistance", "Oil-impregnated grades", "MoS₂ low-friction grades", "Heat-stabilised grades", "For gears, bearings, pads", "High mechanical strength"],
    maxTemp: "+120°C", minTemp: "−40°C",
  },
  {
    brand: "PAKETAL",
    base: "Acetal / POM",
    slug: "paketal",
    colour: "bg-red-50 text-red-700 border-red-200",
    tagline: "Acetal / Polyoxymethylene (Delrin equivalent)",
    desc: "Precision machinability, excellent dimensional stability and low friction. The industry-standard choice for precision gears, cams, bearings and food-contact components.",
    grades: ["PAKETAL NATURAL (White)", "PAKETAL BLACK"],
    industries: ["Automotive", "Food & Beverage", "Heavy Equipment"],
    keyProps: ["Best machinability of all thermoplastics", "Excellent dimensional stability", "Low friction, self-lubricating", "Stiff and strong", "FDA grades available", "Good resistance to fuels and solvents"],
    maxTemp: "+100°C", minTemp: "−40°C",
  },
  {
    brand: "POLYRIB A",
    base: "ABS / ASA",
    slug: "polyrib-a",
    colour: "bg-yellow-50 text-yellow-700 border-yellow-200",
    tagline: "ABS & ASA Sheets",
    desc: "Automotive-grade ABS and ASA sheets for interior and exterior trim, display systems, and rapid prototyping. Available embossed, dual-colour, fire-retardant, and UV-stabilised.",
    grades: ["KBK ABS EMBOSSED GLOSSY", "KBK ABS EMBOSSED MATT", "KBK ABS/ASA EMBOSSED & PLAIN", "KBK ABS ACRYLIC EMBOSSED & PLAIN", "KBK ASA SHEETS", "KBK ABS DUAL (Co-extruded)", "KBK ABS FR UV (Fire Retardant)", "KBK A WR3D (3D printer filament)", "KBK A CED (Thick, rapid prototyping)"],
    industries: ["Automotive", "Signage", "Display & POP"],
    keyProps: ["Excellent surface finish", "UV-stabilised ASA for outdoors", "Dual-colour co-extruded", "Fire retardant grade", "3D printing filament grade", "Scratch and impact resistant"],
    maxTemp: "+80°C", minTemp: "−20°C",
  },
  {
    brand: "PLASCON / PLASCON-V",
    base: "PE / UHMW PE Engineering Grades",
    slug: "plascon",
    colour: "bg-teal-50 text-teal-700 border-teal-200",
    tagline: "Engineering PE / Machine Component Grades",
    desc: "Stress-relieved UHMW PE and engineering PP grades designed specifically for CNC machining into precision machine components, sliders, and structural parts.",
    grades: ["PLASCON-V (Stress-relieved UHMW PE)", "PLASCON-V PIGMENTED (Lubricant-added)", "PLASCON GB ORANGE", "PLASCON MOS2 GREY", "PLASCON-HI-TECH CERA", "PLASCON-RIDER BLACK", "PLASCON-RIDER GLIDE BLACK", "PLASCON KATROS BLACK", "PLASCON M"],
    industries: ["Automotive", "Food & Beverage", "Heavy Equipment"],
    keyProps: ["Stress-relieved for machining", "Reduced warping post-machining", "Improved sliding properties", "Lubricant-filled grades", "Best dimensional stability", "Machine component focussed"],
    maxTemp: "+80°C", minTemp: "−200°C",
  },
  {
    brand: "DIPRA",
    base: "PP Speciality",
    slug: "dipra",
    colour: "bg-emerald-50 text-emerald-700 border-emerald-200",
    tagline: "UV-Stabilised Speciality PP Sheets",
    desc: "Premium UV-stabilised PP sheets for outdoor, roofing, vacuum forming, and gate liner applications. Includes embossed, cloth-lined, and dual-coloured variants.",
    grades: ["DIPRA AD CLEAR", "DIPRA EMBOSSED GATE LINER", "DIPRA PPGL UVIOFAST ROOF LINER", "POLYRIB PP EMBOSSED", "POLYRIB PP DUAL", "POLYRIB PP UV", "POLYRIB PP TF (Talc-filled)"],
    industries: ["Agriculture", "Build & Construction", "Automotive (under hood)", "Signage"],
    keyProps: ["UV-stabilised outdoor grades", "Cloth-lined roofing liner", "Embossed vacuum forming", "Talc-filled for stiffness", "Dual-colour co-extruded", "Gate and door liner applications"],
    maxTemp: "+100°C", minTemp: "−10°C",
  },
];

export default function MaterialsPage() {
  const { slug } = useParams();
const [selected, setSelected] = useState<string | null>(null);

useEffect(() => {
  setSelected(slug ?? null);
}, [slug]);
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  const mat = selected ? MATERIAL_FAMILIES.find((m) => m.slug === selected) : null;

  return (
    <div className="pt-16">
      <div className="bg-surface-subtle border-b border-divider py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
            <Link to="/" className="hover:text-primary">Home</Link><span>/</span>
            <span className="text-charcoal">Materials</span>
          </nav>
          <p className="section-label mb-3">Thermoplastic Brands</p>
          <h1 className="font-heading text-4xl text-charcoal mb-3">Our Material Families</h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Polyrib manufactures a comprehensive range of thermoplastics under proprietary brand families. Click any brand to explore its grades, properties, and applications.
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-12">
        {/* Brand grid */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {MATERIAL_FAMILIES.map((m) => (
            <button
              key={m.slug}
              onClick={() =>
                setSelected(selected === m.slug ? null : m.slug)
              }
              className={`text-left p-5 border-2 transition-all duration-200 ${selected === m.slug ? "border-primary bg-primary/5 shadow-card" : "border-border bg-card hover:border-primary/40"}`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`text-[10px] px-2.5 py-1 font-bold border ${m.colour}`}>{m.base}</span>
                <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${selected === m.slug ? "rotate-90 text-primary" : "text-muted-foreground"}`} />
              </div>
              <h3 className="font-heading font-bold text-charcoal text-lg mb-1">{m.brand}</h3>
              <p className="text-xs text-primary font-semibold mb-2">{m.tagline}</p>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{m.desc}</p>
            </button>
          ))}
        </div>

        {/* Expanded detail */}
        {mat && (
          <div className="border border-primary/20 bg-primary/3 p-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <h2 className="font-heading text-2xl text-charcoal">{mat.brand}</h2>
                  <span className={`text-xs px-2.5 py-1 border font-bold ${mat.colour}`}>{mat.base}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{mat.desc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Grades Available</p>
                    <div className="space-y-1.5">
                      {mat.grades.map((g) => (
                        <div key={g} className="flex items-center gap-2 text-xs text-charcoal-light">
                          <div className="w-1.5 h-1.5 bg-primary shrink-0" />
                          {g}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Key Properties</p>
                    <div className="space-y-1.5">
                      {mat.keyProps.map((p) => (
                        <div key={p} className="flex items-center gap-2 text-xs text-charcoal-light">
                          <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-card border border-border p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Temperature Range</p>
                  <div className="flex gap-6">
                    <div><div className="font-mono font-bold text-primary">{mat.minTemp}</div><div className="text-xs text-muted-foreground">Min Service</div></div>
                    <div><div className="font-mono font-bold text-primary">{mat.maxTemp}</div><div className="text-xs text-muted-foreground">Max Service</div></div>
                  </div>
                </div>
                <div className="bg-card border border-border p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Industries</p>
                  <div className="flex flex-wrap gap-1.5">
                    {mat.industries.map((ind) => (
                      <span key={ind} className="text-[10px] px-2 py-0.5 bg-surface-subtle border border-divider text-charcoal-light">{ind}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-dark transition-colors duration-200">
                    Request Quote for {mat.brand} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link to="/resources" className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-border text-xs font-semibold text-charcoal-light hover:border-primary hover:text-primary transition-colors duration-200">
                    Download Datasheet
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 border border-border p-6 flex flex-col md:flex-row items-center justify-between gap-5 bg-surface-subtle">
          <div>
            <h3 className="font-heading font-semibold text-charcoal mb-1">Not sure which grade to specify?</h3>
            <p className="text-sm text-muted-foreground">Use our Material Selector tool or speak to our technical team.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/tools/material-selector" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200">
              Material Selector <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-charcoal-light text-sm font-semibold hover:border-primary hover:text-primary transition-colors duration-200">
              Technical Enquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
