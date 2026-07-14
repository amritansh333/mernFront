export const PRODUCTS_ROOT_PATH = "/products";

export function normalizeProductPath(path?: string) {
  if (!path) return "";

  try {
    const url = new URL(path, window.location.origin);
    return url.pathname.replace(/\/+$/, "") || "/";
  } catch {
    return path.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  }
}
