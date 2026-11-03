import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Thermometer,
  Beaker,
  Zap,
  Factory,
  Snowflake,
  Sun,
  Flame,
  Droplets,
  FlaskConical,
  TestTube,
  Atom,
  Pill,
  Utensils,
  Circle,
  Gauge,
  Weight,
  MoveHorizontal,
  ShieldCheck,
  Plane,
  Sprout,
  CarFront,
  HardHat,
  Construction,
  Pickaxe,
  Scissors,
  Ship,
  Truck,
  Stethoscope,
  Mountain,
  Fuel,
  Package,
  FileText,
  Signpost,
  Trophy,
  TrainFront,
  Waves,
  Building2,
  Cog,
  Layers3,
  Wrench,
  Award,
  Medal,
  Shield,
  Boxes,
  type LucideIcon,
} from "lucide-react";

import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import manufacturingImage from "@/assets/csr-slider1.jpeg";

// ─── Data ────────────────────────────────────────────────────────────────────

const TEMP_RANGES: {
  id: string;
  label: string;
  range: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "cryo",
    label: "Cryogenic",
    range: "< −100°C",
    description: "Liquid nitrogen, LNG, cryogenic storage",
    icon: Snowflake,
  },
  {
    id: "low",
    label: "Low",
    range: "−100 to −20°C",
    description: "Freezer, refrigeration, cold storage",
    icon: Thermometer,
  },
  {
    id: "ambient",
    label: "Ambient",
    range: "−20 to +80°C",
    description: "Standard industrial, room temperature",
    icon: Sun,
  },
  {
    id: "elevated",
    label: "Elevated",
    range: "+80 to +150°C",
    description: "Hot processing, steam, warm fluids",
    icon: Thermometer,
  },
  {
    id: "high",
    label: "High",
    range: "+150 to +260°C",
    description: "Autoclave, high-temp chemical processes",
    icon: Flame,
  },
  {
    id: "extreme",
    label: "Extreme",
    range: "> +260°C",
    description: "Only specialist materials apply",
    icon: Flame,
  },
];

const CHEMICAL_EXPOSURES: {
  id: string;
  label: string;
  icon: LucideIcon;
}[] = [
  { id: "none", label: "None / Dry Service", icon: Circle },
  { id: "water", label: "Water / Humidity", icon: Droplets },
  { id: "acids", label: "Acids (inorganic)", icon: FlaskConical },
  { id: "alkalis", label: "Alkalis / Bases", icon: TestTube },
  { id: "solvents", label: "Organic Solvents", icon: Atom },
  { id: "oils", label: "Oils & Lubricants", icon: Fuel },
  { id: "food", label: "Food / Beverages", icon: Utensils },
  { id: "pharma", label: "Pharmaceutical media", icon: Pill },
];

// Lucide-based icon for oils and lubricants.
function DropletIcon(props: React.ComponentProps<LucideIcon>) {
  return <Droplets {...props} />;
}

const LOAD_TYPES: {
  id: string;
  label: string;
  desc: string;
  icon: LucideIcon;
}[] = [
  {
    id: "static",
    label: "Static Load",
    desc: "Structural, clamping, fastening — no movement",
    icon: Weight,
  },
  {
    id: "sliding",
    label: "Sliding / Low-friction",
    desc: "Seals, bearings, wear surfaces in slow motion",
    icon: MoveHorizontal,
  },
  {
    id: "dynamic",
    label: "Dynamic / Impact",
    desc: "Repeated loading, shock, vibration, impact",
    icon: Gauge,
  },
  {
    id: "abrasive",
    label: "Abrasive Wear",
    desc: "Bulk materials, scraping, high sliding wear",
    icon: Cog,
  },
  {
    id: "electrical",
    label: "Electrical Insulation",
    desc: "Dielectric use, ESD-sensitive environments",
    icon: ShieldCheck,
  },
];

// ─── Industry Database ───────────────────────────────────────────────────────

