import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import api from "@/lib/api";

export default function SubcategoriesPage() {

  const { categorySlug } = useParams();

  const [subcategories, setSubcategories] = useState<any[]>([]);
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
          `/subcategories/by-category/${categorySlug}`
        );

        setSubcategories(res.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

    };

    load();

  }, [categorySlug]);

  if (loading) return <div className="py-16 text-center">Loading...</div>;

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
            <span className="text-charcoal">
              {formatText(categorySlug)}
            </span>
          </nav>

          {/* 🔹 Title */}
          <p className="section-label mb-3">
            Product Category
          </p>

          <h1 className="font-heading text-4xl text-charcoal mb-3">
            {formatText(categorySlug)}
          </h1>

          {/* 🔹 Description */}
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Browse all subcategories under {formatText(categorySlug)}. 
            Explore different product types and navigate deeper into available brands.
          </p>

        </div>
      </div>

      {/* ✅ CARDS SECTION (UNCHANGED) */}
      <section className="py-16">

        <div className="container max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {subcategories.map((sub) => (

              <Link
                key={sub._id}
                to={`/products/${categorySlug}/${sub.slug}`}
                className="category-card block group"
              >

                <div className="card-image aspect-[4/3] overflow-hidden">

                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${sub.image}`}
                    alt={sub.name}
                    className="w-full h-full object-cover"
                  />

                </div>

                <div className="p-6">

                  <h2 className="font-heading text-xl text-charcoal mb-2 group-hover:text-primary">
                    {sub.name}
                  </h2>

                  <div className="cta-link text-sm pt-2 border-t border-divider">
                    View Brand
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