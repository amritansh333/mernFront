import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";

import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import EventCard from "@/components/EventCard";

import manufacturingImage from "@/assets/csr-slider1.jpeg";

import {
  fetchNewsEvents,
  type EventCard as EventCardType,
} from "@/lib/newsEventsApi";

/* =========================================================
   PAGE BACKGROUND TEXTURE
========================================================= */

const pageTexture = {
  backgroundColor: "#FFFFFF",
  backgroundImage: `
    radial-gradient(circle at 12px 12px, rgba(39, 158, 206, 0.055) 1px, transparent 1.5px),
    linear-gradient(135deg, rgba(39, 158, 206, 0.025) 25%, transparent 25%),
    linear-gradient(315deg, rgba(39, 158, 206, 0.025) 25%, transparent 25%)
  `,
  backgroundSize: "28px 28px, 56px 56px, 56px 56px",
};

/* =========================================================
   HELPERS
========================================================= */

function formatDate(value?: string): string | null {
  if (!value) return null;

  try {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return format(date, "dd MMM yyyy");
  } catch {
    return null;
  }
}

function getEventYear(item: EventCardType): number | null {
  const dateValue = item.event?.startDate || item.publishedAt;

  if (!dateValue) return null;

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.getFullYear();
}

/* =========================================================
   EVENT SKELETON
========================================================= */

function EventSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-border bg-card"
      aria-hidden="true"
    >
      <div className="aspect-[16/10] animate-pulse bg-muted" />

      <div className="space-y-4 p-5 sm:p-6">
        <div className="h-3 w-28 animate-pulse rounded-xl bg-muted" />

        <div className="h-7 w-4/5 animate-pulse rounded-xl bg-muted" />

        <div className="h-4 w-full animate-pulse rounded-xl bg-muted" />

        <div className="h-4 w-3/4 animate-pulse rounded-xl bg-muted" />

        <div className="flex gap-2 pt-3">
          <div className="h-6 w-16 animate-pulse rounded-xl bg-muted" />

          <div className="h-6 w-20 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   EVENT HIGHLIGHT
========================================================= */

