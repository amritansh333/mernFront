import api from "./api";
import { resolveApiAssetUrl } from "./assetUrl";

export type EventCard = {
  id: string;
  type: "News" | "Event";
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  coverAlt?: string;
  tags?: string[];
  publishedAt?: string;
  event?: any;
};

export type NewsEventDetail = EventCard & {
  body?: string;
  gallery?: Array<{ url: string; alt?: string; caption?: string }>;
  videos?: Array<any>;
  seo?: any;
};

export async function fetchNewsEvents(params = {}) {
  const response = await api.get("/news-events", { params });
  const data = response.data?.data;
  if (!data) return { items: [], meta: {} };
  const items = (data.items || []).map((it: any) => ({
    id: it.id || it._id,
    type: it.type,
    title: it.title,
    slug: it.slug,
    excerpt: it.excerpt,
    coverImage: resolveApiAssetUrl(it.coverImage),
    coverAlt: it.coverAlt,
    tags: it.tags || [],
    publishedAt: it.publishedAt,
    event: it.event || null,
  }));
  return { items, meta: data.meta || {} };
}

export async function fetchNewsEventBySlug(slug: string) {
  const response = await api.get(`/news-events/${encodeURIComponent(slug)}`);
  const data = response.data?.data;
  if (!data || !data.item) throw new Error("Not found");
  const it = data.item;
  return {
    id: it.id || it._id,
    type: it.type,
    title: it.title,
    slug: it.slug,
    excerpt: it.excerpt,
    coverImage: resolveApiAssetUrl(it.coverImage),
    coverAlt: it.coverAlt,
    tags: it.tags || [],
    publishedAt: it.publishedAt,
    event: it.event || null,
    body: it.body,
    gallery: (it.gallery || []).map((g: any) => ({
      url: resolveApiAssetUrl(g.url),
      alt: g.alt,
      caption: g.caption,
    })),
    videos: it.videos || [],
    seo: it.seo || {},
    related: (data.related || []).map((r: any) => ({
      id: r.id || r._id,
      title: r.title,
      slug: r.slug,
      coverImage: resolveApiAssetUrl(r.coverImage),
    })),
  };
}
