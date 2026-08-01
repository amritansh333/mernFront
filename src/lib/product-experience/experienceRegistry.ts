import type { ComponentType } from "react";

import type { MachineComponentsData } from "@/types/machineComponent";

export interface ProductExperienceContext {
  machineComponentsData: MachineComponentsData | null;
}

export interface ProductExperienceDefinition {
  id: string;
  matcher: (pathname: string, context: ProductExperienceContext) => boolean;
  component: ComponentType;
}

/**
 * Machine Components are routed directly by ProductExperienceRouter.
 *
 * Keep this registry for any future product experiences
 * (Semi Finished Products, custom experiences, etc.).
 */
export const PRODUCT_EXPERIENCES: ProductExperienceDefinition[] = [];
