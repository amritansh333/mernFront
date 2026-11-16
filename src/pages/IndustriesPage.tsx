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
    subtitle: "Reliable materials for demanding flight applications.",
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
    subtitle: "Durable materials for agricultural operations.",
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
    subtitle: "Reliable materials for automotive applications.",
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
    subtitle: "Durable materials for demanding cement operations.",
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
    subtitle: "Reliable materials for demanding chemical operations.",
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
    subtitle: "Hygienic materials for modern food processing.",
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
    subtitle: "Strong materials for heavy equipments.",
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
    subtitle: "Durable materials for demanding steel operations.",
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
    subtitle: "Reliable materials for modern leather processing.",
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
    subtitle: "Durable materials for marine applications.",
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
    subtitle: "Reliable materials for efficient material handling.",
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
    subtitle: "Precision materials for medical industry.",
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
    subtitle: "Durable materials for demanding mining operations.",
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
    subtitle: "Reliable materials for oil and gas operations.",
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
    subtitle: "Reliable materials for packaging operations.",
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
    subtitle: "Durable materials for continuous paper production.",
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
    subtitle: "Durable materials for signage applications.",
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
    subtitle: "Strong materials for modern sports applications.",
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
    subtitle: "Reliable materials for transport applications.",
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
    subtitle: "Reliable materials for water treatment infrastructure.",
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
      <section className="py-6 sm:py-8 lg:py-10">
        <div className="container max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          {/* 3 Columns on Mobile, 4 on Desktop */}
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-5">
            {FEATURED_INDUSTRIES.map((ind) => {
              const Icon =
                industryIcons[ind.slug as keyof typeof industryIcons];

              return (
                <Link
                  key={ind.slug}
                  to={`/industries/${ind.slug}`}
                  className="category-card group flex flex-col min-w-0 overflow-hidden rounded-xl sm:rounded-2xl border border-primary/70 bg-white !p-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Industry Image - Edge to Edge, No White Gaps */}
                  <div className="w-full shrink-0 overflow-hidden bg-white p-0 m-0 leading-[0]">
                    <img
                      src={ind.image}
                      alt={ind.title}
                      className="block w-full h-auto m-0 p-0 object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>

                  {/* Industry Content */}
                  <div className="flex flex-col flex-1 min-w-0 px-2 py-2 sm:px-3 sm:py-3 lg:px-4 lg:py-4">
                    {/* Industry Heading */}
                    <h2 className="flex items-center gap-1 sm:gap-1.5 font-heading text-[10px] sm:text-xs lg:text-sm font-bold text-charcoal leading-tight mb-1.5 sm:mb-2 group-hover:text-primary transition-colors duration-200 min-w-0">
                      <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded-md bg-primary/10 text-primary">
                        <Icon
                          className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </span>

                      <span className="min-w-0 break-words">{ind.title}</span>
                    </h2>

                    {/* Industry Description */}
                    <p className="text-muted-foreground text-[9px] sm:text-[10px] lg:text-xs leading-snug mb-2 sm:mb-3">
                      {ind.subtitle}
                    </p>

                    {/* Product Details - Hidden on Mobile */}
                    <div className="hidden sm:grid grid-cols-3 gap-1.5 lg:gap-2 mb-3">
                      {ind.stats.map((s) => (
                        <div key={s.l} className="min-w-0">
                          <div className="font-heading font-semibold text-primary text-[9px] lg:text-[11px] leading-snug break-words">
                            {s.v}
                          </div>

                          <div className="text-[9px] lg:text-[10px] text-muted-foreground leading-tight mt-0.5 break-words">
                            {s.l}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Explore - Mobile / Explore Solutions - Larger Screens */}
                    <div className="mt-auto pt-1">
                      <div className="cta-link text-[9px] sm:text-[10px] lg:text-xs flex items-center gap-1">
                        <span className="sm:hidden">Explore</span>
                        <span className="hidden sm:inline">
                          Explore Solutions
                        </span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 explore-arrow shrink-0" />
                      </div>
                    </div>

                    <div className="card-border-bottom mt-1.5 sm:mt-2" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Industry List */}
      <section className="py-10 sm:py-12 bg-transparent border-t border-divider">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-4">All Sectors</p>

          <h2 className="font-heading text-2xl text-charcoal mb-6">
            Our full industry coverage
          </h2>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {ALL_INDUSTRIES.map((ind, index) => {
              const Icon =
                industryIcons[ind.slug as keyof typeof industryIcons];

              return (
                <Link
                  key={ind.slug}
                  to={`/industries/${ind.slug}`}
                  className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 border border-primary bg-card text-xs sm:text-sm font-medium text-charcoal-light transition-all duration-200 rounded-xl hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
