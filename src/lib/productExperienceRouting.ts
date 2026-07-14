export { PRODUCTS_ROOT_PATH, normalizeProductPath } from "@/lib/product-experience/paths";
export { buildMachineComponentRouteMaps } from "@/lib/product-experience/routeMaps";
export {
  getDefaultMachineComponentSlug,
  getMachineComponentPathByLabel,
  getMachineComponentsRootPath,
  isMachineComponentsPath,
  shouldUseDefaultMachineComponent,
} from "@/lib/product-experience/machineComponentRoutes";
export { resolveProductCategoryPath } from "@/lib/product-experience/categoryResolver";
export { useMachineComponentRouting } from "@/lib/product-experience/useMachineComponentRouting";
