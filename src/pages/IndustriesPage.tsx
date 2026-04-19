import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";

import aerospaceImage from "@/assets/aerospace.jpeg";
import agroProcessingImage from "@/assets/agro-processing.jpeg";
import automotiveImage from "@/assets/automotive.jpeg";
import buildConsImage from "@/assets/mining.jpeg";
import cementImage from "@/assets/cement.jpeg";
import chemicalImage from "@/assets/mining.jpeg";
import foodBevImage from "@/assets/food-bev.jpeg";
import heavyEquipImage from "@/assets/mining.jpeg";
import ironSteelImage from "@/assets/mining.jpeg";
import leatherImage from "@/assets/mining.jpeg";
import marineImage from "@/assets/mining.jpeg";
import materialHandlingImage from "@/assets/mining.jpeg";
import medicalImage from "@/assets/mining.jpeg";
import miningImage from "@/assets/mining.jpeg";
import oilGasImage from "@/assets/oil-gas.jpeg";
import packagingImage from "@/assets/mining.jpeg";
import pulpPaperImage from "@/assets/mining.jpeg";
import signageImage from "@/assets/mining.jpeg";
import sportsRecreationImage from "@/assets/mining.jpeg";
import transportationImage from "@/assets/transportation.jpeg";
import waterWasteWaterImage from "@/assets/mining.jpeg";

import { useScrollFade } from "@/hooks/useScrollFade";

