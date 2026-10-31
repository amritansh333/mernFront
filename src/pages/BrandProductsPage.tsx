import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Brand, Product } from "@/types/catalog";
import api from "@/lib/api";

import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import manufacturingImage from "@/assets/csr-slider1.jpeg";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

interface ProductImageCarouselProps {
  image?: string;
  slug: string;
  name: string;
}

function ProductImageCarousel({
  image,
  slug,
  name,
}: ProductImageCarouselProps) {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Respect the user's motion preference.
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

  // Discover the primary image and any numbered gallery images.
  useEffect(() => {
    let cancelled = false;

    const discoverImages = async () => {
      if (!image) {
        setGalleryImages([]);
        setActiveIndex(0);
        return;
      }

      const primaryImage = image.startsWith("http")
        ? image
        : `${API_BASE_URL}${image}`;

      const extensionMatch = image.match(/\.[^./?]+(?=([?#]|$))/);
      const extension = extensionMatch?.[0] ?? ".jpeg";

      const cleanImagePath = image.split(/[?#]/)[0];
      const lastSlash = cleanImagePath.lastIndexOf("/");
      const directory = cleanImagePath.slice(0, lastSlash + 1);

      const filename = cleanImagePath.slice(lastSlash + 1);
      const baseSlug = filename.replace(/\.[^.]+$/, "");

      // Check slug_1.jpeg, slug_2.jpeg, etc.
      const candidates = Array.from({ length: 20 }, (_, index) => {
        const candidatePath = `${directory}${baseSlug}_${index + 1}${extension}`;

        return candidatePath.startsWith("http")
          ? candidatePath
          : `${API_BASE_URL}${candidatePath}`;
      });

      const discoveredImages = await Promise.all(
        candidates.map(
          (src) =>
            new Promise<string | null>((resolve) => {
              const img = new Image();

              img.onload = () => resolve(src);
              img.onerror = () => resolve(null);
              img.src = src;
            }),
        ),
      );

      if (cancelled) return;

      setGalleryImages([
        primaryImage,
        ...discoveredImages.filter((src): src is string => src !== null),
      ]);

      setActiveIndex(0);
    };

    void discoverImages();

    return () => {
      cancelled = true;
    };
  }, [image, slug]);

  // Automatically switch images every 2 seconds.
  useEffect(() => {
    if (reduceMotion || galleryImages.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % galleryImages.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [galleryImages, reduceMotion]);

  if (galleryImages.length === 0) {
    return (
      <div className="card-image product-gallery relative aspect-[4/3] overflow-hidden bg-[#F8FAFC]">
        <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
          No image available
        </div>
      </div>
    );
  }

  return (
    <div className="card-image product-gallery relative aspect-[4/3] overflow-hidden bg-[#F8FAFC]">
      {galleryImages.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`${name} - image ${index + 1}`}
          loading={index === 0 ? "eager" : "lazy"}
          className={`product-gallery-image ${
            index === activeIndex ? "product-gallery-image-active" : ""
          } w-full h-full object-contain`}
          style={
            {
              "--gallery-index": index,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Progress line — matches the other product galleries */}
      {galleryImages.length > 1 && (
        <div
          className="absolute bottom-0 left-0 right-0 z-10 flex h-1.5 gap-0.5"
          role="group"
          aria-label={`${name} image progress`}
        >
          {galleryImages.map((src, index) => (
            <button
              key={`${src}-progress`}
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

export default function BrandProductsPage() {
  const { categorySlug, subcategorySlug, brandSlug } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  // Convert slug to readable text
  const formatText = (slug?: string) => {
    if (!slug) return "";
    return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/products/by-brand/${brandSlug}`);

        setBrand(res.data.brand);
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [brandSlug]);

  return (
    <div className="pt-16">
      {/* =====================================================
          REUSABLE PAGE HERO BANNER
          DYNAMIC CATEGORY, SUBCATEGORY AND BRAND INFORMATION
      ===================================================== */}

      <PageHeroBanner
        eyebrow={
          "Explore all products under this brand. Browse detailed specifications, applications and available variants."
        }
        title={brand?.name || formatText(brandSlug) || "Products"}
        image={manufacturingImage}
        imageAlt="Khanna Polyrib manufacturing facility"
        imagePosition="center center"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          {
            label: formatText(categorySlug) || "Products",
            to: `/products/${categorySlug}`,
          },
          {
            label: formatText(subcategorySlug) || "Subcategory",
            to: `/products/${categorySlug}/${subcategorySlug}`,
          },
          {
            label: brand?.name || formatText(brandSlug),
          },
        ]}
      />

      {/* =====================================================
          PRODUCTS GRID
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
              : products.map((product) => (
                  <Link
                    key={product._id}
                    to={`/products/${categorySlug}/${subcategorySlug}/${brandSlug}/${product.slug}`}
                    className="product-card block group"
                  >
                    <ProductImageCarousel
                      image={product.image}
                      slug={product.slug}
                      name={product.name}
                    />

                    <div className="p-5">
                      <h3 className="font-heading font-bold text-charcoal text-md mb-2 group-hover:text-primary transition-colors duration-200">
                        {product.name}
                      </h3>

                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                        {product.description?.[0] || "No description available"}
                      </p>

                      <div className="cta-link text-xs pt-3 border-t border-divider">
                        View Product Details{" "}
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
