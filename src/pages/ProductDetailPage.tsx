
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  PenLine,
  Download,
  FileText,
  Factory,
  ShieldCheck,
  Layers,
  Zap,
  Settings,
  Package,
  Boxes,
  Building2,
  Truck,
  Wrench,
  FlaskConical,
  Info,
} from "lucide-react";
import type { Product } from "@/types/product";
import type { Brand } from "@/types/catalog";
import api from "@/lib/api";

import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import manufacturingImage from "@/assets/csr-slider1.jpeg";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const applicationIcons = [
  Factory,
  Building2,
  Settings,
  Package,
  Truck,
  Wrench,
  Boxes,
  ShieldCheck,
  FlaskConical,
];

const propertyIcons = [
  ShieldCheck,
  Layers,
  Zap,
  Settings,
  CheckCircle,
];

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

    const imageFilename = primaryImage.slice(
      primaryImage.lastIndexOf("/") + 1,
    );

    const extensionIndex = imageFilename.lastIndexOf(".");
    const extension =
      extensionIndex >= 0 ? imageFilename.slice(extensionIndex) : "";

    const filenameWithoutExtension =
      extensionIndex >= 0
        ? imageFilename.slice(0, extensionIndex)
        : imageFilename;

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

    const getImageUrl = (src: string) =>
      src.startsWith("http") ? src : `${BASE_URL}${src}`;

    const checkImage = (src: string) =>
      new Promise<boolean>((resolve) => {
        const image = new Image();

        image.onload = () => resolve(true);
        image.onerror = () => resolve(false);
        image.src = getImageUrl(src);
      });

    const discoverImages = async () => {
      const validImages: string[] = [];

      if (await checkImage(primaryImage)) {
        validImages.push(primaryImage);
      }

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

  const pageTexture = {
    backgroundColor: "#FFFFFF",
    backgroundImage: `
      radial-gradient(circle at 12px 12px, rgba(39, 158, 206, 0.055) 1px, transparent 1.5px),
      linear-gradient(135deg, rgba(39, 158, 206, 0.025) 25%, transparent 25%),
      linear-gradient(315deg, rgba(39, 158, 206, 0.025) 25%, transparent 25%)
    `,
    backgroundSize: "28px 28px, 56px 56px, 56px 56px",
  };

  return (
    <div className="min-h-screen bg-white pt-16" style={pageTexture}>
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

      <section className="border-b border-[#E2EDF3] bg-transparent py-8 sm:py-10">
        <div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-2 lg:gap-12">
          {/* LEFT SIDE */}

          <div className="min-w-0">
            {loading ? (
              <>
                <div className="mb-6 space-y-4">
                  <div className="h-4 w-full animate-pulse rounded-xl bg-gray-200" />
                  <div className="h-4 w-11/12 animate-pulse rounded-xl bg-gray-200" />
                  <div className="h-4 w-5/6 animate-pulse rounded-xl bg-gray-200" />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
                  <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
                </div>
              </>
            ) : (
              <div>
                {/* PRODUCT OVERVIEW — UNBOXED */}

                <div className="mb-7">
                  <div className="mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-[#279ECE]" />

                    <h2 className="font-heading text-lg font-bold text-charcoal">
                      Product Overview
                    </h2>
                  </div>

                  <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {(Array.isArray(product.description)
                      ? product.description
                      : [product.description]
                    ).map((para, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                        <p className="min-w-0 flex-1 text-[#2B3647]">{para}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ACTION BUTTONS */}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Link
                    to="/contact"
                    className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#279ECE] bg-gradient-to-r from-[#279ECE] to-[#1F7FA8] px-4 text-center text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#279ECE]/15 active:translate-y-0"
                  >
                    <span>Request Quote</span>

                    <PenLine className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-8deg]" />
                  </Link>

                  {product.pdfUrl ? (
                    <a
                      href={`${BASE_URL}${product.pdfUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#279ECE] bg-white px-4 text-center text-sm font-semibold text-[#1F7FA8] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F3FAFD] hover:shadow-sm active:translate-y-0"
                    >
                      <span>Download Datasheet</span>

                      <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                    </a>
                  ) : (
                    <div className="hidden sm:block" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE IMAGE SLIDER */}

          <div className="relative min-w-0">
            {loading || (product?.image && images.length === 0) ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#E2EDF3] bg-white">
                <div className="h-full w-full animate-pulse bg-gray-100" />
              </div>
            ) : (
              images.length > 0 && (
                <>
                  <div className="product-gallery relative aspect-[4/3] overflow-hidden rounded-xl border border-[#E2EDF3] bg-white">
                    {images.map((src, index) => {
                      const isActive = index === currentImage;
                      const imageUrl = src.startsWith("http")
                        ? src
                        : `${BASE_URL}${src}`;

                      return (
                        <img
                          key={src}
                          src={imageUrl}
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

                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={prevImage}
                        aria-label="Previous product image"
                        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-[#DCEAF1] bg-white/95 text-[#0F2A3D] shadow-sm transition-all duration-200 hover:bg-[#279ECE] hover:text-white active:scale-95"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                    )}

                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={nextImage}
                        aria-label="Next product image"
                        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-[#DCEAF1] bg-white/95 text-[#0F2A3D] shadow-sm transition-all duration-200 hover:bg-[#279ECE] hover:text-white active:scale-95"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    )}
                  </div>

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
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            index === currentImage
                              ? "w-8 bg-[#279ECE]"
                              : "w-2.5 bg-gray-300 hover:bg-[#279ECE]/60"
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
      </section>

      {/* ---------------- TECHNICAL + DETAILS ---------------- */}

      <section className="bg-transparent py-10 sm:py-12">
        <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:gap-12">
          {/* TECHNICAL CHARACTERISTICS */}

          {loading ? (
            <div>
              <div className="mb-3 h-4 w-28 animate-pulse rounded bg-gray-200" />
              <div className="mb-6 h-8 w-64 animate-pulse rounded bg-gray-200" />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 animate-pulse rounded-xl border border-[#E2EDF3] bg-white"
                  />
                ))}
              </div>
            </div>
          ) : (
            product.keyFeatures?.length > 0 && (
              <div>
                <div className="mb-6">
                  <p className="section-label mb-2">KEY PROPERTIES</p>

                  <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
                    Technical Characteristics
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Important properties that define product performance.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {product.keyFeatures.map((feature: string, i: number) => {
                    const Icon = propertyIcons[i % propertyIcons.length];

                    return (
                      <div
                        key={i}
                        className="group flex min-h-[76px] items-center justify-center gap-3 rounded-xl border border-primary bg-white px-4 py-4 text-center transition-all duration-200 hover:border-[#279ECE]/50 hover:bg-[#F8FCFE] active:scale-[0.99]"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 group-hover:bg-[#DDF2FA]">
                          <Icon className="h-5 w-5 text-[#279ECE]" />
                        </div>

                        <p className="min-w-0 text-center text-sm font-medium leading-relaxed text-charcoal">
                          {feature}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          )}

          {/* PRODUCT DETAILS TABLE */}

          {loading ? (
            <div>
              <div className="mb-4 h-4 w-36 animate-pulse rounded bg-gray-200" />

              <div className="overflow-hidden rounded-xl border border-[#DCE7ED] bg-white">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] border-b border-[#DCE7ED] text-sm last:border-b-0"
                  >
                    <div className="border-r border-[#DCE7ED] p-3 sm:p-4">
                      <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                    </div>

                    <div className="p-3 sm:p-4">
                      <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            product.specifications &&
            Object.keys(product.specifications).length > 0 && (
              <div className="min-w-0">
                <div className="mb-6">
                  <p className="section-label mb-2">PRODUCT DETAILS</p>

                  <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
                    Specifications
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Product information and available specifications.
                  </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-primary bg-white">
                  {Object.entries(product.specifications).map(
                    ([key, value]: [string, string | string[]], index) => {
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

                      const isColorOption =
                        key === "colorOptions" || key === "colourOptions";

                      return (
                        <div
                          key={key}
                          className={`grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] text-xs transition-colors duration-200 sm:text-sm ${
                            index % 2 === 0 ? "bg-white" : "bg-[#FAFCFD]"
                          } ${
                            index !==
                            Object.entries(product.specifications).length - 1
                              ? "border-b border-primary"
                              : ""
                          }`}
                        >
                          {/* SPECIFICATION LABEL */}

                          <div className="flex min-w-0 items-center gap-2 border-r border-primary bg-[#F2F8FB] px-2.5 py-3 sm:px-4 sm:py-4">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#279ECE]" />

                            <span className="break-words text-[10px] font-semibold uppercase leading-relaxed tracking-wide text-[#527184] sm:text-xs">
                              {key.replace(/([A-Z])/g, " $1")}
                            </span>
                          </div>

                          {/* SPECIFICATION VALUE */}

                          <div className="flex min-w-0 items-center break-words px-2.5 py-3 text-xs font-medium leading-relaxed text-charcoal sm:px-4 sm:py-4 sm:text-sm">
                            {isColorOption ? (
                              <div className="flex flex-wrap gap-2">
                                {(Array.isArray(value)
                                  ? value
                                  : String(value).split(",")
                                ).map((color: string) => {
                                  const name = color.trim();

                                  return (
                                    <div
                                      key={name}
                                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE7ED] bg-white px-2 py-1.5 text-[10px] font-medium sm:text-xs"
                                    >
                                      <span
                                        className="h-3 w-3 shrink-0 rounded-full border border-gray-300"
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
                      );
                    },
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* ---------------- APPLICATION AREAS ---------------- */}

      {loading ? (
        <section className="bg-transparent py-10 sm:py-12">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-3 h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="mb-8 h-8 w-64 animate-pulse rounded bg-gray-200" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-xl border border-[#E1EAF0] bg-white"
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        product.applications?.length > 0 && (
          <section className="bg-transparent py-10 sm:py-12">
            <div className="container mx-auto max-w-7xl px-6">
              <div className="mb-8">
                <p className="section-label mb-2">USE CASES</p>

                <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
                  Typical Applications
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Explore the industries and applications where this product
                  delivers reliable performance.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {product.applications.map((area: string, i: number) => {
                  const Icon = applicationIcons[i % applicationIcons.length];

                  return (
                    <div
                      key={i}
                      className="group inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-xl border border-[#279ECE] bg-white px-5 py-3 text-center transition-all duration-200 hover:border-[#1688B9] hover:bg-[#F3FAFD] active:scale-[0.98] sm:w-auto sm:justify-start"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-[#279ECE] transition-transform duration-200 group-hover:scale-105" />

                      <span className="text-sm font-medium text-[#334B5C] transition-colors duration-200 group-hover:text-[#147CA8]">
                        {area}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )
      )}
    </div>
  );
}