const INDUSTRIES: {
  abbr: string;
  slug: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    abbr: "Aerospace",
    slug: "aerospace",
    description:
      "Lightweight engineering components, aircraft interiors, structural parts and protective glazing.",
    icon: Plane,
  },
  {
    abbr: "Agro Processing",
    slug: "agro-processing",
    description:
      "Agricultural machinery, processing equipment, conveyors and food-handling components.",
    icon: Sprout,
  },
  {
    abbr: "Automotive",
    slug: "automotive",
    description:
      "Vehicle components, bearings, bushings, protective panels and under-the-hood applications.",
    icon: CarFront,
  },
  {
    abbr: "Build & Construction",
    slug: "build-construction",
    description:
      "Construction panels, protective glazing, structural components and architectural applications.",
    icon: HardHat,
  },
  {
    abbr: "Cement",
    slug: "cement",
    description:
      "Material handling, chutes, hoppers, liners and abrasion-resistant processing equipment.",
    icon: Construction,
  },
  {
    abbr: "Chemical",
    slug: "chemical",
    description:
      "Chemical storage tanks, scrubbers, pipes, fluid handling and corrosion-resistant equipment.",
    icon: FlaskConical,
  },
  {
    abbr: "Food & Beverage",
    slug: "food-beverage",
    description:
      "Food processing machinery, conveyor systems, cutting boards and hygienic handling equipment.",
    icon: Utensils,
  },
  {
    abbr: "Heavy Equipment",
    slug: "heavy-equipment",
    description:
      "Heavy machinery, wear plates, bearings, bushings and high-load industrial components.",
    icon: Wrench,
  },
  {
    abbr: "Iron & Steel",
    slug: "iron-steel",
    description:
      "Steel production equipment, material transfer systems, industrial liners and wear components.",
    icon: Factory,
  },
  {
    abbr: "Leather",
    slug: "leather",
    description:
      "Leather processing machinery, cutting equipment, machine beds and industrial components.",
    icon: Scissors,
  },
  {
    abbr: "Marine",
    slug: "marine",
    description:
      "Marine equipment, offshore components, corrosion-resistant parts and protective applications.",
    icon: Ship,
  },
  {
    abbr: "Material Handling",
    slug: "material-handling",
    description:
      "Conveyor systems, rollers, guides, wear strips, hoppers and bulk material handling equipment.",
    icon: Boxes,
  },
  {
    abbr: "Medical",
    slug: "medical",
    description:
      "Medical equipment, precision components, protective enclosures and healthcare applications.",
    icon: Stethoscope,
  },
  {
    abbr: "Mining",
    slug: "mining",
    description:
      "Mining equipment, chute liners, conveyor components, wear plates and abrasion-resistant parts.",
    icon: Pickaxe,
  },
  {
    abbr: "Oil & Gas",
    slug: "oil-gas",
    description:
      "Oilfield equipment, fluid handling systems, protective components and industrial applications.",
    icon: Fuel,
  },
  {
    abbr: "Packaging",
    slug: "packaging",
    description:
      "Packaging machinery, conveyor components, machine guards and production-line equipment.",
    icon: Package,
  },
  {
    abbr: "Pulp & Paper",
    slug: "pulp-paper",
    description:
      "Paper manufacturing machinery, rollers, conveyor components and chemical-resistant equipment.",
    icon: FileText,
  },
  {
    abbr: "Signage",
    slug: "signage",
    description:
      "Display panels, illuminated signage, advertising boards and architectural graphics.",
    icon: Signpost,
  },
  {
    abbr: "Sports & Recreation",
    slug: "sports-recreation",
    description:
      "Sports equipment, recreational installations, playground components and protective surfaces.",
    icon: Trophy,
  },
  {
    abbr: "Transportation",
    slug: "transportation",
    description:
      "Railway components, vehicle interiors, transport infrastructure and protective applications.",
    icon: TrainFront,
  },
  {
    abbr: "Water & Waste Water",
    slug: "water-waste-water",
    description:
      "Water treatment plants, wastewater systems, tanks, filtration and fluid handling equipment.",
    icon: Waves,
  },
];

// ─── Materials Database ──────────────────────────────────────────────────────

