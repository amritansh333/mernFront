import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import sheetsImage from "@/assets/sheets.jpeg";
import { useScrollFade } from "@/hooks/useScrollFade";

const SHEETS_FILTER_CONFIG: Record<string, string[]> = {
  Material: ["PTFE", "PEEK", "POM", "PA6", "PA66", "UHMWPE", "HDPE", "PP", "PVC", "PET"],
  "Thickness (mm)": ["1–5", "5–10", "10–20", "20–50", "50–100", "100–200"],
  "Width (mm)": ["Up to 500", "500–1000", "1000–1500", "1500–2000"],
  Grade: ["Natural", "Black", "Glass Filled", "Carbon Filled", "FDA Grade", "Antistatic", "UV Stabilised"],
  Application: ["Machining / Fabrication", "Lining & Wear", "Seals & Gaskets", "Electrical Insulation", "Food Contact", "Structural"],
};

const SHEETS_PRODUCTS = [
  { id: "s1", name: "PTFE Sheet – Natural", material: "PTFE", thickness: "1–200mm", width: "Up to 1500mm", grade: "Natural", colour: "White", desc: "Virgin-grade PTFE sheet with outstanding chemical resistance and low friction. Non-stick surface, excellent dielectric properties.", thicknessRange: "1–5", widthRange: "Up to 500", application: "Seals & Gaskets" },
  { id: "s2", name: "PTFE Sheet – Black (Carbon Filled)", material: "PTFE", thickness: "2–100mm", width: "Up to 1200mm", grade: "Carbon Filled", colour: "Black", desc: "Carbon-filled PTFE with improved wear and creep resistance versus virgin grade. For dynamic sealing and bearing applications.", thicknessRange: "1–5", widthRange: "Up to 500", application: "Seals & Gaskets" },
  { id: "s3", name: "PEEK Sheet – Natural", material: "PEEK", thickness: "3–100mm", width: "Up to 1000mm", grade: "Natural", colour: "Beige/Natural", desc: "High-performance PEEK sheet offering exceptional heat resistance and structural strength. Machines to tight tolerances.", thicknessRange: "1–5", widthRange: "Up to 500", application: "Machining / Fabrication" },
  { id: "s4", name: "PEEK Sheet – GF30", material: "PEEK", thickness: "3–80mm", width: "Up to 800mm", grade: "Glass Filled", colour: "Dark Brown", desc: "30% glass-fibre reinforced PEEK. Improved stiffness and dimensional stability for structural applications at elevated temperatures.", thicknessRange: "1–5", widthRange: "Up to 500", application: "Structural" },
  { id: "s5", name: "POM Sheet – Natural (Acetal)", material: "POM", thickness: "1–200mm", width: "Up to 2000mm", grade: "Natural", colour: "White", desc: "Dimensionally stable POM sheet with excellent machinability and low friction. For precision components and gears.", thicknessRange: "1–5", widthRange: "1500–2000", application: "Machining / Fabrication" },
  { id: "s6", name: "POM Sheet – Black", material: "POM", thickness: "1–200mm", width: "Up to 2000mm", grade: "Black", colour: "Black", desc: "Black POM sheet with UV stabiliser for outdoor applications. Same mechanical properties as natural grade.", thicknessRange: "1–5", widthRange: "1500–2000", application: "Machining / Fabrication" },
  { id: "s7", name: "POM Sheet – FDA Grade", material: "POM", thickness: "2–100mm", width: "Up to 1500mm", grade: "FDA Grade", colour: "White", desc: "FDA 21 CFR and EU 10/2011 compliant POM sheet. Certified for direct food contact applications.", thicknessRange: "1–5", widthRange: "1000–1500", application: "Food Contact" },
  { id: "s8", name: "PA6 Sheet – Natural", material: "PA6", thickness: "3–200mm", width: "Up to 2000mm", grade: "Natural", colour: "Natural", desc: "Cast PA6 sheet with excellent wear resistance and toughness. Good impact strength even at low temperatures.", thicknessRange: "5–10", widthRange: "1500–2000", application: "Lining & Wear" },
  { id: "s9", name: "PA66 GF30 Sheet", material: "PA66", thickness: "3–100mm", width: "Up to 1500mm", grade: "Glass Filled", colour: "Dark Natural", desc: "Glass-fibre reinforced PA66 sheet. Superior stiffness and creep resistance for load-bearing structural components.", thicknessRange: "5–10", widthRange: "1000–1500", application: "Structural" },
  { id: "s10", name: "UHMWPE Sheet – Natural", material: "UHMWPE", thickness: "3–200mm", width: "Up to 3000mm", grade: "Natural", colour: "White", desc: "Extremely high abrasion resistance, ideal for lining chutes, hoppers, and wear surfaces. Self-lubricating and impact resistant.", thicknessRange: "5–10", widthRange: "1500–2000", application: "Lining & Wear" },
  { id: "s11", name: "UHMWPE Sheet – FDA Grade", material: "UHMWPE", thickness: "3–150mm", width: "Up to 2000mm", grade: "FDA Grade", colour: "White", desc: "FDA-compliant UHMWPE for food processing conveyor components, cutting boards, and hygienic wear surfaces.", thicknessRange: "5–10", widthRange: "1500–2000", application: "Food Contact" },
  { id: "s12", name: "HDPE Sheet – Black", material: "HDPE", thickness: "1–150mm", width: "Up to 3000mm", grade: "UV Stabilised", colour: "Black", desc: "UV-stabilised black HDPE sheet for outdoor and marine applications. Corrosion and impact resistant.", thicknessRange: "1–5", widthRange: "1500–2000", application: "Structural" },
  { id: "s13", name: "PP Sheet – Natural", material: "PP", thickness: "1–100mm", width: "Up to 2000mm", grade: "Natural", colour: "Natural", desc: "Excellent chemical resistance to acids, alkalis and solvents. Low density, suitable for chemical plant linings and tanks.", thicknessRange: "1–5", widthRange: "1500–2000", application: "Lining & Wear" },
  { id: "s14", name: "PVC Sheet – Grey", material: "PVC", thickness: "1–50mm", width: "Up to 2000mm", grade: "Natural", colour: "Light Grey", desc: "Rigid PVC sheet with good chemical resistance and weldability. For chemical plant, tanks, and general fabrication.", thicknessRange: "1–5", widthRange: "1500–2000", application: "Lining & Wear" },
  { id: "s15", name: "PET Sheet – Natural", material: "PET", thickness: "1–100mm", width: "Up to 1500mm", grade: "Natural", colour: "Clear/Natural", desc: "Good stiffness, dimensional stability, and excellent electrical insulation properties.", thicknessRange: "1–5", widthRange: "1000–1500", application: "Electrical Insulation" },
  { id: "s16", name: "PA6 Antistatic Sheet", material: "PA6", thickness: "3–100mm", width: "Up to 2000mm", grade: "Antistatic", colour: "Black", desc: "Carbon-black loaded PA6 sheet with permanent antistatic/conductive properties. For ESD-safe applications in semiconductor environments.", thicknessRange: "5–10", widthRange: "1500–2000", application: "Electrical Insulation" },
];

