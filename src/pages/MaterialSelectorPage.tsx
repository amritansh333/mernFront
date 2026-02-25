import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronRight, RotateCcw, Thermometer, Beaker, Zap } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const TEMP_RANGES = [
  { id: "cryo", label: "Cryogenic", range: "< −100°C", description: "Liquid nitrogen, LNG, cryogenic storage" },
  { id: "low", label: "Low", range: "−100 to −20°C", description: "Freezer, refrigeration, cold storage" },
  { id: "ambient", label: "Ambient", range: "−20 to +80°C", description: "Standard industrial, room temperature" },
  { id: "elevated", label: "Elevated", range: "+80 to +150°C", description: "Hot processing, steam, warm fluids" },
  { id: "high", label: "High", range: "+150 to +260°C", description: "Autoclave, high-temp chemical processes" },
  { id: "extreme", label: "Extreme", range: "> +260°C", description: "Only specialist materials apply" },
];

const CHEMICAL_EXPOSURES = [
  { id: "none", label: "None / Dry Service", icon: "○" },
  { id: "water", label: "Water / Humidity", icon: "💧" },
  { id: "acids", label: "Acids (inorganic)", icon: "⚗️" },
  { id: "alkalis", label: "Alkalis / Bases", icon: "🧪" },
  { id: "solvents", label: "Organic Solvents", icon: "🧬" },
  { id: "oils", label: "Oils & Lubricants", icon: "🛢️" },
  { id: "food", label: "Food / Beverages", icon: "🍔" },
  { id: "pharma", label: "Pharmaceutical media", icon: "💊" },
];

const LOAD_TYPES = [
  { id: "static", label: "Static Load", desc: "Structural, clamping, fastening — no movement" },
  { id: "sliding", label: "Sliding / Low-friction", desc: "Seals, bearings, wear surfaces in slow motion" },
  { id: "dynamic", label: "Dynamic / Impact", desc: "Repeated loading, shock, vibration, impact" },
  { id: "abrasive", label: "Abrasive Wear", desc: "Bulk materials, scraping, high sliding wear" },
  { id: "electrical", label: "Electrical Insulation", desc: "Dielectric use, ESD-sensitive environments" },
];

