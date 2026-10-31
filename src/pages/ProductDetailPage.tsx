import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  MapPin,
  PenLine,
  Download,
} from "lucide-react";
import type { Product } from "@/types/product";
import type { Brand } from "@/types/catalog";
import api from "@/lib/api";

import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import manufacturingImage from "@/assets/csr-slider1.jpeg";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductDetailPage() {
  const { categorySlug, subcategorySlug, brandSlug, productSlug } = useParams();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [discoveredImages, setDiscoveredImages] = useState<string[]>([]);
  const [reduceMotion, setReduceMotion] = useState(false);

  const formatText = (slug?: string) => {
    if (!slug) return "";
    return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  useEffect(() => {
    if (!productSlug) return;

    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${productSlug}`);
        setBrand(res.data.brand);
        setProduct(res.data.product);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug]);

  const images = useMemo(() => {
    const uniqueImages = new Set<string>();

    for (const image of discoveredImages) {
      if (image) uniqueImages.add(image);
    }

    return Array.from(uniqueImages);
  }, [discoveredImages]);

  const nextImage = useCallback(() => {
    setCurrentImage((previous) =>
      images.length > 1 ? (previous + 1) % images.length : 0,
    );
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImage((previous) =>
      images.length > 1
        ? previous === 0
          ? images.length - 1
          : previous - 1
        : 0,
    );
  }, [images.length]);

  useEffect(() => {
    setCurrentImage(0);
    setDiscoveredImages([]);
  }, [productSlug]);

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
    if (!product?.image) {
      setDiscoveredImages([]);
      return;
    }

    let cancelled = false;
    const primaryImage = product.image;
    const imageDirectory = primaryImage.slice(
      0,
      primaryImage.lastIndexOf("/") + 1,
    );
    const imageFilename = primaryImage.slice(primaryImage.lastIndexOf("/") + 1);
    const extensionIndex = imageFilename.lastIndexOf(".");
    const extension =
      extensionIndex >= 0 ? imageFilename.slice(extensionIndex) : "";
    const filenameWithoutExtension =
      extensionIndex >= 0
        ? imageFilename.slice(0, extensionIndex)
        : imageFilename;

    // Supports: product.jpeg, product_1.jpeg, product_2.jpeg, etc.
    // Also supports: product-1.jpeg, product-2.jpeg, etc.
    const baseFilename = filenameWithoutExtension.replace(/[_-]\d+$/, "");

    const candidates = [
      primaryImage,
      ...Array.from({ length: 100 }, (_, index) => {
        const number = index + 1;
        return `${imageDirectory}${baseFilename}_${number}${extension}`;
      }),
      ...Array.from({ length: 100 }, (_, index) => {
        const number = index + 1;
        return `${imageDirectory}${baseFilename}-${number}${extension}`;
      }),
    ];

    const checkImage = (src: string) =>
      new Promise<boolean>((resolve) => {
        const image = new Image();

        image.onload = () => resolve(true);
        image.onerror = () => resolve(false);
        image.src = `${BASE_URL}${src}`;
      });

    const discoverImages = async () => {
      const validImages: string[] = [];

      // Preserve the main image first.
      if (await checkImage(primaryImage)) {
        validImages.push(primaryImage);
      }

      // Check numbered variants without duplicating the primary image.
      const additionalImages = await Promise.all(
        candidates.slice(1).map(async (candidate) => {
          if (cancelled || candidate === primaryImage) {
            return null;
          }

          const exists = await checkImage(candidate);

          return exists ? candidate : null;
        }),
      );

      if (cancelled) return;

      validImages.push(
        ...additionalImages.filter((image): image is string => image !== null),
      );

      if (!cancelled) {
        setDiscoveredImages(validImages);
      }
    };

    void discoverImages();

    return () => {
      cancelled = true;
    };
  }, [product?.image]);

  useEffect(() => {
    if (reduceMotion || images.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentImage((previous) => (previous + 1) % images.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [images.length, reduceMotion]);

  if (!loading && !product) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="pt-16">
      {/* ---------------- PAGE HERO BANNER ---------------- */}
      <PageHeroBanner
        eyebrow={formatText(subcategorySlug) || "Product Category"}
        title={product?.name || formatText(productSlug) || "Product"}
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
            label: brand?.name || formatText(brandSlug) || "Brand",
            to: `/products/${categorySlug}/${subcategorySlug}/${brandSlug}`,
          },
          {
            label: product?.name || formatText(productSlug) || "Product",
          },
        ]}
      />

      {/* ---------------- PRODUCT DESCRIPTION + IMAGE SLIDER ---------------- */}
      <div className="bg-surface-subtle border-b border-divider py-8">
        <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE */}
          <div>
            {loading ? (
              <>
                {/* DESCRIPTION BOX */}
                <div className="bg-white border border-divider p-6 rounded shadow-sm mb-6">
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-4">
                  <div className="h-12 w-40 bg-gray-200 rounded animate-pulse" />
                  <div className="h-12 w-48 bg-gray-200 rounded animate-pulse" />
                </div>
              </>
            ) : (
              <div>
                {/* DESCRIPTION BOX */}
                <div className="bg-white border border-divider p-6 rounded shadow-sm mb-6">
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {Array.isArray(product.description)
                      ? product.description.map((para: string, i: number) => (
                          <p key={i}>{para}</p>
                        ))
                      : product.description}
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex h-11 w-full sm:w-[190px] items-center justify-center gap-2 bg-gradient-to-r from-[#279ECE] to-[#1F7FA8] text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#279ECE]/30"
                  >
                    <span>Request Quote</span>
                    <PenLine className="h-3.5 w-3.5" />
                  </Link>

                  {product.pdfUrl && (
                    <a
                      href={`${BASE_URL}${product.pdfUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 w-full sm:w-[190px] items-center justify-center gap-2 border border-[#C7D9E6] bg-white text-sm font-semibold text-[#276A96] transition-all duration-200 hover:border-[#279ECE] hover:bg-[#F5FBFE] hover:text-[#279ECE]"
                    >
                      <span>Download Datasheet</span>
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE IMAGE SLIDER */}
          <div className="relative">
            {loading || (product?.image && images.length === 0) ? (
              <div className="card-image relative aspect-[4/3] overflow-hidden bg-[#F8FAFC]">
                <div className="h-full w-full animate-pulse bg-gray-200" />
              </div>
            ) : (
              images.length > 0 && (
                <>
                  {/* Main Image — same animation as ProductsPage.tsx */}
                  <div className="card-image product-gallery relative aspect-[4/3] overflow-hidden bg-[#F8FAFC]">
                    {images.map((src, index) => {
                      const isActive = index === currentImage;

                      return (
                        <img
                          key={src}
                          src={`${BASE_URL}${src}`}
                          alt={`${product?.name ?? "Product"} — image ${index + 1}`}
                          aria-hidden={!isActive}
                          className={`product-gallery-image absolute inset-0 h-full w-full object-contain ${
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

                    {/* Previous Arrow */}
                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={prevImage}
                        aria-label="Previous product image"
                        className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#0F2A3D] shadow-md transition-all duration-200 hover:scale-105 hover:bg-[#279ECE] hover:text-white"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                    )}

                    {/* Next Arrow */}
                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={nextImage}
                        aria-label="Next product image"
                        className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#0F2A3D] shadow-md transition-all duration-200 hover:scale-105 hover:bg-[#279ECE] hover:text-white"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  {/* Image Indicators */}
                  {images.length > 1 && (
                    <div className="mt-4 flex justify-center gap-2">
                      {images.map((src, index) => (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setCurrentImage(index)}
                          aria-label={`Show product image ${index + 1}`}
                          aria-current={
                            index === currentImage ? "true" : undefined
                          }
                          className={`h-2 w-2 rounded-full transition-colors ${
                            index === currentImage
                              ? "bg-primary"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              )
            )}
          </div>
        </div>
      </div>

      {/* ---------------- TECHNICAL + DETAILS ---------------- */}
      <section className="py-8">
        <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* TECHNICAL CHARACTERISTICS */}
          {loading ? (
            <div>
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-3" />
              <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-6" />

              <div className="border-t border-divider">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-4 border-b border-divider"
                  >
                    <div className="h-5 w-5 rounded-full bg-gray-200 animate-pulse" />
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            product.keyFeatures?.length > 0 && (
              <div>
                <p className="section-label mb-2">KEY PROPERTIES</p>
                <h2 className="font-heading text-2xl mb-6">
                  Technical Characteristics
                </h2>

                <div className="border-t border-divider">
                  {product.keyFeatures.map((feature: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-4 border-b border-divider"
                    >
                      <CheckCircle size={18} className="text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          {/* PRODUCT DETAILS TABLE */}
          {loading ? (
            <div>
              <div className="h-4 w-36 bg-gray-200 rounded animate-pulse mb-4" />

              <div className="border border-divider">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 border-b border-divider text-sm"
                  >
                    <div className="p-4 border-r border-divider">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    </div>

                    <div className="p-4">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            product.specifications && (
              <div>
                <p className="section-label mb-2">PRODUCT DETAILS</p>

                <div className="border border-divider">
                  {Object.entries(product.specifications).map(
                    ([key, value]: [string, string | string[]]) => (
                      <div
                        key={key}
                        className="grid grid-cols-2 border-b border-divider text-sm"
                      >
                        <div className="p-4 uppercase text-muted-foreground border-r border-divider">
                          {key.replace(/([A-Z])/g, " $1")}
                        </div>
                        <div className="p-4 font-medium text-charcoal">
                          {key === "colorOptions" || key === "colourOptions" ? (
                            <div className="flex flex-wrap gap-3">
                              {(Array.isArray(value)
                                ? value
                                : String(value).split(",")
                              ).map((color: string) => {
                                const name = color.trim();

                                const colorMap: Record<string, string> = {
                                  Black: "#1F2937",
                                  White: "#FFFFFF",
                                  Blue: "#279ECE",
                                  Red: "#DC2626",
                                  Green: "#16A34A",
                                  Yellow: "#FACC15",
                                  Orange: "#F97316",
                                  Grey: "#9CA3AF",
                                  Gray: "#9CA3AF",
                                  Brown: "#8B5A2B",
                                  Natural: "#D6C6A8",
                                  Ivory: "#F8F4E3",
                                  Beige: "#E8D8B5",
                                };

                                return (
                                  <div
                                    key={name}
                                    className="flex items-center gap-2 rounded-full border border-divider bg-[#F8FAFC] px-3 py-1"
                                  >
                                    <span
                                      className="h-3 w-3 rounded-full border border-gray-300"
                                      style={{
                                        backgroundColor:
                                          colorMap[name] || "#CBD5E1",
                                      }}
                                    />

                                    <span>{name}</span>
                                  </div>
                                );
                              })}
                            </div>
                          ) : Array.isArray(value) ? (
                            value.join(", ")
                          ) : (
                            value
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* ---------------- APPLICATION AREAS ---------------- */}
      {loading ? (
        <section className="py-8 bg-surface-subtle">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border border-divider bg-white p-6">
                  <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        product.applications.length > 0 && (
          <section className="py-8 bg-surface-subtle">
            <div className="container max-w-7xl mx-auto px-6">
              <p className="section-label mb-2">USE CASES</p>
              <h2 className="font-heading text-2xl mb-8">
                Typical Applications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {product.applications.map((area: string, i: number) => (
                  <div
                    key={i}
                    className="border border-divider bg-white p-6 text-center hover:shadow-md transition"
                  >
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      )}
    </div>
  );
}
