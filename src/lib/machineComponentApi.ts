import api from "@/lib/api";
import type {
  MachineComponentProduct,
  MachineSidebarNode,
  MachineComponentsData,
  MachineComponentsResponse,
} from "@/types/machineComponent";

let cache: MachineComponentsData | null = null;
let pendingRequest: Promise<MachineComponentsData> | null = null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getStringArray(value: unknown) {
  if (!Array.isArray(value)) return undefined;

  const strings = value
    .map((item) => getString(item))
    .filter((item): item is string => Boolean(item));

  return strings.length ? strings : undefined;
}

function normalizeSidebarNode(node: unknown): MachineSidebarNode | null {
  if (!isRecord(node)) return null;

  const children = [
    ...(Array.isArray(node.children) ? node.children : []),
    ...(Array.isArray(node.subCategories) ? node.subCategories : []),
    ...(Array.isArray(node.brands) ? node.brands : []),
    ...(Array.isArray(node.products) ? node.products : []),
  ]
    .map(normalizeSidebarNode)
    .filter((item): item is MachineSidebarNode => Boolean(item));

  const normalized: MachineSidebarNode = {
    ...(node as MachineSidebarNode),
    _id: getString(node._id),
    id: getString(node.id),
    slug: getString(node.slug),
    name: getString(node.name),
    title: getString(node.title),
    label: getString(node.label),
    type: getString(node.type),
    path: getString(node.path),
    href: getString(node.href),
    url: getString(node.url),
    children,
    subCategories: [],
    brands: [],
    products: [],
  };

  return normalized;
}

function normalizeSidebar(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map(normalizeSidebarNode)
      .filter((item): item is MachineSidebarNode => Boolean(item));
  }

  if (!isRecord(value)) return [];

  return Object.values(value)
    .map(normalizeSidebarNode)
    .filter((item): item is MachineSidebarNode => Boolean(item));
}

function getProductSlug(product: MachineComponentProduct, fallback?: string) {
  return (
    getString(product.slug) ||
    getString(product.id) ||
    getString(product._id) ||
    getString(fallback) ||
    ""
  );
}

function normalizeProduct(product: unknown, fallbackSlug?: string): MachineComponentProduct | null {
  if (!isRecord(product)) return null;

  const normalized = product as MachineComponentProduct;
  const slug = getProductSlug(normalized, fallbackSlug);
  if (!slug) return null;

  const machineComponentData = isRecord(normalized.machineComponentData)
    ? normalized.machineComponentData
    : {};

  return {
    ...normalized,
    slug,
    name: getString(normalized.name) || getString(normalized.title) || getString(normalized.label),
    image: getString(normalized.image) || getString(normalized.imageUrl),
    keyFeatures: getStringArray(normalized.keyFeatures) || getStringArray(normalized.features),
    machineComponentData: {
      ...machineComponentData,
      downloads:
        normalized.machineComponentData?.downloads ??
        normalized.downloads ??
        machineComponentData.downloads,
    },
  };
}

function normalizeProducts(value: unknown) {
  const products: Record<string, MachineComponentProduct> = {};

  if (Array.isArray(value)) {
    value.forEach((item) => {
      const product = normalizeProduct(item);
      if (product?.slug) products[product.slug] = product;
    });
    return products;
  }

  if (isRecord(value)) {
    Object.entries(value).forEach(([key, item]) => {
      const product = normalizeProduct(item, key);
      if (product?.slug) products[product.slug] = product;
    });
  }

  return products;
}

function normalizePaths(value: unknown) {
  if (!isRecord(value)) return undefined;

  return Object.entries(value).reduce<Record<string, string>>((paths, [key, path]) => {
    const normalizedPath = getString(path);
    if (normalizedPath) paths[key] = normalizedPath;
    return paths;
  }, {});
}

function collectSidebarPaths(nodes: MachineSidebarNode[]) {
  const paths: Record<string, string> = {};

  nodes.forEach((node) => {
    const path = getString(node.path) || getString(node.href) || getString(node.url);
    if (node.slug && path) paths[node.slug] = path;

    Object.assign(paths, collectSidebarPaths(node.children ?? []));
  });

  return paths;
}

export function normalizeMachineComponentsResponse(
  response: MachineComponentsData | MachineComponentsResponse | unknown,
): MachineComponentsData {
  const payload =
    isRecord(response) && isRecord(response.data)
      ? response.data
      : isRecord(response)
        ? response
        : {};

  const products = normalizeProducts(payload.products);
  const sidebar = normalizeSidebar(payload.sidebar ?? payload.navigation);
  const paths = {
    ...collectSidebarPaths(sidebar),
    ...(normalizePaths(payload.paths) ?? {}),
  };
  const defaultProduct = getString(payload.defaultProduct) || getString(payload.defaultSlug);

  return {
    ...(payload as MachineComponentsData),
    experience: getString(payload.experience) || "machine_components",
    sidebar,
    navigation: sidebar,
    defaultProduct,
    products,
    paths,
  };
}

export async function getMachineComponents(): Promise<MachineComponentsData> {
  if (cache) return cache;
  if (pendingRequest) return pendingRequest;

  pendingRequest = api
    .get<MachineComponentsData | MachineComponentsResponse>("/machine-components")
    .then((response) => {
      cache = normalizeMachineComponentsResponse(response.data ?? {});
      return cache;
    })
    .finally(() => {
      pendingRequest = null;
    });

  return pendingRequest;
}
