import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Quote } from "lucide-react";
import automotiveImage from "@/assets/industry-automotive.jpg";
import pharmaImage from "@/assets/industry-pharma.jpg";
import foodImage from "@/assets/industry-food.jpg";
import rodsImage from "@/assets/rods-tubes.jpeg";
import sheetsImage from "@/assets/sheets.jpeg";
import machineImage from "@/assets/machine-components.jpeg";
import { useScrollFade } from "@/hooks/useScrollFade";

const INDUSTRY_DATA: Record<string, {
  title: string; subtitle: string; image: string; intro: string;
  capabilities: string[]; products: { name: string; use: string; href: string }[];
  materials: string[]; caseStudies: { title: string; client: string; challenge: string; solution: string; result: string }[];
  standards: string[]; image1: string; image2: string;
}> = {
  "aerospace": {
    title: "Aerospace", subtitle: "Precision materials for flight-critical performance.",
    image: automotiveImage,
    intro: "The aerospace industry focuses on materials that are lightweight, yet perform very highly regarding strength, precision, and salt durability. Khanna Polyrib provides high-end engineering plastics that reinforce aerospace parts, earth support systems, and ancillaries. Our polymers provide good dimensional stability, wear, and reliability of our polymers even when subjected to continuous mechanical strain. These materials are specific to precision-driven environments and reduce weight, enhance efficiency, and have a long service life. Our solutions are fitted with high safety and operation levels required in the aerospace industry, with monitored manufacture and quality inspection.",
    capabilities: ["Lightweight Strength - Lightweight high-strength-to-weight polymer solutions.","Dimensional Precision - Small high high-tolerance applications.","Wear Resistance - Prolonged use when constantly in service.","Constant Quality - manufacturing processes under the control of ISO."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB-V FG", "CUTRITE", "PAKETAL", "POLYRIB H"],
    caseStudies: [
      { title: "CUTRITE HACCP Boards – Meat Processing", client: "Abattoir, South Africa", challenge: "Non-compliant cutting boards failing HACCP audit.", solution: "CUTRITE EMB colour-coded boards across all stations — white, yellow, red, blue, green by food type.", result: "Full HACCP compliance. Audit passed." },
      { title: "POLYRIB-V FG Conveyor Liners – Beverage Line", client: "Beverage Manufacturer", challenge: "PET bottle scratching on standard conveyor at 40,000 bottles/hour.", solution: "POLYRIB-V FG self-lubricating food-grade wear strips. FDA compliant, zero scratching.", result: "Service life extended from 3 weeks to 14 months." },
    ],
    standards: ["FDA 21 CFR 177", "EU 10/2011", "HACCP", "REACH Compliant", "ISO 9001:2015"],
    image1: machineImage, image2: rodsImage,
  },
  "agro-processing": {
    title: "Agro Processing", subtitle: "Durable polymers for continuous agricultural operations.",
    image: pharmaImage,
    intro: "The operations involved in agro-processing require materials that are dependable when subjected to repeated motions, exposure to moisture, and a constant production process. Khanna Polyrib offers hygienic engineering plastics, which are strong and maintain the proper functioning of agricultural machinery, processing equipment, and handling material flow. We have solutions that can be used to enhance efficiency in the operation and reduce downtime and maintenance. These materials are tough and wear-resistant and can withstand hard working conditions, and help provide a seamless, contamination-free processing. Having the emphasis on performance and long life cycle, we assist the development of modern agro-processing facilities with polymer applications, which are driven by applications.",
    capabilities: ["Waterproofing - Consistent operation in a wet setting.","Durability Wear - Long equipment life.","High uptake -Minimized downtime and replacement.","Application-specific components - Custom Fabrication."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB-V FG", "CUTRITE", "PAKETAL", "POLYRIB H"],
    caseStudies: [
      { title: "CUTRITE HACCP Boards – Meat Processing", client: "Abattoir, South Africa", challenge: "Non-compliant cutting boards failing HACCP audit.", solution: "CUTRITE EMB colour-coded boards across all stations — white, yellow, red, blue, green by food type.", result: "Full HACCP compliance. Audit passed." },
      { title: "POLYRIB-V FG Conveyor Liners – Beverage Line", client: "Beverage Manufacturer", challenge: "PET bottle scratching on standard conveyor at 40,000 bottles/hour.", solution: "POLYRIB-V FG self-lubricating food-grade wear strips. FDA compliant, zero scratching.", result: "Service life extended from 3 weeks to 14 months." },
    ],
    standards: ["FDA 21 CFR 177", "EU 10/2011", "HACCP", "REACH Compliant", "ISO 9001:2015"],
    image1: machineImage, image2: rodsImage,
  },

  "automotive": {
    title: "Automotive", subtitle: "High-performance plastics for speed and automation.",
    image: foodImage,
    intro: "The automobile sector is based on accuracy, time-saving, and durability in the process of manufacture and assembly. Khanna Polyrib produces engineering plastics that improve efficiency in conveyor systems, tooling, fixtures, and machined components. Our materials provide the best wear resistance, low friction, and dimensional stability, hence ideal in large volume automotive production lines. Our polymer solutions are engineered to provide vibration, impact, and repetitive stress resistance, and allow implementation of noise and minimization of maintenance factors, and provide continuous operations within the modern car and EV manufacturing plants.",
    capabilities: ["Low-friction materials - Flowing and moving materials are smooth.", "Long Wear-resistance - gapped performance.", "Precision Machining- Errors within tolerances.", "Scalability in Production - Batch and Tailored production."
],
    products: [
      { name: "POLYRIB H CED – Cast Nylon Rods", use: "Gears, bearings, cams, structural components", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-h/polyrib-h-ced" },
      { name: "ARETE L-V SUPERSLIDE – Acetal/POM Rod & Sheet", use: "Precision gears, bearings, valve components", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/arete/arete-l-v-superslide" },
      { name: "POLYRIB V – UHMW PE Sheets", use: "Body-in-white conveyor wear liners", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v/polyrib-l-v" },
      { name: "POLYRIB-V SUPERSLIDE", use: "Zero-lube slide guides and wear strips", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v/polyrib-v-superslide" }
    ],
    materials: ["KAYLON", "PAKETAL", "POLYRIB V", "PCCLEAR"],
    caseStudies: [
      { title: "POLYRIB V Wear Strips – Assembly Conveyor", client: "Tier 1 Automotive Supplier, South Africa", challenge: "Steel wear strips on body panel transfer conveyors causing surface scratching and requiring frequent lubrication.", solution: "Replaced with POLYRIB-V SUPERSLIDE self-lubricating strips. Zero-lubrication operation, eliminated surface marking.", result: "Maintenance intervals extended from 2 weeks to 6 months." },
      { title: "KAYLON Gears – Trim Line Drive", client: "OEM Assembly Plant", challenge: "Aluminium drive gears causing noise and corrosion on trim assembly line.", solution: "KAYLON MOLY MoS₂-filled nylon gears — silent, self-lubricating, zero corrosion.", result: "30% noise reduction and elimination of lubrication downtime." },
    ],
    standards: ["RoHS Compliant", "REACH SVHC Compliant", "ISO 9001:2015", "DIN Standards"],
    image1: sheetsImage, image2: machineImage,
  },
  "build-construction": {
    title: "Build & Construction", subtitle: "Reliable materials for modern infrastructure.",
    image: automotiveImage,
    intro: "The building and infrastructure construction demand materials that provide stability in the construction and withstand exposure to the environment. Khanna Polyrib distributes superior engineering plastics that could be used as construction equipment, structural materials, and utility systems. Our products are stable under conditions of load, change of weather, and the presence of extended outdoor service. Our solutions of polymer that are lightweight but strong, assist in the efficient construction process, and minimize corrosion-related challenges that are present in conventional materials.",
    capabilities: ["Structural Stability- large load-bearing potential.", "Resistance to weather - Outdoor-fit.", "Corrosion-Free - Bigger life compared to metals.", "Custom Sizes - Sheets, machined parts, and rods."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      { title: "POLYRIB P Chemical Tank Fabrication", client: "Chemical Plant, South Africa", challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.", solution: "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.", result: "Zero corrosion after 5 years. Maintenance cost reduced by 80%." },
      { title: "DIPRA Gate Liners – Acid Storage", client: "Mining Chemical Plant", challenge: "Sluice gates in acid storage area failing within 6 months.", solution: "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.", result: "Service life extended to over 3 years." },
    ],
    standards: ["REACH SVHC Compliant", "ISO 9001:2015", "SABS Standards", "SANS 1431 HDPE"],
    image1: sheetsImage, image2: machineImage,
  },
  "cement": {
    title: "Cement", subtitle: "Wear-resistant plastics for abrasive environments.",
    image: pharmaImage,
    intro: "The manufacturing process of cement encompasses heavy loads, abrasive materials, and harsh conditions. Wear-resistant engineering plastics by Khanna Polyrib are used to enhance the life of equipment and operational characteristics in cement plants. Liners, guides, and material handling components: our solutions are popular in situations that demand toughness and resistance to abrasion. These polymers contribute to sound damping, a lower servicing rate, and increased service life in harsh conditions.",
    capabilities: ["Abrasion Resistance- Cement and clinker wear.", "Impact Strength - Applicable in heavy-duty applications.", "Noise - working conditions enhanced - better plant working conditions.", "Custom Fabrication – Application-specific components"],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      { title: "POLYRIB P Chemical Tank Fabrication", client: "Chemical Plant, South Africa", challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.", solution: "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.", result: "Zero corrosion after 5 years. Maintenance cost reduced by 80%." },
      { title: "DIPRA Gate Liners – Acid Storage", client: "Mining Chemical Plant", challenge: "Sluice gates in acid storage area failing within 6 months.", solution: "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.", result: "Service life extended to over 3 years." },
    ],
    standards: ["REACH SVHC Compliant", "ISO 9001:2015", "SABS Standards", "SANS 1431 HDPE"],
    image1: sheetsImage, image2: machineImage,
  },
  "chemical": {
    title: "Chemical", subtitle: "PP and HDPE chemical tanks, linings, ductwork and fabricated equipment",
    image: automotiveImage,
    intro: "The chemical processing variable environment requires materials that are chemically resistant, dimensionally stable, and safe. The engineering plastics produced by Khanna Polyrib have the ability to deal with corrosive materials, aggressive media, as well as constant exposure. We apply our polymer solutions in tanks, liners, and processing systems in which reliability and material integrity are necessary. Our materials are intended to preserve functionality in severe conditions, aimed at the safety of operations and their durability.",
    capabilities: ["Chemical Resistance- Secure manipulation of acidic media.","Thermal Stability - Can be depended on in different temperatures.","Leak Prevention - Material integrity is high.","ISO Quality Control - Stable performance quality assurance."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      { title: "POLYRIB P Chemical Tank Fabrication", client: "Chemical Plant, South Africa", challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.", solution: "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.", result: "Zero corrosion after 5 years. Maintenance cost reduced by 80%." },
      { title: "DIPRA Gate Liners – Acid Storage", client: "Mining Chemical Plant", challenge: "Sluice gates in acid storage area failing within 6 months.", solution: "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.", result: "Service life extended to over 3 years." },
    ],
    standards: ["REACH SVHC Compliant", "ISO 9001:2015", "SABS Standards", "SANS 1431 HDPE"],
    image1: sheetsImage, image2: machineImage,
  },
  "food-beverage": {
    title: "Food & Beverage", subtitle: "Hygienic materials for clean processing.",
    image: foodImage,
    intro: "Food and beverage operations demand materials that are hygienically clean and durable at the same time, efficient and economical. Khanna Polyrib offers engineering plastics (food grade) that are good for processing, packaged, and handling in material handling systems. We have materials that are resistant to moisture, wear, and cleaning chemicals, thus performing well in hygienic environments. Accurate production will provide a smooth surface and quality equivalence to promote efficient and safe operations.",
    capabilities: ["Safe and hygienic solutions, Food-Grade Materials.","Simple Washability - Laminar non-polluting surfaces.","Wear Resistance - Prolonged service life.","Custom Machining - Component to application."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB-V FG", "CUTRITE", "PAKETAL", "POLYRIB H"],
    caseStudies: [
      { title: "CUTRITE HACCP Boards – Meat Processing", client: "Abattoir, South Africa", challenge: "Non-compliant cutting boards failing HACCP audit.", solution: "CUTRITE EMB colour-coded boards across all stations — white, yellow, red, blue, green by food type.", result: "Full HACCP compliance. Audit passed." },
      { title: "POLYRIB-V FG Conveyor Liners – Beverage Line", client: "Beverage Manufacturer", challenge: "PET bottle scratching on standard conveyor at 40,000 bottles/hour.", solution: "POLYRIB-V FG self-lubricating food-grade wear strips. FDA compliant, zero scratching.", result: "Service life extended from 3 weeks to 14 months." },
    ],
    standards: ["FDA 21 CFR 177", "EU 10/2011", "HACCP", "REACH Compliant", "ISO 9001:2015"],
    image1: machineImage, image2: rodsImage,
  },
  "heavy-equipment": {
    title: "Heavy Equipment", subtitle: "High-strength polymers for extreme loads.",
    image: automotiveImage,
    intro: "There is heavy equipment work, where materials need to withstand the highest loads, vibration, and constant high loads. Khanna Polyrib is a provider of hard-engineering plastics that enhance machine performance and lessen wear between metals. Our products assist in your life to have a longer life span of the component, reduce the cost of maintenance, and enhance the efficiency in challenging industrial settings.",
    capabilities: ["High Impact Strength - Supports heavy loads.", "Wear Performance - fewer component failures.", "Noise Reduction - Better machine functioning.", "Customisation - Customised heavy-duty components."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      { title: "POLYRIB P Chemical Tank Fabrication", client: "Chemical Plant, South Africa", challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.", solution: "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.", result: "Zero corrosion after 5 years. Maintenance cost reduced by 80%." },
      { title: "DIPRA Gate Liners – Acid Storage", client: "Mining Chemical Plant", challenge: "Sluice gates in acid storage area failing within 6 months.", solution: "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.", result: "Service life extended to over 3 years." },
    ],
    standards: ["REACH SVHC Compliant", "ISO 9001:2015", "SABS Standards", "SANS 1431 HDPE"],
    image1: sheetsImage, image2: machineImage,
  },
  "iron-steel": {
    title: "Iron & Steel", subtitle: "Plastics are built for heat and abrasion.",
    image: pharmaImage,
    intro: "Iron and steel facilities work in severe conditions of high temperatures, abrasion, and mechanical load. High-performance polymers by Khanna Polyrib can be used in such adverse conditions to work under high performance. Guides, liners, and wear components are products that use our materials to enhance efficiency and make them easy to maintain. These are some of the solutions that can be used to enhance the safety and operational continuity in the steel processing plants.",
    capabilities: ["Heat Resistance- Does not melt down at high temperatures.", "Abrasion Durability - Process Wear in Metals.", "Dimensional Stability - Second replication.", "Industrial-grade Quality - Constructed to withstand extreme conditions."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      { title: "POLYRIB P Chemical Tank Fabrication", client: "Chemical Plant, South Africa", challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.", solution: "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.", result: "Zero corrosion after 5 years. Maintenance cost reduced by 80%." },
      { title: "DIPRA Gate Liners – Acid Storage", client: "Mining Chemical Plant", challenge: "Sluice gates in acid storage area failing within 6 months.", solution: "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.", result: "Service life extended to over 3 years." },
    ],
    standards: ["REACH SVHC Compliant", "ISO 9001:2015", "SABS Standards", "SANS 1431 HDPE"],
    image1: sheetsImage, image2: machineImage,
  },
  "leather": {
    title: "Leather", subtitle: "High-performance polymers for demanding leather processing environments.",
    image: foodImage,
    intro: "The leather industry requires strict processing procedures in which materials must resist constant movement, chemical exposure, moisture, and abrasion. Khanna Polyrib offers high-performance engineering plastics that ensure consistent performance across all leather production activities, including tanning, finishing, and material handling systems. We offer hygienic, durable polymer solutions tailored to ensure satisfactory machinery processing, reduced friction, and contamination prevention. These materials are highly resistant to chemicals, water, and wear, and can be used to enhance operational effectiveness and reduce downtime and maintenance expenses. We have designed our solutions to be long-term, performance-based, so they can help modern leather processing units achieve the required consistency in quality and productivity.",
    capabilities: ["Chemical Resistance: Reliable performance in tanning and chemical-intensive processes.", "Moisture Resistance: Stable operation in wet and humid environments.", "High Wear Resistance: Extended equipment life under abrasive conditions.", "Custom Fabrication: Application-specific components tailored to your needs."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      { title: "POLYRIB P Chemical Tank Fabrication", client: "Chemical Plant, South Africa", challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.", solution: "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.", result: "Zero corrosion after 5 years. Maintenance cost reduced by 80%." },
      { title: "DIPRA Gate Liners – Acid Storage", client: "Mining Chemical Plant", challenge: "Sluice gates in acid storage area failing within 6 months.", solution: "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.", result: "Service life extended to over 3 years." },
    ],
    standards: ["REACH SVHC Compliant", "ISO 9001:2015", "SABS Standards", "SANS 1431 HDPE"],
    image1: sheetsImage, image2: machineImage,
  },
  "marine": {
    title: "Marine", subtitle: "Corrosion-resistant plastics for marine conditions.",
    image: automotiveImage,
    intro: "Sea conditions subject the materials to moisture, saltwater, and corrosion. Khanna Polyrib offers marine equipment, docks, and offshore corrosion-resistant engineering plastics. We retain the performance and understandable benevolence of our polymers even during extended yields of extreme seas.",
    capabilities: ["Corrosion Resistance - Perfect when exposed to salt waters.","Moisture Stability - Long-term Reliability.","Impact Strength- This is a resilient component.","Custom Fabrication - Marine solutions."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" }
    ],
    materials: ["POLYRIB H", "POLYRIB-H EXT", "POLYRIB V"],
    caseStudies: [
      { title: "POLYRIB-H EXT Marine Boards – Dock Fenders", client: "Port Authority, Cape Town", challenge: "Timber dock fenders rotting and requiring annual replacement.", solution: "POLYRIB-H EXT UV-stabilised HDPE fender boards. Zero rot, salt-water proof, impact resistant.", result: "10+ year service life projected. Payback in Year 2 vs timber." },
      { title: "POLYRIB V Boat Ramp Wear Plates", client: "Yacht Club, KwaZulu-Natal", challenge: "Boat ramp surface wearing from fibreglass hull contact during launch.", solution: "POLYRIB-V SUPERSLIDE UHMW PE wear plates — self-lubricating, no hull scratching.", result: "Zero hull damage incidents. Minimal wear after 3 years of daily use." },
    ],
    standards: ["ISO 9001:2015", "REACH Compliant", "SANS Standards", "Lloyd's Register Compatible"],
    image1: rodsImage, image2: sheetsImage,
  },
  "material-handling": {
    title: "Materail Handling", subtitle: "Low-friction solutions for efficient flow.",
    image: pharmaImage,
    intro: "Effective material handling systems require proper and efficient flow, stability, and reduce downtimes. Khanna Polyrib also provides low-friction and wear-resistant plastics to be used as conveyor, guides, and transfer systems. Our solutions are very productive and do not produce a lot of noise or have a high maintenance level.",
    capabilities: ["Low Friction - There is a smooth flow of materials.", "Wear Resistance - Minimal replacement rate.", "Quieter operations - Noise Reduction.", "Precision Components - Good fit and finish."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      { title: "POLYRIB P Chemical Tank Fabrication", client: "Chemical Plant, South Africa", challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.", solution: "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.", result: "Zero corrosion after 5 years. Maintenance cost reduced by 80%." },
      { title: "DIPRA Gate Liners – Acid Storage", client: "Mining Chemical Plant", challenge: "Sluice gates in acid storage area failing within 6 months.", solution: "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.", result: "Service life extended to over 3 years." },
    ],
    standards: ["REACH SVHC Compliant", "ISO 9001:2015", "SABS Standards", "SANS 1431 HDPE"],
    image1: sheetsImage, image2: machineImage,
  },
  "medical": {
    title: "Medical", subtitle: "Precision plastics for controlled environments.",
    image: foodImage,
    intro: "Medical and healthcare facilities demand accuracy, sterility, and the reliability of the materials. Khanna Polyrib is an Engineering plastic supplier of quality to be used in medical equipment or a clean room. Our products will ensure a good performance with regard to quality and hygiene.",
    capabilities: ["High Clean Materials - Cleanroom approved.","Dimensional Accuracy - Accuracy elements.","Chemical Resistance - Compatibility of safety in cleaning.","Quality Assurance - Managed production."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Tablet press wear surfaces, conveyor liners", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v" },
      { name: "POLYRIB PPX 258 – FDA Acetal/POM", use: "Valve seats, seals, precision components", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ppx-258" },
      { name: "POLYRIB V – UHMW PE Sheets", use: "Body-in-white conveyor wear liners", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v/polyrib-l-v" },
      { name: "POLYRIB-V SUPERSLIDE", use: "Zero-lube slide guides and wear strips", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v/polyrib-v-superslide" }
    ],
    materials: ["POLYRIB-V FG", "PAKETAL", "KAYLON", "PCCLEAR"],
    caseStudies: [
      { title: "POLYRIB-V FG Tablet Press Liners", client: "Pharmaceutical Manufacturer, South Africa", challenge: "Standard wear surfaces failing FDA food-contact compliance.", solution: "POLYRIB-V FG food-grade UHMW PE liners with full FDA 21 CFR certification and material traceability.", result: "Regulatory approval achieved. 18-month service life, zero contamination incidents." },
      { title: "PAKETAL Valve Components – Fill Line", client: "Aseptic Filling Equipment OEM", challenge: "Metal valve seats causing particle contamination risk in a sterile fill line.", solution: "PAKETAL acetal/POM machined valve seats — non-contaminating, dimensionally stable, FDA compliant.", result: "Zero particle contamination events in 12 months." },
    ],
    standards: ["FDA 21 CFR 177", "USP Class VI", "EU GMP Annex 1", "ISO 9001:2015"],
    image1: rodsImage, image2: sheetsImage,
  },
  "mining": {
    title: "Mining", subtitle: "Heavy-duty polymers for severe wear.",
    image: automotiveImage,
    intro: "The mining activities entail abrasion and the harshness of the environment, including impact. Khanna Polyrib provides durable engineering plastics that can prevent permanent wear in the mining machinery and the handling system of materials. Our products assist in enhancing the effectiveness of operations and maintenance downtime.",
    capabilities: ["Extreme Wear resistance - Collection mining loads.","Impact Durability - Has resistance to heavy flows of materials.","Minimum maintenance-Longer working phases","Application-specific designs - Custom Solutions."],
    products: [
      { name: "POLYRIB-V005 – Standard UHMW PE", use: "Chute linings, pan liners, skirt boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v/polyrib-v005" },
      { name: "POLYRIB-V-FR – Flame Retardant UHMW PE", use: "Underground conveyor liners (FR rated)", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v/polyrib-v-fr" },
      { name: "POLYRIB-C – Conductive UHMW PE", use: "Coal mine liners (static dissipating)", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v/polyrib-c" },
      { name: "ARETE L-V005 – Glass-lined Composite", use: "FRP chute liner construction", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/arete/arete-l-v005" }
    ],
    materials: ["POLYRIB V", "POLYRIB-V-FR", "POLYRIB-C", "ARETE", "DIPRA"],
    caseStudies: [
      { title: "POLYRIB V Chute Liners – Iron Ore", client: "Iron Ore Mine, Northern Cape", challenge: "Steel chute liners wearing out every 8 weeks in iron ore transfer point.", solution: "POLYRIB-V005 UHMW PE liners — abrasion coefficient 6× lower than steel.", result: "Liner life extended to 14 months. Annual saving of R480,000 in replacement and downtime." },
      { title: "POLYRIB-V-FR Underground Conveyor Liners", client: "Gold Mine, Gauteng", challenge: "Standard PE liners not meeting underground FR fire safety requirements.", solution: "POLYRIB-V-FR flame-retardant UHMW PE liners. UL94 V-0 rated.", result: "Full underground FR compliance. Zero fire safety incidents." },
    ],
    standards: ["SANS Mine Health & Safety Act", "UL94 V-0 (FR grades)", "ISO 9001:2015", "REACH Compliant"],
    image1: sheetsImage, image2: rodsImage,
  },
  "oil-gas": {
    title: "Oil & Gas", subtitle: "Reliable materials for harsh environments.",
    image: pharmaImage,
    intro: "The oil and gas applications require materials that have the capacity to withstand the chemical effects, pressure and adverse environment. Khanna Polyrib offers stable engineering plastics that offer durability, security and long life cycle in upstream and downstream services.",
    capabilities: ["Chemical Compatibility - Hydrocarbon Resistant.","Stress Stability - Stable to pressure.","Thermal Performance - Processes temperature change.","Precision Manufacturing - Quality all the time."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB V", "POLYRIB-V-AS", "KAYLON", "PAKETAL"],
    caseStudies: [
      { title: "POLYRIB-V-AS Antistatic Liners – LPG Plant", client: "LPG Storage Facility, South Africa", challenge: "Standard PE liners not meeting ATEX requirements. Static build-up risk.", solution: "POLYRIB-V-AS antistatic UHMW PE liners. Surface resistivity < 10⁹ Ω, ATEX compliant.", result: "Full ATEX compliance. Zero static discharge incidents since installation." },
      { title: "KAYLON OILON Bushings – Pump Assembly", client: "Petrochemical Plant, Secunda", challenge: "Metal bushings in crude oil pump corroding and seizing every 6 weeks.", solution: "KAYLON OILON oil-impregnated nylon bushings — self-lubricating, corrosion-proof.", result: "Service interval extended from 6 weeks to 18 months." },
    ],
    standards: ["ATEX Directive", "REACH Compliant", "ISO 9001:2015", "API Standards"],
    image1: machineImage, image2: sheetsImage,
  },
  "packaging": {
    title: "Packaging", subtitle: "Lightweight plastics for high-speed systems.",
    image: foodImage,
    intro: "The packaging systems need lightweight, durable, and efficient materials. KhannaPolyrib is a producer of engineering plastics that can be used to facilitate automation, precision, and scalability in packaging processes. Our solutions enhance efficiency but are durable.",
    capabilities: ["Lightweight Strength - Energetic system performance.", "Wear Resistance - Best operational life.", "Custom Sizes- Flexible Production.", "Produce to Scale - Stable Supply."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      { title: "POLYRIB P Chemical Tank Fabrication", client: "Chemical Plant, South Africa", challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.", solution: "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.", result: "Zero corrosion after 5 years. Maintenance cost reduced by 80%." },
      { title: "DIPRA Gate Liners – Acid Storage", client: "Mining Chemical Plant", challenge: "Sluice gates in acid storage area failing within 6 months.", solution: "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.", result: "Service life extended to over 3 years." },
    ],
    standards: ["REACH SVHC Compliant", "ISO 9001:2015", "SABS Standards", "SANS 1431 HDPE"],
    image1: sheetsImage, image2: machineImage,
  },
  "pulp-paper": {
    title: "Pulp & Paper", subtitle: "Moisture-resistant materials for continuous use.",
    image: automotiveImage,
    intro: "Moisture and low-friction materials are required in pulp and paper processing settings. Khanna Polyrib offers polymers which enhance performance, durability and efficiency in wet and abrasive environments.",
    capabilities: ["Wet Resistance - Does not dry up in damp conditions.", "Low Friction -Not rough processing.", "Wear Resistance - Long-lasting life of components."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      { title: "POLYRIB P Chemical Tank Fabrication", client: "Chemical Plant, South Africa", challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.", solution: "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.", result: "Zero corrosion after 5 years. Maintenance cost reduced by 80%." },
      { title: "DIPRA Gate Liners – Acid Storage", client: "Mining Chemical Plant", challenge: "Sluice gates in acid storage area failing within 6 months.", solution: "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.", result: "Service life extended to over 3 years." },
    ],
    standards: ["REACH SVHC Compliant", "ISO 9001:2015", "SABS Standards", "SANS 1431 HDPE"],
    image1: sheetsImage, image2: machineImage,
  },
  "signage": {
    title: "Signage", subtitle: "High-quality plastics for lasting visibility.",
    image: pharmaImage,
    intro: "Signage application needs materials that have a great surface finish and weathering properties. Khanna Polyrib provides good plastic sheets that can be used in indoor and outdoor signage and ensure long time appearance.",
    capabilities: ["Surface Finish - Clean and professional look.", "Weather Resistance Outdoor resilience.", "Fabrication of Easy - Easy machining and easy cuts.", "Cyclic Quality - consistency in material performance."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      { title: "POLYRIB P Chemical Tank Fabrication", client: "Chemical Plant, South Africa", challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.", solution: "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.", result: "Zero corrosion after 5 years. Maintenance cost reduced by 80%." },
      { title: "DIPRA Gate Liners – Acid Storage", client: "Mining Chemical Plant", challenge: "Sluice gates in acid storage area failing within 6 months.", solution: "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.", result: "Service life extended to over 3 years." },
    ],
    standards: ["REACH SVHC Compliant", "ISO 9001:2015", "SABS Standards", "SANS 1431 HDPE"],
    image1: sheetsImage, image2: machineImage,
  },
  "sports-recreation": {
    title: "Sports & Recreation", subtitle: "Tough, lightweight materials for performance.",
    image: foodImage,
    intro: "Sport and recreation goods are in need of resilience, security, and resistance to impact. Khanna Polyrib offers engineering plastics that can uphold performance-based recreational equipment and infrastructure.",
    capabilities: ["Impact Strength - Viable and sturdy materials.", "Lightweight Design - better usability.", "Wear Resistance - Long life product.", "Custom Manufacturing- Design flexibility."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      { title: "POLYRIB P Chemical Tank Fabrication", client: "Chemical Plant, South Africa", challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.", solution: "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.", result: "Zero corrosion after 5 years. Maintenance cost reduced by 80%." },
      { title: "DIPRA Gate Liners – Acid Storage", client: "Mining Chemical Plant", challenge: "Sluice gates in acid storage area failing within 6 months.", solution: "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.", result: "Service life extended to over 3 years." },
    ],
    standards: ["REACH SVHC Compliant", "ISO 9001:2015", "SABS Standards", "SANS 1431 HDPE"],
    image1: sheetsImage, image2: machineImage,
  },
  "transportation": {
    title: "Transportation", subtitle: "Engineered plastics for reliable mobility.",
    image: automotiveImage,
    intro: "Systems of transportation need lightweight and durable materials in order to be efficient and reliable. Khanna Polyrib is a vendor of engineering plastics that are used in infrastructure, vehicle parts, and transit systems with consistent performance.",
    capabilities: ["Lightweight Strength - increased efficiency.", "Wear Resistance -Less maintenance.", "Dimensional Accuracy - Precision components.", "Tried and Tested Supply - Constant delivery."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      { title: "POLYRIB P Chemical Tank Fabrication", client: "Chemical Plant, South Africa", challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.", solution: "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.", result: "Zero corrosion after 5 years. Maintenance cost reduced by 80%." },
      { title: "DIPRA Gate Liners – Acid Storage", client: "Mining Chemical Plant", challenge: "Sluice gates in acid storage area failing within 6 months.", solution: "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.", result: "Service life extended to over 3 years." },
    ],
    standards: ["REACH SVHC Compliant", "ISO 9001:2015", "SABS Standards", "SANS 1431 HDPE"],
    image1: sheetsImage, image2: machineImage,
  },
  "water-waste-water": {
    title: "Water & Waste Water", subtitle: "Corrosion-resistant solutions for system longevity",
    image: pharmaImage,
    intro: "The water and wastewater systems require corrosion-resistant and durable materials. Khanna Polyrib offers polymer solutions, which can be treated, stored, and handled on a long-term basis.",
    capabilities: ["Corrosion Resistance- Perfectly suited to water systems.", "Chemical Stability- Works with treatment chemicals.", "Long Service Life - fewer replacements.", "Custom Solutions - Application Designs."],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v-fg" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite/cutrite-emb" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal" },
      { name: "POLYRIB P – HDPE Boards", use: "General food-safe panels and boards", href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p/polyrib-ripla-hitech" },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      { title: "POLYRIB P Chemical Tank Fabrication", client: "Chemical Plant, South Africa", challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.", solution: "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.", result: "Zero corrosion after 5 years. Maintenance cost reduced by 80%." },
      { title: "DIPRA Gate Liners – Acid Storage", client: "Mining Chemical Plant", challenge: "Sluice gates in acid storage area failing within 6 months.", solution: "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.", result: "Service life extended to over 3 years." },
    ],
    standards: ["REACH SVHC Compliant", "ISO 9001:2015", "SABS Standards", "SANS 1431 HDPE"],
    image1: sheetsImage, image2: machineImage,
  },
  
};

export default function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = INDUSTRY_DATA[slug as keyof typeof INDUSTRY_DATA];
  if (!data) return <Navigate to="/industries" replace />;

  const ref1 = useScrollFade() as React.RefObject<HTMLElement>;
  const ref2 = useScrollFade() as React.RefObject<HTMLElement>;
  const ref3 = useScrollFade() as React.RefObject<HTMLElement>;

  return (
    <div className="pt-16">
      <div className="relative min-h-[44vh] flex items-end overflow-hidden bg-charcoal">
        <img src={data.image} alt={data.title} className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 to-transparent" />
        <div className="relative container max-w-7xl mx-auto px-6 py-14">
          <nav className="text-xs text-white/50 mb-5 flex items-center gap-1.5">
            <Link to="/" className="hover:text-white/80">Home</Link><span>/</span>
            <Link to="/industries" className="hover:text-white/80">Industries</Link><span>/</span>
            <span className="text-white/80">{data.title}</span>
          </nav>
          <p className="section-label text-white/50 mb-3">Industry Solutions</p>
          <h1 className="font-heading text-4xl lg:text-5xl text-white mb-3">{data.title}</h1>
          <p className="text-white/65 text-base max-w-xl">{data.subtitle}</p>
        </div>
      </div>

      <section className="py-14 border-b border-divider">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="section-label mb-3">Overview</p>
              <p className="text-muted-foreground leading-relaxed text-sm">{data.intro}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {data.materials.map((m) => (
                  <span key={m} className="text-xs px-3 py-1 bg-primary/10 text-primary font-bold">{m}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="section-label mb-3">Core Capabilities</p>
              <div className="space-y-3">
                {data.capabilities.map((c) => (
                  <div key={c} className="flex gap-3 py-2 border-b border-divider last:border-0">
                    <div className="w-1.5 h-1.5 bg-primary mt-1.5 shrink-0" />
                    <span className="text-sm text-charcoal-light">{c}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {data.standards.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 border border-border text-charcoal-light">
                    <CheckCircle2 className="w-3 h-3 text-primary" />{s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={ref1} className="fade-up py-14 bg-surface-subtle border-b border-divider">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div>
              <p className="section-label mb-3">Recommended Products</p>
              <h2 className="font-heading text-2xl text-charcoal mb-4">Polyrib grades for {data.title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                These Polyrib grades are routinely specified in {data.title.toLowerCase()} applications. Contact our technical team for grade confirmation.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200">
                Technical Enquiry <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-2 space-y-3">
              {data.products.map((p) => (
                <Link key={p.name} to={p.href} className="flex items-center justify-between gap-4 p-4 bg-card border border-border hover:border-primary/40 hover:shadow-card transition-all duration-200 group">
                  <div>
                    <div className="font-heading font-semibold text-charcoal text-sm group-hover:text-primary transition-colors duration-200">{p.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{p.use}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      <section ref={ref3} className="fade-up py-14 bg-primary">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-primary-foreground/60 text-xs tracking-widest uppercase font-semibold mb-3">Speak to an Engineer</p>
            <h2 className="font-heading text-2xl text-primary-foreground mb-3">Get expert guidance for {data.title} applications</h2>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-7">Our technical team has deep knowledge of {data.title.toLowerCase()} application requirements and Polyrib grade performance in your specific operating conditions.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary-foreground text-primary text-sm font-bold hover:bg-surface-subtle transition-colors duration-200">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/tools/material-selector" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-primary-foreground text-sm font-semibold hover:bg-white/10 transition-colors duration-200">
                Material Selector Tool
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