const MATERIALS_DB = [
  {
    id: "polyrib-v",
    name: "POLYRIB V",
    full: "UHMW Polyethylene — Polyrib's abrasion & impact grade",

    industries: [
      "automotive",
      "chemical",
      "food-beverage",
      "heavy-equipment",
      "material-handling",
      "medical",
      "mining",
      "pulp-paper",
      "transportation",
      "water-waste-water",
    ],

    scores: {
      cryo: 5,
      low: 5,
      ambient: 5,
      elevated: 2,
      high: 0,
      extreme: 0,
      none: 4,
      water: 5,
      acids: 4,
      alkalis: 4,
      solvents: 3,
      oils: 4,
      food: 5,
      pharma: 4,
      static: 3,
      sliding: 5,
      dynamic: 5,
      abrasive: 5,
      electrical: 3,
    },

    keyProps:
      "Highest abrasion resistance, self-lubricating, food grade & antistatic grades",
    maxTemp: "+80°C",
    minTemp: "−200°C",
    colour: "Natural / Black / Blue",
    forms: "Sheets, Blocks, Strips",

    note: "Unmatched abrasion resistance. Food grade (POLYRIB-V FG), antistatic (POLYRIB-V-AS) and FR (POLYRIB-V-FR) grades available.",

    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v",
  },

  {
    id: "polyrib-h",
    name: "POLYRIB H",
    full: "HDPE — Polyrib's chemical resistance & outdoor durability grade",

    industries: [
      "aerospace",
      "agro-processing",
      "automotive",
      "build-construction",
      "chemical",
      "food-beverage",
      "heavy-equipment",
      "marine",
      "material-handling",
      "medical",
      "mining",
      "oil-gas",
      "pulp-paper",
      "signage",
      "sports-recreation",
      "transportation",
      "water-waste-water",
    ],

    scores: {
      cryo: 3,
      low: 4,
      ambient: 5,
      elevated: 2,
      high: 0,
      extreme: 0,
      none: 4,
      water: 5,
      acids: 4,
      alkalis: 4,
      solvents: 2,
      oils: 3,
      food: 4,
      pharma: 2,
      static: 4,
      sliding: 3,
      dynamic: 4,
      abrasive: 3,
      electrical: 3,
    },

    keyProps:
      "Chemical resistance, UV-stabilised, glass-lined FRP grades, marine rated",
    maxTemp: "+80°C",
    minTemp: "−60°C",
    colour: "Natural / Black / Colours",
    forms: "Sheets, Boards, Rolls",

    note: "14 specialist grades including UV-fast, glass-lined CED, playground and marine variants. Ideal for outdoor, marine and construction.",

    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-h",
  },

  {
    id: "polyrib-p",
    name: "POLYRIB P",
    full: "Polypropylene — Polyrib's chemical tank & fabrication grade",

    industries: [
      "agro-processing",
      "automotive",
      "build-construction",
      "chemical",
      "food-beverage",
      "material-handling",
      "medical",
      "mining",
      "signage",
      "sports-recreation",
      "water-waste-water",
    ],

    scores: {
      cryo: 0,
      low: 1,
      ambient: 5,
      elevated: 3,
      high: 1,
      extreme: 0,
      none: 3,
      water: 5,
      acids: 5,
      alkalis: 5,
      solvents: 2,
      oils: 3,
      food: 5,
      pharma: 3,
      static: 3,
      sliding: 2,
      dynamic: 2,
      abrasive: 2,
      electrical: 3,
    },

    keyProps:
      "Outstanding acid/alkali resistance, weldable for tank fabrication, RIPLA cutting board grades",
    maxTemp: "+100°C",
    minTemp: "−10°C",
    colour: "Natural / Grey",
    forms: "Sheets, Blocks, Boards",

    note: "The standard for chemical tanks, acid-handling equipment and scrubbers. RIPLA sub-range is the industry standard for leather cutting machines.",

    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p",
  },

  {
    id: "pcclear",
    name: "PCCLEAR",
    full: "Polycarbonate — Polyrib's high-clarity glazing & display grade",

    industries: [
      "aerospace",
      "agro-processing",
      "automotive",
      "build-construction",
      "chemical",
      "food-beverage",
      "heavy-equipment",
      "marine",
      "material-handling",
      "medical",
      "mining",
      "oil-gas",
      "pulp-paper",
      "signage",
      "sports-recreation",
      "transportation",
      "water-waste-water",
    ],

    scores: {
      cryo: 2,
      low: 3,
      ambient: 5,
      elevated: 4,
      high: 2,
      extreme: 0,
      none: 5,
      water: 4,
      acids: 2,
      alkalis: 2,
      solvents: 2,
      oils: 3,
      food: 2,
      pharma: 3,
      static: 5,
      sliding: 2,
      dynamic: 5,
      abrasive: 2,
      electrical: 4,
    },

    keyProps:
      "250× stronger than glass, high optical clarity, UV-protected & hard coat grades",
    maxTemp: "+120°C",
    minTemp: "−40°C",
    colour: "Clear / Tinted / Opal",
    forms: "Sheets, Rolls",

    note: "7 grades from standard clear to diamond hard-coat and UV-protected. Architectural, retail, automotive and industrial glazing applications.",

    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/pcclear",
  },

  {
    id: "pakaylon",
    name: "PAKAYLON",
    full: "Cast PA6 Nylon — Polyrib's wear-resistant engineering rod & block",

    industries: [
      "aerospace",
      "agro-processing",
      "automotive",
      "build-construction",
      "chemical",
      "food-beverage",
      "heavy-equipment",
      "marine",
      "material-handling",
      "medical",
      "mining",
      "oil-gas",
      "pulp-paper",
      "signage",
      "sports-recreation",
      "transportation",
      "water-waste-water",
    ],

    scores: {
      cryo: 2,
      low: 3,
      ambient: 5,
      elevated: 4,
      high: 2,
      extreme: 0,
      none: 5,
      water: 2,
      acids: 2,
      alkalis: 3,
      solvents: 4,
      oils: 5,
      food: 4,
      pharma: 3,
      static: 4,
      sliding: 4,
      dynamic: 5,
      abrasive: 5,
      electrical: 3,
    },

    keyProps:
      "Toughness, wear resistance, oil-impregnated & MoS₂ grades, self-lubricating",
    maxTemp: "+120°C",
    minTemp: "−40°C",
    colour: "Natural / Black / Blue",
    forms: "Rods, Tubes, Sheets, Blocks",

    note: "Best choice for wear-resistant gears, bearings, cams and structural components. 5 grades including oil-filled and MoS₂-impregnated.",

    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/pakaylon",
  },

  {
    id: "paketal",
    name: "PAKETAL",
    full: "Acetal / POM — Polyrib's precision machining grade",

    industries: [
      "aerospace",
      "agro-processing",
      "automotive",
      "food-beverage",
      "medical",
      "mining",
      "pulp-paper",
      "sports-recreation",
      "transportation",
      "water-waste-water",
    ],

    scores: {
      cryo: 2,
      low: 3,
      ambient: 5,
      elevated: 3,
      high: 1,
      extreme: 0,
      none: 5,
      water: 3,
      acids: 2,
      alkalis: 2,
      solvents: 3,
      oils: 4,
      food: 5,
      pharma: 3,
      static: 4,
      sliding: 5,
      dynamic: 4,
      abrasive: 4,
      electrical: 3,
    },

    keyProps:
      "Finest precision machinability, dimensional stability, low friction",
    maxTemp: "+100°C",
    minTemp: "−40°C",
    colour: "Natural / Black",
    forms: "Rods, Tubes, Sheets",

    note: "The benchmark for CNC-machined precision parts — gears, valve seats, bearings, cams. Natural and black grades in stock.",

    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/paketal",
  },

  {
    id: "dipra",
    name: "DIPRA",
    full: "PP Gate Liners & Roof Liners — Polyrib's specialist PP range",

    industries: [
      "agro-processing",
      "automotive",
      "build-construction",
      "chemical",
      "food-beverage",
      "material-handling",
      "medical",
      "mining",
      "signage",
      "sports-recreation",
      "water-waste-water",
    ],

    scores: {
      cryo: 0,
      low: 1,
      ambient: 5,
      elevated: 3,
      high: 1,
      extreme: 0,
      none: 3,
      water: 4,
      acids: 4,
      alkalis: 4,
      solvents: 2,
      oils: 2,
      food: 3,
      pharma: 2,
      static: 3,
      sliding: 2,
      dynamic: 2,
      abrasive: 2,
      electrical: 3,
    },

    keyProps:
      "UV-fast roof liners, gate liner grades, embossed non-slip, dual-colour for signage",
    maxTemp: "+100°C",
    minTemp: "−10°C",
    colour: "Multiple colours",
    forms: "Sheets, Rolls, Film",

    note: "Specialist PP range for mining gate liners, agricultural roof liners, signage, and architectural applications. UV-fast and embossed grades.",

    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/dipra",
  },
];

