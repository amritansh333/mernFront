import React from "react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import semiFinishedImage from "@/assets/semi-finished-products.jpeg";
import machineComponentsImage from "@/assets/machine-components.jpeg";
import { useScrollFade } from "@/hooks/useScrollFade";

/*
const categories = [
  {
    tag: "Semi-Finished Products",
    title: "Thermoplastic Semi-Finished Products",
    description:
      "Extruded and compression-moulded sheets, blocks, rods, tubes, welding rods and rolls across our full brand portfolio — POLYRIB V, H, P, DIPRA, PCCLEAR, KAYLON, PAKETAL and more. Available ex-stock in standard dimensions — custom sizes on request.",
    href: "/products/semi-finished",
    image: semiFinishedImage,
    brands: ["POLYRIB V", "POLYRIB H", "POLYRIB P", "PCCLEAR", "KAYLON", "PAKETAL", "DIPRA"],
  },
  {
    tag: "Machine Components",
    title: "Thermoplastic Machine Components",
    description:
      "RIPLA cutting boards, CUTRITE chopping boards, ARETE composite liners, POLYLIMB orthopaedic sheets, strips & profiles, vacuum formed parts and precision machined plastic components — all manufactured in Polyrib's proprietary grades.",
    href: "/products/machine-components",
    image: machineComponentsImage,
    brands: ["RIPLA", "CUTRITE", "ARETE", "POLYLIMB", "Strips & Profiles", "Machined Parts"],
  },
];
*/
const BRAND_QUICK_LINKS = [
  { name: "POLYRIB V", label: "UHMW PE", href: "/products/semi-finished/sheets-blocks/polyrib-v" },
  { name: "POLYRIB H", label: "HDPE", href: "/products/semi-finished/sheets-blocks/polyrib-h" },
  { name: "POLYRIB P", label: "Polypropylene", href: "/products/semi-finished/sheets-blocks/polyrib-p" },
  { name: "DIPRA", label: "PP Liners", href: "/products/semi-finished/sheets-blocks/dipra" },
  { name: "PCCLEAR", label: "Polycarbonate", href: "/products/semi-finished/sheets-blocks/pcclear" },
  { name: "KAYLON", label: "Cast Nylon PA6", href: "/products/semi-finished/rods-tubes/kaylon" },
  { name: "PAKETAL", label: "Acetal / POM", href: "/products/semi-finished/rods-tubes/paketal" },
  { name: "CUTRITE", label: "Chopping Boards", href: "/products/machine-components/chopping-boards/cutrite" },
  { name: "POLYLIMB", label: "Orthopaedic", href: "/products/machine-components/application-sheets/polylimb" },
  { name: "ARETE", label: "FRP Composites", href: "/products/machine-components/application-sheets/arete" },
];


export default function ProductsPage() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  const [categories, setCategories] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  fetchCategories();
}, []);
  return (
    <div className="pt-16">
      {/* Page header */}
      <div className="bg-surface-subtle border-b border-divider py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-charcoal">Products</span>
          </nav>
          <p className="section-label mb-3">Product Portfolio</p>
          <h1 className="font-heading text-4xl text-charcoal mb-3">Polyrib Products</h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Two comprehensive product divisions — Semi-Finished thermoplastic materials across all Polyrib brand families, and precision Machine Components for industrial applications.
          </p>
        </div>
      </div>

      {/* Category cards */}
      <section ref={ref} className="fade-up py-16">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map((cat) => (
  <Link
    key={cat._id}
    to={`/products/${cat.slug}`}
    className="category-card block group"
  >
    <div className="card-image aspect-video overflow-hidden">
      <img
        src={
          cat.slug.includes("semi")
            ? semiFinishedImage
            : machineComponentsImage
        }
        alt={cat.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>

    <div className="p-8">
      <span className="section-label block mb-3">
        {cat.name}
      </span>

      <h2 className="font-heading text-2xl text-charcoal mb-3 group-hover:text-primary transition-colors duration-200">
        {cat.name}
      </h2>

      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
        {cat.description || "Explore our full product range."}
      </p>

      <div className="flex items-center gap-2 cta-link">
        Explore Category
        <ArrowRight className="w-4 h-4 explore-arrow" />
      </div>

      <div className="card-border-bottom mt-5" />
    </div>
  </Link>
))}
          </div>
        </div>
      </section>

      {/* Brand quick links */}
      <section className="py-14 bg-surface-subtle border-t border-divider">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="section-label mb-2">Browse by Brand</p>
            <h2 className="font-heading text-2xl text-charcoal">Jump directly to a Polyrib brand</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {BRAND_QUICK_LINKS.map((b) => (
              <Link
                key={b.name}
                to={b.href}
                className="p-4 border border-border bg-card hover:border-primary hover:shadow-card group transition-all duration-200 text-center"
              >
                <div className="font-heading font-bold text-charcoal group-hover:text-primary text-sm transition-colors duration-200">
                  {b.name}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{b.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 border-t border-divider">
        <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-xl text-charcoal mb-1">
              Need a custom specification?
            </h3>
            <p className="text-muted-foreground text-sm">
              Our technical team can advise on material selection and provide custom machined solutions.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/contact" className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200 inline-flex items-center gap-2">
              Request Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/tools/material-selector" className="px-5 py-2.5 border border-border text-charcoal-light text-sm font-semibold hover:border-primary hover:text-primary transition-colors duration-200">
              Material Selector
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
