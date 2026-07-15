import type { ComponentType } from "react";
import MachineComponentsPage from "@/pages/MachineComponentsPage";
import { isMachineComponentsPath } from "@/lib/product-experience/machineComponentRoutes";
import type { MachineComponentsData } from "@/types/machineComponent";

export interface ProductExperienceContext {
  machineComponentsData: MachineComponentsData | null;
}

export interface ProductExperienceDefinition {
  id: string;
  matcher: (pathname: string, context: ProductExperienceContext) => boolean;
  component: ComponentType;
}

export const PRODUCT_EXPERIENCES: ProductExperienceDefinition[] = [
  {
    id: "machine_components",
    matcher: (pathname, context) =>
      isMachineComponentsPath(pathname, context.machineComponentsData),
    component: MachineComponentsPage,
  },
];
