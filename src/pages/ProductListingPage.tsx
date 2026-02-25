import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useScrollFade } from "@/hooks/useScrollFade";

const filterConfig = {
  Material: ["PTFE", "PEEK", "POM", "PA6", "PA66", "UHMWPE", "HDPE", "PP"],
  "Diameter (mm)": ["3–10", "10–25", "25–50", "50–100", "100–200", "200–500"],
  "Length (mm)": ["Up to 500", "500–1000", "1000–2000", "2000–3000"],
  Grade: ["Natural", "Black", "Glass Filled", "Carbon Filled", "FDA Grade", "Antistatic"],
};

const products = [
  { id: 1, name: "PTFE Rod – Natural", material: "PTFE", diameter: "3–200mm", length: "500–1000mm", grade: "Natural", desc: "Excellent chemical resistance, low friction. Ideal for seals, bushings, and electrical insulation." },
  { id: 2, name: "PEEK Rod – Natural", material: "PEEK", diameter: "10–150mm", length: "500–2000mm", grade: "Natural", desc: "Outstanding heat and chemical resistance with high mechanical strength." },
  { id: 3, name: "POM Rod – Black", material: "POM", diameter: "5–250mm", length: "1000–3000mm", grade: "Black", desc: "High dimensional stability, excellent machinability for precision components." },
  { id: 4, name: "PA6 Rod – Natural", material: "PA6", diameter: "10–300mm", length: "500–2000mm", grade: "Natural", desc: "Good wear resistance and toughness for gears, bearings, and structural parts." },
  { id: 5, name: "UHMWPE Rod – Natural", material: "UHMWPE", diameter: "20–400mm", length: "500–1000mm", grade: "Natural", desc: "Exceptional abrasion resistance, impact strength and low friction." },
  { id: 6, name: "PTFE Rod – Glass Filled", material: "PTFE", diameter: "5–200mm", length: "500–1000mm", grade: "Glass Filled", desc: "Enhanced creep resistance versus natural PTFE. Suitable for dynamic sealing applications." },
  { id: 7, name: "PA66 GF30 Rod", material: "PA66", diameter: "20–200mm", length: "500–2000mm", grade: "Glass Filled", desc: "Glass-fibre reinforced polyamide with superior stiffness and dimensional stability." },
  { id: 8, name: "HDPE Rod – Black", material: "HDPE", diameter: "10–250mm", length: "1000–3000mm", grade: "Black", desc: "UV stabilised, corrosion resistant. Ideal for outdoor and marine applications." },
  { id: 9, name: "PEEK Rod – Carbon Filled", material: "PEEK", diameter: "10–100mm", length: "500–1000mm", grade: "Carbon Filled", desc: "Improved modulus and thermal conductivity. For precision structural applications." },
  { id: 10, name: "PP Rod – Natural", material: "PP", diameter: "5–200mm", length: "500–3000mm", grade: "Natural", desc: "Excellent chemical resistance and low density. FDA grades available." },
  { id: 11, name: "POM Rod – FDA Grade", material: "POM", diameter: "10–200mm", length: "500–2000mm", grade: "FDA Grade", desc: "Compliant with FDA 21 CFR and EU 10/2011. Suitable for food contact applications." },
  { id: 12, name: "PTFE Tube – Natural", material: "PTFE", diameter: "10–200mm", length: "500–1000mm", grade: "Natural", desc: "Thin-wall and thick-wall tubes. For chemical, pharmaceutical and food industry." },
];

function FilterGroup({ label, options, selected, onChange }: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="filter-section">
      <button
        className="flex items-center justify-between w-full text-left mb-3"
        onClick={() => setOpen(!open)}
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-charcoal">{label}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="space-y-2">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onChange(opt)}
                className="w-3.5 h-3.5 accent-primary"
              />
              <span className="text-sm text-charcoal-light group-hover:text-charcoal transition-colors">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductListingPage() {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const ref = useScrollFade() as React.RefObject<HTMLDivElement>;

  const toggleFilter = (group: string, val: string) => {
    setFilters((prev) => {
      const current = prev[group] || [];
      return {
        ...prev,
        [group]: current.includes(val) ? current.filter((v) => v !== val) : [...current, val],
      };
    });
  };

  const clearFilters = () => setFilters({});
  const activeCount = Object.values(filters).flat().length;

  const filtered = products.filter((p) => {
    const matFilter = filters["Material"] || [];
    const gradeFilter = filters["Grade"] || [];
    if (matFilter.length && !matFilter.includes(p.material)) return false;
    if (gradeFilter.length && !gradeFilter.includes(p.grade)) return false;
    return true;
  });

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-surface-subtle border-b border-divider py-10">
        <div className="container max-w-7xl mx-auto px-6">
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <Link to="/products/semi-finished" className="hover:text-primary">Semi-Finished</Link>
            <span>/</span>
            <span className="text-charcoal">Rods & Tubes</span>
          </nav>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-label mb-2">Semi-Finished Products</p>
              <h1 className="font-heading text-3xl text-charcoal">Rods & Tubes</h1>
            </div>
            <span className="text-sm text-muted-foreground">{filtered.length} products</span>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar filters — desktop */}
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
              {Object.entries(filterConfig).map(([group, opts]) => (
                <FilterGroup
                  key={group}
                  label={group}
                  options={opts}
                  selected={filters[group] || []}
                  onChange={(val) => toggleFilter(group, val)}
                />
              ))}
            </div>
          </aside>

          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4 w-full">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-border text-sm font-medium text-charcoal-light"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters {activeCount > 0 && `(${activeCount})`}
            </button>
          </div>

          {/* Product grid */}
          <div ref={ref} className="flex-1 stagger-children grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 content-start">
            {filtered.map((product) => (
              <Link
                key={product.id}
                to={`/products/detail/${product.id}`}
                className="product-card block group"
              >
                <div className="aspect-[4/3] bg-surface-subtle border-b border-divider flex items-center justify-center">
                  <div className="text-4xl font-heading font-bold text-charcoal/10">{product.material}</div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-heading font-semibold text-charcoal text-sm leading-snug group-hover:text-primary transition-colors duration-200">
                      {product.name}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary font-semibold shrink-0">
                      {product.material}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{product.desc}</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4 text-xs">
                    <div className="text-muted-foreground">Diameter</div>
                    <div className="text-charcoal font-medium">{product.diameter}</div>
                    <div className="text-muted-foreground">Length</div>
                    <div className="text-charcoal font-medium">{product.length}</div>
                    <div className="text-muted-foreground">Grade</div>
                    <div className="text-charcoal font-medium">{product.grade}</div>
                  </div>
                  <div className="cta-link text-xs pt-3 border-t border-divider">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