function FeaturedEvent({
  item,
}: {
  item: EventCardType;
}) {
  const startDate = formatDate(item.event?.startDate);
  const endDate = formatDate(item.event?.endDate);

  const location = item.event?.city
    ? `${item.event.city}${
        item.event.country ? `, ${item.event.country}` : ""
      }`
    : item.event?.location;

  return (
    <Link
      to={`/events/${item.slug}`}
      className="
        group relative mx-auto block w-full max-w-5xl overflow-hidden
        rounded-xl border border-border bg-card shadow-sm
        transition-all duration-500
        hover:-translate-y-1 hover:shadow-2xl
        focus:outline-none focus-visible:ring-2
        focus-visible:ring-primary
      "
    >
      <div className="grid lg:grid-cols-2">

        {/* Image */}

        <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[300px]">
          {item.coverImage ? (
            <img
              src={item.coverImage}
              alt={item.coverAlt || item.title}
              loading="eager"
              decoding="async"
              className="
                h-full w-full object-cover
                transition-transform duration-700
                group-hover:scale-105
              "
            />
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center bg-muted">
              <CalendarDays className="h-10 w-10 text-muted-foreground/40" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r" />
        </div>

        {/* Content */}

        <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-8">

          <div className="mb-3 flex flex-wrap gap-3 text-xs sm:text-sm text-muted-foreground">

            {startDate && (
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />

                {startDate}

                {endDate && ` – ${endDate}`}
              </span>
            )}

            {location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />

                {location}
              </span>
            )}

          </div>

          <h2
            className="
              font-heading text-2xl font-semibold leading-tight
              text-charcoal transition-colors
              group-hover:text-primary
              sm:text-3xl
            "
          >
            {item.title}
          </h2>

          {item.excerpt && (
            <p className="mt-3 text-sm leading-6 text-muted-foreground line-clamp-3">
              {item.excerpt}
            </p>
          )}

          {(item.event?.venue || item.event?.booth) && (
            <div className="mt-4 flex flex-wrap gap-2">

              {item.event?.venue && (
                <span className="rounded-xl px-3 py-2 text-xs sm:text-sm text-muted-foreground">
                  {item.event.venue}
                </span>
              )}

              {item.event?.booth && (
                <span className="rounded-xl bg-primary/10 px-3 py-2 text-xs sm:text-sm font-semibold text-primary">
                  Booth {item.event.booth}
                </span>
              )}

            </div>
          )}

          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View event details

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>

        </div>
      </div>
    </Link>
  );
}


/* =========================================================
   EVENTS PAGE
========================================================= */

export default function EventsPage() {
  /* =====================================================
     STATE
  ===================================================== */

  const [items, setItems] = useState<EventCardType[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [selectedYear, setSelectedYear] = useState("All");

  /* =====================================================
     FETCH EVENTS
  ===================================================== */

  useEffect(() => {
    let cancelled = false;

    async function loadEvents() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchNewsEvents({
          type: "Event",
          limit: 12,
        });

        if (cancelled) return;

        setItems(response.items ?? []);
      } catch (err) {
        console.error("Failed to fetch events:", err);

        if (!cancelled) {
          setError(
            "Unable to load events. Please try again later.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =====================================================
     AVAILABLE YEARS
  ===================================================== */

  const years = useMemo(() => {
    const values = items
      .map(getEventYear)
      .filter((year): year is number => year !== null);

    return [...new Set(values)].sort((a, b) => b - a);
  }, [items]);

  /* =====================================================
     FILTER EVENTS
  ===================================================== */

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const eventYear = getEventYear(item);

      const matchesYear =
        selectedYear === "All" ||
        eventYear?.toString() === selectedYear;

      const searchable = [
        item.title,
        item.excerpt,
        item.event?.city,
        item.event?.country,
        item.event?.venue,
        ...(item.tags ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchable.includes(query);

      return matchesYear && matchesSearch;
    });
  }, [items, search, selectedYear]);

  /* =====================================================
     FEATURED EVENT
  ===================================================== */

  const featuredEvent = useMemo(() => {
    return (
      filteredItems.find((item) => item.featured) ??
      filteredItems[0] ??
      null
    );
  }, [filteredItems]);

  /* =====================================================
     REMAINING EVENTS
  ===================================================== */

  const remainingItems = useMemo(() => {
    if (!featuredEvent) return filteredItems;

    return filteredItems.filter(
      (item) => item.id !== featuredEvent.id,
    );
  }, [filteredItems, featuredEvent]);

  /* =====================================================
     RESET FILTERS
  ===================================================== */

  const hasActiveFilters =
    search.trim().length > 0 || selectedYear !== "All";

  function clearFilters() {
    setSearch("");
    setSelectedYear("All");
  }

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main
      className="min-h-screen bg-white pt-16"
      style={pageTexture}
    >

      {/* =================================================
          HERO
      ================================================= */}

      <PageHeroBanner
        eyebrow="Updates"
        title="Events"
        highlight="& Exhibitions"
        image={manufacturingImage}
        imageAlt="Khanna Polyrib manufacturing facility"
        imagePosition="center center"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Events & Exhibitions" },
        ]}
      />

      {/* =================================================
          FEATURED EVENT
      ================================================= */}

      {!loading && !error && featuredEvent && (
        <section className="container mx-auto px-5 py-10 sm:px-6 sm:py-14">

          <div className="mb-6 flex items-center justify-between gap-4">

            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                <Sparkles className="h-4 w-4" />

                NEW
              </div>

              <h2 className="font-heading text-2xl font-semibold text-charcoal sm:text-3xl">
                Latest Highlight
              </h2>
            </div>

          </div>

          <FeaturedEvent item={featuredEvent} />

        </section>
      )}

      {/* =================================================
          FILTERS
      ================================================= */}

      <section className="container mx-auto px-5 pb-8 sm:px-6">

        <div
          className="
            flex flex-col gap-3 rounded-xl
            border border-border bg-card p-3 shadow-sm
            sm:flex-row
          "
        >

          {/* Search */}

          <div className="relative flex-1">

            <Search
              className="
                pointer-events-none absolute left-4 top-1/2
                h-4 w-4 -translate-y-1/2 text-muted-foreground
              "
              aria-hidden="true"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search events, locations, exhibitions..."
              aria-label="Search events"
              className="
                h-11 w-full rounded-xl
                border border-transparent
                bg-surface-subtle pl-11 pr-4 text-sm
                text-charcoal outline-none
                transition-all
                placeholder:text-muted-foreground
                focus:border-primary/30 focus:ring-2
                focus:ring-primary/10
              "
            />

          </div>

          {/* Year Filter */}

          <div className="relative sm:w-44">

            <select
              value={selectedYear}
              onChange={(event) =>
                setSelectedYear(event.target.value)
              }
              aria-label="Filter events by year"
              className="
                h-11 w-full appearance-none
                rounded-xl border border-border
                bg-background px-4 pr-10
                text-sm text-charcoal outline-none
                transition-all
                focus:border-primary
                focus:ring-2 focus:ring-primary/10
              "
            >

              <option value="All">All years</option>

              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}

            </select>

            <ChevronDown
              className="
                pointer-events-none absolute right-3 top-1/2
                h-4 w-4 -translate-y-1/2 text-muted-foreground
              "
              aria-hidden="true"
            />

          </div>

        </div>

      </section>

      {/* =================================================
          EVENTS LIST
      ================================================= */}

      <section className="container mx-auto px-5 pb-16 sm:px-6 sm:pb-24">

        {/* Section Heading */}

        <div className="mb-7 flex items-end justify-between gap-4">

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Explore
            </p>

            <h2 className="font-heading text-2xl font-semibold text-charcoal sm:text-3xl">
              Events & Exhibitions
            </h2>
          </div>

          {!loading && !error && (
            <p
              className="hidden text-sm text-muted-foreground sm:block"
              aria-live="polite"
            >
              {filteredItems.length}{" "}
              {filteredItems.length === 1
                ? "event"
                : "events"}
            </p>
          )}

        </div>

        {/* Loading */}

        {loading && (
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Loading events"
            aria-busy="true"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <EventSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div
            className="
              rounded-xl border border-destructive/20
              bg-destructive/5 p-8 text-center
            "
            role="alert"
          >
            <p className="font-medium text-destructive">
              {error}
            </p>
          </div>
        )}

        {/* Empty State */}

        {!loading && !error && filteredItems.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-surface-subtle">
              <Clock3 className="h-6 w-6 text-muted-foreground" />
            </div>

            <h3 className="mt-5 font-heading text-xl font-semibold text-charcoal">
              No events found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Try changing your search or year filter to find
              other exhibitions and industry events.
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 text-sm font-semibold text-primary hover:underline"
              >
                Clear filters
              </button>
            )}

          </div>
        )}

        {/* Event Cards */}

        {!loading && !error && remainingItems.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {remainingItems.map((item, index) => (
              <div
                key={item.id}
                className="
                  animate-in fade-in slide-in-from-bottom-3
                  duration-500
                "
                style={{
                  animationDelay: `${Math.min(index * 70, 420)}ms`,
                  animationFillMode: "both",
                }}
              >
                <EventCard item={item} />
              </div>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}
