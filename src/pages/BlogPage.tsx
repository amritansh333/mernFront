import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";
import { useScrollFade } from "@/hooks/useScrollFade";
import { getBlogPosts } from "@/lib/blogApi";
import type { BlogPost, PostType } from "@/lib/blogApi";
import { resolveApiAssetUrl } from "@/lib/assetUrl";

type FilterType = "All" | PostType;

const TYPE_COLOURS: Record<PostType, string> = {
  Blog: "bg-blue-50 text-blue-700",
  Gallery: "bg-orange-50 text-orange-700",
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*
   * =========================================================
   * FETCH BLOG POSTS
   * =========================================================
   */
  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      try {
        setLoading(true);
        setError(null);

        const data = await getBlogPosts();

        if (cancelled) return;

        setPosts(data);
      } catch (error) {
        if (cancelled) return;

        console.error("Failed to load blog posts:", error);

        setPosts([]);
        setError(
          "Unable to load articles and updates right now. Please try again later.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * =========================================================
   * FILTER POSTS
   * =========================================================
   */
  const filteredPosts = useMemo(() => {
    if (activeFilter === "All") {
      return posts;
    }

    return posts.filter((post) => post.type === activeFilter);
  }, [posts, activeFilter]);

  /*
   * =========================================================
   * SCROLL FADE
   * =========================================================
   */
  const ref = useScrollFade([
    loading,
    filteredPosts.length,
  ]) as React.RefObject<HTMLDivElement>;

  const filterOptions: FilterType[] = ["All", "Blog", "Gallery"];

  return (
    <div className="min-w-0 overflow-x-hidden bg-background">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative isolate flex min-h-[300px] sm:min-h-[315px] lg:min-h-[330px] items-end overflow-hidden">
        {/* Hero background */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Blog and Gallery"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        </div>

        {/* Industrial overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071321]/45 via-[#071321]/60 to-[#071321]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071321]/85 via-[#071321]/45 to-transparent" />

        <div className="relative z-10 w-full">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-9 lg:pb-10">
            <div className="max-w-5xl min-w-0">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-white/75"
              >
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>

                <span>/</span>

                <span className="text-white/90">Blog & Gallery</span>
              </nav>

              <p className="section-label text-white/75">Knowledge & Updates</p>

              <h1 className="font-heading text-4xl text-white">
                Blog & Gallery
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <div className="container max-w-7xl mx-auto px-6 py-12">
        {/* =======================================================
            FILTER BAR
        ======================================================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <p className="text-sm text-muted-foreground">
            {loading
              ? "Loading articles and updates..."
              : `${posts.length} articles and updates`}
          </p>

          <div className="flex gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                disabled={loading}
                className={`px-4 py-1.5 text-sm font-semibold border transition-all duration-200 ${
                  activeFilter === filter
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-card text-charcoal-light hover:border-primary hover:text-primary"
                } ${
                  loading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* =======================================================
            ERROR STATE
        ======================================================= */}
        {error && !loading && (
          <div className="border border-red-200 bg-red-50 px-5 py-8 text-center">
            <p className="text-sm font-semibold text-red-700">{error}</p>

            <button
              type="button"
              onClick={() => {
                window.location.reload();
              }}
              className="mt-4 inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Try Again
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* =======================================================
            LOADING STATE
        ======================================================= */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden border border-border bg-card"
              >
                <div className="aspect-video animate-pulse bg-surface-subtle" />

                <div className="p-5">
                  <div className="h-4 w-20 animate-pulse bg-surface-subtle" />

                  <div className="mt-4 h-6 w-full animate-pulse bg-surface-subtle" />

                  <div className="mt-2 h-6 w-4/5 animate-pulse bg-surface-subtle" />

                  <div className="mt-5 h-4 w-full animate-pulse bg-surface-subtle" />

                  <div className="mt-2 h-4 w-3/4 animate-pulse bg-surface-subtle" />

                  <div className="mt-5 h-8 w-full animate-pulse bg-surface-subtle" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =======================================================
            EMPTY STATE
        ======================================================= */}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className="border border-border bg-card px-6 py-16 text-center">
            <p className="section-label">Knowledge & Updates</p>

            <h2 className="mt-2 text-2xl font-heading font-bold text-charcoal">
              No {activeFilter === "All" ? "" : activeFilter.toLowerCase()}{" "}
              content found
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              There are currently no published entries in this category.
            </p>

            {activeFilter !== "All" && (
              <button
                type="button"
                onClick={() => setActiveFilter("All")}
                className="mt-6 inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* =======================================================
            BLOG GRID
        ======================================================= */}
        {!loading && !error && filteredPosts.length > 0 && (
          <div
            ref={ref}
            className="stagger-children grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="product-card flex flex-col group"
              >
                {/* =================================================
                    IMAGE
                ================================================= */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={resolveApiAssetUrl(post.image)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Type + Date */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className={`text-[10px] px-2.5 py-1 font-bold ${
                        TYPE_COLOURS[post.type] || ""
                      }`}
                    >
                      {post.type}
                    </span>

                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Calendar className="w-3 h-3" />

                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-semibold text-charcoal text-lg leading-snug mb-3 group-hover:text-primary transition-colors duration-200 flex-1">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 bg-surface-subtle border border-divider text-charcoal-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="cta-link text-xs pt-3 border-t border-divider">
                    {post.type === "Gallery" ? (
                      <Camera className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}

                    {post.type === "Gallery" ? "View Gallery" : "Read Article"}

                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
