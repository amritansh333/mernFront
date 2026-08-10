import api from "./api";
import { resolveApiAssetUrl } from "./assetUrl";

export type PostType = "Blog" | "Gallery";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  id: string;
  slug: string;
  type: PostType;
  title: string;
  date: string;
  publishedAt: string;
  image: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  readTimeMinutes: number;
  category: string;
  intro: string;
  sections: ArticleSection[];
  keyTakeaways: string[];
  galleryImages: string[];
  status?: "draft" | "published";
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
};

type BlogPostApiResponse = {
  _id: string;
  slug: string;
  type: PostType;
  title: string;
  publishedAt: string;
  image: string;
  excerpt: string;
  tags?: string[];
  readTimeMinutes: number;
  category: string;
  intro: string;
  sections?: ArticleSection[];
  keyTakeaways?: string[];
  galleryImages?: string[];
  status?: "draft" | "published";
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
};

function formatPublishedDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function normalizeBlogPost(post: BlogPostApiResponse): BlogPost {
  return {
    id: post._id,
    slug: post.slug,
    type: post.type,
    title: post.title,

    publishedAt: post.publishedAt,
    date: formatPublishedDate(post.publishedAt),

    image: resolveApiAssetUrl(post.image),

    excerpt: post.excerpt,

    tags: Array.isArray(post.tags) ? post.tags : [],

    readTimeMinutes: post.readTimeMinutes,
    readTime: `${post.readTimeMinutes} min read`,

    category: post.category,
    intro: post.intro,

    sections: Array.isArray(post.sections) ? post.sections : [],

    keyTakeaways: Array.isArray(post.keyTakeaways) ? post.keyTakeaways : [],

    galleryImages: Array.isArray(post.galleryImages)
      ? post.galleryImages.map((image) => resolveApiAssetUrl(image))
      : [],

    status: post.status,

    seo: post.seo,
  };
}

/**
 * Fetch all published blog posts.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await api.get("/blog");

  const posts = response.data?.data;

  if (!Array.isArray(posts)) {
    return [];
  }

  return posts.map(normalizeBlogPost);
}

/**
 * Fetch one published blog post by slug.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const response = await api.get(`/blog/${encodeURIComponent(slug)}`);

  const post = response.data?.data?.post;

  if (!post) {
    throw new Error("Blog post not found");
  }

  return normalizeBlogPost(post);
}
