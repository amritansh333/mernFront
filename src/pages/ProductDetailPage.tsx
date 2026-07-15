import React, { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  MapPin,
  ArrowRight,
  Download
} from "lucide-react";
import type { Product } from "@/types/product";
import api from "@/lib/api";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function ProductDetailPage() {
  const { categorySlug, subcategorySlug, brandSlug, productSlug } =
    useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

    const formatText = (slug?: string) => {
    if (!slug) return "";
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  useEffect(() => {
    if (!productSlug) return;

    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${productSlug}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug]);

  if (!loading && !product) return <Navigate to="/products" replace />;

  /* Repeat same image 3 times */
  const images = product?.image
    ? [product.image, product.image, product.image]
    : [];

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  return (
    <div className="pt-16">

      {/* ---------------- HERO SECTION ---------------- */}
      <div className="bg-surface-subtle border-b border-divider py-8">
        <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div>

            {/* 🔹 Breadcrumb */}
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

      <span>/</span>

      <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />

      <span>/</span>

      <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
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

      <Link
        to={`/products/${categorySlug}/${subcategorySlug}`}
        className="hover:text-primary"
      >
        {formatText(subcategorySlug)}
      </Link>

      <span>/</span>

      <Link
        to={`/products/${categorySlug}/${subcategorySlug}/${brandSlug}`}
        className="hover:text-primary"
      >
        {formatText(brandSlug)}
      </Link>

      <span>/</span>

      <span className="text-charcoal">
        {formatText(productSlug)}
      </span>
    </>
  )}
</nav>

            {loading ? (
              <>
                {/* TITLE */}
                <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-5" />

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
                <h1 className="font-heading text-4xl text-charcoal mb-5">
                  {product.name}
                </h1>

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
    <ArrowRight className="h-4 w-4" />
  </Link>

  {product.pdfUrl && (
    <a
      href={`${BASE_URL}${product.pdfUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-11 w-full sm:w-[190px] items-center justify-center gap-2 border border-[#C7D9E6] bg-white text-sm font-semibold text-[#276A96] transition-all duration-200 hover:border-[#279ECE] hover:bg-[#F5FBFE] hover:text-[#279ECE]"
    >
      <span>Download Datasheet</span>
      <Download className="h-4 w-4" />
    </a>
  )}
</div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE IMAGE SLIDER */}
          <div className="relative">

            {loading ? (
              <>
                <div className="w-full h-[380px] bg-gray-200 rounded-md animate-pulse" />

                <div className="flex justify-center gap-2 mt-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-2 w-2 rounded-full bg-gray-300 animate-pulse"
                    />
                  ))}
                </div>
              </>
            ) : (
              images.length > 0 && (
                <>
                  <img
                    src={`${BASE_URL}${images[currentImage]}`}
                    alt={product.name}
                    className="w-full h-[380px] object-cover rounded-md"
                  />

                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <div className="flex justify-center gap-2 mt-4">
                    {images.map((_: string, i: number) => (
                      <span
                        key={i}
                        className={`h-2 w-2 rounded-full ${
                          i === currentImage
                            ? "bg-primary"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
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
                      <CheckCircle
                        size={18}
                        className="text-primary"
                      />
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
                    ([key, value]: [
  string,
  string | string[]
]) => (
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
      {(Array.isArray(value) ? value : String(value).split(",")).map(
        (color: string) => {
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
                  backgroundColor: colorMap[name] || "#CBD5E1",
                }}
              />

              <span>{name}</span>
            </div>
          );
        }
      )}
    </div>
  ) : Array.isArray(value) ? (
    value.join(", ")
  ) : (
    value
  )}
</div>
                      </div>
                    )
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
                <div
                  key={i}
                  className="border border-divider bg-white p-6"
                >
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
                {product.applications.map(
                  (area: string, i: number) => (
                    <div
                      key={i}
                      className="border border-divider bg-white p-6 text-center hover:shadow-md transition"
                    >
                      {area}
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        )
      )}
    </div>
  );
}