import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Sparkles,
} from "lucide-react";

type EventCardProps = {
  item: any;
};

function formatDate(value?: string) {
  if (!value) return null;

  try {
    return format(new Date(value), "dd MMM yyyy");
  } catch {
    return null;
  }
}

export default function EventCard({ item }: EventCardProps) {
  const publishedDate = formatDate(item.publishedAt);
  const startDate = formatDate(item.event?.startDate);
  const endDate = formatDate(item.event?.endDate);

  const eventDate =
    startDate && endDate
      ? `${startDate} – ${endDate}`
      : startDate || endDate;

  const location =
    item.event?.city && item.event?.country
      ? `${item.event.city}, ${item.event.country}`
      : item.event?.city ||
        item.event?.country ||
        item.event?.location ||
        null;

  const to =
    item.type === "Event"
      ? `/events/${item.slug}`
      : `/news/${item.slug}`;

  return (
    <article
      className="
        group relative flex h-full flex-col overflow-hidden
        border border-border bg-card
        shadow-sm
        transition-all duration-500 ease-out
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <Link
        to={to}
        className="flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={`Read ${item.title}`}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {item.coverImage ? (
            <img
              src={item.coverImage}
              alt={item.coverAlt || item.title}
              loading="lazy"
              className="
                h-full w-full object-cover
                transition-transform duration-700 ease-out
                group-hover:scale-105
              "
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface-subtle text-muted-foreground">
              <div className="text-center">
                <CalendarDays className="mx-auto mb-2 h-8 w-8 opacity-40" />
                <span className="text-sm">Event</span>
              </div>
            </div>
          )}

          {/* Image overlay */}
          <div
            className="
              pointer-events-none absolute inset-0
              bg-gradient-to-t from-black/50 via-transparent to-transparent
              opacity-60
            "
          />

          {/* Type */}
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span
              className="
                inline-flex items-center gap-1.5
                border border-white/20 bg-black/55 px-3 py-1.5
                text-[11px] font-semibold uppercase tracking-[0.12em]
                text-white backdrop-blur-md
              "
            >
              <CalendarDays className="h-3.5 w-3.5" />
              {item.type}
            </span>

            {item.featured && (
              <span
                className="
                  inline-flex items-center gap-1.5
                  bg-primary px-3 py-1.5
                  text-[11px] font-semibold uppercase tracking-[0.1em]
                  text-primary-foreground shadow-lg
                "
              >
                <Sparkles className="h-3.5 w-3.5" />
                Featured
              </span>
            )}
          </div>

          {/* Arrow */}
          <div
            className="
              absolute bottom-4 right-4 flex h-10 w-10 items-center
              justify-center border border-white/20
              bg-black/45 text-white backdrop-blur-md
              transition-all duration-300
              group-hover:translate-x-0.5 group-hover:-translate-y-0.5
            "
          >
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {/* Dates */}
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            {eventDate && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                {eventDate}
              </span>
            )}

            {!eventDate && publishedDate && (
              <time
                dateTime={item.publishedAt}
                className="inline-flex items-center gap-1.5"
              >
                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                {publishedDate}
              </time>
            )}
          </div>

          {/* Title */}
          <h3
            className="
              font-heading text-xl font-semibold leading-tight
              text-charcoal
              transition-colors duration-300
              group-hover:text-primary
              sm:text-2xl
            "
          >
            {item.title}
          </h3>

          {/* Location */}
          {location && (
            <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{location}</span>
            </div>
          )}

          {/* Excerpt */}
          {item.excerpt && (
            <p
              className="
                mt-4 line-clamp-3 text-sm leading-6
                text-muted-foreground
              "
            >
              {item.excerpt}
            </p>
          )}

          {/* Venue / Booth */}
          {(item.event?.venue || item.event?.booth) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.event?.venue && (
                <span className="bg-surface-subtle px-2.5 py-1.5 text-xs text-muted-foreground">
                  {item.event.venue}
                </span>
              )}

              {item.event?.booth && (
                <span className="bg-surface-subtle px-2.5 py-1.5 text-xs font-medium text-charcoal">
                  Booth {item.event.booth}
                </span>
              )}
            </div>
          )}

          {/* Tags */}
          {item.tags?.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              {item.tags.slice(0, 4).map((tag: string) => (
                <span
                  key={tag}
                  className="
                    border border-border
                    bg-background px-2.5 py-1
                    text-[11px] font-medium text-muted-foreground
                    transition-colors
                    group-hover:border-primary/30
                  "
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}