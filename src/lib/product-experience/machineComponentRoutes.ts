import type { MachineComponentsData } from "@/types/machineComponent";
import {
  PRODUCTS_ROOT_PATH,
  normalizeProductPath,
} from "@/lib/product-experience/paths";
import {
  buildMachineComponentRouteMaps,
  normalizeLabel,
} from "@/lib/product-experience/routeMaps";

const MACHINE_COMPONENT_PATH_HINT = "machine-components";

function getPathSegments(path: string) {
  return normalizeProductPath(path).split("/").filter(Boolean);
}

function getExperienceRootFromPath(path?: string) {
  const segments = getPathSegments(path || "");

  if (segments[0] !== "products" || !segments[1]) return "";

  return `/${segments.slice(0, 2).join("/")}`;
}

function getRootFromBackendPaths(data: MachineComponentsData | null) {
  const routeMaps = buildMachineComponentRouteMaps(data);
  const paths = Array.from(routeMaps.pathToSlug.keys());

  for (const path of paths) {
    const rootPath = getExperienceRootFromPath(path);
    if (rootPath) return rootPath;
  }

  return "";
}

export function getMachineComponentsRootPath(
  data: MachineComponentsData | null,
) {
  return (
    normalizeProductPath(data?.seo?.canonical) ||
    getRootFromBackendPaths(data)
  );
}

export function isMachineComponentsPath(
  pathname: string,
  data: MachineComponentsData | null,
) {
  const normalizedPathname = normalizeProductPath(pathname);
  const rootPath = getMachineComponentsRootPath(data);

  if (rootPath) {
    return (
      normalizedPathname === rootPath ||
      normalizedPathname.startsWith(`${rootPath}/`)
    );
  }

  const secondSegment = getPathSegments(normalizedPathname)[1] || "";
  return normalizeLabel(secondSegment).includes(MACHINE_COMPONENT_PATH_HINT);
}

export function getMachineComponentPathByLabel(
  data: MachineComponentsData | null,
  label: string,
) {
  return (
    buildMachineComponentRouteMaps(data).labelToPath.get(normalizeLabel(label)) ||
    getMachineComponentsRootPath(data) ||
    PRODUCTS_ROOT_PATH
  );
}

export function shouldUseDefaultMachineComponent(
  data: MachineComponentsData | null,
  pathname: string,
) {
  return normalizeProductPath(pathname) === getMachineComponentsRootPath(data);
}

export function getDefaultMachineComponentSlug(data: MachineComponentsData) {
  const products = data.products ?? {};
  if (data.defaultProduct && products[data.defaultProduct]) {
    return data.defaultProduct;
  }

  return Object.keys(products)[0] || "";
}
