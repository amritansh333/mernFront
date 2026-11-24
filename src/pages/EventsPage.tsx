import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  ChevronDown,
  Clock3,
  Search,
} from "lucide-react";

import PageHeroBanner from "@/components/hero-banner/PageHeroBanner";
import EventCard from "@/components/EventCard";

import heroImage from "@/assets/EventsHeroBanner.jpeg";

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

/* =========================================================
   HELPERS
========================================================= */

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
          setError("Unable to load events. Please try again later.");
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

      const matchesSearch = !query || searchable.includes(query);

      return matchesYear && matchesSearch;
    });
  }, [items, search, selectedYear]);

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
    <main className="min-h-screen bg-white pt-16" style={pageTexture}>
      {/* =================================================
          HERO
      ================================================= */}

      <PageHeroBanner
        eyebrow="Updates"
        title="Events"
        highlight="& Exhibitions"
        image={heroImage}
        imageAlt="Events Page Hero Banner Image"
        imagePosition="center center"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Events & Exhibitions" },
        ]}
      />

      {/* =================================================
    FILTERS
    Single-line responsive layout
================================================= */}

<section
  className="
    container mx-auto
    px-5 py-5
    sm:px-6 sm:py-6
    lg:py-7
  "
>
  <div
    className="
      flex w-full items-center gap-2
      rounded-xl border border-border
      bg-card p-2 shadow-sm
    "
  >
    {/* Search */}

    <div className="relative min-w-0 flex-1">
      <Search
        className="
          pointer-events-none absolute left-3 top-1/2
          h-4 w-4 -translate-y-1/2
          text-muted-foreground
        "
        aria-hidden="true"
      />

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search events..."
        aria-label="Search events"
        className="
          h-11 w-full min-w-0
          rounded-xl border border-transparent
          bg-surface-subtle
          pl-9 pr-2
          text-xs sm:text-sm
          text-charcoal outline-none
          transition-all
          placeholder:text-muted-foreground
          focus:border-primary/30
          focus:ring-2 focus:ring-primary/10
        "
      />
    </div>

    {/* Year Filter */}

<div className="relative shrink-0 w-[112px] xs:w-[120px] sm:w-36 md:w-44">
  <select
    value={selectedYear}
    onChange={(event) => setSelectedYear(event.target.value)}
    aria-label="Filter events by year"
    className="
      h-11 w-full appearance-none
      rounded-xl border border-border
      bg-background
      pl-2.5 pr-7
      text-[11px] sm:text-sm
      text-charcoal outline-none
      transition-all
      focus:border-primary
      focus:ring-2 focus:ring-primary/10
    "
  >
    <option value="All">ALL YEARS</option>

    {years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ))}
  </select>

  <ChevronDown
    className="
      pointer-events-none absolute right-2 top-1/2
      h-4 w-4 -translate-y-1/2
      text-muted-foreground
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
              {filteredItems.length === 1 ? "event" : "events"}
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
            <p className="font-medium text-destructive">{error}</p>
          </div>
        )}

        {/* Empty State */}

        {!loading && !error && filteredItems.length === 0 && (
          <div
            className="
              rounded-xl border border-dashed border-border
              bg-card px-6 py-16 text-center
            "
          >
            <div
              className="
                mx-auto flex h-14 w-14 items-center justify-center
                rounded-xl bg-surface-subtle
              "
            >
              <Clock3 className="h-6 w-6 text-muted-foreground" />
            </div>

            <h3 className="mt-5 font-heading text-xl font-semibold text-charcoal">
              No events found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Try changing your search or year filter to find other exhibitions
              and industry events.
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

        {/* All Event Cards */}

        {!loading && !error && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
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