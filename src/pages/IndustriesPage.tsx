import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import automotiveImage from "@/assets/industry-automotive.jpg";
import pharmaImage from "@/assets/industry-pharma.jpg";
import foodImage from "@/assets/industry-food.jpg";
import { useScrollFade } from "@/hooks/useScrollFade";

const FEATURED_INDUSTRIES = [
  {
    slug: "automotive",
    title: "Automotive",
    subtitle: "Body-in-white, assembly, under-hood, interiors, and logistics systems",
    image: automotiveImage,
    stats: [{ v: "KAYLON", l: "Gears & Bearings" }, { v: "POLYRIB V", l: "Conveyor Liners" }, { v: "PAKETAL", l: "Precision Parts" }],
  },
  {
    slug: "food-beverage",
    title: "Food & Beverage",
    subtitle: "Conveyor, filling, packaging, cutting boards, and hygienic processing lines",
    image: foodImage,
    stats: [{ v: "FDA", l: "21 CFR Compliant" }, { v: "POLYRIB-V FG", l: "Food Grade PE" }, { v: "CUTRITE", l: "HACCP Boards" }],
  },
  {
    slug: "pharmaceutical",
    title: "Medical & Pharmaceutical",
    subtitle: "Cleanroom, processing, fill & finish, and medical device applications",
    image: pharmaImage,
    stats: [{ v: "POLYRIB-V FG", l: "FDA Compliant" }, { v: "PAKETAL", l: "Precision Parts" }, { v: "PCCLEAR", l: "Enclosures" }],
  },
  {
    slug: "mining",
    title: "Mining",
    subtitle: "Wear liners, chute linings, conveyor components and FRP composites",
    image: automotiveImage,
    stats: [{ v: "POLYRIB V", l: "Chute Liners" }, { v: "POLYRIB-V-FR", l: "FR Underground" }, { v: "ARETE", l: "FRP Composites" }],
  },
  {
    slug: "chemical",
    title: "Chemical",
    subtitle: "PP and HDPE chemical tanks, linings, ductwork and fabricated equipment",
    image: pharmaImage,
    stats: [{ v: "POLYRIB P", l: "Chemical Tanks" }, { v: "POLYRIB H", l: "HDPE Linings" }, { v: "DIPRA", l: "Gate Liners" }],
  },
  {
    slug: "oil-gas",
    title: "Oil & Gas",
    subtitle: "Chemical-resistant thermoplastics for offshore and process plant applications",
    image: foodImage,
    stats: [{ v: "POLYRIB-V-AS", l: "ATEX Rated" }, { v: "KAYLON OILON", l: "Pump Bearings" }, { v: "PAKETAL", l: "Valve Parts" }],
  },
  {
    slug: "marine",
    title: "Marine",
    subtitle: "UV-stabilised, corrosion-proof HDPE and UHMW PE for marine environments",
    image: automotiveImage,
    stats: [{ v: "POLYRIB-H EXT", l: "Marine HDPE" }, { v: "POLYRIB V", l: "Dock Wear Plates" }, { v: "POLYRIB H", l: "Pontoon Decking" }],
  },
];

const ALL_INDUSTRIES = [
  "Aerospace", "Agro Processing", "Automotive", "Build & Construction",
  "Chemical", "Cement", "Food & Beverage", "Heavy Equipment",
  "Iron & Steel", "Leather", "Marine", "Material Handling",
  "Medical", "Mining", "Oil & Gas", "Packaging",
  "Pulp & Paper", "Signage", "Sports & Recreation", "Transportation",
  "Water & Waste Water",
];

export default function IndustriesPage() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;

  return (
    <div className="pt-16">
      <div className="bg-surface-subtle border-b border-divider py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
            <Link to="/" className="hover:text-primary">Home</Link><span>/</span>
            <span className="text-charcoal">Industries</span>
          </nav>
          <p className="section-label mb-3">Market Sectors</p>
          <h1 className="font-heading text-4xl text-charcoal mb-3">Industries We Serve</h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Polyrib thermoplastic materials are trusted across 20+ industries worldwide — from food processing and automotive to mining, oil & gas, and medical device manufacturing.
          </p>
        </div>
      </div>

      <section ref={ref} className="fade-up py-16">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="space-y-6">
            {FEATURED_INDUSTRIES.map((ind) => (
              <Link key={ind.slug} to={`/industries/${ind.slug}`} className="category-card flex flex-col md:flex-row overflow-hidden group">
                <div className="card-image md:w-80 aspect-video md:aspect-auto shrink-0 overflow-hidden">
                  <img src={ind.image} alt={ind.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1 p-8">
                  <h2 className="font-heading text-2xl text-charcoal mb-2 group-hover:text-primary transition-colors duration-200">{ind.title}</h2>
                  <p className="text-muted-foreground text-sm mb-6">{ind.subtitle}</p>
                  <div className="flex gap-6 mb-6">
                    {ind.stats.map((s) => (
                      <div key={s.l}>
                        <div className="font-heading font-bold text-primary text-lg">{s.v}</div>
                        <div className="text-xs text-muted-foreground">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 cta-link">
                    Explore {ind.title} Solutions <ArrowRight className="w-4 h-4 explore-arrow" />
                  </div>
                  <div className="card-border-bottom mt-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full industry list */}
      <section className="py-12 bg-surface-subtle border-t border-divider">
        <div className="container max-w-7xl mx-auto px-6">
          <p className="section-label mb-4">All Sectors</p>
          <h2 className="font-heading text-2xl text-charcoal mb-6">Our full industry coverage</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {ALL_INDUSTRIES.map((ind) => (
              <div key={ind} className="flex items-center gap-2 p-3 border border-border bg-card text-sm text-charcoal-light hover:border-primary hover:text-primary transition-all duration-200 cursor-default">
                <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
                {ind}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-5">
            Specific product recommendations available for each sector. <Link to="/contact" className="text-primary hover:underline">Contact our technical team</Link> for application guidance.
          </p>
        </div>
      </section>
    </div>
  );
}

import React from "react";