// Scoring function — returns ranked Polyrib brands
const MATERIALS_DB = [
  {
    id: "polyrib-v", name: "POLYRIB V", full: "UHMW Polyethylene — Polyrib's abrasion & impact grade",
    scores: { cryo: 5, low: 5, ambient: 5, elevated: 2, high: 0, extreme: 0, none: 4, water: 5, acids: 4, alkalis: 4, solvents: 3, oils: 4, food: 5, pharma: 4, static: 3, sliding: 5, dynamic: 5, abrasive: 5, electrical: 3 },
    keyProps: "Highest abrasion resistance, self-lubricating, food grade & antistatic grades",
    maxTemp: "+80°C", minTemp: "−200°C", colour: "Natural / Black / Blue", forms: "Sheets, Blocks, Strips",
    note: "Unmatched abrasion resistance. Food grade (POLYRIB-V FG), antistatic (POLYRIB-V-AS) and FR (POLYRIB-V-FR) grades available.",
    href: "/products/semi-finished/sheets-blocks/polyrib-v",
  },
  {
    id: "polyrib-h", name: "POLYRIB H", full: "HDPE — Polyrib's chemical resistance & outdoor durability grade",
    scores: { cryo: 3, low: 4, ambient: 5, elevated: 2, high: 0, extreme: 0, none: 4, water: 5, acids: 4, alkalis: 4, solvents: 2, oils: 3, food: 4, pharma: 2, static: 4, sliding: 3, dynamic: 4, abrasive: 3, electrical: 3 },
    keyProps: "Chemical resistance, UV-stabilised, glass-lined FRP grades, marine rated",
    maxTemp: "+80°C", minTemp: "−60°C", colour: "Natural / Black / Colours", forms: "Sheets, Boards, Rolls",
    note: "14 specialist grades including UV-fast, glass-lined CED, playground and marine variants. Ideal for outdoor, marine and construction.",
    href: "/products/semi-finished/sheets-blocks/polyrib-h",
  },
  {
    id: "polyrib-p", name: "POLYRIB P", full: "Polypropylene — Polyrib's chemical tank & fabrication grade",
    scores: { cryo: 0, low: 1, ambient: 5, elevated: 3, high: 1, extreme: 0, none: 3, water: 5, acids: 5, alkalis: 5, solvents: 2, oils: 3, food: 5, pharma: 3, static: 3, sliding: 2, dynamic: 2, abrasive: 2, electrical: 3 },
    keyProps: "Outstanding acid/alkali resistance, weldable for tank fabrication, RIPLA cutting board grades",
    maxTemp: "+100°C", minTemp: "−10°C", colour: "Natural / Grey", forms: "Sheets, Blocks, Boards",
    note: "The standard for chemical tanks, acid-handling equipment and scrubbers. RIPLA sub-range is the industry standard for leather cutting machines.",
    href: "/products/semi-finished/sheets-blocks/polyrib-p",
  },
  {
    id: "pcclear", name: "PCCLEAR", full: "Polycarbonate — Polyrib's high-clarity glazing & display grade",
    scores: { cryo: 2, low: 3, ambient: 5, elevated: 4, high: 2, extreme: 0, none: 5, water: 4, acids: 2, alkalis: 2, solvents: 2, oils: 3, food: 2, pharma: 3, static: 5, sliding: 2, dynamic: 5, abrasive: 2, electrical: 4 },
    keyProps: "250× stronger than glass, high optical clarity, UV-protected & hard coat grades",
    maxTemp: "+120°C", minTemp: "−40°C", colour: "Clear / Tinted / Opal", forms: "Sheets, Rolls",
    note: "7 grades from standard clear to diamond hard-coat and UV-protected. Architectural, retail, automotive and industrial glazing applications.",
    href: "/products/semi-finished/sheets-blocks/pcclear",
  },
  {
    id: "kaylon", name: "KAYLON", full: "Cast PA6 Nylon — Polyrib's wear-resistant engineering rod & block",
    scores: { cryo: 2, low: 3, ambient: 5, elevated: 4, high: 2, extreme: 0, none: 5, water: 2, acids: 2, alkalis: 3, solvents: 4, oils: 5, food: 4, pharma: 3, static: 4, sliding: 4, dynamic: 5, abrasive: 5, electrical: 3 },
    keyProps: "Toughness, wear resistance, oil-impregnated & MoS₂ grades, self-lubricating",
    maxTemp: "+120°C", minTemp: "−40°C", colour: "Natural / Black / Blue", forms: "Rods, Tubes, Sheets, Blocks",
    note: "Best choice for wear-resistant gears, bearings, cams and structural components. 5 grades including oil-filled and MoS₂-impregnated.",
    href: "/products/semi-finished/rods-tubes/kaylon",
  },
  {
    id: "paketal", name: "PAKETAL", full: "Acetal / POM — Polyrib's precision machining grade",
    scores: { cryo: 2, low: 3, ambient: 5, elevated: 3, high: 1, extreme: 0, none: 5, water: 3, acids: 2, alkalis: 2, solvents: 3, oils: 4, food: 5, pharma: 3, static: 4, sliding: 5, dynamic: 4, abrasive: 4, electrical: 3 },
    keyProps: "Finest precision machinability, dimensional stability, low friction",
    maxTemp: "+100°C", minTemp: "−40°C", colour: "Natural / Black", forms: "Rods, Tubes, Sheets",
    note: "The benchmark for CNC-machined precision parts — gears, valve seats, bearings, cams. Natural and black grades in stock.",
    href: "/products/semi-finished/rods-tubes/paketal",
  },
  {
    id: "dipra", name: "DIPRA", full: "PP Gate Liners & Roof Liners — Polyrib's specialist PP range",
    scores: { cryo: 0, low: 1, ambient: 5, elevated: 3, high: 1, extreme: 0, none: 3, water: 4, acids: 4, alkalis: 4, solvents: 2, oils: 2, food: 3, pharma: 2, static: 3, sliding: 2, dynamic: 2, abrasive: 2, electrical: 3 },
    keyProps: "UV-fast roof liners, gate liner grades, embossed non-slip, dual-colour for signage",
    maxTemp: "+100°C", minTemp: "−10°C", colour: "Multiple colours", forms: "Sheets, Rolls, Film",
    note: "Specialist PP range for mining gate liners, agricultural roof liners, signage, and architectural applications. UV-fast and embossed grades.",
    href: "/products/semi-finished/sheets-blocks/dipra",
  },
];

function scoreProduct(mat: typeof MATERIALS_DB[0], tempId: string, chemIds: string[], loadId: string): number {
  let total = 0;
  total += (mat.scores[tempId as keyof typeof mat.scores] || 0) * 3;
  chemIds.forEach((c) => { total += (mat.scores[c as keyof typeof mat.scores] || 0) * 2; });
  total += (mat.scores[loadId as keyof typeof mat.scores] || 0) * 2;
  return total;
}

