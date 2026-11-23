import React, { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  X,
  ZoomIn,
  Plane,
  Sprout,
  Car,
  Building2,
  Factory,
  FlaskConical,
  Utensils,
  Truck,
  Hammer,
  Shirt,
  Anchor,
  Package,
  HeartPulse,
  Mountain,
  Fuel,
  Boxes,
  BookOpen,
  Signpost,
  Dumbbell,
  Train,
  Droplets,
} from "lucide-react";
import LoadingState from "@/components/machine-components/LoadingState";
import type { LucideIcon } from "lucide-react";
import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

interface IndustryProduct {
  _id: string;
  name: string;
  use: string[] | string;
  href: string;
}

interface IndustryMaterial {
  _id: string;
  slug: string;
  name: string;
  href: string;
}

interface IndustryDetail {
  product: IndustryProduct;
  material: IndustryMaterial | null;
}

interface Industry {
  _id: string;
  name: string;
  title: string;
  slug: string;
  subtitle: string;
  image: string;
  gallery?: string[];
  intro: string;
  capabilities: string[];
  details: IndustryDetail[];
  standards: string[];
  order: number;
  path: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonicalPath?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogType?: string;
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
  };
}

const industryIcons: Record<string, LucideIcon> = {
  aerospace: Plane,
  "agro-processing": Sprout,
  automotive: Car,
  "build-construction": Building2,
  cement: Factory,
  chemical: FlaskConical,
  "food-beverage": Utensils,
  "heavy-equipment": Truck,
  "iron-steel": Hammer,
  leather: Shirt,
  marine: Anchor,
  "material-handling": Package,
  medical: HeartPulse,
  mining: Mountain,
  "oil-gas": Fuel,
  packaging: Boxes,
  "pulp-paper": BookOpen,
  signage: Signpost,
  "sports-recreation": Dumbbell,
  transportation: Train,
  "water-waste-water": Droplets,
};

