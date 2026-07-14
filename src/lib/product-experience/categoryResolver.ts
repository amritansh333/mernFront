import { PRODUCTS_ROOT_PATH } from "@/lib/product-experience/paths";

interface ProductCategoryLike {
  name?: string;
  slug?: string;
  path?: string;
  href?: string;
}

export function resolveProductCategoryPath(
  category: ProductCategoryLike,
  machineComponentsRootPath: string,
) {
  const explicitPath = category.path || category.href;
  if (explicitPath) return explicitPath;

  const slug = category.slug?.toLowerCase() || "";
  const name = category.name?.toLowerCase() || "";

  if (slug.includes("machine-components") || name.includes("machine components")) {
    return machineComponentsRootPath || PRODUCTS_ROOT_PATH;
  }

  return `/products/${category.slug}`;
}
