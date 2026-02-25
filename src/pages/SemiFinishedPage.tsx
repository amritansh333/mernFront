import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import rodsImage from "@/assets/rods-tubes.jpeg";
import sheetsImage from "@/assets/sheets.jpeg";
import rollsImage from "@/assets/rolls.jpeg";
import { useScrollFade } from "@/hooks/useScrollFade";
import { SEMI_FINISHED_SUBCATEGORIES } from "@/data/polyribProducts";

const subcategoryImages: Record<string, string> = {
  "sheets-blocks": sheetsImage,
  "rods-tubes": rodsImage,
  "coils-rolls": rollsImage,
  "welding-rods": rodsImage,
  "custom-sheets": sheetsImage,
};

export default function SemiFinishedPage() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;

  return (
    <div className="pt-16">
      {/* Page header */}
      <div className="bg-surface-subtle border-b border-divider py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-charcoal">Semi-Finished Products</span>
          </nav>
          <p className="section-label mb-3">Semi-Finished Products</p>
          <h1 className="font-heading text-4xl text-charcoal mb-3">
            Thermoplastic Semi-Finished Products
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Polyrib manufactures rods, tubes, sheets, blocks, welding rods, and coils across our full brand portfolio — POLYRIB V, H, P, PCCLEAR, KAYLON, PAKETAL, DIPRA, and more. Standard stock and custom sizes available.
          </p>
        </div>
      </div>

      {/* Subcategory cards */}
      <section ref={ref} className="fade-up py-16">
        <div className="container max-w-7xl mx-auto px-6">
          <p className="section-label mb-6">Select a Product Form</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEMI_FINISHED_SUBCATEGORIES.map((cat) => (
              <Link key={cat.slug} to={cat.href} className="category-card block group">
                <div className="card-image aspect-[4/3] overflow-hidden bg-surface-subtle">
                  <img
                    src={subcategoryImages[cat.slug] || sheetsImage}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-charcoal mb-2 group-hover:text-primary transition-colors duration-200">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cat.description}</p>
                  <div className="flex items-center gap-1.5 cta-link">
                    View Brands <ArrowRight className="w-4 h-4 explore-arrow" />
                  </div>
                  <div className="card-border-bottom mt-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Materials table */}
      <section className="py-14 bg-surface-subtle border-y border-divider">
        <div className="container max-w-7xl mx-auto px-6">
          <p className="section-label mb-3">Materials Available</p>
          <h2 className="font-heading text-2xl text-charcoal mb-8">Polyrib brand families in stock</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm spec-table">
              <thead>
                <tr className="bg-charcoal text-primary-foreground">
                  <th className="text-left px-4 py-3 font-heading font-semibold text-xs uppercase tracking-wider">Brand</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold text-xs uppercase tracking-wider">Base Polymer</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold text-xs uppercase tracking-wider">Key Properties</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold text-xs uppercase tracking-wider">Temp. Range</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold text-xs uppercase tracking-wider">Forms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-divider">
                {[
                  { brand: "POLYRIB V", polymer: "UHMW PE", props: "Abrasion resistance, self-lubricating, food grade, antistatic, FR", temp: "−200°C to +80°C", forms: "Sheets, Blocks" },
                  { brand: "POLYRIB H", polymer: "HDPE", props: "Chemical resistance, UV grades, glass-lined, playground grades", temp: "−60°C to +80°C", forms: "Sheets, Boards, Rolls" },
                  { brand: "POLYRIB P", polymer: "PP", props: "Acid/alkali tanks, RIPLA cutting boards, glass-lined FRP", temp: "−10°C to +100°C", forms: "Sheets, Blocks, Boards" },
                  { brand: "DIPRA", polymer: "PP", props: "Gate liners, UV-fast roof liners, embossed, dual-colour", temp: "−10°C to +100°C", forms: "Sheets, Rolls, Film" },
                  { brand: "PCCLEAR", polymer: "Polycarbonate (PC)", props: "High clarity, UV protected, hard coat, diamond hard coat", temp: "−40°C to +120°C", forms: "Sheets, Rolls" },
                  { brand: "KAYLON", polymer: "Cast Nylon PA6", props: "Wear resistance, oil-filled, MoS₂ grades, high-strength", temp: "−40°C to +120°C", forms: "Rods, Tubes, Sheets, Blocks" },
                  { brand: "PAKETAL", polymer: "Acetal / POM", props: "Precision machining, dimensional stability, FDA grades", temp: "−40°C to +100°C", forms: "Rods, Tubes, Sheets" },
                ].map((row) => (
                  <tr key={row.brand} className="hover:bg-card transition-colors duration-100">
                    <td className="px-4 py-3 font-heading font-bold text-primary">{row.brand}</td>
                    <td className="px-4 py-3 text-charcoal-light font-mono text-xs">{row.polymer}</td>
                    <td className="px-4 py-3 text-charcoal-light">{row.props}</td>
                    <td className="px-4 py-3 text-charcoal-light font-mono text-xs">{row.temp}</td>
                    <td className="px-4 py-3 text-charcoal-light">{row.forms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-xl text-charcoal mb-1">Can't find your specification?</h3>
            <p className="text-muted-foreground text-sm">We supply custom dimensions and specialist grades on request.</p>
          </div>
          <Link to="/contact" className="px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200 inline-flex items-center gap-2 shrink-0">
            Request a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