const FEATURED_INDUSTRIES = [
  {
    slug: "aerospace",
    title: "Aerospace",
    subtitle: "Precision materials for flight-critical performance.",
    image: automotiveImage,
    stats: [{ v: "POLYRIB-H EXT", l: "Marine HDPE" }, { v: "POLYRIB V", l: "Dock Wear Plates" }, { v: "POLYRIB H", l: "Pontoon Decking" }],
  },
  {
    slug: "agro-processing",
    title: "Agro-processing",
    subtitle: "Durable polymers for continuous agricultural operations.",
    image: agroProcessingImage,
    stats: [{ v: "POLYRIB-H EXT", l: "Marine HDPE" }, { v: "POLYRIB V", l: "Dock Wear Plates" }, { v: "POLYRIB H", l: "Pontoon Decking" }],
  },
  {
    slug: "automotive",
    title: "Automotive",
    subtitle: "High-performance plastics for speed and automation.",
    image: automotiveImage,
    stats: [{ v: "KAYLON", l: "Gears & Bearings" }, { v: "POLYRIB V", l: "Conveyor Liners" }, { v: "PAKETAL", l: "Precision Parts" }],
  },
  {
    slug: "build-construction",
    title: "Build & Construction",
    subtitle: "Reliable materials for modern infrastructure.",
    image: buildConsImage,
    stats: [{ v: "POLYRIB-H EXT", l: "Marine HDPE" }, { v: "POLYRIB V", l: "Dock Wear Plates" }, { v: "POLYRIB H", l: "Pontoon Decking" }],
  },
  {
    slug: "cement",
    title: "Cement",
    subtitle: "Wear-resistant plastics for abrasive environments",
    image: cementImage,
    stats: [{ v: "POLYRIB-H EXT", l: "Marine HDPE" }, { v: "POLYRIB V", l: "Dock Wear Plates" }, { v: "POLYRIB H", l: "Pontoon Decking" }],
  },
  {
    slug: "chemical",
    title: "Chemical",
    subtitle: "Chemically resistant polymers for safe operations.",
    image: chemicalImage,
    stats: [{ v: "POLYRIB P", l: "Chemical Tanks" }, { v: "POLYRIB H", l: "HDPE Linings" }, { v: "DIPRA", l: "Gate Liners" }],
  },
  {
    slug: "food-beverage",
    title: "Food & Beverage",
    subtitle: "Hygienic materials for clean processing.",
    image: foodBevImage,
    stats: [{ v: "FDA", l: "21 CFR Compliant" }, { v: "POLYRIB-V FG", l: "Food Grade PE" }, { v: "CUTRITE", l: "HACCP Boards" }],
  },
  {
    slug: "heavy-equipment",
    title: "Heavy Equipment",
    subtitle: "High-strength polymers for extreme loads.",
    image: heavyEquipImage,
    stats: [{ v: "POLYRIB-H EXT", l: "Marine HDPE" }, { v: "POLYRIB V", l: "Dock Wear Plates" }, { v: "POLYRIB H", l: "Pontoon Decking" }],
  },
  {
    slug: "iron-steel",
    title: "Iron & Steel",
    subtitle: "Plastics are built for heat and abrasion.",
    image: ironSteelImage,
    stats: [{ v: "POLYRIB-H EXT", l: "Marine HDPE" }, { v: "POLYRIB V", l: "Dock Wear Plates" }, { v: "POLYRIB H", l: "Pontoon Decking" }],
  },
  {
    slug: "leather",
    title: "Leather",
    subtitle: "High-performance polymers for demanding leather processing environments.",
    image: leatherImage,
    stats: [{ v: "POLYRIB-H EXT", l: "Marine HDPE" }, { v: "POLYRIB V", l: "Dock Wear Plates" }, { v: "POLYRIB H", l: "Pontoon Decking" }],
  },

  {
    slug: "marine",
    title: "Marine",
    subtitle: "Corrosion-resistant plastics for marine conditions.",
    image: marineImage,
    stats: [{ v: "POLYRIB-H EXT", l: "Marine HDPE" }, { v: "POLYRIB V", l: "Dock Wear Plates" }, { v: "POLYRIB H", l: "Pontoon Decking" }],
  },
  {
    slug: "material-handling",
    title: "Material Handling",
    subtitle: "Low-friction solutions for efficient flow.",
    image: materialHandlingImage,
    stats: [{ v: "POLYRIB-H EXT", l: "Marine HDPE" }, { v: "POLYRIB V", l: "Dock Wear Plates" }, { v: "POLYRIB H", l: "Pontoon Decking" }],
  },
  {
    slug: "medical",
    title: "Medical",
    subtitle: "Precision plastics for controlled environments.",
    image: medicalImage,
    stats: [{ v: "POLYRIB-V FG", l: "FDA Compliant" }, { v: "PAKETAL", l: "Precision Parts" }, { v: "PCCLEAR", l: "Enclosures" }],
  },
  {
    slug: "mining",
    title: "Mining",
    subtitle: "Heavy-duty polymers for severe wear.",
    image: miningImage,
    stats: [{ v: "POLYRIB V", l: "Chute Liners" }, { v: "POLYRIB-V-FR", l: "FR Underground" }, { v: "ARETE", l: "FRP Composites" }],
  },
  {
    slug: "oil-gas",
    title: "Oil & Gas",
    subtitle: "Reliable materials for harsh environments.",
    image: oilGasImage,
    stats: [{ v: "POLYRIB-V-AS", l: "ATEX Rated" }, { v: "KAYLON OILON", l: "Pump Bearings" }, { v: "PAKETAL", l: "Valve Parts" }],
  },

  {
    slug: "packaging",
    title: "Packaging",
    subtitle: "Lightweight plastics for high-speed systems.",
    image: packagingImage,
    stats: [{ v: "POLYRIB-H EXT", l: "Marine HDPE" }, { v: "POLYRIB V", l: "Dock Wear Plates" }, { v: "POLYRIB H", l: "Pontoon Decking" }],
  },
  {
    slug: "pulp-paper",
    title: "Pulp & Paper",
    subtitle: "Moisture-resistant materials for continuous use.",
    image: pulpPaperImage,
    stats: [{ v: "POLYRIB-H EXT", l: "Marine HDPE" }, { v: "POLYRIB V", l: "Dock Wear Plates" }, { v: "POLYRIB H", l: "Pontoon Decking" }],
  },
  {
    slug: "signage",
    title: "Signage",
    subtitle: "High-quality plastics for lasting visibility.",
    image: signageImage,
    stats: [{ v: "POLYRIB-H EXT", l: "Marine HDPE" }, { v: "POLYRIB V", l: "Dock Wear Plates" }, { v: "POLYRIB H", l: "Pontoon Decking" }],
  },
  {
    slug: "sports-recreation",
    title: "Sports & Recreation",
    subtitle: "Tough, lightweight materials for performance.",
    image: sportsRecreationImage,
    stats: [{ v: "POLYRIB-H EXT", l: "Marine HDPE" }, { v: "POLYRIB V", l: "Dock Wear Plates" }, { v: "POLYRIB H", l: "Pontoon Decking" }],
  },
  {
    slug: "transportation",
    title: "Transportation",
    subtitle: "Engineered plastics for reliable mobility.",
    image: transportationImage,
    stats: [{ v: "POLYRIB-H EXT", l: "Marine HDPE" }, { v: "POLYRIB V", l: "Dock Wear Plates" }, { v: "POLYRIB H", l: "Pontoon Decking" }],
  },
  {
    slug: "water-waste-water",
    title: "Water & Waste Water",
    subtitle: "Corrosion-resistant solutions for system longevity.",
    image: waterWasteWaterImage,
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
      <div className="bg-surface-subtle border-b border-divider py-8">
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

      <section className="py-8">
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
                  <div className="cta-link">
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