// ─── Scoring ─────────────────────────────────────────────────────────────────

type Material = (typeof MATERIALS_DB)[number];

type ScoreKey = keyof Material["scores"];

function scoreProduct(
  mat: Material,
  tempId: string,
  chemIds: string[],
  loadId: string,
): number {
  let total = 0;

  total += (mat.scores[tempId as ScoreKey] || 0) * 3;

  const selectedChemicals = chemIds.length ? chemIds : ["none"];

  selectedChemicals.forEach((chemical) => {
    total += (mat.scores[chemical as ScoreKey] || 0) * 2;
  });

  total += (mat.scores[loadId as ScoreKey] || 0) * 2;

  return total;
}

const MATCH_LABEL = (pct: number) => {
  if (pct >= 85)
    return {
      label: "Excellent Match",
      colour: "text-green-700 bg-green-50 border-green-200",
    };

  if (pct >= 65)
    return {
      label: "Good Match",
      colour: "text-blue-700 bg-blue-50 border-blue-200",
    };

  if (pct >= 45)
    return {
      label: "Possible Match",
      colour: "text-orange-700 bg-orange-50 border-orange-200",
    };

  return {
    label: "Limited Suitability",
    colour: "text-red-700 bg-red-50 border-red-200",
  };
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function MaterialSelectorPage() {
  const [step, setStep] = useState(0);

  const [tempId, setTempId] = useState<string>("");
  const [chemIds, setChemIds] = useState<string[]>([]);
  const [loadId, setLoadId] = useState<string>("");
  const [industryId, setIndustryId] = useState<string>("");

  const [showResults, setShowResults] = useState(false);

  const toggleChem = (id: string) =>
    setChemIds((prev) =>
      prev.includes(id)
        ? prev.filter((chemical) => chemical !== id)
        : [...prev, id],
    );

  const reset = () => {
    setStep(0);
    setTempId("");
    setChemIds([]);
    setLoadId("");
    setIndustryId("");
    setShowResults(false);
  };

  // ─── Industry-Based Material Filtering & Ranking ─────────────────────────

  const results = showResults
    ? MATERIALS_DB.filter((mat) => mat.industries.includes(industryId))
        .map((mat) => {
          const selectedChemicals = chemIds.length ? chemIds : ["none"];

          const maxScore =
            3 * 5 + selectedChemicals.length * 2 * 5 + 2 * 5;

          const raw = scoreProduct(mat, tempId, chemIds, loadId);

          const pct = Math.round((raw / maxScore) * 100);

          return { ...mat, pct };
        })
        .sort((a, b) => b.pct - a.pct)
    : [];

  const canProceed =
    step === 0
      ? !!tempId
      : step === 1
        ? true
        : step === 2
          ? !!loadId
          : !!industryId;

  const selectedIndustry = INDUSTRIES.find(
    (industry) => industry.slug === industryId,
  );

  // ─── Render ──────────────────────────────────────────────────────────────

  const pageTexture = {
    backgroundColor: "#FFFFFF",
    backgroundImage: `
      radial-gradient(circle at 12px 12px, rgba(39, 158, 206, 0.055) 1px, transparent 1.5px),
      linear-gradient(135deg, rgba(39, 158, 206, 0.025) 25%, transparent 25%),
      linear-gradient(315deg, rgba(39, 158, 206, 0.025) 25%, transparent 25%)
    `,
    backgroundSize: "28px 28px, 56px 56px, 56px 56px",
  };

  return (
    <div className="min-h-screen bg-white pt-16" style={pageTexture}>
      {/* Page Header */}

      <PageHeroBanner
        eyebrow="Answer four questions about your application requirements and we'll rank the most suitable thermoplastic materials for your specific use case."
        title="Material"
        highlight="Selector"
        image={manufacturingImage}
        imageAlt="Khanna Polyrib manufacturing facility"
        imagePosition="center center"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Material Selector" },
        ]}
      />

      {/* Main Content */}

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-12">
        {!showResults ? (
          <>
            {/* Progress */}

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-8 sm:mb-10">
              {[0, 1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => {
                      if (s < step) setStep(s);
                    }}
                    className={`w-8 h-8 shrink-0 flex items-center justify-center text-sm font-bold border-2 transition-all duration-200 rounded-xl ${
                      s === step
                        ? "bg-primary border-primary text-primary-foreground"
                        : s < step
                          ? "bg-primary/20 border-primary text-primary cursor-pointer"
                          : "border-divider text-muted-foreground"
                    }`}
                  >
                    {s < step ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      s + 1
                    )}
                  </button>

                  <span
                    className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
                      s === step
                        ? "text-charcoal"
                        : "text-muted-foreground"
                    }`}
                  >
                    {
                      [
                        "Temperature Range",
                        "Chemical Exposure",
                        "Load & Application",
                        "Industry",
                      ][s]
                    }
                  </span>

                  {s < 3 && (
                    <ChevronRight className="w-4 h-4 text-divider shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {/* Step 0: Temperature */}

            {step === 0 && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Thermometer className="w-5 h-5" />
                  </div>

                  <h2 className="font-heading text-xl sm:text-2xl text-charcoal">
                    What is the operating temperature range?
                  </h2>
                </div>

                <p className="text-muted-foreground text-sm mb-6 sm:mb-8">
                  Select the expected continuous service temperature for your
                  application.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {TEMP_RANGES.map((t) => {
                    const Icon = t.icon;

                    return (
                      <button
                        key={t.id}
                        onClick={() => setTempId(t.id)}
                        className={`text-left p-4 sm:p-5 min-w-0 border-2 transition-all duration-200 rounded-xl ${
                          tempId === t.id
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3 gap-2">
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-10 h-10 flex items-center justify-center rounded-xl shrink-0 ${
                                tempId === t.id
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-surface-subtle text-primary"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>

                            <span className="font-heading font-bold text-charcoal">
                              {t.label}
                            </span>
                          </div>

                          {tempId === t.id && (
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          )}
                        </div>

                        <div className="font-mono text-primary text-sm font-bold mb-1">
                          {t.range}
                        </div>

                        <div className="text-xs text-muted-foreground leading-relaxed">
                          {t.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 1: Chemical */}

            {step === 1 && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Beaker className="w-5 h-5" />
                  </div>

                  <h2 className="font-heading text-xl sm:text-2xl text-charcoal">
                    What is the chemical environment?
                  </h2>
                </div>

                <p className="text-muted-foreground text-sm mb-6 sm:mb-8">
                  Select all media the material will be exposed to. Leave all
                  unchecked if dry service.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {CHEMICAL_EXPOSURES.map((c) => {
                    const Icon = c.icon;
                    const isSelected = chemIds.includes(c.id);

                    return (
                      <button
                        key={c.id}
                        onClick={() => toggleChem(c.id)}
                        className={`text-left p-4 min-w-0 border-2 transition-all duration-200 rounded-xl ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3 gap-2">
                          <div
                            className={`w-10 h-10 flex items-center justify-center rounded-xl ${
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "bg-surface-subtle text-primary"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>

                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          )}
                        </div>

                        <div className="font-medium text-charcoal text-sm">
                          {c.label}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  Multiple selections allowed
                </p>
              </div>
            )}

            {/* Step 2: Load */}

            {step === 2 && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>

                  <h2 className="font-heading text-xl sm:text-2xl text-charcoal">
                    What is the mechanical load type?
                  </h2>
                </div>

                <p className="text-muted-foreground text-sm mb-6 sm:mb-8">
                  Select the primary mechanical demand on the material in
                  service.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {LOAD_TYPES.map((l) => {
                    const Icon = l.icon;
                    const isSelected = loadId === l.id;

                    return (
                      <button
                        key={l.id}
                        onClick={() => setLoadId(l.id)}
                        className={`text-left p-4 sm:p-5 min-w-0 border-2 transition-all duration-200 rounded-xl ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3 gap-2">
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-10 h-10 flex items-center justify-center rounded-xl shrink-0 ${
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-surface-subtle text-primary"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>

                            <span className="font-heading font-semibold text-charcoal">
                              {l.label}
                            </span>
                          </div>

                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {l.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Industry */}

            {step === 3 && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Factory className="w-5 h-5" />
                  </div>

                  <h2 className="font-heading text-xl sm:text-2xl text-charcoal">
                    Which industry is your application for?
                  </h2>
                </div>

                <p className="text-muted-foreground text-sm mb-6 sm:mb-8">
                  Select the industry where the thermoplastic material will be
                  used. We will use industry-specific applicability to filter
                  and rank suitable products.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {INDUSTRIES.map((industry) => {
                    const Icon = industry.icon;
                    const isSelected = industryId === industry.slug;

                    return (
                      <button
                        key={industry.slug}
                        onClick={() => setIndustryId(industry.slug)}
                        className={`text-left p-4 sm:p-5 min-w-0 border-2 transition-all duration-200 rounded-xl ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3 gap-2">
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-10 h-10 flex items-center justify-center rounded-xl shrink-0 ${
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-surface-subtle text-primary"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>

                            <span className="font-heading font-bold text-charcoal text-sm sm:text-base">
                              {industry.abbr}
                            </span>
                          </div>

                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {industry.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  Select one primary industry to receive relevant material
                  recommendations.
                </p>
              </div>
            )}

            {/* Navigation */}

            <div className="flex flex-wrap items-center justify-between gap-4 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-divider">
              <button
                onClick={() => (step > 0 ? setStep(step - 1) : undefined)}
                className={`inline-flex items-center gap-2 text-sm font-medium ${
                  step > 0
                    ? "text-charcoal-light hover:text-primary transition-colors"
                    : "invisible"
                }`}
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back
              </button>

              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>

                {step < 3 ? (
                  <button
                    onClick={() => canProceed && setStep(step + 1)}
                    disabled={!canProceed}
                    className={`inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 text-sm font-semibold transition-colors duration-200 rounded-lg ${
                      canProceed
                        ? "bg-primary text-primary-foreground hover:bg-primary-dark"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (canProceed) setShowResults(true);
                    }}
                    disabled={!canProceed}
                    className={`inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 text-sm font-semibold transition-colors duration-200 rounded-lg ${
                      canProceed
                        ? "bg-primary text-primary-foreground hover:bg-primary-dark"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    Find Materials
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Results */

          <div className="animate-fade-in">
            {/* Summary bar */}

            <div className="bg-primary/5 border border-primary/20 p-4 sm:p-5 mb-6 sm:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl">
              <div className="flex flex-wrap gap-3 text-xs min-w-0">
                <span className="flex items-center gap-1.5 text-charcoal-light">
                  <Thermometer className="w-3.5 h-3.5 text-primary shrink-0" />
                  {TEMP_RANGES.find((t) => t.id === tempId)?.range}
                </span>

                {chemIds.length > 0 && (
                  <span className="flex items-center gap-1.5 text-charcoal-light">
                    <Beaker className="w-3.5 h-3.5 text-primary shrink-0" />

                    {chemIds
                      .map(
                        (c) =>
                          CHEMICAL_EXPOSURES.find((e) => e.id === c)?.label,
                      )
                      .join(", ")}
                  </span>
                )}

                <span className="flex items-center gap-1.5 text-charcoal-light">
                  <Zap className="w-3.5 h-3.5 text-primary shrink-0" />
                  {LOAD_TYPES.find((l) => l.id === loadId)?.label}
                </span>

                <span className="flex items-center gap-1.5 text-charcoal-light">
                  <Factory className="w-3.5 h-3.5 text-primary shrink-0" />
                  {selectedIndustry?.abbr}
                </span>
              </div>

              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                New Search
              </button>
            </div>

            <h2 className="font-heading text-xl sm:text-2xl text-charcoal mb-2">
              Recommended Materials
            </h2>

            <p className="text-muted-foreground text-sm mb-6 sm:mb-8">
              Materials applicable to the {selectedIndustry?.abbr} industry,
              ranked according to your specified temperature, chemical and
              mechanical requirements.
            </p>

            {/* Material Results */}

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((mat, i) => {
                  const matchInfo = MATCH_LABEL(mat.pct);

                  return (
                    <div
                      key={mat.id}
                      className={`border p-4 sm:p-6 transition-all duration-200 hover:shadow-card rounded-xl ${
                        i === 0
                          ? "border-primary/40 bg-primary/3"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                          <div
                            className={`w-8 h-8 flex items-center justify-center font-heading font-bold text-sm shrink-0 rounded-xl ${
                              i === 0
                                ? "bg-primary text-primary-foreground"
                                : "bg-surface-subtle text-charcoal-light border border-divider"
                            }`}
                          >
                            #{i + 1}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                              <h3 className="font-heading font-bold text-charcoal text-base sm:text-lg">
                                {mat.name}
                              </h3>

                              <span
                                className={`text-[10px] px-2.5 py-1 border font-bold rounded-xl ${matchInfo.colour}`}
                              >
                                {matchInfo.label}
                              </span>

                              {i === 0 && (
                                <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 bg-primary text-primary-foreground font-bold rounded-xl">
                                  <Award className="w-3 h-3" />
                                  TOP RECOMMENDATION
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-muted-foreground mb-2">
                              {mat.full}
                            </p>

                            <p className="text-sm text-charcoal-light leading-relaxed">
                              {mat.note}
                            </p>
                          </div>
                        </div>

                        {/* Match bar */}

                        <div className="w-full md:min-w-[140px] md:w-auto md:max-w-[180px] shrink-0">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Gauge className="w-3.5 h-3.5 text-primary" />
                              Suitability
                            </span>

                            <span className="font-heading font-bold text-primary text-sm">
                              {mat.pct}%
                            </span>
                          </div>

                          <div className="h-2 bg-divider rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-700 rounded-full"
                              style={{ width: `${mat.pct}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Material Specifications */}

                      <div className="mt-5 pt-4 border-t border-divider grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div className="min-w-0">
                          <span className="text-muted-foreground flex items-center gap-1.5 mb-2">
                            <Thermometer className="w-3.5 h-3.5 text-primary" />
                            Max Temp
                          </span>

                          <span className="font-mono font-semibold text-charcoal">
                            {mat.maxTemp}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <span className="text-muted-foreground flex items-center gap-1.5 mb-2">
                            <Snowflake className="w-3.5 h-3.5 text-primary" />
                            Min Temp
                          </span>

                          <span className="font-mono font-semibold text-charcoal">
                            {mat.minTemp}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <span className="text-muted-foreground flex items-center gap-1.5 mb-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                            Key Property
                          </span>

                          <span className="font-semibold text-charcoal break-words">
                            {mat.keyProps}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <span className="text-muted-foreground flex items-center gap-1.5 mb-2">
                            <Layers3 className="w-3.5 h-3.5 text-primary" />
                            Available Forms
                          </span>

                          <span className="font-semibold text-charcoal">
                            {mat.forms}
                          </span>
                        </div>
                      </div>

                      {/* CTA */}

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <Link to={mat.href} className="cta-link text-xs">
                          View {mat.name} products
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          to="/contact"
                          className="text-xs px-4 py-1.5 bg-primary text-primary-foreground font-semibold hover:bg-primary-dark transition-colors duration-200 inline-flex items-center gap-1.5 rounded-lg"
                        >
                          Request Quote
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* No Industry Matches */

              <div className="border border-divider bg-surface-subtle p-6 sm:p-10 text-center rounded-xl">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Factory className="w-7 h-7" />
                </div>

                <h3 className="font-heading font-bold text-lg text-charcoal mb-2">
                  No Listed Materials for This Industry
                </h3>

                <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
                  Currently, none of the listed materials has a verified
                  industry application mapping for {selectedIndustry?.abbr}.
                  Our technical team can help identify a potentially suitable
                  material for your specific requirements.
                </p>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors rounded-lg"
                >
                  <Wrench className="w-4 h-4" />
                  Contact Technical Team
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* Disclaimer */}

            <div className="mt-8 sm:mt-10 p-4 sm:p-5 bg-surface-subtle border border-divider rounded-xl">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-charcoal">Disclaimer:</strong> This
                tool provides general material guidance based on typical
                property profiles and the industry applications supplied for
                each product. Industry applicability is used to filter
                recommendations, while suitability scores are calculated from
                temperature, chemical exposure and mechanical load
                requirements. Scores are indicative only. Final material
                selection should always be confirmed with our technical
                engineering team, taking into account specific part geometry,
                regulatory requirements, operating conditions and
                application-specific testing.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}