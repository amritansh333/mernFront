import { useLocation } from "react-router-dom";

import { useMachineComponentsData } from "@/contexts/MachineComponentsDataContext";

import { PRODUCT_EXPERIENCES } from "@/lib/product-experience/experienceRegistry";
import { normalizeProductPath } from "@/lib/product-experience/paths";
import {
  buildMachineComponentRouteMaps,
} from "@/lib/product-experience/routeMaps";
import {
  isMachineComponentsPath,
  getMachineComponentsRootPath,
} from "@/lib/product-experience/machineComponentRoutes";

import MachineComponentsPage from "@/pages/MachineComponentsPage";
import MachineComponentSubcategoryPage from "@/pages/MachineComponentSubcategoryPage";
import SemiFinishedProductRoutes from "@/pages/SemiFinishedProductRoutes";

export default function ProductExperienceRouter() {
  const location = useLocation();

  const {
    data: machineComponentsData,
    loading,
  } = useMachineComponentsData();

  const pathname = normalizeProductPath(location.pathname);

  if (loading) {
    return null;
  }

  /**
   * Machine Components experience
   */
  if (isMachineComponentsPath(pathname, machineComponentsData)) {
    const rootPath = normalizeProductPath(
      getMachineComponentsRootPath(machineComponentsData),
    );

    // Overview page
    if (pathname === rootPath) {
      return <MachineComponentsPage />;
    }

    // Product pages are already registered in the route map
    const { pathToSlug } =
      buildMachineComponentRouteMaps(machineComponentsData);

    if (pathToSlug.has(pathname)) {
      return <MachineComponentsPage />;
    }

    // Remaining machine-component URLs are subcategory pages
    return <MachineComponentSubcategoryPage />;
  }

  /**
   * Other product experiences (Semi Finished Products, etc.)
   */
  const experience = PRODUCT_EXPERIENCES.find((item) =>
    item.matcher(pathname, { machineComponentsData }),
  );

  if (experience) {
    const ExperienceComponent = experience.component;
    return <ExperienceComponent />;
  }

  return <SemiFinishedProductRoutes />;
}