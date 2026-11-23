import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  FlaskConical,
  ShoppingCart,
} from "lucide-react";
import { useScrollFade } from "@/hooks/useScrollFade";
import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import manufacturingImage from "@/assets/polymer-materials.jpeg";
import LoadingState from "@/components/machine-components/LoadingState";
interface Material {
  _id: string;
  brand: string;
  name: string;
  title: string;
  base: string;
  slug: string;
  colour: string;
  tagline: string;
  desc: string;
  grades: string[];

  industries: {
    name: string;
    slug: string;
  }[];

  keyProps: string[];
  maxTemp: string;
  minTemp: string;

  // Ordering
  order: number;

  // Page information
  path: string;
  description: string;

  // SEO metadata
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalPath: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    ogType: string;
    twitterCard: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: string;
  };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

export default function MaterialsPage() {
  const { slug } = useParams();

  const [selected, setSelected] = useState<string | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMaterials = async () => {
      try {
        if (!API_BASE_URL) {
          throw new Error("VITE_API_BASE_URL is not configured");
        }

        const response = await fetch(`${API_BASE_URL}/api/materials`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch materials: ${response.status} ${response.statusText}`,
          );
        }

        const data: Material[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid materials API response");
        }

        setMaterials(
          [...data].sort(
            (a, b) =>
              (a.order ?? 0) - (b.order ?? 0) || a.name.localeCompare(b.name),
          ),
        );
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        console.error("Error fetching materials:", error);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchMaterials();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setSelected(slug ?? null);
  }, [slug]);

  // Always call hooks before conditional returns
  const ref = useScrollFade() as React.RefObject<HTMLElement>;

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
        eyebrow="Polyrib manufactures a comprehensive range of thermoplastics under its brand families. Click any brand to explore its grades, properties, and applications."
        title="Our Material"
        highlight="Families"
        image={manufacturingImage}
        imageAlt="Khanna Polyrib manufacturing facility"
        imagePosition="center center"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Materials" }]}
      />

      <div className="container max-w-7xl mx-auto px-6 py-12">
        {/* Brand grid */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
        >
          {materials.map((m) => {
            const isSelected = selected === m.slug;

            return (
              <React.Fragment key={m.slug}>
                {/* CARD */}
                <button
                  onClick={() => setSelected(isSelected ? null : m.slug)}
                  className={`group text-left p-5 border-2 transition-all duration-200 rounded-xl ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-card"
                      : "border-border bg-card hover:border-primary/40 active:border-primary/60"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 font-bold border rounded-2xl ${m.colour}`}
                    >
                      <ShoppingCart className="w-3 h-3 shrink-0" />
                      {m.brand}
                    </span>

                    <ChevronRight
                      className={`w-4 h-4 transition-all duration-200 ${
                        isSelected
                          ? "rotate-90 text-primary"
                          : "text-muted-foreground group-hover:text-primary group-active:text-primary"
                      }`}
                    />
                  </div>

                  <h3
                    className={`font-heading font-bold text-lg mb-1 transition-colors duration-200 ${
                      isSelected
                        ? "text-primary"
                        : "text-charcoal group-hover:text-primary group-active:text-primary"
                    }`}
                  >
                    {m.base}
                  </h3>

                  <p className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold mb-2">
                    <FlaskConical className="w-3 h-3 shrink-0" />
                    {m.tagline}
                  </p>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {m.desc}
                  </p>
                </button>

                {/* INLINE EXPANDED SECTION */}
                {isSelected && (
                  <div className="col-span-1 sm:col-span-2 lg:col-span-3 border border border-primary p-8 animate-fade-in rounded-xl bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <div className="flex flex-wrap items-start gap-3 mb-4">
                          <h2 className="font-heading text-2xl text-charcoal">
                            {m.title || m.name || m.brand}
                          </h2>

                          <span
                            className={`inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 text-xs px-2.5 py-1 border font-bold rounded-2xl ${m.colour}`}
                          >
                            <FlaskConical className="w-3.5 h-3.5 shrink-0" />
                            {m.base}
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-6">
                          {m.description || m.desc}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                              Grades Available
                            </p>

                            <div className="space-y-1.5">
                              {m.grades.map((g) => (
                                <div
                                  key={g}
                                  className="flex items-center gap-2 text-xs text-charcoal-light"
                                >
                                  <div className="w-1.5 h-1.5 bg-primary shrink-0" />
                                  {g}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                              Key Properties
                            </p>

                            <div className="space-y-1.5">
                              {m.keyProps.map((p) => (
                                <div
                                  key={p}
                                  className="flex items-center gap-2 text-xs text-charcoal-light"
                                >
                                  <ChevronRight className="w-3.5 h-3.5 text-primary font-bold shrink-0" />
                                  {p}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-card border border-border p-4 rounded-xl">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                            Temperature Range
                          </p>

                          <div className="flex gap-6">
                            <div>
                              <div className="font-mono font-bold text-primary">
                                {m.minTemp}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Min Temperature
                              </div>
                            </div>

                            <div>
                              <div className="font-mono font-bold text-primary">
                                {m.maxTemp}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Max Temperature
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-card border border-border p-4 rounded-xl">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                            Industries
                          </p>

                          <div className="flex flex-wrap gap-1.5">
                            {m.industries.map((ind) => (
                              <Link
                                key={ind.slug}
                                to={`/industries/${ind.slug}`}
                                className="inline-flex text-[11px] px-2 py-0.5 bg-primary/5 font-bold text-primary rounded-xl border border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-200"
                              >
                                {ind.name}
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-dark transition-colors duration-200 rounded-xl"
                          >
                            Request Quote for {m.brand}{" "}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>

                          <Link
                            to="/resources"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-border text-xs font-semibold text-charcoal-light hover:border-primary hover:text-primary transition-colors duration-200 rounded-xl"
                          >
                            Download Datasheet
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 border border-border p-6 flex flex-col md:flex-row items-center justify-between gap-5 bg-white rounded-xl">
          <div>
            <h3 className="font-heading font-semibold text-charcoal mb-1">
              Not sure which grade to specify?
            </h3>

            <p className="text-sm text-muted-foreground">
              Use our Material Selector tool or speak to our technical team.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <Link
              to="/tools/material-selector"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors duration-200 rounded-xl"
            >
              Material Selector <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact?tab=quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-charcoal-light text-sm font-semibold hover:border-primary hover:text-primary transition-colors duration-200 rounded-xl"
            >
              Technical Enquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
