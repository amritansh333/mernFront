import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Plane,
  Sprout,
  Car,
  Building2,
  Factory,
  FlaskConical,
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

import aerospaceImage from "@/assets/aerospace.jpeg";
import agroProcessingImage from "@/assets/agro-processing.jpeg";
import automotiveImage from "@/assets/automotive.jpeg";
import buildConsImage from "@/assets/build-cons.jpeg";
import cementImage from "@/assets/cement.jpeg";
import chemicalImage from "@/assets/chemical.jpeg";
import foodBevImage from "@/assets/food-bev.jpeg";
import heavyEquipImage from "@/assets/heavy-equipment.jpeg";
import ironSteelImage from "@/assets/iron-steel.jpeg";
import leatherImage from "@/assets/leather.jpeg";
import marineImage from "@/assets/marine.jpeg";
import materialHandlingImage from "@/assets/material-handeling.jpeg";
import medicalImage from "@/assets/medical.jpeg";
import miningImage from "@/assets/mining.jpeg";
import oilGasImage from "@/assets/oil-gas.jpeg";
import packagingImage from "@/assets/packaging.jpeg";
import pulpPaperImage from "@/assets/pulp-paper.jpeg";
import signageImage from "@/assets/signage.jpeg";
import sportsRecreationImage from "@/assets/sports-recreation.jpeg";
import transportationImage from "@/assets/transportation.jpeg";
import waterWasteWaterImage from "@/assets/water-waste-water.jpeg";

import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import manufacturingImage from "@/assets/csr-slider1.jpeg";
import { useScrollFade } from "@/hooks/useScrollFade";

