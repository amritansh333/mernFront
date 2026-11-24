import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
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
import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import industryImage from "@/assets/industryHeroBanner.jpeg";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

interface IndustryDetail {
  product: {
    _id: string;
    name: string;
    use: string[] | string;
    href: string;
  };
  material: {
    _id: string;
    slug: string;
    name: string;
    href: string;
  } | null;
}

interface Industry {
  _id: string;
  name: string;
  title: string;
  slug: string;
  subtitle: string;
  image: string;
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
  "build-cons": Building2,
  cement: Factory,
  chemical: FlaskConical,
  "food-bev": Utensils,
  "heavy-equip": Truck,
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

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchIndustries = async () => {
      try {
        if (!API_BASE_URL) {
          throw new Error("API base URL is not configured.");
        }

        const response = await fetch(`${API_BASE_URL}/api/industries`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch industries. Status: ${response.status}`,
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid industries response from server.");
        }

        setIndustries(data);
        setError("");
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        console.error("Error fetching industries:", err);

        setError(
          err instanceof Error ? err.message : "Unable to load industries.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchIndustries();

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

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
    <div className="min-h-screen bg-white pt-16" style={pageTexture}>
      {/* Page Header */}
      <PageHeroBanner
        eyebrow="Polyrib thermoplastic materials are trusted across 20+ industries worldwide - from food processing and automotive to mining, oil & gas, and medical device manufacturing."
        title="Industries"
        highlight="We Serve"
        image={industryImage}
        imageAlt="Multiple Industries Served by Khanna Polyrib"
        imagePosition="center center"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Industries" }]}
      />

      {/* Featured Industries */}
      <section className="py-6 sm:py-8 lg:py-10">
        <div className="container max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          {/* 3 Columns on Mobile, 4 on Desktop */}
          <div className="grid grid-cols-3 lg:grid-cols-4 auto-rows-fr items-stretch gap-2 sm:gap-3 lg:gap-5">
            {error ? (
              <p className="col-span-full text-center text-sm text-red-500 py-8">
                {error}
              </p>
            ) : industries.length === 0 ? (
              <p className="col-span-full text-center text-sm text-muted-foreground py-8">
                No industries available.
              </p>
            ) : (
              industries.map((ind) => {
                const Icon = industryIcons[ind.slug] || Building2;

                return (
                  <Link
                    key={ind._id}
                    to={`/industries/${ind.slug}`}
                    className="category-card group !grid !grid-rows-[auto_minmax(0,1fr)] h-full min-w-0 overflow-hidden rounded-xl sm:rounded-2xl border border-primary/70 bg-white !p-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    {/* Industry Image - Edge to Edge, No White Gaps */}
                    <div className="w-full shrink-0 overflow-hidden bg-white p-0 m-0 leading-[0]">
                      {ind.image && (
                        <img
                          src={getImageUrl(ind.image)}
                          alt={ind.title || ind.name}
                          className="block w-full h-auto m-0 p-0 object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Industry Content */}
                    <div className="flex flex-col min-h-0 min-w-0 h-full px-2 py-2 sm:px-3 sm:py-3 lg:px-4 lg:py-4">
                      {/* Industry Heading */}
                      <h2 className="flex items-center gap-1 sm:gap-1.5 font-heading text-[10px] sm:text-xs lg:text-sm font-bold text-charcoal leading-tight mb-1.5 sm:mb-2 group-hover:text-primary transition-colors duration-200 min-w-0">
                        <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded-md bg-primary/10 text-primary rounded-xl border border-primary/5">
                          <Icon
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </span>

                        <span className="min-w-0 break-words">
                          {ind.title || ind.name}
                        </span>
                      </h2>

                      {/* Industry Description */}
                      <p className="text-charcoal text-[9px] sm:text-[10px] lg:text-xs leading-snug mb-2 sm:mb-3">
                        {ind.subtitle}
                      </p>

                      {/* Product Details - Hidden on Mobile */}
                      <div className="hidden sm:grid grid-cols-3 gap-1.5 lg:gap-2 mb-3">
                        {(ind.details || []).map((detail, index) => {
                          const productName = detail.product?.name || "";

                          const materialName = detail.material?.name;

                          return (
                            <div
                              key={`${detail.product?._id || productName}-${index}`}
                              className="min-w-0"
                            >
                              <div className="font-heading font-semibold text-primary text-[9px] lg:text-[11px] leading-snug break-words">
                                {materialName}
                              </div>

                              <div className="text-[9px] lg:text-[10px] text-muted-foreground leading-tight mt-0.5 break-words">
                                {productName}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Flexible Space - Pushes Explore to Bottom */}
                      <div className="flex-1 min-h-0" />

                      {/* Explore - Mobile / Explore Solutions - Larger Screens */}
                      <div className="flex items-center gap-1 shrink-0 pt-1 text-primary text-[9px] sm:text-[10px] lg:text-xs font-semibold">
                        <span className="sm:hidden">Explore</span>

                        <span className="hidden sm:inline">
                          Explore Solutions
                        </span>

                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 explore-arrow shrink-0" />
                      </div>

                      {/* Bottom Border */}
                      <div className="card-border-bottom mt-1.5 sm:mt-2 shrink-0" />
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Full Industry List */}
      <section className="py-10 sm:py-12 bg-transparent border-t border-divider">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-4">All Sectors</p>

          <h2 className="font-heading text-2xl text-charcoal mb-6">
            Our full industry coverage
          </h2>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {industries.map((ind, index) => {
              const Icon = industryIcons[ind.slug] || Building2;

              return (
                <Link
                  key={ind._id}
                  to={`/industries/${ind.slug}`}
                  className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 border border-primary bg-card text-xs sm:text-sm font-medium text-charcoal-light transition-all duration-200 rounded-xl hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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

          <p className="text-xs text-muted-foreground mt-5">
            Specific product recommendations available for each sector.{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact our technical team
            </Link>{" "}
            for application guidance.
          </p>
        </div>
      </section>
    </div>
  );
}
