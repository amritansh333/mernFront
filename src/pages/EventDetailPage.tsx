import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Globe2,
  Image as ImageIcon,
  MapPin,
  Maximize2,
  Navigation,
  PlayCircle,
  Tag,
  Ticket,
  Users,
  X,
} from "lucide-react";

import {
  fetchNewsEventBySlug,
  type NewsEventDetail,
} from "@/lib/newsEventsApi";

import { resolveApiAssetUrl } from "@/lib/assetUrl";

function formatDate(value?: string) {
  if (!value) return null;

  try {
    return format(new Date(value), "dd MMM yyyy");
  } catch {
    return null;
  }
}

function formatLongDate(value?: string) {
  if (!value) return null;

  try {
    return format(new Date(value), "EEEE, dd MMMM yyyy");
  } catch {
    return null;
  }
}

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center  bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </dt>

        <dd className="mt-1 break-words text-sm font-medium leading-6 text-charcoal">
          {children}
        </dd>
      </div>
    </div>
  );
}

function VideoEmbed({ video }: { video: any }) {
  if (!video?.videoId) return null;

  if (video.provider === "youtube") {
    return (
      <div className="aspect-video overflow-hidden  bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}`}
          title={video.title || "Event video"}
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  if (video.provider === "vimeo") {
    return (
      <div className="aspect-video overflow-hidden  bg-black">
        <iframe
          src={`https://player.vimeo.com/video/${video.videoId}`}
          title={video.title || "Event video"}
          className="h-full w-full"
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (video.provider === "hosted") {
    return (
      <div className="overflow-hidden  bg-black">
        <video
          src={video.videoId}
          poster={video.poster || undefined}
          controls
          preload="metadata"
          className="aspect-video h-full w-full"
        >
          Your browser does not support the video element.
        </video>
      </div>
    );
  }

  return null;
}

export default function EventDetailPage() {
  const { slug } = useParams();

  const [item, setItem] = useState<
    (NewsEventDetail & { related?: any[] }) | null
  >(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeImage, setActiveImage] = useState<number | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchNewsEventBySlug(slug || "");

        if (cancelled) return;

        setItem(data);
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setError("Unable to load this event.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (slug) {
      void load();
    }

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const gallery = useMemo(() => {
    if (!item?.gallery) return [];

    return [...item.gallery].sort(
      (a: any, b: any) =>
        (a.sortOrder || 0) - (b.sortOrder || 0),
    );
  }, [item?.gallery]);

  useEffect(() => {
    if (activeImage === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }

      if (event.key === "ArrowRight" && gallery.length > 1) {
        setActiveImage(
          (activeImage + 1) % gallery.length,
        );
      }

      if (event.key === "ArrowLeft" && gallery.length > 1) {
        setActiveImage(
          (activeImage - 1 + gallery.length) %
            gallery.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () =>
      window.removeEventListener("keydown", onKeyDown);
  }, [activeImage, gallery.length]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-5 py-10 sm:px-6 sm:py-16">
          <div className="h-5 w-32 animate-pulse bg-muted" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="h-12 w-4/5 animate-pulse bg-muted" />
              <div className="mt-4 h-6 w-3/5 animate-pulse bg-muted" />
              <div className="mt-8 aspect-video animate-pulse  bg-muted" />
            </div>

            <div className="h-[420px] animate-pulse  bg-muted" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !item) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-5 py-16 text-center sm:px-6 sm:py-24">
          <div className="mx-auto flex h-16 w-16 items-center justify-center  bg-surface-subtle">
            <CalendarDays className="h-7 w-7 text-muted-foreground" />
          </div>

          <h1 className="mt-6 font-heading text-3xl font-semibold text-charcoal">
            {error || "Event not found"}
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            The event you're looking for may have been removed
            or the link may no longer be available.
          </p>

          <Link
            to="/events"
            className="
              mt-7 inline-flex items-center gap-2 
              bg-primary px-5 py-3 text-sm font-semibold
              text-primary-foreground transition-all
              hover:-translate-y-0.5 hover:shadow-lg
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Back to events
          </Link>
        </div>
      </main>
    );
  }

  const ev = item.event || {};

  const startDate = formatDate(ev.startDate);
  const endDate = formatDate(ev.endDate);

  const longStartDate = formatLongDate(ev.startDate);

  const eventDate =
    startDate && endDate
      ? `${startDate} – ${endDate}`
      : startDate || endDate;

  const location =
    ev.city && ev.country
      ? `${ev.city}, ${ev.country}`
      : ev.city || ev.country || ev.location;

  const hasEventDetails =
    ev.startDate ||
    ev.endDate ||
    ev.location ||
    ev.country ||
    ev.city ||
    ev.venue ||
    ev.booth ||
    ev.eventWebsite ||
    ev.registrationUrl;

  const currentGalleryItem =
    activeImage !== null ? gallery[activeImage] : null;

  const coverImageUrl = resolveApiAssetUrl(item.coverImage);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
{/* Hero */}
<section className="relative overflow-hidden border-b border-border">
  {/* Cover Image from Backend */}
  {coverImageUrl && (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("${coverImageUrl}")`,
      }}
    />
  )}

  {/* Image readability overlay */}
  <div className="absolute inset-0 bg-white/98" />

  {/* Subtle left-to-right fade */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/50 via-white/75 to-transparent" />

  {/* Hero Content */}
  <div className="container relative mx-auto px-5 py-8 sm:px-6 sm:py-12 lg:py-14">
    <Link
      to="/events"
      className="
        mb-7 inline-flex items-center gap-2
        text-sm font-medium text-muted-foreground
        transition-colors hover:text-primary
      "
    >
      <ArrowLeft className="h-4 w-4" />
      Back to events
    </Link>

    <div className="max-w-4xl">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="
            inline-flex items-center gap-1.5
            border border-primary/20 bg-white/80
            px-3 py-1.5 text-xs font-semibold
            uppercase tracking-[0.1em] text-primary
            backdrop-blur-sm
          "
        >
          <CalendarDays className="h-3.5 w-3.5" />
          {item.type}
        </span>

        {item.featured && (
          <span
            className="
              inline-flex items-center gap-1.5
              border border-primary/20 bg-primary/10
              px-3 py-1.5 text-xs font-semibold
              text-primary backdrop-blur-sm
            "
          >
            <Check className="h-3.5 w-3.5" />
            Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h1
        className="
          mt-5 font-heading text-4xl font-semibold
          leading-[1.05] tracking-tight text-charcoal
          sm:text-5xl lg:text-6xl
        "
      >
        {item.title}
      </h1>

      {/* Excerpt */}
      {item.excerpt && (
        <p
          className="
            mt-5 max-w-3xl text-base leading-7
            text-charcoal sm:text-lg sm:leading-8
          "
        >
          {item.excerpt}
        </p>
      )}

      {/* Date + Location */}
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-charcoal">
        {eventDate && (
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            {eventDate}
          </span>
        )}

        {location && (
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary text-charcoal" />
            {location}
          </span>
        )}
      </div>
    </div>
  </div>
</section>

      

      {/* Main content */}
      <section className="container mx-auto px-5 py-10 sm:px-6 sm:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Main column */}
          <div className="min-w-0">
            {/* Event quick information */}
            {hasEventDetails && (
              <div className="mb-10 grid gap-4 sm:grid-cols-2">
                {longStartDate && (
                  <div className=" border border-border bg-card p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center  bg-primary/10 text-primary">
                        <CalendarDays className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                          Event date
                        </p>

                        <p className="mt-1 text-sm font-semibold text-charcoal">
                          {eventDate}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {location && (
                  <div className=" border border-border bg-card p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center  bg-primary/10 text-primary">
                        <MapPin className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                          Location
                        </p>

                        <p className="mt-1 text-sm font-semibold text-charcoal">
                          {location}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Article */}
            {item.body && (
              <article
                className="
                  prose prose-lg max-w-none
                  prose-headings:font-heading
                  prose-headings:text-charcoal
                  prose-p:text-muted-foreground
                  prose-p:leading-8
                  prose-li:text-muted-foreground
                  prose-strong:text-charcoal
                  prose-a:text-primary
                  prose-a:no-underline
                  hover:prose-a:underline
                  prose-img:
                "
                dangerouslySetInnerHTML={{
                  __html: item.body,
                }}
              />
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
              <section className="mt-14 border-t border-border pt-10">
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                      <ImageIcon className="h-4 w-4" />
                      Gallery
                    </p>

                    <h2 className="font-heading text-2xl font-semibold text-charcoal sm:text-3xl">
                      Event moments
                    </h2>
                  </div>

                  <span className="text-sm text-muted-foreground">
                    {gallery.length}{" "}
                    {gallery.length === 1
                      ? "image"
                      : "images"}
                  </span>
                </div>

                <div
                  className="
                    grid grid-cols-2 gap-3
                    sm:grid-cols-3 sm:gap-4
                  "
                >
                  {gallery.map((image: any, index: number) => (
                    <button
                      key={`${image.url}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className="
                        group relative aspect-[4/3]
                        overflow-hidden 
                        bg-muted text-left
                        focus:outline-none focus-visible:ring-2
                        focus-visible:ring-primary
                      "
                      aria-label={`View image ${index + 1}`}
                    >
                      <img
                        src={image.url}
                        alt={
                          image.alt ||
                          image.caption ||
                          item.title
                        }
                        loading="lazy"
                        className="
                          h-full w-full object-cover
                          transition-transform duration-500
                          group-hover:scale-105
                        "
                      />

                      <div
                        className="
                          absolute inset-0 bg-black/0
                          transition-colors duration-300
                          group-hover:bg-black/25
                        "
                      />

                      <span
                        className="
                          absolute bottom-3 right-3 flex h-9 w-9
                          items-center justify-center 
                          bg-black/50 text-white opacity-0
                          backdrop-blur-sm transition-opacity
                          group-hover:opacity-100
                        "
                      >
                        <Maximize2 className="h-4 w-4" />
                      </span>
                    </button>
                  ))}
                </div>

                {gallery.some((image: any) => image.caption) && (
                  <div className="mt-5 space-y-1">
                    {gallery
                      .filter((image: any) => image.caption)
                      .slice(0, 1)
                      .map((image: any, index: number) => (
                        <p
                          key={index}
                          className="text-sm text-muted-foreground"
                        >
                          {image.caption}
                        </p>
                      ))}
                  </div>
                )}
              </section>
            )}

            {/* Videos */}
            {item.videos && item.videos.length > 0 && (
              <section className="mt-14 border-t border-border pt-10">
                <div className="mb-6">
                  <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    <PlayCircle className="h-4 w-4" />
                    Videos
                  </p>

                  <h2 className="font-heading text-2xl font-semibold text-charcoal sm:text-3xl">
                    From the event
                  </h2>
                </div>

                <div className="space-y-8">
                  {item.videos.map(
                    (video: any, index: number) => (
                      <div key={`${video.videoId}-${index}`}>
                        <VideoEmbed video={video} />

                        {(video.title ||
                          video.caption) && (
                          <div className="mt-3">
                            {video.title && (
                              <h3 className="font-heading text-lg font-semibold text-charcoal">
                                {video.title}
                              </h3>
                            )}

                            {video.caption && (
                              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                {video.caption}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </section>
            )}

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <section className="mt-12 border-t border-border pt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="mr-1 h-4 w-4 text-primary" />

                  {item.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="
                         border border-border
                        bg-surface-subtle px-3 py-1.5
                        text-xs font-medium text-muted-foreground
                      "
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden  border border-border bg-card shadow-sm">
              <div className="border-b border-border bg-surface-subtle px-5 py-4">
                <h2 className="font-heading text-lg font-semibold text-charcoal">
                  Event Details
                </h2>
              </div>

              <dl className="space-y-5 p-5">
                {ev.startDate && (
                  <DetailRow
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Start date"
                  >
                    {formatLongDate(ev.startDate)}
                  </DetailRow>
                )}

                {ev.endDate && (
                  <DetailRow
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="End date"
                  >
                    {formatLongDate(ev.endDate)}
                  </DetailRow>
                )}

                {ev.location && (
                  <DetailRow
                    icon={<Navigation className="h-4 w-4" />}
                    label="Location"
                  >
                    {ev.location}
                  </DetailRow>
                )}

                {ev.city && (
                  <DetailRow
                    icon={<MapPin className="h-4 w-4" />}
                    label="City"
                  >
                    {ev.city}
                  </DetailRow>
                )}

                {ev.country && (
                  <DetailRow
                    icon={<Globe2 className="h-4 w-4" />}
                    label="Country"
                  >
                    {ev.country}
                  </DetailRow>
                )}

                {ev.venue && (
                  <DetailRow
                    icon={<MapPin className="h-4 w-4" />}
                    label="Venue"
                  >
                    {ev.venue}
                  </DetailRow>
                )}

                {ev.booth && (
                  <DetailRow
                    icon={<Users className="h-4 w-4" />}
                    label="Booth"
                  >
                    {ev.booth}
                  </DetailRow>
                )}

                {item.publishedAt && (
                  <DetailRow
                    icon={<Clock3 className="h-4 w-4" />}
                    label="Published"
                  >
                    {formatLongDate(item.publishedAt)}
                  </DetailRow>
                )}
              </dl>

              {(ev.registrationUrl ||
                ev.eventWebsite) && (
                <div className="space-y-3 border-t border-border p-5">
                  {ev.registrationUrl && (
                    <a
                      href={ev.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex w-full items-center justify-center
                        gap-2  bg-primary px-4 py-3
                        text-sm font-semibold text-primary-foreground
                        transition-all
                        hover:-translate-y-0.5 hover:shadow-lg
                      "
                    >
                      <Ticket className="h-4 w-4" />
                      Register for event
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {ev.eventWebsite && (
                    <a
                      href={ev.eventWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex w-full items-center justify-center
                        gap-2  border border-border
                        bg-background px-4 py-3
                        text-sm font-semibold text-charcoal
                        transition-all
                        hover:border-primary/30
                        hover:text-primary
                      "
                    >
                      <Globe2 className="h-4 w-4" />
                      Visit event website
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Contact CTA */}
            <div className="mt-5  border border-primary/20 bg-primary/5 p-5">
              <div className="flex h-10 w-10 items-center justify-center  bg-primary text-primary-foreground">
                <Users className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-heading text-lg font-semibold text-charcoal">
                Meet Khanna PolyRib
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Interested in our engineering plastic solutions
                or want to connect with our team?
              </p>

              <Link
                to="/contact"
                className="
                  mt-4 inline-flex items-center gap-2
                  text-sm font-semibold text-primary
                  hover:underline
                "
              >
                Contact our team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Related events */}
      {item.related && item.related.length > 0 && (
        <section className="border-t border-border bg-surface-subtle">
          <div className="container mx-auto px-5 py-12 sm:px-6 sm:py-16">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  Explore more
                </p>

                <h2 className="font-heading text-2xl font-semibold text-charcoal sm:text-3xl">
                  Related events
                </h2>
              </div>

              <Link
                to="/events"
                className="
                  hidden items-center gap-2 text-sm
                  font-semibold text-primary sm:inline-flex
                "
              >
                All events
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {item.related.slice(0, 3).map((related: any) => (
                <Link
                  key={related.id}
                  to={`/events/${related.slug}`}
                  className="
                    group overflow-hidden 
                    border border-border bg-card
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-xl
                  "
                >
                  {related.coverImage && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={related.coverImage}
                        alt={
                          related.coverAlt ||
                          related.title
                        }
                        loading="lazy"
                        className="
                          h-full w-full object-cover
                          transition-transform duration-500
                          group-hover:scale-105
                        "
                      />
                    </div>
                  )}

                  <div className="p-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                      Event
                    </p>

                    <h3 className="font-heading text-lg font-semibold leading-tight text-charcoal transition-colors group-hover:text-primary">
                      {related.title}
                    </h3>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      View event
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Image Lightbox */}
      {currentGalleryItem && activeImage !== null && (
        <div
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-black/90 p-4 backdrop-blur-sm
          "
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="
              absolute right-4 top-4 z-10 flex h-11 w-11
              items-center justify-center 
              bg-white/10 text-white backdrop-blur-md
              transition-colors hover:bg-white/20
            "
            aria-label="Close image viewer"
          >
            <X className="h-5 w-5" />
          </button>

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();

                  setActiveImage(
                    (activeImage - 1 + gallery.length) %
                      gallery.length,
                  );
                }}
                className="
                  absolute left-3 top-1/2 z-10
                  flex h-11 w-11 -translate-y-1/2
                  items-center justify-center 
                  bg-white/10 text-white backdrop-blur-md
                  transition-colors hover:bg-white/20
                  sm:left-6
                "
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();

                  setActiveImage(
                    (activeImage + 1) % gallery.length,
                  );
                }}
                className="
                  absolute right-3 top-1/2 z-10
                  flex h-11 w-11 -translate-y-1/2
                  items-center justify-center 
                  bg-white/10 text-white backdrop-blur-md
                  transition-colors hover:bg-white/20
                  sm:right-6
                "
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="flex max-h-[90vh] max-w-[92vw] flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={currentGalleryItem.url}
              alt={
                currentGalleryItem.alt ||
                currentGalleryItem.caption ||
                item.title
              }
              className="
                max-h-[78vh] max-w-[92vw]
                 object-contain
                shadow-2xl
              "
            />

            {(currentGalleryItem.caption ||
              gallery.length > 1) && (
              <div className="mt-4 flex items-center justify-between gap-4 text-white">
                <p className="text-sm text-white/80">
                  {currentGalleryItem.caption}
                </p>

                <span className="shrink-0 text-xs text-white/60">
                  {activeImage + 1} / {gallery.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}