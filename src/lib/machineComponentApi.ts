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

  return {
    slug: getString(node.slug),
    name: getString(node.name),
    path: getString(node.path),
    children,
  };
}

function normalizeSidebar(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .map(normalizeSidebarNode)
    .filter((item): item is MachineSidebarNode => Boolean(item));
}

function normalizeProduct(product: unknown): MachineComponentProduct | null {
  if (!isRecord(product)) return null;

  const normalized = product as MachineComponentProduct;
  const slug = getString(normalized.slug);
  if (!slug) return null;

  const machineComponentData = isRecord(normalized.machineComponentData)
    ? normalized.machineComponentData
    : {};

  return {
    ...normalized,
    slug,
    name: getString(normalized.name),
    path: getString(normalized.path),
    image: getString(normalized.image),
    machineComponentData: {
      ...machineComponentData,
    },
  };
}

function normalizeProducts(value: unknown) {
  const products: Record<string, MachineComponentProduct> = {};

  if (isRecord(value)) {
    Object.values(value).forEach((item) => {
      const product = normalizeProduct(item);
      if (product?.slug) products[product.slug] = product;
    });
  }

  return products;
}

function normalizePaths(value: unknown) {
  if (!isRecord(value)) return {};

  return Object.entries(value).reduce<Record<string, string>>((paths, [key, path]) => {
    const normalizedPath = getString(path);
    if (normalizedPath) paths[key] = normalizedPath;
    return paths;
  }, {});
}

export function normalizeMachineComponentsResponse(
  response: MachineComponentsResponse,
): MachineComponentsData {
  const payload = response.data ?? {};

  const products = normalizeProducts(payload.products);
  const sidebar = normalizeSidebar(payload.sidebar);
  const paths = normalizePaths(payload.paths);
  const defaultProduct = getString(payload.defaultProduct);

  return {
    ...payload,
    experience: getString(payload.experience),
    sidebar,
    defaultProduct,
    products,
    paths,
  };
}

export async function getMachineComponents(): Promise<MachineComponentsData> {
  if (cache) return cache;
  if (pendingRequest) return pendingRequest;

  pendingRequest = api
    .get<MachineComponentsResponse>("/machine-components")
    .then((response) => {
      cache = normalizeMachineComponentsResponse(response.data);
      return cache;
    })
    .finally(() => {
      pendingRequest = null;
    });

  return pendingRequest;
}
