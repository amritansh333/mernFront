import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import api from "@/lib/api";
import type { SubCategory } from "@/types/catalog";

export default function SubcategoriesPage() {
  const { categorySlug } = useParams();

  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  //  Convert slug to readable text
  const formatText = (slug?: string) => {
    if (!slug) return "";
    return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/subcategories/by-category/${categorySlug}`);

        setSubcategories(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [categorySlug]);

  return (
    <div className="pt-16">
      {/*  TOP HEADER SECTION */}
      <div className="bg-surface-subtle border-b border-divider py-12">
        <div className="container max-w-7xl mx-auto px-6">
          {/*  Breadcrumb */}
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">
              Products
            </Link>
            <span>/</span>

            {loading ? (
              <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
            ) : (
              <span className="text-charcoal">{formatText(categorySlug)}</span>
            )}
          </nav>

          {loading ? (
            <>
              {/*  Label Skeleton */}
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4" />

              {/*  Title Skeleton */}
              <div className="h-10 w-72 bg-gray-200 rounded animate-pulse mb-4" />

              {/*  Description Skeleton */}
              <div className="space-y-2 max-w-2xl">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              </div>
            </>
          ) : (
            <>
              {/*  Title */}
              <p className="section-label mb-3">Product Category</p>

              <h1 className="font-heading text-4xl text-charcoal mb-3">
                {formatText(categorySlug)}
              </h1>

              {/*  Description */}
              <p className="text-muted-foreground max-w-2xl leading-relaxed">
                Browse all subcategories under {formatText(categorySlug)}.
                Explore different product types and navigate deeper into
                available brands.
              </p>
            </>
          )}
        </div>
      </div>

      {/*  CARDS SECTION */}
      <section className="py-14">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="product-card block animate-pulse">
                    <div className="card-image aspect-[4/3] overflow-hidden bg-gray-200 rounded-t-xl" />

                    <div className="p-5">
                      <div className="h-5 w-40 bg-gray-200 rounded mb-3" />

                      <div className="space-y-2 mb-4">
                        <div className="h-3 w-full bg-gray-200 rounded" />
                        <div className="h-3 w-5/6 bg-gray-200 rounded" />
                      </div>

                      <div className="pt-3 border-t border-divider">
                        <div className="h-3 w-32 bg-gray-200 rounded" />
                      </div>

                      <div className="card-border-bottom mt-3" />
                    </div>
                  </div>
                ))
              : subcategories.map((sub) => (
                  <Link
                    key={sub._id}
                    to={`/products/${categorySlug}/${sub.slug}`}
                    className="product-card block group"
                  >
                    <div className="card-image aspect-[4/3] overflow-hidden">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${sub.image}`}
                        alt={sub.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="font-heading font-bold text-charcoal text-md mb-2 group-hover:text-primary transition-colors duration-200">
                        {sub.name}
                      </h3>

                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                        {sub.description?.[0] || "No description available"}
                      </p>

                      <div className="cta-link text-xs pt-3 border-t border-divider">
                        View Brands{" "}
                        <ArrowRight className="w-3.5 h-3.5 explore-arrow" />
                      </div>

                      <div className="card-border-bottom mt-3" />
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
