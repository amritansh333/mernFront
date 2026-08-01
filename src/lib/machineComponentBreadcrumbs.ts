import type {
  MachineComponentsData,
  MachineSidebarNode,
} from "@/types/machineComponent";
import { getMachineComponentsRootPath } from "@/lib/product-experience/machineComponentRoutes";
import { normalizeProductPath } from "@/lib/product-experience/paths";

export interface MachineComponentBreadcrumb {
  label: string;
  path?: string;
}

function getNodeLabel(node: MachineSidebarNode) {
  const label = node.name || node.title || node.label || node.slug || "";

  if (label === "Thermoplastics Machine Components") {
    return "Machine Components";
  }

  return label;
}

function getNodePath(data: MachineComponentsData, node: MachineSidebarNode) {
  if (node.path) return node.path;
  if (!node.slug) return undefined;

  return data.paths?.[node.slug] || data.products?.[node.slug]?.path;
}

function findTrail(
  nodes: MachineSidebarNode[] | undefined,
  selectedSlug: string,
): MachineSidebarNode[] {
  for (const node of nodes ?? []) {
    if (node.slug === selectedSlug) return [node];

    const childTrail = findTrail(node.children, selectedSlug);
    if (childTrail.length > 0) return [node, ...childTrail];
  }

  return [];
}

export function buildMachineComponentBreadcrumbs(
  data: MachineComponentsData | null,
  selectedSlug: string,
  currentPath?: string,
): MachineComponentBreadcrumb[] {
  if (!data) return [];

  let breadcrumbs: MachineComponentBreadcrumb[] = [];

  if (selectedSlug) {
    // PRODUCT PAGE
    const trail = findTrail(data.sidebar, selectedSlug);

    breadcrumbs = trail
      .map((node) => ({
        label: getNodeLabel(node),
        path: getNodePath(data, node),
      }))
      .filter((breadcrumb) => breadcrumb.label);
  } else if (currentPath) {
    // SUBCATEGORY PAGE
    const normalizedCurrentPath = normalizeProductPath(currentPath);

    const findByPath = (
      nodes?: MachineSidebarNode[],
      trail: MachineSidebarNode[] = [],
    ): MachineSidebarNode[] => {
      for (const node of nodes ?? []) {
        const nodePath = getNodePath(data, node);

        if (
          nodePath &&
          normalizeProductPath(nodePath) === normalizedCurrentPath
        ) {
          return [...trail, node];
        }

        const child = findByPath(node.children, [...trail, node]);

        if (child.length) return child;
      }

      return [];
    };

    const trail = findByPath(data.sidebar);

    breadcrumbs = trail
      .map((node) => ({
        label: getNodeLabel(node),
        path: getNodePath(data, node),
      }))
      .filter((breadcrumb) => breadcrumb.label);
  }

  if (currentPath) {
    const normalizedCurrentPath = normalizeProductPath(currentPath);

    const currentPathIndex = breadcrumbs.findIndex(
      (breadcrumb) =>
        breadcrumb.path &&
        normalizeProductPath(breadcrumb.path) === normalizedCurrentPath,
    );

    if (currentPathIndex >= 0) {
      breadcrumbs = breadcrumbs.slice(0, currentPathIndex + 1);
    } else {
      const rootPath = getMachineComponentsRootPath(data);

      if (
        rootPath &&
        normalizeProductPath(rootPath) === normalizedCurrentPath &&
        breadcrumbs.length > 0
      ) {
        breadcrumbs = breadcrumbs.slice(0, 1);
      }
    }
  }

  return [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Products",
      path: "/products",
    },
    ...breadcrumbs,
  ];
}
