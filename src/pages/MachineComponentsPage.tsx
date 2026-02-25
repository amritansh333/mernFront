import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Layers, GitBranch, Link2, Minus, Wrench, Grid3X3, Package, ShoppingBag } from "lucide-react";
import machineComponentsImage from "@/assets/machine-components.jpg";
import { useScrollFade } from "@/hooks/useScrollFade";
import { MACHINE_COMPONENT_SUBCATEGORIES, getBrandsBySubcategory } from "@/data/polyribProducts";

const subcategoryIcons: Record<string, React.FC<{ className?: string }>> = {
  "strips-profiles": Minus,
  "vacuum-formed": Layers,
  "ripla-cutting-boards": GitBranch,
  "chopping-boards": Link2,
  "application-sheets": Grid3X3,
  "machined-parts": Wrench,
  "fascia-pads": Package,
  "pop": ShoppingBag,
};

export default function MachineComponentsPage() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-surface-subtle border-b border-divider py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-charcoal">Machine Components</span>
          </nav>
          <p className="section-label mb-3">Machine Components</p>
          <h1 className="font-heading text-4xl text-charcoal mb-3">
            Thermoplastic Machine Components
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Strips & profiles, vacuum formed parts, RIPLA cutting boards, CUTRITE chopping boards, POLYLIMB orthopaedic sheets, ARETE composite liners, fascia pads, and precision machined plastic parts — all in Polyrib's proprietary grades.
          </p>
        </div>
      </div>

      {/* Hero image */}
      <div className="container max-w-7xl mx-auto px-6 py-8">
        <div className="aspect-[21/6] overflow-hidden">
          <img src={machineComponentsImage} alt="Machine components" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Categories grid */}
      <section ref={ref} className="fade-up py-8 pb-16">
        <div className="container max-w-7xl mx-auto px-6">
          <p className="section-label mb-6">Select a Product Category</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MACHINE_COMPONENT_SUBCATEGORIES.map((cat) => {
              const Icon = subcategoryIcons[cat.slug] || Layers;
              const brands = getBrandsBySubcategory(cat.slug);
              return (
                <Link
                  key={cat.slug}
                  to={cat.href}
                  className="category-card block group p-6"
                >
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg text-charcoal mb-2 group-hover:text-primary transition-colors duration-200">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cat.description}</p>
                  {brands.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {brands.map((b) => (
                        <span key={b.slug} className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary font-semibold">
                          {b.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 cta-link">
                    View Products <ArrowRight className="w-4 h-4 explore-arrow" />
                  </div>
                  <div className="card-border-bottom mt-4" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-14 bg-surface-subtle border-y border-divider">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-3">Key Applications</p>
              <h2 className="font-heading text-2xl text-charcoal mb-4">Where our components perform</h2>
              <div className="space-y-3">
                {[
                  { label: "Leather & Footwear Industry", desc: "RIPLA cutting boards for clicking machines — the industry standard" },
                  { label: "Food Processing & Catering", desc: "CUTRITE HACCP-compliant colour-coded chopping boards" },
                  { label: "Medical & Orthopaedic", desc: "POLYLIMB thermoformable grades for prosthetics and orthotics" },
                  { label: "Mining & Chemical Plant", desc: "ARETE composite liners for FRP chutes and chemical vessels" },
                  { label: "Conveyor & Packaging Lines", desc: "Wear strips, guide rails, and profiles in POLYRIB V and KAYLON" },
                  { label: "Automotive & Signage", desc: "Vacuum formed PCCLEAR parts for enclosures and displays" },
                ].map((a) => (
                  <div key={a.label} className="flex gap-3 py-3 border-b border-divider last:border-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <div className="font-medium text-charcoal text-sm">{a.label}</div>
                      <div className="text-xs text-muted-foreground">{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-charcoal p-8">
              <p className="section-label text-white/50 mb-3">Custom Machining</p>
              <h3 className="font-heading text-2xl text-white mb-3">
                Can't find a standard part?
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Our in-house CNC machining facility can produce thermoplastic components 
                to your exact drawings. From one-off prototypes to volume production runs.
              </p>
              <ul className="space-y-2 mb-7">
                {["CNC machined to drawing", "All Polyrib grades", "Gears, screens, sealing strips", "Fast turnaround times"].map((p) => (
                  <li key={p} className="flex items-center gap-2 text-white/70 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary-light shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-light transition-colors duration-200"
              >
                Enquire about Custom Machining
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
