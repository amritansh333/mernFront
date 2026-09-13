import api from "./api";
import { resolveApiAssetUrl } from "./assetUrl";

export type EventInfo = {
  startDate?: string;
  endDate?: string;
  location?: string;
  country?: string;
  city?: string;
  venue?: string;
  booth?: string;
  eventWebsite?: string;
  registrationUrl?: string;
};

export type GalleryItem = {
  url: string;
  alt?: string;
  caption?: string;
  sortOrder?: number;
};

export type VideoItem = {
  provider: "youtube" | "vimeo" | "hosted";
  videoId: string;
  title?: string;
  caption?: string;
  poster?: string;
  sortOrder?: number;
};

export type SeoData = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
};

export type EventCard = {
  id: string;
  type: "News" | "Event";
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  coverAlt?: string;
  tags?: string[];
  featured?: boolean;
  publishedAt?: string;
  event?: EventInfo;
};

export type NewsEventDetail = EventCard & {
  body?: string;
  gallery?: GalleryItem[];
  videos?: VideoItem[];
  seo?: SeoData;
};

export async function fetchNewsEvents(params = {}) {
  const response = await api.get("/news-events", { params });

  const data = response.data?.data;

  if (!data) {
    return {
      items: [],
      meta: {},
    };
  }

  const items: EventCard[] = (data.items || []).map((it: any) => ({
    id: it.id || it._id,
    type: it.type,
    title: it.title,
    slug: it.slug,
    excerpt: it.excerpt,
    coverImage: resolveApiAssetUrl(it.coverImage),
    coverAlt: it.coverAlt,
    tags: it.tags || [],
    featured: it.featured,
    publishedAt: it.publishedAt,
    event: it.event || null,
  }));

  return {
    items,
    meta: data.meta || {},
  };
}

export async function fetchNewsEventBySlug(
  slug: string,
): Promise<NewsEventDetail & { related: EventCard[] }> {
  const response = await api.get(
    `/news-events/${encodeURIComponent(slug)}`,
  );

  const data = response.data?.data;

  if (!data || !data.item) {
    throw new Error("Not found");
  }

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
    featured: it.featured,
    publishedAt: it.publishedAt,

    event: it.event
      ? {
          startDate: it.event.startDate,
          endDate: it.event.endDate,
          location: it.event.location,
          country: it.event.country,
          city: it.event.city,
          venue: it.event.venue,
          booth: it.event.booth,
          eventWebsite: it.event.eventWebsite,
          registrationUrl: it.event.registrationUrl,
        }
      : undefined,

    body: it.body,

    gallery: (it.gallery || [])
      .sort(
        (a: GalleryItem, b: GalleryItem) =>
          (a.sortOrder || 0) - (b.sortOrder || 0),
      )
      .map((g: GalleryItem) => ({
        url: resolveApiAssetUrl(g.url),
        alt: g.alt,
        caption: g.caption,
        sortOrder: g.sortOrder,
      })),

    videos: (it.videos || [])
      .sort(
        (a: VideoItem, b: VideoItem) =>
          (a.sortOrder || 0) - (b.sortOrder || 0),
      )
      .map((v: VideoItem) => ({
        provider: v.provider,
        videoId: v.videoId,
        title: v.title,
        caption: v.caption,
        poster: resolveApiAssetUrl(v.poster),
        sortOrder: v.sortOrder,
      })),

    seo: it.seo
      ? {
          metaTitle: it.seo.metaTitle,
          metaDescription: it.seo.metaDescription,
          keywords: it.seo.keywords || [],
        }
      : {},

    related: (data.related || []).map((r: any) => ({
      id: r.id || r._id,
      type: r.type,
      title: r.title,
      slug: r.slug,
      excerpt: r.excerpt,
      coverImage: resolveApiAssetUrl(r.coverImage),
      coverAlt: r.coverAlt,
      tags: r.tags || [],
      featured: r.featured,
      publishedAt: r.publishedAt,
      event: r.event || null,
    })),
  };
}