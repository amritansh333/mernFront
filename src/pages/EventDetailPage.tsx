import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchNewsEventBySlug } from "@/lib/newsEventsApi";

export default function EventDetailPage() {
  const { slug } = useParams();
  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const data = await fetchNewsEventBySlug(slug || "");
        if (cancelled) return;
        setItem(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load event.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (slug) void load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading)
    return <div className="container mx-auto px-6 py-12">Loading...</div>;
  if (error || !item)
    return (
      <div className="container mx-auto px-6 py-12">{error || "Not found"}</div>
    );

  const ev = item.event || {};

  return (
    <div className="container mx-auto px-6 py-12">
      <article>
        <header className="mb-6">
          <p className="inline-block px-2 py-1 bg-surface-subtle text-sm">
            Event
          </p>
          <h1 className="font-heading text-3xl mt-3">{item.title}</h1>
          <p className="mt-2 text-muted-foreground">{item.excerpt}</p>
        </header>

        {item.coverImage && (
          <div className="mb-6">
            <img
              src={item.coverImage}
              alt={item.coverAlt || item.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: item.body || "" }}
            />
          </div>

          <aside className="bg-card border border-border p-4 rounded">
            <h3 className="font-semibold">Event Details</h3>
            <dl className="mt-3 text-sm text-muted-foreground">
              {ev.startDate && (
                <div>
                  <dt className="font-medium">Start</dt>
                  <dd>{new Date(ev.startDate).toLocaleDateString()}</dd>
                </div>
              )}
              {ev.endDate && (
                <div className="mt-2">
                  <dt className="font-medium">End</dt>
                  <dd>{new Date(ev.endDate).toLocaleDateString()}</dd>
                </div>
              )}
              {ev.venue && (
                <div className="mt-2">
                  <dt className="font-medium">Venue</dt>
                  <dd>{ev.venue}</dd>
                </div>
              )}
              {ev.city && (
                <div className="mt-2">
                  <dt className="font-medium">City</dt>
                  <dd>{ev.city}</dd>
                </div>
              )}
              {ev.booth && (
                <div className="mt-2">
                  <dt className="font-medium">Booth</dt>
                  <dd>{ev.booth}</dd>
                </div>
              )}
              {ev.eventWebsite && (
                <div className="mt-3">
                  <a
                    href={ev.eventWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary"
                  >
                    Visit event website
                  </a>
                </div>
              )}
            </dl>
          </aside>
        </div>
      </article>
    </div>
  );
}
