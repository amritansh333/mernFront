import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import sheetsImage from "@/assets/sheets.jpeg";
import rodsImage from "@/assets/semi-finished-products.jpeg";
import machineImage from "@/assets/machine-components.jpeg";
import rollsImage from "@/assets/rolls.jpeg";
import { useScrollFade } from "@/hooks/useScrollFade";
import api from "@/lib/api";

const subcategoryImages: Record<string, string> = {
  "sheets-blocks": sheetsImage,
  "rods-tubes": rodsImage,
  "coils-rolls": rollsImage,
  "welding-rod": rodsImage,
  "custom-sized-plastic-sh": sheetsImage,
  "strips-and-profiles": machineImage,
  "vacuum-formed-plastic-p": machineImage,
  "ripla-cutting-board": machineImage,
  "cutrite-chopping-board": machineImage,
  "application-ready-sheet": sheetsImage,
  "machined-plastic-parts": machineImage,
};

export default function SubcategoryBrandsPage() {
  const { categorySlug, subCategorySlug, brandSlug } = useParams();
  const ref = useScrollFade() as React.RefObject<HTMLElement>;

  const [category, setCategory] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categorySlug) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setItems([]);

        // 🔹 Fetch category
        const catRes = await api.get("/categories");
        const foundCategory = catRes.data.find(
          (c: any) => c.slug === categorySlug
        );

        if (!foundCategory) {
          setLoading(false);
          return;
        }

        setCategory(foundCategory);

        // 🔹 LEVEL 1 → CATEGORY → SUBCATEGORIES
        if (!subCategorySlug) {
          const subRes = await api.get(
            `/subcategories?category=${foundCategory._id}`
          );

          setItems(subRes.data || []);
          setLoading(false);
          return;
        }

        // 🔹 Fetch subcategory
        const subRes = await api.get(
          `/subcategories?category=${foundCategory._id}`
        );

        const foundSub = subRes.data.find(
          (s: any) => s.slug === subCategorySlug
        );

        if (!foundSub) {
          setLoading(false);
          return;
        }

        // 🔹 LEVEL 2 → SUBCATEGORY → BRANDS
        if (!brandSlug) {
          const brandRes = await api.get(
            `/brands?subcategory=${foundSub._id}`
          );

          setItems(brandRes.data || []);
          setLoading(false);
          return;
        }

        // 🔹 LEVEL 3 → BRAND → PRODUCTS
        const brandRes = await api.get(
          `/brands?subcategory=${foundSub._id}`
        );

        const foundBrand = brandRes.data.find(
          (b: any) => b.slug === brandSlug
        );

        if (!foundBrand) {
          setLoading(false);
          return;
        }

        const productRes = await api.get(
          `/products?brand=${foundBrand._id}`
        );

        setItems(productRes.data || []);
        setLoading(false);

      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    loadData();
  }, [categorySlug, subCategorySlug, brandSlug]);

  return (
    <div className="pt-16">
      <div className="bg-surface-subtle border-b border-divider py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-charcoal">
              {category?.title || category?.name}
            </span>
          </nav>

          <p className="section-label mb-3">
            {category?.title || category?.name}
          </p>

          <h1 className="font-heading text-4xl text-charcoal mb-3">
            {category?.title || category?.name}
          </h1>

          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Explore available options.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted-foreground">
          Loading...
        </div>
      ) : (
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-6">
            {items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <Link
                    key={item._id}
                    to={
                      brandSlug
                        ? `/products/${categorySlug}/${subCategorySlug}/${brandSlug}/${item.slug}`
                        : subCategorySlug
                        ? `/products/${categorySlug}/${subCategorySlug}/${item.slug}`
                        : `/products/${categorySlug}/${item.slug}`
                    }
                    className="category-card block group"
                  >
                    <div className="card-image aspect-[4/3] overflow-hidden bg-surface-subtle">
                      <img
                        src={subcategoryImages[item.slug] || sheetsImage}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-6">
                      <span className="section-label block mb-2">
                        {item.name}
                      </span>

                      <h2 className="font-heading text-xl text-charcoal mb-2 group-hover:text-primary transition-colors duration-200">
                        {item.name}
                      </h2>

                      <div className="flex items-center gap-2 cta-link text-sm">
                        Explore
                        <ArrowRight className="w-4 h-4 explore-arrow" />
                      </div>

                      <div className="card-border-bottom mt-4" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                No data available.
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}