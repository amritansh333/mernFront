import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Camera,
  CheckCircle2,
  Clock3,
  Share2,
  Tag,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blogApi";
import type { BlogPost, PostType } from "@/lib/blogApi";

const TYPE_COLOURS: Record<PostType, string> = {
  Blog: "bg-blue-50 text-blue-700",
  Gallery: "bg-orange-50 text-orange-700",
};

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Blog post not found.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadPost() {
      try {
        setLoading(true);
        setError(null);

        const [postData, postsData] = await Promise.all([
          getBlogPostBySlug(slug),
          getBlogPosts(),
        ]);

        if (cancelled) return;

        setPost(postData);
        setAllPosts(postsData);
      } catch (error) {
        if (cancelled) return;

        console.error("Failed to load blog post:", error);

        setPost(null);
        setError(
          "The article or gallery entry you're looking for is no longer available.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPost();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];

    return allPosts
      .filter((item) => item.slug !== post.slug)
      .filter(
        (item) =>
          item.type === post.type ||
          item.tags.some((tag) => post.tags.includes(tag)),
      )
      .slice(0, 3);
  }, [allPosts, post]);

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <span className="section-label">Knowledge & Updates</span>

            <h1 className="mt-3 text-3xl sm:text-4xl font-heading font-bold text-charcoal">
              Loading article...
            </h1>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              Please wait while we load the article.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <span className="section-label">Knowledge & Updates</span>

            <h1 className="mt-3 text-3xl sm:text-4xl font-heading font-bold text-charcoal">
              Article not found
            </h1>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              {error ||
                "The article or gallery entry you're looking for is no longer available."}
            </p>

            <Link to="/blog" className="cta-link mt-8 inline-flex">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog & Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isGallery = post.type === "Gallery";

  return (
    <div className="min-w-0 overflow-x-hidden bg-background">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative isolate flex min-h-[300px] sm:min-h-[315px] lg:min-h-[330px] items-end overflow-hidden">
        <img
          src={post.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Industrial dark overlay */}
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

                <Link to="/blog" className="transition-colors hover:text-white">
                  Blog & Gallery
                </Link>

                <span>/</span>

                <span className="max-w-full break-words text-white/90">
                  {post.title}
                </span>
              </nav>

              {/* Type / Date / Read time / Category */}
              <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                    isGallery
                      ? "bg-orange-50 text-orange-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {post.type}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs text-white/75">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.date}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs text-white/75">
                  <Clock3 className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>

                <span className="text-xs text-white/60">{post.category}</span>
              </div>

              {/* Compact title */}
              <h1 className="max-w-4xl break-words text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-heading font-semibold leading-[1.08] tracking-tight text-white">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ARTICLE AREA
      ========================================================= */}
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          {/* =====================================================
              MAIN ARTICLE
          ===================================================== */}
          <article className="min-w-0">
            {/* =====================================================
                ARTICLE INTRO / OVERVIEW
            ===================================================== */}
            <section className="mb-8 sm:mb-10">
              <p className="section-label text-primary">Article Overview</p>

              <div className="mt-3 border-l-4 border-primary pl-4 sm:pl-5">
                <p className="max-w-4xl text-base sm:text-lg leading-relaxed text-charcoal-light">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
                  >
                    <Tag className="h-3 w-3 shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Hero image */}
            <div className="overflow-hidden border border-border bg-card shadow-sm">
              <div className="aspect-[16/9] sm:aspect-[16/8] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-divider bg-card px-4 sm:px-6 py-3">
                <span className="text-xs text-muted-foreground">
                  Polyrib Knowledge & Updates
                </span>

                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.share) {
                      void navigator.share({
                        title: post.title,
                        text: post.excerpt,
                        url: window.location.href,
                      });
                    }
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </button>
              </div>
            </div>

            {/* Intro */}
            <div className="mt-8 sm:mt-10">
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-charcoal-light">
                {post.intro}
              </p>
            </div>

            {/* Key takeaways */}
            <section className="mt-8 sm:mt-10 border border-primary/20 bg-primary/[0.045] p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-white">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                </span>

                <div>
                  <p className="section-label">Key Takeaways</p>

                  <h2 className="mt-1 text-xl sm:text-2xl font-heading font-bold text-charcoal">
                    What to remember
                  </h2>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {post.keyTakeaways.map((takeaway) => (
                  <div
                    key={takeaway}
                    className="flex min-w-0 gap-3 border border-border bg-card p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                    <p className="min-w-0 break-words text-sm leading-relaxed text-charcoal-light">
                      {takeaway}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Article content */}
            <div className="mt-10 sm:mt-12 space-y-10 sm:space-y-12">
              {post.sections.map((section, index) => (
                <section key={section.heading} className="min-w-0">
                  <div className="mb-4 flex items-start gap-3">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-primary/30 bg-primary/5 text-[10px] font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2 className="min-w-0 break-words text-2xl sm:text-3xl font-heading font-bold leading-tight text-charcoal">
                      {section.heading}
                    </h2>
                  </div>

                  <div className="space-y-4 pl-0 sm:pl-10">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="break-words text-sm sm:text-base leading-7 text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.bullets && section.bullets.length > 0 && (
                      <div className="mt-5 space-y-2 border-l-2 border-primary/30 pl-4 sm:pl-5">
                        {section.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="flex min-w-0 items-start gap-3"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />

                            <p className="min-w-0 break-words text-sm sm:text-base leading-6 text-charcoal-light">
                              {bullet}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              ))}
            </div>

            {/* Gallery */}
            {isGallery &&
              post.galleryImages &&
              post.galleryImages.length > 0 && (
                <section className="mt-12 sm:mt-14">
                  <div className="mb-6">
                    <p className="section-label">Gallery</p>

                    <h2 className="mt-1 text-2xl sm:text-3xl font-heading font-bold text-charcoal">
                      Behind the scenes
                    </h2>
                  </div>

                  <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                    {post.galleryImages.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className={`group overflow-hidden border border-border bg-card ${
                          index === 0 ? "sm:col-span-2" : ""
                        }`}
                      >
                        <div
                          className={
                            index === 0
                              ? "aspect-[16/8] overflow-hidden"
                              : "aspect-[4/3] overflow-hidden"
                          }
                        >
                          <img
                            src={image}
                            alt={`${post.title} gallery ${index + 1}`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
          </article>

          {/* =====================================================
              SIDEBAR
          ===================================================== */}
          <aside className="min-w-0 lg:sticky lg:top-24">
            <div className="space-y-5">
              {/* Article information */}
              <div className="border border-border bg-card">
                <div className="border-b border-divider px-5 py-4">
                  <p className="section-label">Article Information</p>

                  <h2 className="mt-1 text-lg font-heading font-bold text-charcoal">
                    At a glance
                  </h2>
                </div>

                <div className="divide-y divide-divider">
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <span className="text-xs text-muted-foreground">Type</span>

                    <span
                      className={`shrink-0 px-2.5 py-1 text-[10px] font-bold ${
                        TYPE_COLOURS[post.type]
                      }`}
                    >
                      {post.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <span className="text-xs text-muted-foreground">
                      Published
                    </span>

                    <span className="text-right text-xs font-semibold text-charcoal">
                      {post.date}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <span className="text-xs text-muted-foreground">
                      Reading time
                    </span>

                    <span className="text-right text-xs font-semibold text-charcoal">
                      {post.readTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <span className="text-xs text-muted-foreground">
                      Category
                    </span>

                    <span className="max-w-[60%] break-words text-right text-xs font-semibold text-charcoal">
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* On this page */}
              <div className="hidden lg:block border border-border bg-card">
                <div className="border-b border-divider px-5 py-4">
                  <p className="section-label">On This Page</p>
                </div>

                <div className="p-3">
                  <div className="space-y-1">
                    {post.sections.map((section, index) => (
                      <div
                        key={section.heading}
                        className="flex gap-3 px-2 py-2.5"
                      >
                        <span className="text-[10px] font-bold text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="min-w-0 break-words text-xs leading-relaxed text-charcoal-light">
                          {section.heading}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical enquiry CTA */}
              <div className="relative overflow-hidden border border-primary/20 bg-[#edf9fd] p-5 sm:p-6">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10" />

                <div className="relative">
                  <span className="flex h-10 w-10 items-center justify-center bg-primary text-white">
                    {isGallery ? (
                      <Camera className="h-5 w-5" />
                    ) : (
                      <ArrowRight className="h-5 w-5" />
                    )}
                  </span>

                  <p className="mt-5 section-label">Need More Information?</p>

                  <h2 className="mt-1 text-xl font-heading font-bold leading-tight text-charcoal">
                    Talk to our technical team
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Need help selecting the right Polyrib material or component
                    for your application?
                  </p>

                  <Link
                    to="/contact?tab=quote"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    Technical Enquiry
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* =========================================================
          RELATED CONTENT
      ========================================================= */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-divider bg-surface-subtle">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="mb-7 sm:mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="section-label">Continue Exploring</p>

                <h2 className="mt-1 break-words text-2xl sm:text-3xl font-heading font-bold text-charcoal">
                  Related articles & updates
                </h2>
              </div>

              <Link to="/blog" className="cta-link shrink-0 text-xs sm:text-sm">
                View All
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="product-card group flex min-w-0 flex-col"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold ${
                          TYPE_COLOURS[related.type]
                        }`}
                      >
                        {related.type}
                      </span>

                      <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {related.date}
                      </span>
                    </div>

                    <h3 className="min-w-0 break-words text-lg font-heading font-semibold leading-snug text-charcoal transition-colors duration-200 group-hover:text-primary">
                      {related.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {related.excerpt}
                    </p>

                    <div className="mt-auto pt-5">
                      <span className="cta-link border-t border-divider pt-3 text-xs">
                        {related.type === "Gallery" ? (
                          <Camera className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowRight className="h-3.5 w-3.5" />
                        )}

                        {related.type === "Gallery"
                          ? "View Gallery"
                          : "Read Article"}

                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
