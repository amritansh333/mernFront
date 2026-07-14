import { useMemo } from "react";
import { useMachineComponentsData } from "@/contexts/MachineComponentsDataContext";
import { PRODUCTS_ROOT_PATH } from "@/lib/product-experience/paths";
import { resolveProductCategoryPath } from "@/lib/product-experience/categoryResolver";
import {
  getMachineComponentPathByLabel,
  getMachineComponentsRootPath,
} from "@/lib/product-experience/machineComponentRoutes";

export function useMachineComponentRouting() {
  const { data } = useMachineComponentsData();

  return useMemo(() => {
    const rootPath = getMachineComponentsRootPath(data) || PRODUCTS_ROOT_PATH;

    return {
      rootPath,
      getPathByLabel: (label: string) =>
        getMachineComponentPathByLabel(data, label),
      resolveCategoryPath: (category: Parameters<typeof resolveProductCategoryPath>[0]) =>
        resolveProductCategoryPath(category, rootPath),
    };
  }, [data]);
}
