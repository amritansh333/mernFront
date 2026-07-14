import type {
  MachineComponentsData,
  MachineSidebarNode,
} from "@/types/machineComponent";
import { normalizeProductPath } from "@/lib/product-experience/paths";

function getNodeLabel(node: MachineSidebarNode) {
  return node.label || node.title || node.name || node.slug || "";
}

export function normalizeLabel(label?: string) {
  return label?.trim().toLowerCase() || "";
}

function addRoute(
  pathToSlug: Map<string, string>,
  slugToPath: Map<string, string>,
  products: MachineComponentsData["products"],
  slug?: string,
  path?: string,
) {
  if (!slug || !path || !products?.[slug]) return;

  const normalizedPath = normalizeProductPath(path);
  if (!normalizedPath) return;

  pathToSlug.set(normalizedPath, slug);
  if (!slugToPath.has(slug)) slugToPath.set(slug, path);
}

export function buildMachineComponentRouteMaps(
  data: MachineComponentsData | null,
) {
  const pathToSlug = new Map<string, string>();
  const slugToPath = new Map<string, string>();
  const labelToPath = new Map<string, string>();
  const products = data?.products ?? {};

  Object.entries(data?.paths ?? {}).forEach(([slug, path]) => {
    addRoute(pathToSlug, slugToPath, products, slug, path);
  });

  Object.values(products).forEach((product) => {
    addRoute(pathToSlug, slugToPath, products, product.slug, product.path);
  });

  const getSelectableNodePath = (
    node: MachineSidebarNode,
  ): string | undefined => {
    if (node.slug && products[node.slug]) {
      return products[node.slug].path || data?.paths?.[node.slug] || node.path;
    }

    for (const child of node.children ?? []) {
      const childPath = getSelectableNodePath(child);
      if (childPath) return childPath;
    }

    return undefined;
  };

  const addSidebarRoutes = (nodes: MachineSidebarNode[] = []) => {
    nodes.forEach((node) => {
      addRoute(pathToSlug, slugToPath, products, node.slug, node.path);

      const label = normalizeLabel(getNodeLabel(node));
      const selectablePath = getSelectableNodePath(node);
      if (label && selectablePath && !labelToPath.has(label)) {
        labelToPath.set(label, selectablePath);
      }

      addSidebarRoutes(node.children);
    });
  };

  addSidebarRoutes(data?.sidebar);

  return { pathToSlug, slugToPath, labelToPath };
}