const FEATURED_INDUSTRIES = [
  {
    slug: "aerospace",
    title: "Aerospace",
    subtitle: "Precision materials for flight-critical performance.",
    image: aerospaceImage,
    stats: [
      { v: "POLYRIB-H EXT", l: "Marine HDPE" },
      { v: "POLYRIB V", l: "Dock Wear Plates" },
      { v: "POLYRIB H", l: "Pontoon Decking" },
    ],
  },
  {
    slug: "agro-processing",
    title: "Agro-processing",
    subtitle: "Durable polymers for continuous agricultural operations.",
    image: agroProcessingImage,
    stats: [
      { v: "POLYRIB-H EXT", l: "Marine HDPE" },
      { v: "POLYRIB V", l: "Dock Wear Plates" },
      { v: "POLYRIB H", l: "Pontoon Decking" },
    ],
  },
  {
    slug: "automotive",
    title: "Automotive",
    subtitle: "High-performance plastics for speed and automation.",
    image: automotiveImage,
    stats: [
      { v: "KAYLON", l: "Gears & Bearings" },
      { v: "POLYRIB V", l: "Conveyor Liners" },
      { v: "PAKETAL", l: "Precision Parts" },
    ],
  },
  {
    slug: "build-construction",
    title: "Build & Construction",
    subtitle: "Reliable materials for modern infrastructure.",
    image: buildConsImage,
    stats: [
      { v: "POLYRIB-H EXT", l: "Marine HDPE" },
      { v: "POLYRIB V", l: "Dock Wear Plates" },
      { v: "POLYRIB H", l: "Pontoon Decking" },
    ],
  },
  {
    slug: "cement",
    title: "Cement",
    subtitle: "Wear-resistant plastics for abrasive environments",
    image: cementImage,
    stats: [
      { v: "POLYRIB-H EXT", l: "Marine HDPE" },
      { v: "POLYRIB V", l: "Dock Wear Plates" },
      { v: "POLYRIB H", l: "Pontoon Decking" },
    ],
  },
  {
    slug: "chemical",
    title: "Chemical",
    subtitle: "Chemically resistant polymers for safe operations.",
    image: chemicalImage,
    stats: [
      { v: "POLYRIB P", l: "Chemical Tanks" },
      { v: "POLYRIB H", l: "HDPE Linings" },
      { v: "DIPRA", l: "Gate Liners" },
    ],
  },
  {
    slug: "food-beverage",
    title: "Food & Beverage",
    subtitle: "Hygienic materials for clean processing.",
    image: foodBevImage,
    stats: [
      { v: "FDA", l: "21 CFR Compliant" },
      { v: "POLYRIB-V FG", l: "Food Grade PE" },
      { v: "CUTRITE", l: "HACCP Boards" },
    ],
  },
  {
    slug: "heavy-equipment",
    title: "Heavy Equipment",
    subtitle: "High-strength polymers for extreme loads.",
    image: heavyEquipImage,
    stats: [
      { v: "POLYRIB-H EXT", l: "Marine HDPE" },
      { v: "POLYRIB V", l: "Dock Wear Plates" },
      { v: "POLYRIB H", l: "Pontoon Decking" },
    ],
  },
  {
    slug: "iron-steel",
    title: "Iron & Steel",
    subtitle: "Plastics are built for heat and abrasion.",
    image: ironSteelImage,
    stats: [
      { v: "POLYRIB-H EXT", l: "Marine HDPE" },
      { v: "POLYRIB V", l: "Dock Wear Plates" },
      { v: "POLYRIB H", l: "Pontoon Decking" },
    ],
  },
  {
    slug: "leather",
    title: "Leather",
    subtitle:
      "High-performance polymers for demanding leather processing environments.",
    image: leatherImage,
    stats: [
      { v: "POLYRIB-H EXT", l: "Marine HDPE" },
      { v: "POLYRIB V", l: "Dock Wear Plates" },
      { v: "POLYRIB H", l: "Pontoon Decking" },
    ],
  },
  {
    slug: "marine",
    title: "Marine",
    subtitle: "Corrosion-resistant plastics for marine conditions.",
    image: marineImage,
    stats: [
      { v: "POLYRIB-H EXT", l: "Marine HDPE" },
      { v: "POLYRIB V", l: "Dock Wear Plates" },
      { v: "POLYRIB H", l: "Pontoon Decking" },
    ],
  },
  {
    slug: "material-handling",
    title: "Material Handling",
    subtitle: "Low-friction solutions for efficient flow.",
    image: materialHandlingImage,
    stats: [
      { v: "POLYRIB-H EXT", l: "Marine HDPE" },
      { v: "POLYRIB V", l: "Dock Wear Plates" },
      { v: "POLYRIB H", l: "Pontoon Decking" },
    ],
  },
  {
    slug: "medical",
    title: "Medical",
    subtitle: "Precision plastics for controlled environments.",
    image: medicalImage,
    stats: [
      { v: "POLYRIB-V FG", l: "FDA Compliant" },
      { v: "PAKETAL", l: "Precision Parts" },
      { v: "PCCLEAR", l: "Enclosures" },
    ],
  },
  {
    slug: "mining",
    title: "Mining",
    subtitle: "Heavy-duty polymers for severe wear.",
    image: miningImage,
    stats: [
      { v: "POLYRIB V", l: "Chute Liners" },
      { v: "POLYRIB-V-FR", l: "FR Underground" },
      { v: "ARETE", l: "FRP Composites" },
    ],
  },
  {
    slug: "oil-gas",
    title: "Oil & Gas",
    subtitle: "Reliable materials for harsh environments.",
    image: oilGasImage,
    stats: [
      { v: "POLYRIB-V-AS", l: "ATEX Rated" },
      { v: "KAYLON OILON", l: "Pump Bearings" },
      { v: "PAKETAL", l: "Valve Parts" },
    ],
  },
  {
    slug: "packaging",
    title: "Packaging",
    subtitle: "Lightweight plastics for high-speed systems.",
    image: packagingImage,
    stats: [
      { v: "POLYRIB-H EXT", l: "Marine HDPE" },
      { v: "POLYRIB V", l: "Dock Wear Plates" },
      { v: "POLYRIB H", l: "Pontoon Decking" },
    ],
  },
  {
    slug: "pulp-paper",
    title: "Pulp & Paper",
    subtitle: "Moisture-resistant materials for continuous use.",
    image: pulpPaperImage,
    stats: [
      { v: "POLYRIB-H EXT", l: "Marine HDPE" },
      { v: "POLYRIB V", l: "Dock Wear Plates" },
      { v: "POLYRIB H", l: "Pontoon Decking" },
    ],
  },
  {
    slug: "signage",
    title: "Signage",
    subtitle: "High-quality plastics for lasting visibility.",
    image: signageImage,
    stats: [
      { v: "POLYRIB-H EXT", l: "Marine HDPE" },
      { v: "POLYRIB V", l: "Dock Wear Plates" },
      { v: "POLYRIB H", l: "Pontoon Decking" },
    ],
  },
  {
    slug: "sports-recreation",
    title: "Sports & Recreation",
    subtitle: "Tough, lightweight materials for performance.",
    image: sportsRecreationImage,
    stats: [
      { v: "POLYRIB-H EXT", l: "Marine HDPE" },
      { v: "POLYRIB V", l: "Dock Wear Plates" },
      { v: "POLYRIB H", l: "Pontoon Decking" },
    ],
  },
  {
    slug: "transportation",
    title: "Transportation",
    subtitle: "Engineered plastics for reliable mobility.",
    image: transportationImage,
    stats: [
      { v: "POLYRIB-H EXT", l: "Marine HDPE" },
      { v: "POLYRIB V", l: "Dock Wear Plates" },
      { v: "POLYRIB H", l: "Pontoon Decking" },
    ],
  },
  {
    slug: "water-waste-water",
    title: "Water & Waste Water",
    subtitle: "Corrosion-resistant solutions for system longevity.",
    image: waterWasteWaterImage,
    stats: [
      { v: "POLYRIB-H EXT", l: "Marine HDPE" },
      { v: "POLYRIB V", l: "Dock Wear Plates" },
      { v: "POLYRIB H", l: "Pontoon Decking" },
    ],
  },
];

