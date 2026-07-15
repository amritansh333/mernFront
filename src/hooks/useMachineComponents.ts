import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMachineComponentsData } from "@/contexts/MachineComponentsDataContext";
import {
  getDefaultMachineComponentSlug,
  shouldUseDefaultMachineComponent,
} from "@/lib/product-experience/machineComponentRoutes";
import { normalizeProductPath } from "@/lib/product-experience/paths";
import { buildMachineComponentRouteMaps } from "@/lib/product-experience/routeMaps";
import type { MachineComponentProduct } from "@/types/machineComponent";

export function useMachineComponents() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    data: machineData,
    loading,
    error,
  } = useMachineComponentsData();

  const routeMaps = useMemo(() => buildMachineComponentRouteMaps(machineData), [machineData]);
  const selectedSlug = useMemo(() => {
    if (!machineData) return "";

    const slugFromPath = routeMaps.pathToSlug.get(normalizeProductPath(location.pathname));
    if (slugFromPath) return slugFromPath;
    if (shouldUseDefaultMachineComponent(machineData, location.pathname)) {
      return getDefaultMachineComponentSlug(machineData);
    }

    return "";
  }, [location.pathname, machineData, routeMaps]);

  const selectProduct = useCallback(
    (slug: string) => {
      if (!slug || !machineData?.products?.[slug]) return;

      const productPath = routeMaps.slugToPath.get(slug);
      if (
        productPath &&
        normalizeProductPath(productPath) !== normalizeProductPath(location.pathname)
      ) {
        navigate(productPath);
      }
    },
    [location.pathname, machineData?.products, navigate, routeMaps],
  );

  const selectedProduct = useMemo<MachineComponentProduct | undefined>(
    () => machineData?.products?.[selectedSlug],
    [machineData?.products, selectedSlug],
  );

  return {
    machineData,
    selectedSlug,
    selectedProduct,
    setSelectedSlug: selectProduct,
    loading,
    error,
  };
}
