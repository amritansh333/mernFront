import React from "react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types/catalog";
import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import manufacturingImage from "@/assets/csr-slider1.jpeg";
// Semi-finished product gallery
import semiFinishedImage1 from "@/assets/semi-finished-products_1.jpeg";
import semiFinishedImage2 from "@/assets/semi-finished-products_2.jpeg";
import semiFinishedImage3 from "@/assets/semi-finished-products_3.jpeg";
import semiFinishedImage4 from "@/assets/semi-finished-products_4.jpeg";
import semiFinishedImage5 from "@/assets/semi-finished-products_5.jpeg";

// Engineered product gallery
import machineComponentsImage1 from "@/assets/machine-components_1.jpeg";
import machineComponentsImage2 from "@/assets/machine-components_2.jpeg";
import machineComponentsImage3 from "@/assets/machine-components_3.jpeg";
import machineComponentsImage4 from "@/assets/machine-components_4.jpeg";
import machineComponentsImage5 from "@/assets/machine-components_5.jpeg";

import { useScrollFade } from "@/hooks/useScrollFade";
import { useMachineComponentRouting } from "@/lib/product-experience/useMachineComponentRouting";

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
    href: "",
    image: machineComponentsImage,
    brands: ["RIPLA", "CUTRITE", "ARETE", "POLYLIMB", "Strips & Profiles", "Machined Parts"],
  },
];
*/
const BRAND_QUICK_LINKS = [
  {
    name: "POLYRIB V",
    label: "UHMW PE",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-v",
  },
  {
    name: "PCCLEAR",
    label: "Polycarbonate",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/pcclear",
  },
  {
    name: "POLYRIB P",
    label: "Polypropylene",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-p",
  },
  {
    name: "POLYRIB H",
    label: "HDPE",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polyrib-h",
  },
  {
    name: "HITECH",
    label: "PP, HDPE",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/hitech",
  },
  {
    name: "ARETE",
    label: "UHMW PE",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/arete",
  },

  {
    name: "DIPRA",
    label: "PP Liners",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/dipra",
  },
  {
    name: "POLYLIMB",
    label: "PP",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/polylimb",
  },
  {
    name: "CUTRITE",
    label: "Chopping Boards",
    href: "/products/thermoplastics-semi-finished-products/sheets-blocks/cutrite",
  },
  {
    name: "PLASCON V",
    label: "UHMWPE",
    href: "/products/thermoplastics-semi-finished-products/rods-tubes/plascon-v",
  },
  {
    name: "KAYLON",
    label: "CAST NYLON",
    href: "/products/thermoplastics-semi-finished-products/rods-tubes/pakaylon",
  },
];

function ProductImageCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      setReduceMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || images.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [images.length, reduceMotion]);

  return (
    <div className="card-image product-gallery aspect-video overflow-hidden relative">
      {images.map((image, index) => {
        const isActive = index === activeIndex;

        return (
          <img
            key={image}
            src={image}
            alt={`${alt} — image ${index + 1}`}
            aria-hidden={!isActive}
            className={`product-gallery-image absolute inset-0 w-full h-full object-cover ${
              isActive ? "product-gallery-image-active" : ""
            }`}
            style={
              {
                "--gallery-index": index,
              } as React.CSSProperties
            }
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        );
      })}
    </div>
  );
}

export default function ProductsPage() {
  const ref = useScrollFade() as React.RefObject<HTMLElement>;
  const machineComponents = useMachineComponentRouting();
  const [categories, setCategories] = useState<Category[]>([]);
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
      {/* ABOUT US HEADER */}

      <PageHeroBanner
        eyebrow="Two comprehensive product divisions - Thermoplastic Semi-Finished materials across all Polyrib brand families, and precision Thermoplastic Engineered Products for industrial applications."
        title="Polyrib"
        highlight="Products"
        image={manufacturingImage}
        imageAlt="Khanna Polyrib manufacturing facility"
        imagePosition="center center"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Products" }]}
      />

      {/* Category cards */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={machineComponents.resolveCategoryPath(cat)}
                className="category-card block group"
              >
                <ProductImageCarousel
                  images={
                    cat.slug.includes("semi")
                      ? [
                          semiFinishedImage1,
                          semiFinishedImage2,
                          semiFinishedImage3,
                          semiFinishedImage4,
                          semiFinishedImage5,
                        ]
                      : [
                          machineComponentsImage1,
                          machineComponentsImage2,
                          machineComponentsImage3,
                          machineComponentsImage4,
                          machineComponentsImage5,
                        ]
                  }
                  alt={cat.name}
                />

                <div className="p-8">
                  <span className="section-label block mb-3">{cat.name}</span>

                  <h2 className="font-heading text-2xl text-charcoal mb-3 group-hover:text-primary transition-colors duration-200">
                    {cat.name}
                  </h2>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {cat.description || "Explore our full product range."}
                  </p>

                  <div className="cta-link pt-2 border-t border-divider">
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
            <h2 className="font-heading text-2xl text-charcoal">
              Jump directly to a Polyrib brand
            </h2>
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
                <div className="text-xs text-muted-foreground mt-1">
                  {b.label}
                </div>
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
              Our technical team can advise on material selection and provide
              custom machined solutions.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200 inline-flex items-center gap-2"
            >
              Request Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/tools/material-selector"
              className="px-5 py-2.5 border border-border text-charcoal-light text-sm font-semibold hover:border-primary hover:text-primary transition-colors duration-200"
            >
              Material Selector
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
