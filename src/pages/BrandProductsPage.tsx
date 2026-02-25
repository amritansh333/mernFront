/**
 * BrandProductsPage
 * Shows all products under a specific brand (e.g. POLYRIB V → POLYRIB-V005, POLYRIB-L-V, etc.)
 * Route: /products/:categorySlug/:subcategorySlug/:brandSlug
 */
import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import sheetsImage from "@/assets/sheets.jpeg";
import rodsImage from "@/assets/rods-tubes.jpeg";
import machineImage from "@/assets/machine-components.jpeg";
import { getBrandBySlug } from "@/data/polyribProducts";
import { useScrollFade } from "@/hooks/useScrollFade";

const subcategoryImages: Record<string, string> = {
  "sheets-blocks": sheetsImage,
  "rods-tubes": rodsImage,
  "coils-rolls": sheetsImage,
  "chopping-boards": machineImage,
  "application-sheets": sheetsImage,
  "machined-parts": machineImage,
  "strips-profiles": machineImage,
  "vacuum-formed": machineImage,
  "ripla-cutting-boards": machineImage,
  "fascia-pads": machineImage,
  "pop": machineImage,
};

export default function BrandProductsPage() {
  const { categorySlug, subcategorySlug, brandSlug } = useParams<{
    categorySlug: string;
    subcategorySlug: string;
    brandSlug: string;
  }>();
  const ref = useScrollFade() as React.RefObject<HTMLElement>;

  const brand = brandSlug ? getBrandBySlug(brandSlug) : undefined;
  if (!brand) return <Navigate to="/products" replace />;

  const catName = categorySlug === "machine-components" ? "Machine Components" : "Semi-Finished Products";
  const catHref = categorySlug === "machine-components" ? "/products/machine-components" : "/products/semi-finished";
  const subcatName = subcategorySlug
    ? subcategorySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "";
  const subcatHref = `${catHref}/${subcategorySlug}`;
  const img = subcategoryImages[subcategorySlug || "sheets-blocks"] || sheetsImage;

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-surface-subtle border-b border-divider py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <Link to={catHref} className="hover:text-primary">{catName}</Link>
            <span>/</span>
            <Link to={subcatHref} className="hover:text-primary">{subcatName}</Link>
            <span>/</span>
            <span className="text-charcoal">{brand.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="section-label mb-2">{brand.basePolymer}</p>
              <h1 className="font-heading text-4xl text-charcoal mb-2">{brand.name}</h1>
              <p className="text-primary font-semibold text-sm mb-4">{brand.tagline}</p>
              <p className="text-muted-foreground leading-relaxed text-sm max-w-xl mb-6">{brand.description}</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-card border border-border">
                  <div className="text-xs text-muted-foreground mb-0.5">Base Polymer</div>
                  <div className="font-heading font-bold text-charcoal text-sm">{brand.basePolymer}</div>
                </div>
                <div className="p-3 bg-card border border-border">
                  <div className="text-xs text-muted-foreground mb-0.5">Temperature Range</div>
                  <div className="font-mono font-bold text-primary text-xs">{brand.tempRange}</div>
                </div>
                <div className="p-3 bg-card border border-border">
                  <div className="text-xs text-muted-foreground mb-0.5">Colours Available</div>
                  <div className="font-heading font-bold text-charcoal text-sm">{brand.colour}</div>
                </div>
                <div className="p-3 bg-card border border-border">
                  <div className="text-xs text-muted-foreground mb-0.5">Products in Range</div>
                  <div className="font-heading font-bold text-primary text-xl">{brand.products.length}</div>
                </div>
              </div>
            </div>
            <div>
              <p className="section-label mb-3">Key Properties</p>
              <div className="space-y-2 mb-6">
                {brand.keyProperties.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-charcoal-light">{p}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200">
                  Request Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/tools/material-selector" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-charcoal-light text-sm font-semibold hover:border-primary hover:text-primary transition-colors duration-200">
                  Material Selector
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <section ref={ref} className="fade-up py-14">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="section-label mb-1">Product Range</p>
              <h2 className="font-heading text-2xl text-charcoal">{brand.name} — All Grades</h2>
            </div>
            <span className="text-sm text-muted-foreground">{brand.products.length} grades</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {brand.products.map((product) => (
              <Link
                key={product.id}
                to={`/products/detail/${product.id}`}
                className="product-card block group"
              >
                <div className="card-image aspect-[4/3] bg-surface-subtle border-b border-divider overflow-hidden">
                  <img
                    src={img}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-heading font-bold text-charcoal text-sm leading-snug group-hover:text-primary transition-colors duration-200">
                      {product.name}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary font-bold shrink-0">
                      {brand.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.keyProperties.slice(0, 2).map((p) => (
                      <span key={p} className="text-[10px] px-2 py-0.5 bg-surface-subtle border border-divider text-charcoal-light">
                        {p}
                      </span>
                    ))}
                  </div>
                  {product.tempRange && (
                    <div className="text-xs text-muted-foreground font-mono mb-3">{product.tempRange}</div>
                  )}
                  <div className="cta-link text-xs pt-3 border-t border-divider">
                    View Details <ArrowRight className="w-3.5 h-3.5 explore-arrow" />
                  </div>
                  <div className="card-border-bottom mt-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-surface-subtle border-t border-divider">
        <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-lg text-charcoal mb-1">Need a custom {brand.name} specification?</h3>
            <p className="text-muted-foreground text-sm">Custom dimensions, colours and specialist grades available on request.</p>
          </div>
          <Link to="/contact" className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200 inline-flex items-center gap-2 shrink-0">
            Request Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