const MATCH_LABEL = (pct: number) => {
  if (pct >= 85) return { label: "Excellent Match", colour: "text-green-700 bg-green-50 border-green-200" };
  if (pct >= 65) return { label: "Good Match", colour: "text-blue-700 bg-blue-50 border-blue-200" };
  if (pct >= 45) return { label: "Possible Match", colour: "text-orange-700 bg-orange-50 border-orange-200" };
  return { label: "Limited Suitability", colour: "text-red-700 bg-red-50 border-red-200" };
};

export default function MaterialSelectorPage() {
  const [step, setStep] = useState(0);
  const [tempId, setTempId] = useState<string>("");
  const [chemIds, setChemIds] = useState<string[]>([]);
  const [loadId, setLoadId] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const toggleChem = (id: string) => setChemIds((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);

  const reset = () => { setStep(0); setTempId(""); setChemIds([]); setLoadId(""); setShowResults(false); };

  const results = showResults
    ? MATERIALS_DB.map((mat) => {
        const maxScore = 3 * 5 + chemIds.length * 2 * 5 + 2 * 5;
        const raw = scoreProduct(mat, tempId, chemIds.length ? chemIds : ["none"], loadId);
        const pct = Math.round((raw / maxScore) * 100);
        return { ...mat, pct };
      }).sort((a, b) => b.pct - a.pct).slice(0, 5)
    : [];

  const canProceed = step === 0 ? !!tempId : step === 1 ? true : !!loadId;

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-surface-subtle border-b border-divider py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
            <Link to="/" className="hover:text-primary">Home</Link><span>/</span>
            <Link to="/products" className="hover:text-primary">Products</Link><span>/</span>
            <span className="text-charcoal">Material Selector</span>
          </nav>
          <p className="section-label mb-3">Engineering Tool</p>
          <h1 className="font-heading text-4xl text-charcoal mb-3">Material Selector</h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Answer three questions about your application requirements and we'll rank the most suitable thermoplastic materials for your specific use case.
          </p>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-6 py-12">
        {!showResults ? (
          <>
            {/* Progress */}
            <div className="flex items-center gap-3 mb-10">
              {[0, 1, 2].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <button
                    onClick={() => { if (s < step) setStep(s); }}
                    className={`w-8 h-8 flex items-center justify-center text-sm font-bold border-2 transition-all duration-200 ${s === step ? "bg-primary border-primary text-primary-foreground" : s < step ? "bg-primary/20 border-primary text-primary cursor-pointer" : "border-divider text-muted-foreground"}`}
                  >
                    {s < step ? <CheckCircle2 className="w-4 h-4" /> : s + 1}
                  </button>
                  <span className={`text-sm font-medium ${s === step ? "text-charcoal" : "text-muted-foreground"}`}>
                    {["Temperature Range", "Chemical Exposure", "Load & Application"][s]}
                  </span>
                  {s < 2 && <ChevronRight className="w-4 h-4 text-divider" />}
                </div>
              ))}
            </div>

            {/* Step 0: Temperature */}
            {step === 0 && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <Thermometer className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl text-charcoal">What is the operating temperature range?</h2>
                </div>
                <p className="text-muted-foreground text-sm mb-8">Select the expected continuous service temperature for your application.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {TEMP_RANGES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTempId(t.id)}
                      className={`text-left p-5 border-2 transition-all duration-200 ${tempId === t.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-heading font-bold text-charcoal">{t.label}</span>
                        {tempId === t.id && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
                      </div>
                      <div className="font-mono text-primary text-sm font-bold mb-1">{t.range}</div>
                      <div className="text-xs text-muted-foreground">{t.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Chemical */}
            {step === 1 && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <Beaker className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl text-charcoal">What is the chemical environment?</h2>
                </div>
                <p className="text-muted-foreground text-sm mb-8">Select all media the material will be exposed to. Leave all unchecked if dry service.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {CHEMICAL_EXPOSURES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => toggleChem(c.id)}
                      className={`text-left p-4 border-2 transition-all duration-200 ${chemIds.includes(c.id) ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{c.icon}</span>
                        {chemIds.includes(c.id) && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      </div>
                      <div className="font-medium text-charcoal text-sm">{c.label}</div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">Multiple selections allowed</p>
              </div>
            )}

            {/* Step 2: Load */}
            {step === 2 && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl text-charcoal">What is the mechanical load type?</h2>
                </div>
                <p className="text-muted-foreground text-sm mb-8">Select the primary mechanical demand on the material in service.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {LOAD_TYPES.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setLoadId(l.id)}
                      className={`text-left p-5 border-2 transition-all duration-200 ${loadId === l.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="font-heading font-semibold text-charcoal">{l.label}</span>
                        {loadId === l.id && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{l.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-divider">
              <button
                onClick={() => step > 0 ? setStep(step - 1) : undefined}
                className={`text-sm font-medium ${step > 0 ? "text-charcoal-light hover:text-primary transition-colors" : "invisible"}`}
              >
                ← Back
              </button>
              <div className="flex items-center gap-3">
                <button onClick={reset} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
                {step < 2 ? (
                  <button
                    onClick={() => canProceed && setStep(step + 1)}
                    disabled={!canProceed}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold transition-colors duration-200 ${canProceed ? "bg-primary text-primary-foreground hover:bg-primary-dark" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => { if (canProceed) setShowResults(true); }}
                    disabled={!canProceed}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold transition-colors duration-200 ${canProceed ? "bg-primary text-primary-foreground hover:bg-primary-dark" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
                  >
                    Find Materials <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Results */
          <div className="animate-fade-in">
            {/* Summary bar */}
            <div className="bg-primary/5 border border-primary/20 p-4 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-charcoal-light"><Thermometer className="w-3.5 h-3.5 text-primary" />{TEMP_RANGES.find((t) => t.id === tempId)?.range}</span>
                {chemIds.length > 0 && <span className="flex items-center gap-1.5 text-charcoal-light"><Beaker className="w-3.5 h-3.5 text-primary" />{chemIds.map((c) => CHEMICAL_EXPOSURES.find((e) => e.id === c)?.label).join(", ")}</span>}
                <span className="flex items-center gap-1.5 text-charcoal-light"><Zap className="w-3.5 h-3.5 text-primary" />{LOAD_TYPES.find((l) => l.id === loadId)?.label}</span>
              </div>
              <button onClick={reset} className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline shrink-0">
                <RotateCcw className="w-3.5 h-3.5" /> New Search
              </button>
            </div>

            <h2 className="font-heading text-2xl text-charcoal mb-2">Recommended Materials</h2>
            <p className="text-muted-foreground text-sm mb-8">Ranked by suitability for your specified requirements. Contact our technical team to confirm selection.</p>

            <div className="space-y-4">
              {results.map((mat, i) => {
                const matchInfo = MATCH_LABEL(mat.pct);
                return (
                  <div key={mat.id} className={`border p-6 transition-all duration-200 hover:shadow-card ${i === 0 ? "border-primary/40 bg-primary/3" : "border-border bg-card"}`}>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 flex items-center justify-center font-heading font-bold text-sm shrink-0 ${i === 0 ? "bg-primary text-primary-foreground" : "bg-surface-subtle text-charcoal-light border border-divider"}`}>
                          #{i + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h3 className="font-heading font-bold text-charcoal text-lg">{mat.name}</h3>
                            <span className={`text-[10px] px-2.5 py-1 border font-bold ${matchInfo.colour}`}>{matchInfo.label}</span>
                            {i === 0 && <span className="text-[10px] px-2.5 py-1 bg-primary text-primary-foreground font-bold">TOP RECOMMENDATION</span>}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{mat.full}</p>
                          <p className="text-sm text-charcoal-light">{mat.note}</p>
                        </div>
                      </div>
                      {/* Match bar */}
                      <div className="md:min-w-[140px] shrink-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-muted-foreground">Suitability</span>
                          <span className="font-heading font-bold text-primary text-sm">{mat.pct}%</span>
                        </div>
                        <div className="h-2 bg-divider rounded-full overflow-hidden">
                          <div className="h-full bg-primary transition-all duration-700 rounded-full" style={{ width: `${mat.pct}%` }} />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-divider grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div><span className="text-muted-foreground block">Max Temp</span><span className="font-mono font-semibold text-charcoal">{mat.maxTemp}</span></div>
                      <div><span className="text-muted-foreground block">Min Temp</span><span className="font-mono font-semibold text-charcoal">{mat.minTemp}</span></div>
                      <div><span className="text-muted-foreground block">Key Property</span><span className="font-semibold text-charcoal">{mat.keyProps}</span></div>
                      <div><span className="text-muted-foreground block">Available Forms</span><span className="font-semibold text-charcoal">{mat.forms}</span></div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Link to={(mat as typeof mat & { href?: string }).href || "/products"} className="cta-link text-xs">View {mat.name} products <ArrowRight className="w-3.5 h-3.5" /></Link>
                      <Link to="/contact" className="text-xs px-4 py-1.5 bg-primary text-primary-foreground font-semibold hover:bg-primary-dark transition-colors duration-200 inline-flex items-center gap-1.5">
                        Request Quote <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 p-5 bg-surface-subtle border border-divider">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-charcoal">Disclaimer:</strong> This tool provides general material guidance based on typical property profiles. Suitability scores are indicative only. Final material selection should always be confirmed with our technical engineering team, taking into account specific part geometry, regulatory requirements, and application-specific testing.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React from "react";
