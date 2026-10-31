import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import api from "@/lib/api";
import type { SubCategory } from "@/types/catalog";

import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import manufacturingImage from "@/assets/csr-slider1.jpeg";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

function SubcategoryImageCarousel({
  image,
  slug,
  name,
}: {
  image?: string;
  slug: string;
  name: string;
}) {
  const [discoveredImages, setDiscoveredImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const galleryImages = useMemo(
    () => Array.from(new Set(discoveredImages)),
    [discoveredImages],
  );

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
    let cancelled = false;

    if (!image) {
      setDiscoveredImages([]);
      setActiveIndex(0);
      return;
    }

    const directory = image.slice(0, image.lastIndexOf("/") + 1);
    const extensionIndex = image.lastIndexOf(".");
    const extension = extensionIndex >= 0 ? image.slice(extensionIndex) : "";
    const filename = image.slice(
      image.lastIndexOf("/") + 1,
      extensionIndex >= 0 ? extensionIndex : undefined,
    );

    // Use the subcategory slug as the image filename base.
    // Example: vacuum-formed-plastic-parts_1.jpeg
    const baseSlug = slug || filename.replace(/[_-]\d+$/, "");

    const candidates = [
      image,
      ...Array.from(
        { length: 20 },
        (_, index) => `${directory}${baseSlug}_${index + 1}${extension}`,
      ),
    ];

    const checkImage = (src: string) =>
      new Promise<boolean>((resolve) => {
        const img = new Image();

        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = `${API_BASE_URL}${src}`;
      });

    const discoverImages = async () => {
      // Preserve the main image and discover numbered variants.
      const results = await Promise.all(
        candidates.map(async (src) => ({
          src,
          exists: await checkImage(src),
        })),
      );

      if (cancelled) return;

      const validImages = Array.from(
        new Set(
          results.filter((result) => result.exists).map((result) => result.src),
        ),
      );

      setDiscoveredImages(validImages);
      setActiveIndex(0);
    };

    void discoverImages();

    return () => {
      cancelled = true;
    };
  }, [image, slug]);

  useEffect(() => {
    if (reduceMotion || galleryImages.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % galleryImages.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [galleryImages.length, reduceMotion]);

  return (
    <div className="card-image product-gallery relative aspect-[4/3] overflow-hidden">
      {galleryImages.map((src, index) => {
        const isActive = index === activeIndex;

        return (
          <img
            key={src}
            src={`${API_BASE_URL}${src}`}
            alt={`${name} — image ${index + 1}`}
            aria-hidden={!isActive}
            className={`product-gallery-image absolute inset-0 h-full w-full object-cover ${
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

      {/* Image Progress Line */}
      {galleryImages.length > 1 && (
        <div
          className="absolute bottom-0 left-0 right-0 z-10 flex h-1.5 gap-0.5"
          role="group"
          aria-label="Subcategory image progress"
        >
          {galleryImages.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setActiveIndex(index);
              }}
              aria-label={`Show image ${index + 1} of ${galleryImages.length}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className="relative h-full min-w-0 flex-1 overflow-hidden bg-white/60 transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#279ECE]"
            >
              <span
                className={`absolute inset-0 origin-left transition-transform duration-300 ease-out ${
                  index === activeIndex
                    ? "scale-x-100 bg-[#279ECE]"
                    : "scale-x-0 bg-[#279ECE]"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SubcategoriesPage() {
  const { categorySlug } = useParams();

  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Convert slug to readable text
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
      ```
      {/* =====================================================
      REUSABLE PAGE HERO BANNER
      DYNAMIC CATEGORY INFORMATION
  ===================================================== */}
      <PageHeroBanner
        eyebrow="Browse all subcategories under Thermoplastics Semi Finished Products. Explore different product types and navigate deeper into available brands."
        title={formatText(categorySlug) || "Products"}
        image={manufacturingImage}
        imageAlt="Khanna Polyrib manufacturing facility"
        imagePosition="center center"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          {
            label: loading
              ? formatText(categorySlug) || "Loading..."
              : formatText(categorySlug),
          },
        ]}
      />
      {/* =====================================================
      CARDS SECTION
      EXISTING IMPLEMENTATION UNCHANGED
  ===================================================== */}
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
                    <SubcategoryImageCarousel
                      image={sub.image}
                      slug={sub.slug}
                      name={sub.name}
                    />

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
