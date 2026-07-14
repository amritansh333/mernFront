const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export function resolveApiAssetUrl(value?: unknown) {
  if (typeof value !== "string") return "";

  const url = value.trim();
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (/^(javascript|data|vbscript):/i.test(url)) return "";

  const baseUrl = String(API_BASE_URL).replace(/\/$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;

  return `${baseUrl}${path}`;
}
