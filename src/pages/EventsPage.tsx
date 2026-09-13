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

import EventCard from "@/components/EventCard";
import { fetchNewsEvents } from "@/lib/newsEventsApi";

function formatDate(value?: string) {
  if (!value) return null;

  try {
    return format(new Date(value), "dd MMM yyyy");
  } catch {
    return null;
  }
}

function EventSkeleton() {
  return (
    <div className="overflow-hidden border border-border bg-card">
      <div className="aspect-[16/10] animate-pulse bg-muted" />

      <div className="space-y-4 p-5 sm:p-6">
        <div className="h-3 w-28 animate-pulse bg-muted" />
        <div className="h-7 w-4/5 animate-pulse bg-muted" />
        <div className="h-4 w-full animate-pulse bg-muted" />
        <div className="h-4 w-3/4 animate-pulse bg-muted" />
        <div className="flex gap-2 pt-3">
          <div className="h-6 w-16 animate-pulse bg-muted" />
          <div className="h-6 w-20 animate-pulse bg-muted" />
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const { items } = await fetchNewsEvents({
          type: "Event",
          limit: 12,
        });

        if (cancelled) return;

        setItems(items || []);
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setError("Unable to load events. Please try again later.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const years = useMemo(() => {
    const values = items
      .map((item) => {
        const date = item.event?.startDate || item.publishedAt;
        if (!date) return null;

        const year = new Date(date).getFullYear();
        return Number.isNaN(year) ? null : year;
      })
      .filter((year): year is number => year !== null);

    return [...new Set(values)].sort((a, b) => b - a);
  }, [items]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const eventDate = item.event?.startDate || item.publishedAt;

      const matchesYear =
        selectedYear === "All" ||
        (eventDate &&
          new Date(eventDate).getFullYear().toString() === selectedYear);

      const searchable = [
        item.title,
        item.excerpt,
        item.event?.city,
        item.event?.country,
        item.event?.venue,
        ...(item.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchable.includes(query);

      return matchesYear && matchesSearch;
    });
  }, [items, search, selectedYear]);

  const featuredEvent =
    items.find((item) => item.featured) || items[0] || null;

  const remainingItems = filteredItems.filter(
    (item) => item.id !== featuredEvent?.id,
  );

  const featuredStartDate = formatDate(
    featuredEvent?.event?.startDate,
  );

  const featuredEndDate = formatDate(
    featuredEvent?.event?.endDate,
  );

  const featuredLocation = featuredEvent?.event?.city
    ? `${featuredEvent.event.city}${
        featuredEvent.event.country
          ? `, ${featuredEvent.event.country}`
          : ""
      }`
    : featuredEvent?.event?.location;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
<section className="relative overflow-hidden border-b border-border">
  {/* Background Image */}
  <div
  className="absolute inset-0 bg-cover bg-center"
  style={{
  backgroundImage:
    "url('http://localhost:5000/uploads/events/events-hero.jpg')",
}}
/>

{/* Readability overlay */}
<div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-white/10" />

{/* Bottom fade */}
<div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/60 to-transparent" />

  {/* Hero Content */}
  <div className="container relative mx-auto px-5 py-14 sm:px-6 sm:py-20 lg:py-24">
    <div className="max-w-3xl">
      <div className="mb-5 inline-flex items-center gap-2 border border-primary/20 bg-white/80 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary backdrop-blur-sm">
        <CalendarDays className="h-4 w-4" />
        Events & Exhibitions
      </div>

      <h1
        className="
          font-heading text-4xl font-semibold leading-[1.05]
          tracking-tight text-charcoal
          sm:text-5xl lg:text-6xl
        "
      >
        Connecting Ideas,
        <span className="block text-primary">
          Engineering & Industry.
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-7 text-charcoal sm:text-lg">
        Explore upcoming and past exhibitions, trade fairs and
        industry events where Khanna PolyRib connects with
        customers, partners and professionals from across the
        engineering plastics industry.
      </p>
    </div>
  </div>
