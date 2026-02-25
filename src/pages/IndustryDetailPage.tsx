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
  challenges: string[]; products: { name: string; use: string; href: string }[];
  materials: string[]; caseStudies: { title: string; client: string; challenge: string; solution: string; result: string }[];
  standards: string[]; image1: string; image2: string;
}> = {
  automotive: {
    title: "Automotive", subtitle: "Engineering thermoplastics for body-in-white, assembly, powertrain and logistics",
    image: automotiveImage,
    intro: "KAYLON cast nylon gears and bearings, PAKETAL precision acetal/POM components, POLYRIB V UHMW PE conveyor wear strips, and PCCLEAR polycarbonate safety screens are used by automotive OEMs and Tier 1 suppliers across Southern Africa.",
    challenges: ["High operating temperatures near engine and exhaust systems","Exposure to oils, greases, and coolant fluids","Tight dimensional tolerances for body assembly jigs","Noise and vibration reduction in conveyor and transfer systems"],
    products: [
      { name: "KAYLON NATURAL – Cast Nylon Rods", use: "Gears, bearings, cams, structural components", href: "/products/semi-finished/rods-tubes/kaylon" },
      { name: "PAKETAL – Acetal/POM Rod & Sheet", use: "Precision gears, bearings, valve components", href: "/products/semi-finished/rods-tubes/paketal" },
      { name: "POLYRIB V – UHMW PE Sheets", use: "Body-in-white conveyor wear liners", href: "/products/semi-finished/sheets-blocks/polyrib-v" },
      { name: "POLYRIB-V SUPERSLIDE", use: "Zero-lube slide guides and wear strips", href: "/products/semi-finished/sheets-blocks/polyrib-v" },
      { name: "PCCLEAR – PC Glazing Sheets", use: "Safety screens and instrument panels", href: "/products/semi-finished/sheets-blocks/pcclear" },
    ],
    materials: ["KAYLON", "PAKETAL", "POLYRIB V", "PCCLEAR"],
    caseStudies: [
      { title: "POLYRIB V Wear Strips – Assembly Conveyor", client: "Tier 1 Automotive Supplier, South Africa", challenge: "Steel wear strips on body panel transfer conveyors causing surface scratching and requiring frequent lubrication.", solution: "Replaced with POLYRIB-V SUPERSLIDE self-lubricating strips. Zero-lubrication operation, eliminated surface marking.", result: "Maintenance intervals extended from 2 weeks to 6 months." },
      { title: "KAYLON Gears – Trim Line Drive", client: "OEM Assembly Plant", challenge: "Aluminium drive gears causing noise and corrosion on trim assembly line.", solution: "KAYLON MOLY MoS₂-filled nylon gears — silent, self-lubricating, zero corrosion.", result: "30% noise reduction and elimination of lubrication downtime." },
    ],
    standards: ["RoHS Compliant", "REACH SVHC Compliant", "ISO 9001:2015", "DIN Standards"],
    image1: sheetsImage, image2: machineImage,
  },
  pharmaceutical: {
    title: "Pharmaceutical", subtitle: "FDA, USP and cleanroom-compatible thermoplastics for pharmaceutical processing",
    image: pharmaImage,
    intro: "POLYRIB-V FG food-grade UHMW PE, PAKETAL FDA acetal/POM, and PCCLEAR polycarbonate are used in fill & finish lines, packaging equipment and cleanroom environments across the pharmaceutical sector.",
    challenges: ["Biocompatibility and FDA/USP Class VI requirements","Resistance to aggressive CIP/SIP cleaning agents","Steam autoclave sterilisation requirements","Full batch traceability from raw material to component"],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Tablet press wear surfaces, conveyor liners", href: "/products/semi-finished/sheets-blocks/polyrib-v" },
      { name: "PAKETAL NATURAL – FDA Acetal/POM", use: "Valve seats, seals, precision components", href: "/products/semi-finished/rods-tubes/paketal" },
      { name: "KAYLON NATURAL – Cast Nylon", use: "Bearings and bushings in process equipment", href: "/products/semi-finished/rods-tubes/kaylon" },
      { name: "PCCLEAR – Polycarbonate Sheet", use: "Equipment covers and inspection windows", href: "/products/semi-finished/sheets-blocks/pcclear" },
    ],
    materials: ["POLYRIB-V FG", "PAKETAL", "KAYLON", "PCCLEAR"],
    caseStudies: [
      { title: "POLYRIB-V FG Tablet Press Liners", client: "Pharmaceutical Manufacturer, South Africa", challenge: "Standard wear surfaces failing FDA food-contact compliance.", solution: "POLYRIB-V FG food-grade UHMW PE liners with full FDA 21 CFR certification and material traceability.", result: "Regulatory approval achieved. 18-month service life, zero contamination incidents." },
      { title: "PAKETAL Valve Components – Fill Line", client: "Aseptic Filling Equipment OEM", challenge: "Metal valve seats causing particle contamination risk in a sterile fill line.", solution: "PAKETAL acetal/POM machined valve seats — non-contaminating, dimensionally stable, FDA compliant.", result: "Zero particle contamination events in 12 months." },
    ],
    standards: ["FDA 21 CFR 177", "USP Class VI", "EU GMP Annex 1", "ISO 9001:2015"],
    image1: rodsImage, image2: sheetsImage,
  },
  "food-beverage": {
    title: "Food & Beverage", subtitle: "FDA and food-contact compliant thermoplastics for hygienic processing and cutting boards",
    image: foodImage,
    intro: "POLYRIB-V FG food-grade UHMW PE, CUTRITE HACCP chopping boards, PAKETAL cutting surfaces, and POLYRIB H HDPE are trusted by food manufacturers for conveyor liners, cutting boards, and hygienic processing equipment.",
    challenges: ["FDA 21 CFR and EU 10/2011 food-contact compliance","HACCP colour-coded material requirements","Resistance to cleaning acids, caustics and sanitisers","Blue/detectable grade materials for foreign body control"],
    products: [
      { name: "POLYRIB-V FG – Food Grade UHMW PE", use: "Conveyor wear surfaces, bottle guides", href: "/products/semi-finished/sheets-blocks/polyrib-v" },
      { name: "CUTRITE EMB – HACCP Chopping Boards", use: "Colour-coded cutting boards for food prep", href: "/products/machine-components/chopping-boards/cutrite" },
      { name: "PAKETAL – FDA Acetal/POM", use: "Cutting surfaces, precision food machinery", href: "/products/semi-finished/rods-tubes/paketal" },
      { name: "POLYRIB H – HDPE Boards", use: "General food-safe panels and boards", href: "/products/semi-finished/sheets-blocks/polyrib-h" },
    ],
    materials: ["POLYRIB-V FG", "CUTRITE", "PAKETAL", "POLYRIB H"],
    caseStudies: [
      { title: "CUTRITE HACCP Boards – Meat Processing", client: "Abattoir, South Africa", challenge: "Non-compliant cutting boards failing HACCP audit.", solution: "CUTRITE EMB colour-coded boards across all stations — white, yellow, red, blue, green by food type.", result: "Full HACCP compliance. Audit passed." },
      { title: "POLYRIB-V FG Conveyor Liners – Beverage Line", client: "Beverage Manufacturer", challenge: "PET bottle scratching on standard conveyor at 40,000 bottles/hour.", solution: "POLYRIB-V FG self-lubricating food-grade wear strips. FDA compliant, zero scratching.", result: "Service life extended from 3 weeks to 14 months." },
    ],
    standards: ["FDA 21 CFR 177", "EU 10/2011", "HACCP", "REACH Compliant", "ISO 9001:2015"],
    image1: machineImage, image2: rodsImage,
  },
  chemical: {
    title: "Chemical", subtitle: "PP and HDPE chemical tanks, linings, ductwork and fabricated equipment",
    image: automotiveImage,
    intro: "POLYRIB P polypropylene and POLYRIB H HDPE are the workhorses for chemical tank fabrication, scrubbers, ductwork and lining systems. DIPRA provides specialist gate liner and roof liner grades for chemical storage and processing facilities.",
    challenges: ["Resistance to strong inorganic acids and alkalis","Elevated operating temperatures to +100°C","Weldability for tank and vessel fabrication","UV resistance for outdoor chemical storage"],
    products: [
      { name: "POLYRIB PGX-266 / PGX-226 – PP Sheets", use: "Chemical tanks, scrubbers, ductwork", href: "/products/semi-finished/sheets-blocks/polyrib-p" },
      { name: "POLYRIB HITECH GL – Glass-lined PP", use: "FRP/GRP composite vessel construction", href: "/products/semi-finished/sheets-blocks/polyrib-p" },
      { name: "POLYRIB H – HDPE Sheets", use: "Chemical containment, bunding, linings", href: "/products/semi-finished/sheets-blocks/polyrib-h" },
      { name: "DIPRA – Gate & Liner Range", use: "Gate liners, sluice liners, chemical covers", href: "/products/semi-finished/sheets-blocks/dipra" },
    ],
    materials: ["POLYRIB P", "POLYRIB H", "DIPRA"],
    caseStudies: [
      { title: "POLYRIB P Chemical Tank Fabrication", client: "Chemical Plant, South Africa", challenge: "Steel tanks corroding rapidly in 35% HCl acid storage.", solution: "Welded POLYRIB PGX-266 PP tanks and ductwork. Full resistance to 35% HCl at ambient temperature.", result: "Zero corrosion after 5 years. Maintenance cost reduced by 80%." },
      { title: "DIPRA Gate Liners – Acid Storage", client: "Mining Chemical Plant", challenge: "Sluice gates in acid storage area failing within 6 months.", solution: "DIPRA embossed gate liners — chemical resistant PP with anti-scale surface texture.", result: "Service life extended to over 3 years." },
    ],
    standards: ["REACH SVHC Compliant", "ISO 9001:2015", "SABS Standards", "SANS 1431 HDPE"],
    image1: sheetsImage, image2: machineImage,
  },
  mining: {
    title: "Mining", subtitle: "Wear liners, chute linings, FRP composites and conveyor components for harsh mining environments",
    image: pharmaImage,
    intro: "POLYRIB V UHMW PE is the material of choice for chute linings, conveyor pan liners, and bulk handling systems. ARETE glass-lined composites provide FRP-compatible wear liners for manufactured chutes. POLYRIB-V-FR flame-retardant grade meets underground fire safety requirements.",
    challenges: ["Extreme abrasion from bulk ore and aggregate","High-impact loading from material drop zones","Flame retardancy for underground conveyor applications","Resistance to mine water and chemical attack"],
    products: [
      { name: "POLYRIB-V005 – Standard UHMW PE", use: "Chute linings, pan liners, skirt boards", href: "/products/semi-finished/sheets-blocks/polyrib-v" },
      { name: "POLYRIB-V-FR – Flame Retardant UHMW PE", use: "Underground conveyor liners (FR rated)", href: "/products/semi-finished/sheets-blocks/polyrib-v" },
      { name: "POLYRIB-C – Conductive UHMW PE", use: "Coal mine liners (static dissipating)", href: "/products/semi-finished/sheets-blocks/polyrib-v" },
      { name: "ARETE L-V005 – Glass-lined Composite", use: "FRP chute liner construction", href: "/products/machine-components/application-sheets/arete" },
      { name: "DIPRA Gate Liner – Mining Grade", use: "Gate and sluice liners in processing plants", href: "/products/semi-finished/sheets-blocks/dipra" },
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
    title: "Oil & Gas", subtitle: "Chemical-resistant thermoplastics for offshore, pipeline and process plant applications",
    image: foodImage,
    intro: "POLYRIB V UHMW PE provides wear-resistant liners for slurry pipelines and separation equipment. POLYRIB-V-AS antistatic grade meets ATEX requirements. PAKETAL and KAYLON precision components are used in valve and pump assemblies throughout oil and gas processing plants.",
    challenges: ["Resistance to hydrocarbons, crude oil, H₂S and methanol","Elevated temperature performance to +100°C","Non-sparking requirements for ATEX explosion-risk zones","Dimensional stability under sustained mechanical loading"],
    products: [
      { name: "POLYRIB-V005 – UHMW PE Wear Liners", use: "Slurry pipeline liners, separation equipment", href: "/products/semi-finished/sheets-blocks/polyrib-v" },
      { name: "POLYRIB-V-AS – Antistatic UHMW PE", use: "Lining in ATEX/explosion-risk environments", href: "/products/semi-finished/sheets-blocks/polyrib-v" },
      { name: "KAYLON OILON – Oil-impregnated Nylon", use: "Bearings and bushings in pump assemblies", href: "/products/semi-finished/rods-tubes/kaylon" },
      { name: "PAKETAL NATURAL – Acetal/POM Rod", use: "Valve seats, precision flow control parts", href: "/products/semi-finished/rods-tubes/paketal" },
    ],
    materials: ["POLYRIB V", "POLYRIB-V-AS", "KAYLON", "PAKETAL"],
    caseStudies: [
      { title: "POLYRIB-V-AS Antistatic Liners – LPG Plant", client: "LPG Storage Facility, South Africa", challenge: "Standard PE liners not meeting ATEX requirements. Static build-up risk.", solution: "POLYRIB-V-AS antistatic UHMW PE liners. Surface resistivity < 10⁹ Ω, ATEX compliant.", result: "Full ATEX compliance. Zero static discharge incidents since installation." },
      { title: "KAYLON OILON Bushings – Pump Assembly", client: "Petrochemical Plant, Secunda", challenge: "Metal bushings in crude oil pump corroding and seizing every 6 weeks.", solution: "KAYLON OILON oil-impregnated nylon bushings — self-lubricating, corrosion-proof.", result: "Service interval extended from 6 weeks to 18 months." },
    ],
    standards: ["ATEX Directive", "REACH Compliant", "ISO 9001:2015", "API Standards"],
    image1: machineImage, image2: sheetsImage,
  },
  marine: {
    title: "Marine", subtitle: "UV-stabilised, corrosion-proof HDPE and UHMW PE for marine and offshore applications",
    image: automotiveImage,
    intro: "POLYRIB H HDPE provides the definitive marine solution — UV-stabilised, corrosion-proof, and impact-resistant for boat boards, dock fenders, pontoons and marine infrastructure. POLYRIB V UHMW PE provides ultra-low friction for boat hull liners and dock wear surfaces.",
    challenges: ["Resistance to salt water, UV radiation and biofouling","High impact resistance for wave and vessel loading","Low water absorption and dimensional stability when wet","Non-corroding alternatives to steel and aluminium"],
    products: [
      { name: "POLYRIB-H EXT – Marine HDPE Sheets", use: "Boat boards, dock fenders, marine panels", href: "/products/semi-finished/sheets-blocks/polyrib-h" },
      { name: "POLYRIB-H WR – Water Resistant HDPE", use: "Marine structures, water treatment plant", href: "/products/semi-finished/sheets-blocks/polyrib-h" },
      { name: "POLYRIB-V SUPERSLIDE – UHMW PE", use: "Boat hull liners, dock wear plates", href: "/products/semi-finished/sheets-blocks/polyrib-v" },
      { name: "POLYRIB H – HDPE Boards", use: "Pontoon decking, pier components", href: "/products/semi-finished/sheets-blocks/polyrib-h" },
    ],
    materials: ["POLYRIB H", "POLYRIB-H EXT", "POLYRIB V"],
    caseStudies: [
      { title: "POLYRIB-H EXT Marine Boards – Dock Fenders", client: "Port Authority, Cape Town", challenge: "Timber dock fenders rotting and requiring annual replacement.", solution: "POLYRIB-H EXT UV-stabilised HDPE fender boards. Zero rot, salt-water proof, impact resistant.", result: "10+ year service life projected. Payback in Year 2 vs timber." },
      { title: "POLYRIB V Boat Ramp Wear Plates", client: "Yacht Club, KwaZulu-Natal", challenge: "Boat ramp surface wearing from fibreglass hull contact during launch.", solution: "POLYRIB-V SUPERSLIDE UHMW PE wear plates — self-lubricating, no hull scratching.", result: "Zero hull damage incidents. Minimal wear after 3 years of daily use." },
    ],
    standards: ["ISO 9001:2015", "REACH Compliant", "SANS Standards", "Lloyd's Register Compatible"],
    image1: rodsImage, image2: sheetsImage,
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
              <p className="section-label mb-3">Key Challenges</p>
              <div className="space-y-3">
                {data.challenges.map((c) => (
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

      <section ref={ref2} className="fade-up py-14 border-b border-divider">
        <div className="container max-w-7xl mx-auto px-6">
          <p className="section-label mb-3">Case Studies</p>
          <h2 className="font-heading text-2xl text-charcoal mb-8">Real-world results in {data.title}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.caseStudies.map((cs, i) => (
              <div key={i} className="border border-border bg-card">
                <div className="aspect-video overflow-hidden">
                  <img src={i === 0 ? data.image1 : data.image2} alt={cs.title} className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Quote className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">{cs.client}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-charcoal text-base mb-4">{cs.title}</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Challenge</div>
                      <p className="text-charcoal-light leading-relaxed">{cs.challenge}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Solution</div>
                      <p className="text-charcoal-light leading-relaxed">{cs.solution}</p>
                    </div>
                    <div className="pt-3 border-t border-divider">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <p className="text-charcoal font-medium text-sm">{cs.result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
