import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import api from "@/lib/api";

export default function BrandsPage() {

  const { categorySlug, subcategorySlug } = useParams();

  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Convert slug to readable text
  const formatText = (slug?: string) => {
    if (!slug) return "";
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  useEffect(() => {

    const load = async () => {

      try {
        const res = await api.get(
          `/brands/by-subcategory/${subcategorySlug}`
        );

        setBrands(res.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

    };

    load();

  }, [subcategorySlug]);

  return (

    <div className="pt-16">

      {/* ✅ TOP HEADER SECTION */}
      <div className="bg-surface-subtle border-b border-divider py-12">
        <div className="container max-w-7xl mx-auto px-6">

          {/* 🔹 Breadcrumb */}
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">Products</Link>
            <span>/</span>

            {loading ? (
              <>
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                <span>/</span>
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
              </>
            ) : (
              <>
                <Link to={`/products/${categorySlug}`} className="hover:text-primary">
                  {formatText(categorySlug)}
                </Link>

                <span>/</span>

                <span className="text-charcoal">
                  {formatText(subcategorySlug)}
                </span>
              </>
            )}
          </nav>

          {/* 🔹 Title */}
          {loading ? (
            <>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4" />

              <div className="h-10 w-72 bg-gray-200 rounded animate-pulse mb-4" />

              <div className="space-y-2 max-w-2xl">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              </div>
            </>
          ) : (
            <>
              <p className="section-label mb-3">
                {formatText(categorySlug)}
              </p>

              <h1 className="font-heading text-4xl text-charcoal mb-3">
                {formatText(subcategorySlug)}
              </h1>

              {/* 🔹 Description (static for now, can be dynamic later) */}
              <p className="text-muted-foreground max-w-2xl leading-relaxed">
                Explore available brands under {formatText(subcategorySlug)} category. 
                Browse materials, specifications and product ranges offered by each brand.
              </p>
            </>
          )}

        </div>
      </div>

      {/* ✅ CARDS SECTION */}
      <section className="py-16">

        <div className="container max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {loading
              ? Array.from({ length: 6 }).map((_, index) => (

                  <div
                    key={index}
                    className="category-card block animate-pulse"
                  >

                    <div className="card-image aspect-[4/3] overflow-hidden bg-gray-200 rounded-t-xl" />

                    <div className="p-6">

                      <div className="h-6 w-40 bg-gray-200 rounded mb-4" />

                      <div className="pt-2 border-t border-divider">
                        <div className="h-4 w-28 bg-gray-200 rounded" />
                      </div>

                      <div className="card-border-bottom mt-1" />

                    </div>

                  </div>

                ))
              : brands.map((brand) => (

                  <Link
                    key={brand._id}
                    to={`/products/${categorySlug}/${subcategorySlug}/${brand.slug}`}
                    className="category-card block group"
                  >

                    <div className="card-image aspect-[4/3] overflow-hidden">

                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${brand.image}`}
                        alt={brand.name}
                        className="w-full h-full object-cover"
                      />

                    </div>

                    <div className="p-6">

                      <h2 className="font-heading text-xl text-charcoal mb-2 group-hover:text-primary">
                        {brand.name}
                      </h2>

                      <div className="cta-link text-sm pt-2 border-t border-divider">
                        View Products
                        <ArrowRight className="w-4 h-4"/>
                      </div>

                      <div className="card-border-bottom mt-1" />

                    </div>

                  </Link>

                ))}

          </div>

        </div>

      </section>

    </div>

  );

}