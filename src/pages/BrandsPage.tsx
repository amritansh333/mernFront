import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Brand, SubCategory } from "@/types/catalog";
import api from "@/lib/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

function BrandImageCarousel({
  image,
  slug,
  name,
}: {
  image?: string;
  slug: string;
  name: string;
}) {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Respect the visitor's motion preference.
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

  // Discover the primary image and its numbered variants.
  useEffect(() => {
    let cancelled = false;

    setGalleryImages([]);
    setActiveIndex(0);

    if (!image) return;

    const lastSlash = image.lastIndexOf("/");
    const directory = image.slice(0, lastSlash + 1);
    const filename = image.slice(lastSlash + 1);
    const extensionIndex = filename.lastIndexOf(".");
    const extension = extensionIndex >= 0 ? filename.slice(extensionIndex) : "";

    const candidates = [
      image,
      ...Array.from(
        { length: 20 },
        (_, index) => `${directory}${slug}_${index + 1}${extension}`,
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

      setGalleryImages(validImages);
      setActiveIndex(0);
    };

    void discoverImages();

    return () => {
      cancelled = true;
    };
  }, [image, slug]);

  // Automatically advance through the images.
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

      {/* Image Progress Line — matches SubcategoriesPage.tsx */}
      {galleryImages.length > 1 && (
        <div
          className="absolute bottom-0 left-0 right-0 z-10 flex h-1.5 gap-0.5"
          role="group"
          aria-label="Brand image progress"
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

export default function BrandsPage() {
  const { categorySlug, subcategorySlug } = useParams();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [subcategory, setSubcategory] = useState<SubCategory | null>(null);
  const [loading, setLoading] = useState(true);

  //  Convert slug to readable text
  const formatText = (slug?: string) => {
    if (!slug) return "";
    return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/brands/by-subcategory/${subcategorySlug}`);

        setBrands(res.data.brands);
        setSubcategory(res.data.subcategory);
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
              <>
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                <span>/</span>
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
              </>
            ) : (
              <>
                <Link
                  to={`/products/${categorySlug}`}
                  className="hover:text-primary"
                >
                  {formatText(categorySlug)}
                </Link>

                <span>/</span>

                <span className="text-charcoal">
                  {subcategory?.name || formatText(subcategorySlug)}
                </span>
              </>
            )}
          </nav>

          {/*  Title */}
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
              <p className="section-label mb-3">{formatText(categorySlug)}</p>

              <h1 className="font-heading text-4xl text-charcoal mb-3">
                {subcategory?.name || formatText(subcategorySlug)}
              </h1>

              {/*  Description (static for now, can be dynamic later) */}
              <p className="text-muted-foreground max-w-2xl leading-relaxed">
                Explore available brands under{" "}
                {subcategory?.name || formatText(subcategorySlug)} category.
                Browse materials, specifications and product ranges offered by
                each brand.
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
              : brands.map((brand) => (
                  <Link
                    key={brand._id}
                    to={`/products/${categorySlug}/${subcategorySlug}/${brand.slug}`}
                    className="product-card block group"
                  >
                    <BrandImageCarousel
                      image={brand.image}
                      slug={brand.slug}
                      name={brand.name}
                    />

                    <div className="p-5">
                      <h3 className="font-heading font-bold text-charcoal text-md mb-2 group-hover:text-primary transition-colors duration-200">
                        {brand.name}
                      </h3>

                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                        {brand.description?.[0] || "No description available"}
                      </p>

                      <div className="cta-link text-xs pt-3 border-t border-divider">
                        View Products{" "}
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