const ALL_INDUSTRIES = [
  { title: "Aerospace", slug: "aerospace" },
  { title: "Agro Processing", slug: "agro-processing" },
  { title: "Automotive", slug: "automotive" },
  { title: "Build & Construction", slug: "build-construction" },
  { title: "Chemical", slug: "chemical" },
  { title: "Cement", slug: "cement" },
  { title: "Food & Beverage", slug: "food-beverage" },
  { title: "Heavy Equipment", slug: "heavy-equipment" },
  { title: "Iron & Steel", slug: "iron-steel" },
  { title: "Leather", slug: "leather" },
  { title: "Marine", slug: "marine" },
  { title: "Material Handling", slug: "material-handling" },
  { title: "Medical", slug: "medical" },
  { title: "Mining", slug: "mining" },
  { title: "Oil & Gas", slug: "oil-gas" },
  { title: "Packaging", slug: "packaging" },
  { title: "Pulp & Paper", slug: "pulp-paper" },
  { title: "Signage", slug: "signage" },
  { title: "Sports & Recreation", slug: "sports-recreation" },
  { title: "Transportation", slug: "transportation" },
  { title: "Water & Waste Water", slug: "water-waste-water" },
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

export default function IndustriesPage() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;

  return (
    <div className="pt-16">
      {/* Page Header */}
      <PageHeroBanner
        eyebrow="Polyrib thermoplastic materials are trusted across 20+ industries worldwide - from food processing and automotive to mining, oil & gas, and medical device manufacturing."
        title="Industries"
        highlight="We Serve"
        image={manufacturingImage}
        imageAlt="Khanna Polyrib manufacturing facility"
        imagePosition="center center"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Industries" }]}
      />

      {/* Featured Industries */}
      <section className="py-8">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
            {FEATURED_INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                to={`/industries/${ind.slug}`}
                className="category-card flex flex-col overflow-hidden group min-w-0  border border-primary"
              >
                {/* Industry Image */}
                <div className="card-image w-full aspect-[16/9] shrink-0 overflow-hidden">
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Industry Details */}
                <div className="flex-1 p-3 sm:p-4 lg:p-5">
                  <h2 className="flex items-center gap-2 font-heading text-sm sm:text-base lg:text-lg text-charcoal mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-200">
                    {(() => {
                      const Icon =
                        industryIcons[ind.slug as keyof typeof industryIcons];
                      return (
                        <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-lg bg-primary/10 text-primary">
                          <Icon
                            className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </span>
                      );
                    })()}
                    <span>{ind.title}</span>
                  </h2>

                  <p className="text-muted-foreground text-[10px] sm:text-xs lg:text-sm mb-3 sm:mb-4 leading-relaxed">
                    {ind.subtitle}
                  </p>

                  {/* Product Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    {ind.stats.map((s) => (
                      <div key={s.l} className="min-w-0">
                        <div className="font-heading font-bold text-primary text-[10px] sm:text-xs lg:text-sm break-words">
                          {s.v}
                        </div>
                        <div className="text-[9px] sm:text-[10px] lg:text-xs text-muted-foreground leading-tight">
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="cta-link text-[10px] sm:text-xs lg:text-sm flex items-center gap-1 flex-wrap">
                    Explore Solutions
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 explore-arrow shrink-0" />
                  </div>

                  <div className="card-border-bottom mt-3 sm:mt-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full industry list */}
      <section className="py-12 bg-surface-subtle border-t border-divider">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-4">All Sectors</p>

          <h2 className="font-heading text-2xl text-charcoal mb-6">
            Our full industry coverage
          </h2>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {ALL_INDUSTRIES.map((ind, index) => {
              const Icon =
                industryIcons[ind.slug as keyof typeof industryIcons];

              return (
                <Link
                  key={ind.slug}
                  to={`/industries/${ind.slug}`}
                  className="group flex items-center gap-2 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 border border-border bg-card text-xs sm:text-sm font-medium text-charcoal-light transition-all duration-200 rounded-xl hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary  border border-primary"
                  style={{ animationDelay: `${index * 35}ms` }}
                >
                  <Icon
                    className="w-4 h-4 text-primary shrink-0 transition-transform duration-200 group-hover:scale-110"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span className="whitespace-nowrap">{ind.title}</span>
                </Link>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground mt-5">
            Specific product recommendations available for each sector.{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact our technical team
            </Link>{" "}
            for application guidance.
          </p>
        </div>
      </section>
    </div>
  );
}