function FilterGroup({ label, options, selected, onChange }: { label: string; options: string[]; selected: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="filter-section">
      <button className="flex items-center justify-between w-full text-left mb-3" onClick={() => setOpen(!open)}>
        <span className="text-xs font-semibold uppercase tracking-widest text-charcoal">{label}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="space-y-2">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={selected.includes(opt)} onChange={() => onChange(opt)} className="w-3.5 h-3.5 accent-primary" />
              <span className="text-sm text-charcoal-light group-hover:text-charcoal transition-colors">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SheetsListingPage() {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const ref = useScrollFade() as React.RefObject<HTMLDivElement>;

  const toggleFilter = (group: string, val: string) => {
    setFilters((prev) => {
      const cur = prev[group] || [];
      return { ...prev, [group]: cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val] };
    });
  };
  const clearFilters = () => setFilters({});
  const activeCount = Object.values(filters).flat().length;

  const filtered = useMemo(() => SHEETS_PRODUCTS.filter((p) => {
    const mat = filters["Material"] || [];
    const grade = filters["Grade"] || [];
    const app = filters["Application"] || [];
    if (mat.length && !mat.includes(p.material)) return false;
    if (grade.length && !grade.includes(p.grade)) return false;
    if (app.length && !app.includes(p.application)) return false;
    return true;
  }), [filters]);

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-surface-subtle border-b border-divider py-10">
        <div className="container max-w-7xl mx-auto px-6">
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-primary">Home</Link><span>/</span>
            <Link to="/products" className="hover:text-primary">Products</Link><span>/</span>
            <Link to="/products/semi-finished" className="hover:text-primary">Semi-Finished</Link><span>/</span>
            <span className="text-charcoal">Sheets</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="section-label mb-2">Semi-Finished Products</p>
              <h1 className="font-heading text-3xl text-charcoal">Thermoplastic Sheets</h1>
              <p className="text-muted-foreground text-sm mt-2 max-w-xl">
                Precision-cut thermoplastic flat sheets in all standard and engineering-grade materials. Tight thickness tolerances, available ex-stock in standard and cut-to-size.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200">
                Request Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero image strip */}
      <div className="h-32 overflow-hidden border-b border-divider">
        <img src={sheetsImage} alt="Thermoplastic sheets" className="w-full h-full object-cover object-center" />
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Filters */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <span className="font-heading font-semibold text-charcoal text-sm">Filters</span>
                {activeCount > 0 && (
                  <button onClick={clearFilters} className="text-xs text-primary hover:underline flex items-center gap-1">
                    <X className="w-3 h-3" /> Clear ({activeCount})
                  </button>
                )}
              </div>
              {Object.entries(SHEETS_FILTER_CONFIG).map(([group, opts]) => (
                <FilterGroup key={group} label={group} options={opts} selected={filters[group] || []} onChange={(v) => toggleFilter(group, v)} />
              ))}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-muted-foreground">{filtered.length} products found</span>
              <button onClick={() => {}} className="lg:hidden flex items-center gap-2 px-3 py-1.5 border border-border text-xs font-medium text-charcoal-light">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filters {activeCount > 0 && `(${activeCount})`}
              </button>
            </div>
            <div ref={ref} className="stagger-children grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((product) => (
                <Link key={product.id} to={`/products/detail/${product.id}`} className="product-card block group">
                  <div className="aspect-[4/3] bg-surface-subtle border-b border-divider flex items-center justify-center relative overflow-hidden">
                    <div className={`absolute inset-0 opacity-10 ${product.colour === "Black" ? "bg-charcoal" : product.colour === "Light Grey" ? "bg-gray-400" : "bg-white"}`} />
                    <span className="font-heading font-bold text-5xl text-charcoal/10 select-none">{product.material}</span>
                    <div className="absolute bottom-3 right-3 flex gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary font-bold">{product.material}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-surface-subtle border border-divider text-charcoal-light font-medium">{product.colour}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-charcoal text-sm leading-snug mb-2 group-hover:text-primary transition-colors duration-200">{product.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{product.desc}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4 text-xs border-t border-divider pt-3">
                      <span className="text-muted-foreground">Thickness</span><span className="text-charcoal font-medium">{product.thickness}</span>
                      <span className="text-muted-foreground">Width</span><span className="text-charcoal font-medium">{product.width}</span>
                      <span className="text-muted-foreground">Grade</span><span className="text-charcoal font-medium">{product.grade}</span>
                    </div>
                    <div className="cta-link text-xs pt-3 border-t border-divider">View Details <ArrowRight className="w-3.5 h-3.5" /></div>
                  </div>
                </Link>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-3 py-20 text-center">
                  <p className="text-muted-foreground text-sm mb-3">No products match your selected filters.</p>
                  <button onClick={clearFilters} className="text-primary text-sm font-medium hover:underline">Clear all filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spec note */}
      <div className="border-t border-divider bg-surface-subtle py-8">
        <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground max-w-xl">
            All sheets are available in standard stock sizes. Cut-to-size and custom machining available on request. Tolerances per DIN 7706 / ISO 13000 unless otherwise specified.
          </p>
          <Link to="/contact" className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200">
            Request Custom Size <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";
