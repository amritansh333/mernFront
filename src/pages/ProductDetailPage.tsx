import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  PenLine,
  Download,
  PackageSearch,
  Factory,
  ShieldCheck,
  Layers,
  Zap,
  Settings,
  Boxes,
  Building2,
  Truck,
  Wrench,
  FlaskConical,
  Info,
  PaintbrushVertical,
  RulerDimensionLine,
  BadgeCheck,
  ChevronsRight,
  FileText,
  Package,
} from "lucide-react";
import type { Product } from "@/types/product";
import type { Brand } from "@/types/catalog";
import api from "@/lib/api";
import useFooterAwareSticky from "@/hooks/useFooterAwareSticky";
import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import LoadingState from "@/components/machine-components/LoadingState";
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

const propertyIcons = [ShieldCheck, Layers, Zap, Settings, CheckCircle];

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
  const { bottomOffset: footerBottomOffset, visible: stickyCtasVisible } = useFooterAwareSticky();

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

  const WHATSAPP_NUMBER = "919936794816";

const WHATSAPP_MESSAGE =
  "Hello Polyrib Team, I would like to know more about your products and services.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

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

  // Shared loading state — keep this after all Hooks.
  if (loading) {
    return <LoadingState />;
  }

  if (!loading && !product) {
    return <Navigate to="/products" replace />;
  }

  // Use the respective product image in the hero banner.
  const heroImage = product?.image
    ? product.image.startsWith("http")
      ? product.image
      : `${BASE_URL}${product.image}`
    : manufacturingImage;

  const pageTexture = {
    backgroundColor: "#FFFFFF",
    backgroundImage: `
    linear-gradient(
      90deg,
      #FFFFFF 0%,
      #FDFEFF 25%,
      #F5FAFC 55%,
      #EAF5F9 80%,
      #E3F1F7 100%
    )
  `,
  };

  return (
    <div className="min-h-screen bg-white pb-[calc(7rem+env(safe-area-inset-bottom))] pt-16" style={pageTexture}>
      {/* ---------------- PAGE HERO BANNER ---------------- */}

      <PageHeroBanner
        eyebrow={formatText(subcategorySlug) || "Product Category"}
        title={product?.name || formatText(productSlug) || "Product"}
        image={heroImage}
        imageAlt={product?.name || "Product image"}
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

          <div className="min-w-0 order-2 lg:order-1">
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
                    <Package className="h-5 w-5 text-[#279ECE]" />

                    <h2 className="font-heading text-xl font-bold text-charcoal">
                      {product.name}
                    </h2>
                  </div>

                  <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {(Array.isArray(product.description)
                      ? product.description
                      : [product.description]
                    ).map((para, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                        <p className="min-w-0 flex-1 text-charcoal">{para}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ORIGINAL INLINE ACTION BUTTONS — KEEP IN CONTENT FLOW */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/contact"
                    className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#279ECE] bg-gradient-to-r from-[#279ECE] to-[#1F7FA8] px-2 text-center text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#279ECE]/15 active:translate-y-0"
                  >
                    <span>Request a Quote</span>
                    <PenLine className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:rotate-[-8deg]" />
                  </Link>

                  {product.pdfUrl ? (
                    <a
                      href={`${BASE_URL}${product.pdfUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#279ECE] bg-white px-2 text-center text-sm font-semibold text-[#1F7FA8] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F3FAFD] hover:shadow-sm active:translate-y-0"
                    >
                      <span>Download Datasheet</span>
                      <Download className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" />
                    </a>
                  ) : (
                    <div aria-hidden="true" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE IMAGE SLIDER */}

          <div className="relative min-w-0 order-1 lg:order-2">
            {loading || (product?.image && images.length === 0) ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#E2EDF3] bg-white">
                <div className="h-full w-full animate-pulse bg-gray-100" />
              </div>
            ) : (
              images.length > 0 && (
                <>
                  <div className="product-gallery relative aspect-[4/3] overflow-hidden rounded-xl border border-primary/70 bg-white">
                    {/* MATERIAL BADGE */}
                    {!!product?.materials?.length && (
                      <div className="absolute left-3 top-3 z-30 flex max-w-[calc(100%-1.5rem)] flex-wrap items-center gap-2">
                        {product.materials.map((material) => (
                          <Link
                            key={material._id}
                            to={`/materials/${material.slug}`}
                            className="inline-flex items-center gap-2 rounded-xl border border-primary/50 bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:shadow-md"
                            aria-label={`View ${material.name} material`}
                          >
                            <FlaskConical className="h-3.5 w-3.5 shrink-0 text-[#279ECE]" />

                            <span className="text-[10px] font-bold uppercase tracking-wide text-[#276A96] sm:text-[11px]">
                              {material.name?.trim()}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}

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

                  {/* COLOR OPTIONS + THICKNESS RANGE */}
                  {product?.specifications && (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {/* COLOR OPTIONS */}
                      {(() => {
                        const colorEntry = Object.entries(
                          product.specifications,
                        ).find(
                          ([key]) =>
                            /colou?r.*options/i.test(key) ||
                            /colour/i.test(key),
                        );

                        if (!colorEntry) return null;

                        const colors = Array.isArray(colorEntry[1])
                          ? colorEntry[1]
                          : String(colorEntry[1]).split(",");

                        return (
                          <div className="flex min-w-0 items-center gap-2">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
                              <PaintbrushVertical className="h-4 w-4 text-[#279ECE]" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-[9px] font-bold uppercase tracking-wide text-[#527184] sm:text-[10px]">
                                Color Options
                              </p>

                              <p className="break-words text-xs font-semibold text-[#276A96] sm:text-sm">
                                {colors
                                  .map((color) => String(color).trim())
                                  .join(", ")}
                              </p>
                            </div>
                          </div>
                        );
                      })()}

                      {/* THICKNESS RANGE */}
                      {(() => {
                        const thicknessEntry = Object.entries(
                          product.specifications,
                        ).find(([key]) => /thickness/i.test(key));

                        if (!thicknessEntry) return null;

                        const thickness = Array.isArray(thicknessEntry[1])
                          ? thicknessEntry[1].join(", ")
                          : String(thicknessEntry[1]);

                        return (
                          <div className="flex min-w-0 items-center gap-2">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
                              <RulerDimensionLine className="h-4 w-4 text-[#279ECE]" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-[9px] font-bold uppercase tracking-wide text-[#527184] sm:text-[10px]">
                                Thickness Range
                              </p>

                              <p className="break-words text-xs font-semibold text-[#276A96] sm:text-sm">
                                {thickness}
                              </p>
                            </div>
                          </div>
                        );
                      })()}
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
            <div className="order-2 lg:order-1">
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
              <div className="order-2 lg:order-1">
                <div className="mb-6">
                  <p className="section-label mb-2">KEY PROPERTIES</p>

                  <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
                    Technical Characteristics
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Important properties that define product performance.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {product.keyFeatures.map((feature: string, i: number) => {
                    const Icon = propertyIcons[i % propertyIcons.length];

                    return (
                      <div
                        key={i}
                        className="group flex min-h-[54px] w-full min-w-0 items-center justify-center gap-2 rounded-xl border border-[#279ECE] bg-white px-2 py-3 text-center transition-all duration-200 hover:border-[#1688B9] hover:bg-[#F3FAFD] active:scale-[0.98]"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 group-hover:bg-[#DDF2FA] sm:h-10 sm:w-10">
                          <Icon className="h-4 w-4 text-[#279ECE] sm:h-5 sm:w-5" />
                        </div>

                        <p className="min-w-0 break-words text-center text-xs font-medium leading-relaxed text-charcoal sm:text-sm">
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
            <div className="order-1 lg:order-2">
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
              <div className="min-w-0 order-1 lg:order-2">
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

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {product.applications.map((area: string, i: number) => {
                  const Icon = applicationIcons[i % applicationIcons.length];

                  return (
                    <div
                      key={i}
                      className="group relative flex min-w-0 items-center gap-2 overflow-hidden rounded-2xl border border-primary bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#279ECE]/50 hover:shadow-md hover:shadow-[#279ECE]/10 sm:gap-3 sm:p-4"
                    >
                      {/* Accent */}
                      <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#279ECE] to-[#1F7FA8] opacity-70 transition-all duration-300 group-hover:w-1.5 group-hover:opacity-100" />

                      {/* Smaller Icon */}
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C9E8F5] bg-white shadow-sm sm:h-8 sm:w-8">
                        <Icon className="h-3.5 w-3.5 text-[#279ECE] sm:h-4 sm:w-4" />
                      </div>

                      {/* Vertically Centered Text */}
                      <span className="min-w-0 break-words text-xs font-semibold leading-relaxed text-charcoal transition-colors duration-300 group-hover:text-[#147CA8] sm:text-sm">
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

      {/* ---------------- STICKY PRODUCT CTAs ---------------- */}
<div
  className="fixed inset-x-0 z-[60] border-t border-white/30 px-3 pb-[calc(env(safe-area-inset-bottom)+0.65rem)] pt-3 shadow-[0_-8px_28px_rgba(31,127,168,0.12)] backdrop-blur-md transition-[bottom] duration-200"
  style={{
    bottom: footerBottomOffset,
    opacity: stickyCtasVisible ? 1 : 0,
    pointerEvents: stickyCtasVisible ? "auto" : "none",
    visibility: stickyCtasVisible ? "visible" : "hidden",
  }}
  role="region"
  aria-label="Product actions"
>
  <div className="mx-auto grid w-full max-w-7xl grid-cols-3 gap-2 sm:gap-3">

    {/* Request Quote */}
    <Link
      to="/contact"
      className="group inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-xl border border-[#279ECE] bg-gradient-to-r from-[#279ECE] to-[#1F7FA8] px-2 text-center text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#279ECE]/20 active:scale-[0.99] sm:text-sm"
    >
      <span>Request a Quote</span>
      <PenLine className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:rotate-[-8deg]" />
    </Link>

    {/* Download Datasheet */}
    {product.pdfUrl ? (
      <a
        href={`${BASE_URL}${product.pdfUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-xl border border-[#279ECE] bg-white/80 px-2 text-center text-xs font-semibold text-[#1F7FA8] shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md active:scale-[0.99] sm:text-sm"
      >
        <span>Download Datasheet</span>
        <Download className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" />
      </a>
    ) : (
      <div aria-hidden="true" />
    )}

    {/* Chat on WhatsApp */}
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Polyrib on WhatsApp"
      className="group inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-xl border border-[#25D366] bg-gradient-to-r from-[#25D366] to-[#128C7E] px-2 text-center text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#25D366]/25 active:scale-[0.99] sm:text-sm"
    >
      <span>Chat on WhatsApp</span>

      {/* WhatsApp Logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.8 11.8 0 0 0 12.1 0C5.55 0 .22 5.32.22 11.88c0 2.1.55 4.15 1.6 5.96L0 24l6.34-1.66a11.85 11.85 0 0 0 5.75 1.47h.01c6.55 0 11.88-5.33 11.88-11.89 0-3.17-1.24-6.15-3.46-8.44ZM12.1 21.78a9.88 9.88 0 0 1-5.03-1.37l-.36-.22-3.76.98 1-3.66-.24-.38a9.85 9.85 0 0 1-1.51-5.25c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 7c0 5.46-4.44 9.89-9.9 9.89Zm5.43-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2 0-.38-.05-.52-.15-.15-.65-1.56-.89-2.14-.1-.58-.5-.5-.52-.5h-.45c-.2 0-.52.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.23 5.13 4.53.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z" />
      </svg>
    </a>

  </div>
</div>
    </div>
  );
}
