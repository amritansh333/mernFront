import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import machineComponentsImage from "@/assets/machine-components.jpg";
import { useScrollFade } from "@/hooks/useScrollFade";

const MC_FILTER_CONFIG: Record<string, string[]> = {
  Category: ["Wear Strips", "Guide Rails", "Chain Guides", "Profiles", "Custom Machined"],
  Industry: ["Food & Beverage", "Automotive", "Pharmaceutical", "Chemical", "Packaging", "Semiconductor"],
  "Machine Type": ["Conveyor Systems", "Packaging Lines", "Assembly Lines", "Processing Equipment", "Cleanroom Systems"],
  "Load Condition": ["Light (Static)", "Medium (Dynamic)", "Heavy (Impact)", "Abrasive"],
  Material: ["UHMWPE", "PA6", "PA6 GF", "POM", "PTFE", "HDPE", "PP"],
};

const MC_PRODUCTS = [
  // Wear Strips
  { id: "mc1", name: "UHMWPE Wear Strip – Natural", category: "Wear Strips", material: "UHMWPE", industry: "Food & Beverage", machineType: "Conveyor Systems", load: "Heavy (Impact)", desc: "Self-lubricating ultra-high molecular weight PE wear strip. Exceptional abrasion resistance for high-throughput conveyor lines.", dims: "20×10mm to 200×60mm", length: "Up to 3000mm", standard: "FDA 21 CFR" },
  { id: "mc2", name: "PA6 Wear Strip – Natural", category: "Wear Strips", material: "PA6", industry: "Automotive", machineType: "Assembly Lines", load: "Medium (Dynamic)", desc: "Cast polyamide wear strip with high rigidity and low moisture absorption. Ideal for assembly and body-in-white applications.", dims: "15×8mm to 150×50mm", length: "Up to 3000mm", standard: "RoHS" },
  { id: "mc3", name: "UHMWPE Wear Strip – FDA Grade", category: "Wear Strips", material: "UHMWPE", industry: "Pharmaceutical", machineType: "Cleanroom Systems", load: "Light (Static)", desc: "White FDA-compliant UHMWPE wear strip for pharmaceutical and food processing environments. Certified hygienic surface.", dims: "10×6mm to 150×50mm", length: "Up to 2000mm", standard: "FDA / USP Class VI" },
  { id: "mc4", name: "PTFE Wear Strip – Natural", category: "Wear Strips", material: "PTFE", industry: "Chemical", machineType: "Processing Equipment", load: "Light (Static)", desc: "Virgin PTFE wear strip with the lowest coefficient of friction. Chemically inert to virtually all media.", dims: "5×3mm to 100×30mm", length: "Up to 1000mm", standard: "ISO 13000" },
  { id: "mc5", name: "POM Wear Strip – Black", category: "Wear Strips", material: "POM", industry: "Packaging", machineType: "Packaging Lines", load: "Medium (Dynamic)", desc: "Precision POM wear strip with excellent dimensional stability. For packaging and bottle-handling conveyor lines.", dims: "10×6mm to 100×40mm", length: "Up to 3000mm", standard: "RoHS" },

  // Guide Rails
  { id: "mc6", name: "UHMWPE Guide Rail – Standard", category: "Guide Rails", material: "UHMWPE", industry: "Food & Beverage", machineType: "Conveyor Systems", load: "Medium (Dynamic)", desc: "Extruded UHMWPE guide rail for bottle, can, and carton guidance. Self-lubricating with excellent noise reduction.", dims: "20×20mm to 100×80mm", length: "1000–4000mm", standard: "FDA 21 CFR" },
  { id: "mc7", name: "HDPE Guide Rail – Blue FDA", category: "Guide Rails", material: "HDPE", industry: "Food & Beverage", machineType: "Packaging Lines", load: "Light (Static)", desc: "Blue-coloured FDA-grade HDPE guide rail for easy visual hygiene inspection in food production lines.", dims: "15×15mm to 80×60mm", length: "Up to 3000mm", standard: "FDA / EU 10/2011" },
  { id: "mc8", name: "POM Guide Rail – Natural", category: "Guide Rails", material: "POM", industry: "Automotive", machineType: "Assembly Lines", load: "Medium (Dynamic)", desc: "Precision-extruded POM guide rail for tight-tolerance guidance of body panels and trims on assembly lines.", dims: "20×15mm to 100×60mm", length: "Up to 3000mm", standard: "RoHS" },
  { id: "mc9", name: "PA6 Guide Rail – Black", category: "Guide Rails", material: "PA6", industry: "Packaging", machineType: "Packaging Lines", load: "Heavy (Impact)", desc: "Reinforced PA6 guide rail for high-speed packaging lines. UV-stabilised black grade for exposed applications.", dims: "25×20mm to 150×80mm", length: "Up to 4000mm", standard: "RoHS" },

  // Chain Guides
  { id: "mc10", name: "PA6 GF Chain Guide – Natural", category: "Chain Guides", material: "PA6 GF", industry: "Automotive", machineType: "Conveyor Systems", load: "Heavy (Impact)", desc: "Glass-fibre reinforced PA6 chain guide with high stiffness and wear resistance. Extends chain life significantly.", dims: "Profile widths 20–200mm", length: "Up to 3000mm", standard: "RoHS" },
  { id: "mc11", name: "UHMWPE Chain Support Rail", category: "Chain Guides", material: "UHMWPE", industry: "Food & Beverage", machineType: "Conveyor Systems", load: "Heavy (Impact)", desc: "Self-lubricating UHMWPE chain support rail. Reduces lubrication requirements and extends chain service intervals.", dims: "Custom profile", length: "Up to 3000mm", standard: "FDA 21 CFR" },
  { id: "mc12", name: "POM Chain Slide Rail", category: "Chain Guides", material: "POM", industry: "Packaging", machineType: "Packaging Lines", load: "Medium (Dynamic)", desc: "Acetal chain slide rail with excellent dimensional stability. Low coefficient of friction for smooth chain operation.", dims: "15×10mm to 100×50mm", length: "Up to 3000mm", standard: "RoHS" },

  // Profiles
  { id: "mc13", name: "PP U-Profile – Natural", category: "Profiles", material: "PP", industry: "Chemical", machineType: "Processing Equipment", load: "Light (Static)", desc: "Extruded polypropylene U-profile for chemical-resistant edge protection and guide applications.", dims: "U: 10–100mm opening", length: "Up to 6000mm", standard: "RoHS / REACH" },
  { id: "mc14", name: "UHMWPE T-Profile – Standard", category: "Profiles", material: "UHMWPE", industry: "Food & Beverage", machineType: "Conveyor Systems", load: "Medium (Dynamic)", desc: "T-section UHMWPE profile for conveyor wear surfaces and dividers. Self-lubricating and food-safe.", dims: "T: 20×20mm to 100×100mm", length: "Up to 3000mm", standard: "FDA 21 CFR" },
  { id: "mc15", name: "PA6 L-Profile – Natural", category: "Profiles", material: "PA6", industry: "Semiconductor", machineType: "Cleanroom Systems", load: "Light (Static)", desc: "Precision PA6 angle profile for wafer handling and semiconductor equipment. Antistatic grades available.", dims: "L: 10×10mm to 80×80mm", length: "Up to 3000mm", standard: "ESD / RoHS" },

  // Custom Machined
  { id: "mc16", name: "Custom PEEK Bearing Bush", category: "Custom Machined", material: "PTFE", industry: "Pharmaceutical", machineType: "Processing Equipment", load: "Medium (Dynamic)", desc: "CNC-machined PEEK bearing bushes to exact customer drawings. High temperature resistance, cleanroom compatible.", dims: "To drawing", length: "To drawing", standard: "USP Class VI" },
  { id: "mc17", name: "Custom UHMWPE Scraper Blade", category: "Custom Machined", material: "UHMWPE", industry: "Food & Beverage", machineType: "Processing Equipment", load: "Abrasive", desc: "Precision-machined UHMWPE scraper blades for tank cleaning and product transfer applications.", dims: "To drawing", length: "To drawing", standard: "FDA 21 CFR" },
  { id: "mc18", name: "Custom PA6 GF Structural Bracket", category: "Custom Machined", material: "PA6 GF", industry: "Automotive", machineType: "Assembly Lines", load: "Heavy (Impact)", desc: "Glass-filled PA6 structural brackets machined to OEM specifications for automotive body assembly.", dims: "To drawing", length: "To drawing", standard: "RoHS" },
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

const CATEGORY_COLORS: Record<string, string> = {
  "Wear Strips": "bg-blue-50 text-blue-700",
  "Guide Rails": "bg-green-50 text-green-700",
  "Chain Guides": "bg-orange-50 text-orange-700",
  "Profiles": "bg-purple-50 text-purple-700",
  "Custom Machined": "bg-red-50 text-red-700",
};

export default function MachineComponentsListingPage() {
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

  const filtered = useMemo(() => MC_PRODUCTS.filter((p) => {
    const cat = filters["Category"] || [];
    const ind = filters["Industry"] || [];
    const mt = filters["Machine Type"] || [];
    const load = filters["Load Condition"] || [];
    const mat = filters["Material"] || [];
    if (cat.length && !cat.includes(p.category)) return false;
    if (ind.length && !ind.includes(p.industry)) return false;
    if (mt.length && !mt.includes(p.machineType)) return false;
    if (load.length && !load.includes(p.load)) return false;
    if (mat.length && !mat.includes(p.material)) return false;
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
            <Link to="/products/machine-components" className="hover:text-primary">Machine Components</Link><span>/</span>
            <span className="text-charcoal">All Components</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="section-label mb-2">Machine Components</p>
              <h1 className="font-heading text-3xl text-charcoal">Thermoplastic Machine Components</h1>
              <p className="text-muted-foreground text-sm mt-2 max-w-xl">
                Wear strips, guide rails, chain guides, profiles and custom machined parts for conveyor, packaging, and material handling systems.
              </p>
            </div>
            <Link to="/contact" className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200">
              Request Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero strip */}
      <div className="h-32 overflow-hidden border-b border-divider">
        <img src={machineComponentsImage} alt="Machine components" className="w-full h-full object-cover object-center" />
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
              {Object.entries(MC_FILTER_CONFIG).map(([group, opts]) => (
                <FilterGroup key={group} label={group} options={opts} selected={filters[group] || []} onChange={(v) => toggleFilter(group, v)} />
              ))}
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-muted-foreground">{filtered.length} products found</span>
            </div>
            <div ref={ref} className="stagger-children grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <Link key={p.id} to={`/products/detail/${p.id}`} className="product-card block group">
                  <div className="p-5 border-b border-divider bg-surface-subtle flex items-center justify-between">
                    <span className={`text-[10px] px-2.5 py-1 font-bold uppercase tracking-wider ${CATEGORY_COLORS[p.category] || "bg-primary/10 text-primary"}`}>
                      {p.category}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary font-bold">{p.material}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-charcoal text-sm leading-snug mb-2 group-hover:text-primary transition-colors duration-200">{p.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4 text-xs border-t border-divider pt-3">
                      <span className="text-muted-foreground">Dimensions</span><span className="text-charcoal font-medium">{p.dims}</span>
                      <span className="text-muted-foreground">Length</span><span className="text-charcoal font-medium">{p.length}</span>
                      <span className="text-muted-foreground">Standard</span><span className="text-charcoal font-medium">{p.standard}</span>
                      <span className="text-muted-foreground">Load</span><span className="text-charcoal font-medium">{p.load}</span>
                    </div>
                    <div className="flex gap-1.5 mb-3">
                      <span className="text-[10px] px-2 py-0.5 bg-surface-subtle border border-divider text-muted-foreground">{p.industry}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-surface-subtle border border-divider text-muted-foreground">{p.machineType}</span>
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
    </div>
  );
}

import React from "react";
