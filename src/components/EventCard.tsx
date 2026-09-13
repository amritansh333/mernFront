import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function EventCard({ item }: { item: any }) {
  const date = item.publishedAt
    ? format(new Date(item.publishedAt), "dd MMM yyyy")
    : null;
  const to =
    item.type === "Event" ? `/events/${item.slug}` : `/news/${item.slug}`;

  return (
    <article className="border border-border bg-card overflow-hidden group">
      <Link to={to} className="block">
        <div className="aspect-video bg-muted">
          {item.coverImage ? (
            <img
              src={item.coverImage}
              alt={item.coverAlt || item.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span className="inline-block px-2 py-0.5 text-[11px] bg-surface-subtle rounded">
              {item.type}
            </span>
            {date && <time dateTime={item.publishedAt}>{date}</time>}
          </div>

          <h3 className="font-heading text-lg leading-snug text-charcoal">
            {item.title}
          </h3>

          {item.excerpt && (
            <p className="mt-2 text-sm text-muted-foreground">{item.excerpt}</p>
          )}

          {item.tags && item.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.slice(0, 3).map((t: string) => (
                <span
                  key={t}
                  className="text-xs bg-surface-subtle px-2 py-1 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
