import React, { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  X,
  ZoomIn,
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
import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
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
  { abbr: "Transportation", slug: "transportation" },
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

const INDUSTRY_DATA: Record<
  string,
  {
    title: string;
    subtitle: string;
    image: string;
    gallery?: string[];
    intro: string;
    capabilities: string[];
    products: { name: string; use: string; href: string }[];
    materials: string[];
    caseStudies: {
      title: string;
      client: string;
      challenge: string;
      solution: string;
      result: string;
    }[];
    standards: string[];
  }
> = {
  aerospace: {
    title: "Aerospace",
    subtitle: "Precision materials for flight-critical performance.",
    image: aerospaceImage,
    intro:
      "The aerospace industry requires lightweight, high-strength, and durable materials. Khanna Polyrib provides advanced engineering plastics that ensure reliability, efficiency, and strict safety standards.",
    capabilities: [
      "Lightweight Strength - Lightweight high-strength-to-weight polymer solutions.",
      "Dimensional Precision - Small high high-tolerance applications.",
      "Wear Resistance - Prolonged use when constantly in service.",
      "Constant Quality - manufacturing processes under the control of ISO.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB-V FG", "CUTRITE", "PAKETAL", "POLYRIB H"],
    caseStudies: [
      {
        title: "CUTRITE HACCP Boards – Meat Processing",
        client: "Abattoir, South Africa",
        challenge: "Non-compliant cutting boards failing HACCP audit.",
        solution:
          "CUTRITE EMB colour-coded boards across all stations — white, yellow, red, blue, green by food type.",
        result: "Full HACCP compliance. Audit passed.",
      },
      {
        title: "POLYRIB-V FG Conveyor Liners – Beverage Line",
        client: "Beverage Manufacturer",
        challenge:
          "PET bottle scratching on standard conveyor at 40,000 bottles/hour.",
        solution:
          "POLYRIB-V FG self-lubricating food-grade wear strips. FDA compliant, zero scratching.",
        result: "Service life extended from 3 weeks to 14 months.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  "agro-processing": {
    title: "Agro Processing",
    subtitle: "Durable polymers for continuous agricultural operations.",
    image: agroProcessingImage,
    intro:
      "Agro-processing demands durable, moisture-resistant materials for continuous, high-performance operations. Khanna Polyrib provides hygienic, wear-resistant engineering plastics that enhance efficiency, reduce downtime, and ensure contamination-free processing.",
    capabilities: [
      "Waterproofing - Consistent operation in a wet setting.",
      "Durability Wear - Long equipment life.",
      "High uptake -Minimized downtime and replacement.",
      "Application-specific components - Custom Fabrication.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB-V FG", "CUTRITE", "PAKETAL", "POLYRIB H"],
    caseStudies: [
      {
        title: "CUTRITE HACCP Boards – Meat Processing",
        client: "Abattoir, South Africa",
        challenge: "Non-compliant cutting boards failing HACCP audit.",
        solution:
          "CUTRITE EMB colour-coded boards across all stations — white, yellow, red, blue, green by food type.",
        result: "Full HACCP compliance. Audit passed.",
      },
      {
        title: "POLYRIB-V FG Conveyor Liners – Beverage Line",
        client: "Beverage Manufacturer",
        challenge:
          "PET bottle scratching on standard conveyor at 40,000 bottles/hour.",
        solution:
          "POLYRIB-V FG self-lubricating food-grade wear strips. FDA compliant, zero scratching.",
        result: "Service life extended from 3 weeks to 14 months.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },

  automotive: {
    title: "Automotive",
    subtitle: "High-performance plastics for speed and automation.",
    image: automotiveImage,
    intro:
      "The automobile sector requires precision, durability, and efficiency in manufacturing and assembly. Khanna Polyrib offers engineering plastics with high wear resistance, low friction, and stability to support reliable, low-maintenance automotive and EV production.",
    capabilities: [
      "Low-friction materials - Flowing and moving materials are smooth.",
      "Long Wear-resistance - gapped performance.",
      "Precision Machining- Errors within tolerances.",
      "Scalability in Production - Batch and Tailored production.",
    ],
    products: [
      {
        name: "POLYRIB H CED – Cast Nylon Rods",
        use: "Gears, bearings, cams, structural components",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-h/polyrib-h-ced",
      },
      {
        name: "ARETE L-V SUPERSLIDE – Acetal/POM Rod & Sheet",
        use: "Precision gears, bearings, valve components",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/arete/arete-l-v-superslide",
      },
      {
        name: "POLYRIB V – UHMW PE Sheets",
        use: "Body-in-white conveyor wear liners",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v/polyrib-l-v",
      },
      {
        name: "POLYRIB-V SUPERSLIDE",
        use: "Zero-lube slide guides and wear strips",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v/polyrib-v-superslide",
      },
    ],
    materials: ["KAYLON", "PAKETAL", "POLYRIB V", "PCCLEAR"],
    caseStudies: [
      {
        title: "POLYRIB V Wear Strips – Assembly Conveyor",
        client: "Tier 1 Automotive Supplier, South Africa",
        challenge:
          "Steel wear strips on body panel transfer conveyors causing surface scratching and requiring frequent lubrication.",
        solution:
          "Replaced with POLYRIB-V SUPERSLIDE self-lubricating strips. Zero-lubrication operation, eliminated surface marking.",
        result: "Maintenance intervals extended from 2 weeks to 6 months.",
      },
      {
        title: "KAYLON Gears – Trim Line Drive",
        client: "OEM Assembly Plant",
        challenge:
          "Aluminium drive gears causing noise and corrosion on trim assembly line.",
        solution:
          "KAYLON MOLY MoS₂-filled nylon gears — silent, self-lubricating, zero corrosion.",
        result: "30% noise reduction and elimination of lubrication downtime.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  "build-construction": {
    title: "Build & Construction",
    subtitle: "Reliable materials for modern infrastructure.",
    image: buildConsImage,
    intro:
      "Building and infrastructure projects require durable, weather-resistant materials for long-term stability. Khanna Polyrib provides lightweight, strong engineering plastics that improve efficiency and reduce corrosion in construction applications.",
    capabilities: [
      "Structural Stability- large load-bearing potential.",
      "Resistance to weather - Outdoor-fit.",
      "Corrosion-Free - Bigger life compared to metals.",
      "Custom Sizes - Sheets, machined parts, and rods.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      {
        title: "POLYRIB P Chemical Tank Fabrication",
        client: "Chemical Plant, South Africa",
        challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.",
        solution:
          "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.",
        result:
          "Zero corrosion after 5 years. Maintenance cost reduced by 80%.",
      },
      {
        title: "DIPRA Gate Liners – Acid Storage",
        client: "Mining Chemical Plant",
        challenge: "Sluice gates in acid storage area failing within 6 months.",
        solution:
          "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.",
        result: "Service life extended to over 3 years.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  cement: {
    title: "Cement",
    subtitle: "Wear-resistant plastics for abrasive environments.",
    image: cementImage,
    intro:
      "Cement manufacturing involves heavy loads, abrasion, and harsh conditions. Khanna Polyrib offers wear-resistant engineering plastics that improve equipment life, reduce maintenance, and ensure reliable performance in demanding environments.",
    capabilities: [
      "Abrasion Resistance- Cement and clinker wear.",
      "Impact Strength - Applicable in heavy-duty applications.",
      "Noise - working conditions enhanced - better plant working conditions.",
      "Custom Fabrication – Application-specific components",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      {
        title: "POLYRIB P Chemical Tank Fabrication",
        client: "Chemical Plant, South Africa",
        challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.",
        solution:
          "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.",
        result:
          "Zero corrosion after 5 years. Maintenance cost reduced by 80%.",
      },
      {
        title: "DIPRA Gate Liners – Acid Storage",
        client: "Mining Chemical Plant",
        challenge: "Sluice gates in acid storage area failing within 6 months.",
        solution:
          "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.",
        result: "Service life extended to over 3 years.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  chemical: {
    title: "Chemical",
    subtitle:
      "PP and HDPE chemical tanks, linings, ductwork and fabricated equipment",
    image: chemicalImage,
    intro:
      "Chemical processing requires materials with high chemical resistance, stability, and safety. Khanna Polyrib offers engineering plastics that withstand corrosive environments while ensuring reliable, durable performance in critical applications.",
    capabilities: [
      "Chemical Resistance- Secure manipulation of acidic media.",
      "Thermal Stability - Can be depended on in different temperatures.",
      "Leak Prevention - Material integrity is high.",
      "ISO Quality Control - Stable performance quality assurance.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      {
        title: "POLYRIB P Chemical Tank Fabrication",
        client: "Chemical Plant, South Africa",
        challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.",
        solution:
          "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.",
        result:
          "Zero corrosion after 5 years. Maintenance cost reduced by 80%.",
      },
      {
        title: "DIPRA Gate Liners – Acid Storage",
        client: "Mining Chemical Plant",
        challenge: "Sluice gates in acid storage area failing within 6 months.",
        solution:
          "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.",
        result: "Service life extended to over 3 years.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  "food-beverage": {
    title: "Food & Beverage",
    subtitle: "Hygienic materials for clean processing.",
    image: foodBevImage,
    intro:
      "Food and beverage operations require hygienic, durable, and efficient materials. Khanna Polyrib offers food-grade engineering plastics that resist moisture, wear, and chemicals while ensuring safe and reliable processing.",
    capabilities: [
      "Safe and hygienic solutions, Food-Grade Materials.",
      "Simple Washability - Laminar non-polluting surfaces.",
      "Wear Resistance - Prolonged service life.",
      "Custom Machining - Component to application.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB-V FG", "CUTRITE", "PAKETAL", "POLYRIB H"],
    caseStudies: [
      {
        title: "CUTRITE HACCP Boards – Meat Processing",
        client: "Abattoir, South Africa",
        challenge: "Non-compliant cutting boards failing HACCP audit.",
        solution:
          "CUTRITE EMB colour-coded boards across all stations — white, yellow, red, blue, green by food type.",
        result: "Full HACCP compliance. Audit passed.",
      },
      {
        title: "POLYRIB-V FG Conveyor Liners – Beverage Line",
        client: "Beverage Manufacturer",
        challenge:
          "PET bottle scratching on standard conveyor at 40,000 bottles/hour.",
        solution:
          "POLYRIB-V FG self-lubricating food-grade wear strips. FDA compliant, zero scratching.",
        result: "Service life extended from 3 weeks to 14 months.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  "heavy-equipment": {
    title: "Heavy Equipment",
    subtitle: "High-strength polymers for extreme loads.",
    image: heavyEquipImage,
    intro:
      "Heavy equipment operations require materials that can withstand extreme loads, vibration, and continuous stress. Khanna Polyrib provides robust engineering plastics that reduce wear, extend component life, and improve efficiency in demanding industrial environments.",
    capabilities: [
      "High Impact Strength - Supports heavy loads.",
      "Wear Performance - fewer component failures.",
      "Noise Reduction - Better machine functioning.",
      "Customisation - Customised heavy-duty components.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      {
        title: "POLYRIB P Chemical Tank Fabrication",
        client: "Chemical Plant, South Africa",
        challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.",
        solution:
          "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.",
        result:
          "Zero corrosion after 5 years. Maintenance cost reduced by 80%.",
      },
      {
        title: "DIPRA Gate Liners – Acid Storage",
        client: "Mining Chemical Plant",
        challenge: "Sluice gates in acid storage area failing within 6 months.",
        solution:
          "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.",
        result: "Service life extended to over 3 years.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  "iron-steel": {
    title: "Iron & Steel",
    subtitle: "Plastics are built for heat and abrasion.",
    image: ironSteelImage,
    intro:
      "Iron and steel operations demand materials that withstand high heat, abrasion, and heavy loads. Khanna Polyrib offers high-performance polymers that enhance efficiency, reduce maintenance, and ensure safe, continuous operations.",
    capabilities: [
      "Heat Resistance- Does not melt down at high temperatures.",
      "Abrasion Durability - Process Wear in Metals.",
      "Dimensional Stability - Second replication.",
      "Industrial-grade Quality - Constructed to withstand extreme conditions.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      {
        title: "POLYRIB P Chemical Tank Fabrication",
        client: "Chemical Plant, South Africa",
        challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.",
        solution:
          "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.",
        result:
          "Zero corrosion after 5 years. Maintenance cost reduced by 80%.",
      },
      {
        title: "DIPRA Gate Liners – Acid Storage",
        client: "Mining Chemical Plant",
        challenge: "Sluice gates in acid storage area failing within 6 months.",
        solution:
          "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.",
        result: "Service life extended to over 3 years.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  leather: {
    title: "Leather",
    subtitle:
      "High-performance polymers for demanding leather processing environments.",
    image: leatherImage,
    intro:
      "The leather industry requires materials that resist chemicals, moisture, abrasion, and constant movement. Khanna Polyrib provides durable, hygienic engineering plastics that enhance efficiency, reduce downtime, and ensure consistent, high-quality processing.",
    capabilities: [
      "Chemical Resistance: Reliable performance in tanning and chemical-intensive processes.",
      "Moisture Resistance: Stable operation in wet and humid environments.",
      "High Wear Resistance: Extended equipment life under abrasive conditions.",
      "Custom Fabrication: Application-specific components tailored to your needs.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      {
        title: "POLYRIB P Chemical Tank Fabrication",
        client: "Chemical Plant, South Africa",
        challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.",
        solution:
          "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.",
        result:
          "Zero corrosion after 5 years. Maintenance cost reduced by 80%.",
      },
      {
        title: "DIPRA Gate Liners – Acid Storage",
        client: "Mining Chemical Plant",
        challenge: "Sluice gates in acid storage area failing within 6 months.",
        solution:
          "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.",
        result: "Service life extended to over 3 years.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  marine: {
    title: "Marine",
    subtitle: "Corrosion-resistant plastics for marine conditions.",
    image: marineImage,
    intro:
      "Sea conditions subject the materials to moisture, saltwater, and corrosion. Khanna Polyrib offers marine equipment, docks, and offshore corrosion-resistant engineering plastics. We retain the performance and understandable benevolence of our polymers even during extended yields of extreme seas.",
    capabilities: [
      "Corrosion Resistance - Perfect when exposed to salt waters.",
      "Moisture Stability - Long-term Reliability.",
      "Impact Strength- This is a resilient component.",
      "Custom Fabrication - Marine solutions.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB H", "POLYRIB-H EXT", "POLYRIB V"],
    caseStudies: [
      {
        title: "POLYRIB-H EXT Marine Boards – Dock Fenders",
        client: "Port Authority, Cape Town",
        challenge:
          "Timber dock fenders rotting and requiring annual replacement.",
        solution:
          "POLYRIB-H EXT UV-stabilised HDPE fender boards. Zero rot, salt-water proof, impact resistant.",
        result: "10+ year service life projected. Payback in Year 2 vs timber.",
      },
      {
        title: "POLYRIB V Boat Ramp Wear Plates",
        client: "Yacht Club, KwaZulu-Natal",
        challenge:
          "Boat ramp surface wearing from fibreglass hull contact during launch.",
        solution:
          "POLYRIB-V SUPERSLIDE UHMW PE wear plates — self-lubricating, no hull scratching.",
        result:
          "Zero hull damage incidents. Minimal wear after 3 years of daily use.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  "material-handling": {
    title: "Materail Handling",
    subtitle: "Low-friction solutions for efficient flow.",
    image: materialHandlingImage,
    intro:
      "Effective material handling systems require proper and efficient flow, stability, and reduce downtimes. Khanna Polyrib also provides low-friction and wear-resistant plastics to be used as conveyor, guides, and transfer systems. Our solutions are very productive and do not produce a lot of noise or have a high maintenance level.",
    capabilities: [
      "Low Friction - There is a smooth flow of materials.",
      "Wear Resistance - Minimal replacement rate.",
      "Quieter operations - Noise Reduction.",
      "Precision Components - Good fit and finish.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      {
        title: "POLYRIB P Chemical Tank Fabrication",
        client: "Chemical Plant, South Africa",
        challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.",
        solution:
          "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.",
        result:
          "Zero corrosion after 5 years. Maintenance cost reduced by 80%.",
      },
      {
        title: "DIPRA Gate Liners – Acid Storage",
        client: "Mining Chemical Plant",
        challenge: "Sluice gates in acid storage area failing within 6 months.",
        solution:
          "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.",
        result: "Service life extended to over 3 years.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  medical: {
    title: "Medical",
    subtitle: "Precision plastics for controlled environments.",
    image: medicalImage,
    intro:
      "Medical and healthcare facilities demand accuracy, sterility, and the reliability of the materials. Khanna Polyrib is an Engineering plastic supplier of quality to be used in medical equipment or a clean room. Our products will ensure a good performance with regard to quality and hygiene.",
    capabilities: [
      "High Clean Materials - Cleanroom approved.",
      "Dimensional Accuracy - Accuracy elements.",
      "Chemical Resistance - Compatibility of safety in cleaning.",
      "Quality Assurance - Managed production.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Tablet press wear surfaces, conveyor liners",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v",
      },
      {
        name: "POLYRIB PPX 258 – FDA Acetal/POM",
        use: "Valve seats, seals, precision components",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ppx-258",
      },
      {
        name: "POLYRIB V – UHMW PE Sheets",
        use: "Body-in-white conveyor wear liners",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v/polyrib-l-v",
      },
      {
        name: "POLYRIB-V SUPERSLIDE",
        use: "Zero-lube slide guides and wear strips",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v/polyrib-v-superslide",
      },
    ],
    materials: ["POLYRIB-V FG", "PAKETAL", "KAYLON", "PCCLEAR"],
    caseStudies: [
      {
        title: "POLYRIB-V FG Tablet Press Liners",
        client: "Pharmaceutical Manufacturer, South Africa",
        challenge:
          "Standard wear surfaces failing FDA food-contact compliance.",
        solution:
          "POLYRIB-V FG food-grade UHMW PE liners with full FDA 21 CFR certification and material traceability.",
        result:
          "Regulatory approval achieved. 18-month service life, zero contamination incidents.",
      },
      {
        title: "PAKETAL Valve Components – Fill Line",
        client: "Aseptic Filling Equipment OEM",
        challenge:
          "Metal valve seats causing particle contamination risk in a sterile fill line.",
        solution:
          "PAKETAL acetal/POM machined valve seats — non-contaminating, dimensionally stable, FDA compliant.",
        result: "Zero particle contamination events in 12 months.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  mining: {
    title: "Mining",
    subtitle: "Heavy-duty polymers for severe wear.",
    image: miningImage,
    intro:
      "The mining activities entail abrasion and the harshness of the environment, including impact. Khanna Polyrib provides durable engineering plastics that can prevent permanent wear in the mining machinery and the handling system of materials. Our products assist in enhancing the effectiveness of operations and maintenance downtime.",
    capabilities: [
      "Extreme Wear resistance - Collection mining loads.",
      "Impact Durability - Has resistance to heavy flows of materials.",
      "Minimum maintenance-Longer working phases",
      "Application-specific designs - Custom Solutions.",
    ],
    products: [
      {
        name: "POLYRIB-V005 – Standard UHMW PE",
        use: "Chute linings, pan liners, skirt boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v/polyrib-v005",
      },
      {
        name: "POLYRIB-V-FR – Flame Retardant UHMW PE",
        use: "Underground conveyor liners (FR rated)",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v/polyrib-v-fr",
      },
      {
        name: "POLYRIB-C – Conductive UHMW PE",
        use: "Coal mine liners (static dissipating)",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v/polyrib-c",
      },
      {
        name: "ARETE L-V005 – Glass-lined Composite",
        use: "FRP chute liner construction",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/arete/arete-l-v005",
      },
    ],
    materials: ["POLYRIB V", "POLYRIB-V-FR", "POLYRIB-C", "ARETE", "DIPRA"],
    caseStudies: [
      {
        title: "POLYRIB V Chute Liners – Iron Ore",
        client: "Iron Ore Mine, Northern Cape",
        challenge:
          "Steel chute liners wearing out every 8 weeks in iron ore transfer point.",
        solution:
          "POLYRIB-V005 UHMW PE liners — abrasion coefficient 6× lower than steel.",
        result:
          "Liner life extended to 14 months. Annual saving of R480,000 in replacement and downtime.",
      },
      {
        title: "POLYRIB-V-FR Underground Conveyor Liners",
        client: "Gold Mine, Gauteng",
        challenge:
          "Standard PE liners not meeting underground FR fire safety requirements.",
        solution:
          "POLYRIB-V-FR flame-retardant UHMW PE liners. UL94 V-0 rated.",
        result: "Full underground FR compliance. Zero fire safety incidents.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  "oil-gas": {
    title: "Oil & Gas",
    subtitle: "Reliable materials for harsh environments.",
    image: oilGasImage,
    intro:
      "The oil and gas applications require materials that have the capacity to withstand the chemical effects, pressure and adverse environment. Khanna Polyrib offers stable engineering plastics that offer durability, security and long life cycle in upstream and downstream services.",
    capabilities: [
      "Chemical Compatibility - Hydrocarbon Resistant.",
      "Stress Stability - Stable to pressure.",
      "Thermal Performance - Processes temperature change.",
      "Precision Manufacturing - Quality all the time.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB V", "POLYRIB-V-AS", "KAYLON", "PAKETAL"],
    caseStudies: [
      {
        title: "POLYRIB-V-AS Antistatic Liners – LPG Plant",
        client: "LPG Storage Facility, South Africa",
        challenge:
          "Standard PE liners not meeting ATEX requirements. Static build-up risk.",
        solution:
          "POLYRIB-V-AS antistatic UHMW PE liners. Surface resistivity < 10⁹ Ω, ATEX compliant.",
        result:
          "Full ATEX compliance. Zero static discharge incidents since installation.",
      },
      {
        title: "KAYLON OILON Bushings – Pump Assembly",
        client: "Petrochemical Plant, Secunda",
        challenge:
          "Metal bushings in crude oil pump corroding and seizing every 6 weeks.",
        solution:
          "KAYLON OILON oil-impregnated nylon bushings — self-lubricating, corrosion-proof.",
        result: "Service interval extended from 6 weeks to 18 months.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  packaging: {
    title: "Packaging",
    subtitle: "Lightweight plastics for high-speed systems.",
    image: packagingImage,
    intro:
      "The packaging systems need lightweight, durable, and efficient materials. KhannaPolyrib is a producer of engineering plastics that can be used to facilitate automation, precision, and scalability in packaging processes. Our solutions enhance efficiency but are durable.",
    capabilities: [
      "Lightweight Strength - Energetic system performance.",
      "Wear Resistance - Best operational life.",
      "Custom Sizes- Flexible Production.",
      "Produce to Scale - Stable Supply.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      {
        title: "POLYRIB P Chemical Tank Fabrication",
        client: "Chemical Plant, South Africa",
        challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.",
        solution:
          "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.",
        result:
          "Zero corrosion after 5 years. Maintenance cost reduced by 80%.",
      },
      {
        title: "DIPRA Gate Liners – Acid Storage",
        client: "Mining Chemical Plant",
        challenge: "Sluice gates in acid storage area failing within 6 months.",
        solution:
          "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.",
        result: "Service life extended to over 3 years.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  "pulp-paper": {
    title: "Pulp & Paper",
    subtitle: "Moisture-resistant materials for continuous use.",
    image: pulpPaperImage,
    intro:
      "Moisture and low-friction materials are required in pulp and paper processing settings. Khanna Polyrib offers polymers which enhance performance, durability and efficiency in wet and abrasive environments.",
    capabilities: [
      "Wet Resistance - Does not dry up in damp conditions.",
      "Low Friction -Not rough processing.",
      "Wear Resistance - Long-lasting life of components.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      {
        title: "POLYRIB P Chemical Tank Fabrication",
        client: "Chemical Plant, South Africa",
        challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.",
        solution:
          "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.",
        result:
          "Zero corrosion after 5 years. Maintenance cost reduced by 80%.",
      },
      {
        title: "DIPRA Gate Liners – Acid Storage",
        client: "Mining Chemical Plant",
        challenge: "Sluice gates in acid storage area failing within 6 months.",
        solution:
          "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.",
        result: "Service life extended to over 3 years.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  signage: {
    title: "Signage",
    subtitle: "High-quality plastics for lasting visibility.",
    image: signageImage,
    intro:
      "Signage application needs materials that have a great surface finish and weathering properties. Khanna Polyrib provides good plastic sheets that can be used in indoor and outdoor signage and ensure long time appearance.",
    capabilities: [
      "Surface Finish - Clean and professional look.",
      "Weather Resistance Outdoor resilience.",
      "Fabrication of Easy - Easy machining and easy cuts.",
      "Cyclic Quality - consistency in material performance.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      {
        title: "POLYRIB P Chemical Tank Fabrication",
        client: "Chemical Plant, South Africa",
        challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.",
        solution:
          "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.",
        result:
          "Zero corrosion after 5 years. Maintenance cost reduced by 80%.",
      },
      {
        title: "DIPRA Gate Liners – Acid Storage",
        client: "Mining Chemical Plant",
        challenge: "Sluice gates in acid storage area failing within 6 months.",
        solution:
          "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.",
        result: "Service life extended to over 3 years.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  "sports-recreation": {
    title: "Sports & Recreation",
    subtitle: "Tough, lightweight materials for performance.",
    image: sportsRecreationImage,
    intro:
      "Sport and recreation goods are in need of resilience, security, and resistance to impact. Khanna Polyrib offers engineering plastics that can uphold performance-based recreational equipment and infrastructure.",
    capabilities: [
      "Impact Strength - Viable and sturdy materials.",
      "Lightweight Design - better usability.",
      "Wear Resistance - Long life product.",
      "Custom Manufacturing- Design flexibility.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      {
        title: "POLYRIB P Chemical Tank Fabrication",
        client: "Chemical Plant, South Africa",
        challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.",
        solution:
          "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.",
        result:
          "Zero corrosion after 5 years. Maintenance cost reduced by 80%.",
      },
      {
        title: "DIPRA Gate Liners – Acid Storage",
        client: "Mining Chemical Plant",
        challenge: "Sluice gates in acid storage area failing within 6 months.",
        solution:
          "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.",
        result: "Service life extended to over 3 years.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  transportation: {
    title: "Transportation",
    subtitle: "Engineered plastics for reliable mobility.",
    image: transportationImage,
    intro:
      "Systems of transportation need lightweight and durable materials in order to be efficient and reliable. Khanna Polyrib is a vendor of engineering plastics that are used in infrastructure, vehicle parts, and transit systems with consistent performance.",
    capabilities: [
      "Lightweight Strength - increased efficiency.",
      "Wear Resistance -Less maintenance.",
      "Dimensional Accuracy - Precision components.",
      "Tried and Tested Supply - Constant delivery.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      {
        title: "POLYRIB P Chemical Tank Fabrication",
        client: "Chemical Plant, South Africa",
        challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.",
        solution:
          "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.",
        result:
          "Zero corrosion after 5 years. Maintenance cost reduced by 80%.",
      },
      {
        title: "DIPRA Gate Liners – Acid Storage",
        client: "Mining Chemical Plant",
        challenge: "Sluice gates in acid storage area failing within 6 months.",
        solution:
          "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.",
        result: "Service life extended to over 3 years.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
  "water-waste-water": {
    title: "Water & Waste Water",
    subtitle: "Corrosion-resistant solutions for system longevity",
    image: waterWasteWaterImage,
    intro:
      "The water and wastewater systems require corrosion-resistant and durable materials. Khanna Polyrib offers polymer solutions, which can be treated, stored, and handled on a long-term basis.",
    capabilities: [
      "Corrosion Resistance- Perfectly suited to water systems.",
      "Chemical Stability- Works with treatment chemicals.",
      "Long Service Life - fewer replacements.",
      "Custom Solutions - Application Designs.",
    ],
    products: [
      {
        name: "POLYRIB-V FG – Food Grade UHMW PE",
        use: "Conveyor wear surfaces, bottle guides",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg",
      },
      {
        name: "CUTRITE EMB – HACCP Chopping Boards",
        use: "Colour-coded cutting boards for food prep",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb",
      },
      {
        name: "PAKETAL – FDA Acetal/POM",
        use: "Cutting surfaces, precision food machinery",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
      },
      {
        name: "POLYRIB P – HDPE Boards",
        use: "General food-safe panels and boards",
        href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech",
      },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      {
        title: "POLYRIB P Chemical Tank Fabrication",
        client: "Chemical Plant, South Africa",
        challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.",
        solution:
          "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.",
        result:
          "Zero corrosion after 5 years. Maintenance cost reduced by 80%.",
      },
      {
        title: "DIPRA Gate Liners – Acid Storage",
        client: "Mining Chemical Plant",
        challenge: "Sluice gates in acid storage area failing within 6 months.",
        solution:
          "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.",
        result: "Service life extended to over 3 years.",
      },
    ],
    standards: ["ISO 9001:2015"],
  },
};

export default function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = INDUSTRY_DATA[slug as keyof typeof INDUSTRY_DATA];
  const [activeImage, setActiveImage] = useState<string | null>(null);
  if (!data) return <Navigate to="/industries" replace />;

  // Add more image imports to the industry record's gallery array whenever needed.
  // If no gallery is configured, the main industry image is shown automatically.
  const galleryImages = data.gallery?.length ? data.gallery : [data.image];

  //const ref1 = useScrollFade() as React.RefObject<HTMLElement>;
  //const ref2 = useScrollFade() as React.RefObject<HTMLElement>;
  //const ref3 = useScrollFade() as React.RefObject<HTMLElement>;

  return (
    <div className="pt-16">
      <PageHeroBanner
        eyebrow={data.subtitle}
        title={data.title}
        highlight="Industry"
        image={data.image}
        imageAlt={`${data.title} industry`}
        imagePosition="center center"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Industries", to: "/industries" },
          {
            label: data.title,
          },
        ]}
      />

      <section className="py-8 border-b border-divider">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT SIDE */}
            <div>
              {/* Overview */}
              <p className="section-label mb-3">Overview</p>
              <p className="text-muted-foreground leading-relaxed text-lh">
                {data.intro}
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                {data.materials.map((m) => (
                  <span
                    key={m}
                    className="text-xs px-3 py-1 bg-primary/10 text-primary font-bold rounded-xl"
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Core Capabilities moved here */}
              <div className="mt-8">
                <p className="section-label mb-3">Core Capabilities</p>

                <div className="space-y-3">
                  {data.capabilities.map((c) => (
                    <div
                      key={c}
                      className="flex gap-2 py-2 border-b border-divider last:border-0"
                    >
                      <div className="w-1.5 h-1.5 bg-primary mt-1.5 shrink-0" />
                      <span className="text-lh text-charcoal-light">{c}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {data.standards.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 border border-primary text-charcoal-light rounded-xl"
                    >
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>
              {/* Recommended Products moved here */}
              <p className="section-label mb-3">Recommended Products</p>
              <h2 className="font-heading text-2xl text-charcoal mb-4">
                Polyrib grades for {data.title}
              </h2>

              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                These Polyrib grades are routinely specified in{" "}
                {data.title.toLowerCase()} applications. Contact our technical
                team for grade confirmation.
              </p>

              <div className="mt-6 space-y-3">
                {data.products.map((p) => (
                  <Link
                    key={p.name}
                    to={p.href}
                    className="flex items-center justify-between gap-4 p-4 bg-card border border-primary hover:border-primary/40 hover:shadow-card transition-all duration-200 group rounded-xl"
                  >
                    <div>
                      <div className="font-heading font-semibold text-charcoal text-sm group-hover:text-primary transition-colors duration-200">
                        {p.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {p.use}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                ))}
                <Link
                  to="/contact?tab=quote"
                  className="inline-flex items-center gap-3 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200 rounded-lg"
                >
                  Technical Enquiry <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Image Gallery */}
      <section className="py-10 sm:py-14">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <p className="section-label mb-2">Industrial Gallery</p>
              <h2 className="font-heading text-2xl sm:text-3xl text-charcoal">
                {data.title} Industry Images
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {galleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImage(image)}
                aria-label={`Zoom ${data.title} image ${index + 1}`}
                className="group relative block w-full overflow-hidden bg-surface-subtle border border-border text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl border border-primary"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={image}
                    alt={`${data.title} industry view ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 bg-charcoal/85 text-white px-3 py-2 text-xs font-semibold opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                  <ZoomIn className="w-4 h-4" />
                  View image
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Explore other industries */}
      <section className="py-8 sm:py-10 bg-white border-y border-divider">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <p className="section-label mb-2">Explore More</p>
            <h2 className="font-heading text-2xl sm:text-3xl text-charcoal">
              Industries We Serve
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {allIndustries.map((ind, index) => {
              const Icon =
                industryIcons[ind.slug as keyof typeof industryIcons];
              const isCurrentIndustry = ind.slug === slug;

              return (
                <Link
                  key={ind.slug}
                  to={`/industries/${ind.slug}`}
                  aria-current={isCurrentIndustry ? "page" : undefined}
                  className={`group flex items-center gap-2 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 border bg-card text-xs sm:text-sm font-medium transition-all duration-200 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isCurrentIndustry
                      ? "border-primary text-primary bg-primary/5"
                      : "border-border text-charcoal-light hover:border-primary hover:text-primary"
                  }`}
                  style={{ animationDelay: `${index * 35}ms` }}
                >
                  <Icon
                    className="w-4 h-4 text-primary shrink-0 transition-transform duration-200 group-hover:scale-110"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span className="whitespace-nowrap">{ind.abbr}</span>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Link to="/industries" className="cta-link">
              View all industries <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Full-size image viewer */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${data.title} image viewer`}
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            aria-label="Close image viewer"
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={activeImage}
            alt={`${data.title} enlarged view`}
            onClick={(event) => event.stopPropagation()}
            className="max-w-full max-h-[88vh] w-auto h-auto object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
