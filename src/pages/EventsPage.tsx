import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { fetchNewsEvents } from "@/lib/newsEventsApi";

export default function EventsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const { items } = await fetchNewsEvents({ type: "Event", limit: 12 });
        if (cancelled) return;
        setItems(items);
      } catch (err) {
        console.error(err);
        setError("Unable to load events.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <header className="mb-8">
        <p className="section-label">Events</p>
        <h1 className="font-heading text-3xl">Events</h1>
        <p className="mt-2 text-muted-foreground">
          Upcoming and recent events where Khanna Polyrib participates.
        </p>
      </header>

      {loading && <p>Loading...</p>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && items.length === 0 && (
        <div className="border border-border bg-card p-8 text-center">
          No events found.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => (
          <EventCard key={it.id} item={it} />
        ))}
      </div>
    </div>
  );
}