const getImageUrl = (image?: string) => {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${API_BASE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};

const getProductUse = (use?: string[] | string) => {
  if (Array.isArray(use)) {
    return use.filter(Boolean).join(", ");
  }

  return use || "";
};

export default function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [industry, setIndustry] = useState<Industry | null>(null);
  const [allIndustries, setAllIndustries] = useState<Industry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchIndustryData = async () => {
      try {
        if (!API_BASE_URL) {
          throw new Error("API base URL is not configured.");
        }

        if (!slug) {
          throw new Error("Industry slug is missing.");
        }

        setIsLoading(true);
        setError("");

        const [industryResponse, industriesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/industries/${slug}`, {
            signal: controller.signal,
          }),
          fetch(`${API_BASE_URL}/api/industries`, {
            signal: controller.signal,
          }),
        ]);

        if (industryResponse.status === 404) {
          setIndustry(null);
          setAllIndustries([]);
          return;
        }

        if (!industryResponse.ok) {
          throw new Error(
            `Failed to fetch industry details. Status: ${industryResponse.status}`,
          );
        }

        if (!industriesResponse.ok) {
          throw new Error(
            `Failed to fetch industries. Status: ${industriesResponse.status}`,
          );
        }

        const industryData = await industryResponse.json();
        const industriesData = await industriesResponse.json();

        if (!industryData || !industryData._id) {
          throw new Error("Invalid industry response from server.");
        }

        if (!Array.isArray(industriesData)) {
          throw new Error("Invalid industries list response from server.");
        }

        setIndustry(industryData);
        setAllIndustries(industriesData);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        console.error("Error fetching industry data:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load industry details.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchIndustryData();

    return () => {
      controller.abort();
    };
  }, [slug]);

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

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div
        className="min-h-screen bg-white pt-16 flex items-center justify-center px-4"
        style={pageTexture}
      >
        <div className="text-center">
          <p className="text-sm text-red-500 mb-4">{error}</p>

          <Link
            to="/industries"
            className="cta-link inline-flex items-center gap-2"
          >
            Back to Industries
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (!industry) {
    return <Navigate to="/industries" replace />;
  }

  const data = industry;

  // Use the industry image as the gallery fallback when no gallery is provided.
  const galleryImages =
    data.gallery?.length > 0 ? data.gallery : data.image ? [data.image] : [];

  // Get unique materials from the dynamically returned product details.
  const materials = Array.from(
    new Map(
      (data.details || [])
        .filter((detail) => detail.material?._id)
        .map((detail) => [detail.material!._id, detail.material!]),
    ).values(),
  );

  return (
    <div className="min-h-screen bg-white pt-16" style={pageTexture}>
      {/* Page Hero */}
      <PageHeroBanner
        eyebrow={data.subtitle || ""}
        title={data.title || data.name}
        highlight="Industry"
        image={getImageUrl(data.image)}
        imageAlt={`${data.title || data.name} industry`}
        imagePosition="center center"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Industries", to: "/industries" },
          {
            label: data.title || data.name,
          },
        ]}
      />

      {/* Industry Overview and Recommended Products */}
      <section className="py-8 border-b border-divider">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT SIDE */}
            <div>
              {/* Overview */}
              <p className="section-label mb-3">Overview</p>

              <p className="text-charcoal-light leading-relaxed text-lh">
                {data.intro || ""}
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                {materials.map((material) => (
                  <Link
                    key={material._id}
                    to={`/materials/${material.slug}`}
                    className="inline-flex items-center gap-2 text-xs px-3 py-1 bg-primary/5 text-primary font-bold rounded-xl border border-primary/30 hover:bg-primary/20 transition-colors duration-200"
                  >
                    <FlaskConical className="w-3.5 h-3.5 shrink-0" />
                    {material.name}
                  </Link>
                ))}
              </div>

              {/* Core Capabilities */}
              <div className="mt-8">
                <p className="section-label mb-3">Core Capabilities</p>

                <div className="space-y-3">
                  {(data.capabilities || []).map((capability, index) => (
                    <div
                      key={`${capability}-${index}`}
                      className="flex gap-2 py-2 border-b border-divider last:border-0"
                    >
                      <div className="w-1.5 h-1.5 bg-primary mt-1.5 shrink-0" />

                      <span className="text-lh text-charcoal-light">
                        {capability}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Dynamic Standards */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {(data.standards || []).map((standard, index) => (
                    <span
                      key={`${standard}-${index}`}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 border border-primary text-charcoal-light rounded-xl"
                    >
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                      {standard}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>
              {/* Recommended Products */}
              <p className="section-label mb-3">Recommended Products</p>

              <h2 className="font-heading text-2xl text-charcoal mb-4">
                Polyrib grades for {data.title || data.name} Industry
              </h2>

              <p className="text-charcoal-light text-sm leading-relaxed mb-5">
                These Polyrib grades are routinely specified in{" "}
                {(data.title || data.name).toLowerCase()} applications. Contact
                our technical team for grade confirmation.
              </p>

              <div className="mt-6 space-y-3">
                {(data.details || []).map((detail, index) => {
                  const product = detail.product;

                  if (!product) return null;

                  const productName = product.name || "";
                  const productUse = getProductUse(product.use);

                  const productContent = (
                    <>
                      <div>
                        <div className="font-heading font-semibold text-charcoal text-sm group-hover:text-primary transition-colors duration-200">
                          {productName}
                        </div>

                        {productUse && (
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {productUse}
                          </div>
                        )}
                      </div>

                      <ArrowRight className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  );

                  return product.href ? (
                    <Link
                      key={product._id || `${productName}-${index}`}
                      to={product.href}
                      className="flex items-center justify-between gap-4 p-4 bg-card border border-primary hover:border-primary/40 hover:shadow-card transition-all duration-200 group rounded-xl"
                    >
                      {productContent}
                    </Link>
                  ) : (
                    <div
                      key={product._id || `${productName}-${index}`}
                      className="flex items-center justify-between gap-4 p-4 bg-card border border-primary rounded-xl"
                    >
                      {productContent}
                    </div>
                  );
                })}

                {/* Technical Enquiry */}
                <Link
                  to="/contact?tab=quote"
                  className="inline-flex items-center gap-3 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200 rounded-xl"
                >
                  Technical Enquiry
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Image Gallery */}
      <section className="py-10 sm:py-14">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <p className="section-label mb-2">Industrial Gallery</p>

              <h2 className="font-heading text-2xl sm:text-3xl text-charcoal">
                {data.title || data.name} Industry Images
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {galleryImages.map((image, index) => {
              const imageUrl = getImageUrl(image);

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(imageUrl)}
                  aria-label={`Zoom ${data.title || data.name} image ${index + 1}`}
                  className="group relative block w-full overflow-hidden bg-surface-subtle border border-border text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl border border-primary"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={`${data.title || data.name} industry view ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 bg-charcoal/85 text-white px-3 py-2 text-xs font-semibold opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    <ZoomIn className="w-4 h-4" />
                    View image
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore Other Industries */}
      <section className="py-8 sm:py-10 border-y border-divider">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <p className="section-label mb-2">Explore More</p>

            <h2 className="font-heading text-2xl sm:text-3xl text-charcoal">
              Industries We Serve
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {allIndustries.map((ind, index) => {
              const Icon = industryIcons[ind.slug] || Building2;
              const isCurrentIndustry = ind.slug === slug;

              return (
                <Link
                  key={ind._id}
                  to={`/industries/${ind.slug}`}
                  aria-current={isCurrentIndustry ? "page" : undefined}
                  className={`group flex items-center gap-2 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 border bg-card text-xs sm:text-sm font-medium transition-all duration-200 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isCurrentIndustry
                      ? "border-primary text-primary bg-primary/5"
                      : "border-border text-charcoal-light hover:border-primary hover:text-primary"
                  }`}
                  style={{ animationDelay: `${index * 35}ms` }}
                >
                  <Icon
                    className="w-4 h-4 text-primary shrink-0 transition-transform duration-200 group-hover:scale-110"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />

                  <span className="whitespace-nowrap">
                    {ind.title || ind.name}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Link to="/industries" className="cta-link">
              View all industries
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Full-size Image Viewer */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${data.title || data.name} image viewer`}
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            aria-label="Close image viewer"
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={activeImage}
            alt={`${data.title || data.name} enlarged view`}
            onClick={(event) => event.stopPropagation()}
            className="max-w-full max-h-[88vh] w-auto h-auto object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
