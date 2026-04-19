import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import api from "@/lib/api";

export default function BrandProductsPage() {

  const { categorySlug, subcategorySlug, brandSlug } = useParams();

  const [products, setProducts] = useState<any[]>([]);
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
          `/products/by-brand/${brandSlug}`
        );

        setProducts(res.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

    };

    load();

  }, [brandSlug]);

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
            <Link to={`/products/${categorySlug}`} className="hover:text-primary">
              {formatText(categorySlug)}
            </Link>
            <span>/</span>
            <Link to={`/products/${categorySlug}/${subcategorySlug}`} className="hover:text-primary">
              {formatText(subcategorySlug)}
            </Link>
            <span>/</span>
            <span className="text-charcoal">
              {formatText(brandSlug)}
            </span>
          </nav>

          {/* 🔹 Label */}
          <p className="section-label mb-3">
            {formatText(subcategorySlug)}
          </p>

          {/* 🔹 Title */}
          <h1 className="font-heading text-4xl text-charcoal mb-3">
            {formatText(brandSlug)}
          </h1>

          {/* 🔹 Description */}
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Explore all products under {formatText(brandSlug)}. 
            Browse detailed specifications, applications and available variants.
          </p>

        </div>
      </div>

      {/* ✅ PRODUCTS GRID (UNCHANGED) */}
      <section className="py-14">

        <div className="container max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {products.map((product) => (

              <Link
                key={product._id}
                to={`/products/${categorySlug}/${subcategorySlug}/${brandSlug}/${product.slug}`}
                className="product-card block group"
              >

                <div className="card-image aspect-[4/3] overflow-hidden">

                  <img
                    src={
                      product.image
                        ? `${import.meta.env.VITE_API_BASE_URL}${product.image}`
                        : "https://via.placeholder.com/400"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                </div>

                <div className="p-5">

                  <h3 className="font-heading font-bold text-charcoal text-sm mb-2 group-hover:text-primary transition-colors duration-200">
                    {product.name}
                  </h3>

                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                    {product.description?.[0] || "No description available"}
                  </p>

                  <div className="cta-link text-xs pt-3 border-t border-divider">
                    View Product Details <ArrowRight className="w-3.5 h-3.5 explore-arrow" />
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