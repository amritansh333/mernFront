import React, { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  MapPin,
} from "lucide-react";
import api from "@/lib/api";

export default function ProductDetailPage() {
  const { categorySlug, subCategorySlug, brandSlug, productSlug } =
    useParams();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

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

  if (loading)
    return (
      <div className="pt-16 py-20 text-center text-muted-foreground">
        Loading...
      </div>
    );

  if (!product) return <Navigate to="/products" replace />;

  /* Repeat same image 3 times */
  const images = product.image
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
      <div className="bg-surface-subtle border-b border-divider py-14">
        <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div>

            {/* LOCATION / NAVIGATION */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin size={16} />
              <Link to={`/products/${categorySlug}`} className="hover:text-primary">
                {categorySlug?.replaceAll("-", " ")}
              </Link>
              <span>/</span>
              <Link
                to={`/products/${categorySlug}/${subCategorySlug}`}
                className="hover:text-primary"
              >
                {subCategorySlug?.replaceAll("-", " ")}
              </Link>
              <span>/</span>
              <Link
                to={`/products/${categorySlug}/${subCategorySlug}/${brandSlug}`}
                className="hover:text-primary"
              >
                {product.brand?.name}
              </Link>
            </div>

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
            <div className="flex gap-4">
              <Link
                to="/contact"
                className="px-6 py-3 bg-primary text-white font-semibold transition hover:bg-primary-dark"
              >
                Request Quote
              </Link>

              {product.pdfUrl && (
                <a
                  href={`http://localhost:5000${product.pdfUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-6 py-3 border border-primary text-primary font-semibold overflow-hidden group transition-all duration-300"
                >
                  <span className="relative z-10 group-hover:text-white transition">
                    Download Datasheet
                  </span>

                  {/* Glow Background */}
                  <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
              )}
            </div>
          </div>

          {/* RIGHT SIDE IMAGE SLIDER */}
          <div className="relative">

            {images.length > 0 && (
              <>
                <img
                  src={`http://localhost:5000${images[currentImage]}`}
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
                  {images.map((_: any, i: number) => (
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
            )}
          </div>
        </div>
      </div>

      {/* ---------------- TECHNICAL + DETAILS ---------------- */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* TECHNICAL CHARACTERISTICS */}
          {product.keyFeatures?.length > 0 && (
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
          )}

          {/* PRODUCT DETAILS TABLE */}
          {product.specifications && (
            <div>
              <p className="section-label mb-2">PRODUCT DETAILS</p>

              <div className="border border-divider">
                {Object.entries(product.specifications).map(
                  ([key, value]: any) => (
                    <div
                      key={key}
                      className="grid grid-cols-2 border-b border-divider text-sm"
                    >
                      <div className="p-4 uppercase text-muted-foreground border-r border-divider">
                        {key.replace(/([A-Z])/g, " $1")}
                      </div>
                      <div className="p-4 font-medium text-charcoal">
                        {Array.isArray(value)
                          ? value.join(", ")
                          : value}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- APPLICATION AREAS ---------------- */}
      {product.specifications?.applicationAreas?.length > 0 && (
        <section className="py-12 bg-surface-subtle">
          <div className="container max-w-7xl mx-auto px-6">
            <p className="section-label mb-2">USE CASES</p>
            <h2 className="font-heading text-2xl mb-8">
              Typical Applications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.specifications.applicationAreas.map(
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
      )}
    </div>
  );
}