</section>

      {/* Featured event */}
      {!loading && !error && featuredEvent && (
        <section className="container mx-auto px-5 py-10 sm:px-6 sm:py-14">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                <Sparkles className="h-4 w-4" />
                Featured Event
              </div>

              <h2 className="font-heading text-2xl font-semibold text-charcoal sm:text-3xl">
                Latest Highlight
              </h2>
            </div>
          </div>

          <Link
            to={`/events/${featuredEvent.slug}`}
            className="
              group relative block overflow-hidden
              border border-border bg-card shadow-sm
              transition-all duration-500
              hover:-translate-y-1 hover:shadow-2xl
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-primary
            "
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
                {featuredEvent.coverImage ? (
                  <img
                    src={featuredEvent.coverImage}
                    alt={
                      featuredEvent.coverAlt ||
                      featuredEvent.title
                    }
                    className="
                      h-full w-full object-cover
                      transition-transform duration-700
                      group-hover:scale-105
                    "
                  />
                ) : (
                  <div className="flex h-full min-h-[300px] items-center justify-center bg-muted">
                    <CalendarDays className="h-12 w-12 text-muted-foreground/40" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r" />

                <div className="absolute left-5 top-5">
                  <span className="inline-flex items-center gap-2 bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg">
                    <Sparkles className="h-3.5 w-3.5" />
                    Featured
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                <div className="mb-5 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  {featuredStartDate && (
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      {featuredStartDate}
                      {featuredEndDate &&
                        ` – ${featuredEndDate}`}
                    </span>
                  )}

                  {featuredLocation && (
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {featuredLocation}
                    </span>
                  )}
                </div>

                <h2
                  className="
                    font-heading text-3xl font-semibold leading-tight
                    text-charcoal transition-colors
                    group-hover:text-primary
                    sm:text-4xl
                  "
                >
                  {featuredEvent.title}
                </h2>

                {featuredEvent.excerpt && (
                  <p className="mt-5 text-base leading-7 text-muted-foreground">
                    {featuredEvent.excerpt}
                  </p>
                )}

                {(featuredEvent.event?.venue ||
                  featuredEvent.event?.booth) && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {featuredEvent.event?.venue && (
                      <span className="bg-surface-subtle px-3 py-2 text-sm text-muted-foreground">
                        {featuredEvent.event.venue}
                      </span>
                    )}

                    {featuredEvent.event?.booth && (
                      <span className="bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
                        Booth {featuredEvent.event.booth}
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  View event details
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Filters */}
      <section className="container mx-auto px-5 pb-8 sm:px-6">
        <div
          className="
            flex flex-col gap-3 border border-border
            bg-card p-3 shadow-sm
            sm:flex-row
          "
        >
          <div className="relative flex-1">
            <Search
              className="
                pointer-events-none absolute left-4 top-1/2
                h-4 w-4 -translate-y-1/2 text-muted-foreground
              "
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search events, locations, exhibitions..."
              className="
                h-11 w-full border border-transparent
                bg-surface-subtle pl-11 pr-4 text-sm
                text-charcoal outline-none
                transition-all
                placeholder:text-muted-foreground
                focus:border-primary/30 focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          <div className="relative sm:w-44">
            <select
              value={selectedYear}
              onChange={(event) =>
                setSelectedYear(event.target.value)
              }
              className="
                h-11 w-full appearance-none
                border border-border bg-background
                px-4 pr-10 text-sm text-charcoal outline-none
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
            />
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="container mx-auto px-5 pb-16 sm:px-6 sm:pb-24">
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
            <p className="hidden text-sm text-muted-foreground sm:block">
              {filteredItems.length}{" "}
              {filteredItems.length === 1 ? "event" : "events"}
            </p>
          )}
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <EventSkeleton key={index} />
            ))}
          </div>
        )}

        {error && (
          <div className="border border-destructive/20 bg-destructive/5 p-8 text-center">
            <p className="font-medium text-destructive">{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          filteredItems.length === 0 && (
            <div className="border border-dashed border-border bg-card px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center bg-surface-subtle">
                <Clock3 className="h-6 w-6 text-muted-foreground" />
              </div>

              <h3 className="mt-5 font-heading text-xl font-semibold text-charcoal">
                No events found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Try changing your search or year filter to find
                other exhibitions and industry events.
              </p>

              {(search || selectedYear !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedYear("All");
                  }}
                  className="mt-5 text-sm font-semibold text-primary hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

        {!loading &&
          !error &&
          remainingItems.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {remainingItems.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-in fade-in slide-in-from-bottom-3 duration-500"
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