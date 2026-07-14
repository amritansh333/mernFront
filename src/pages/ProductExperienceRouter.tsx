import { useLocation } from "react-router-dom";
import { useMachineComponentsData } from "@/contexts/MachineComponentsDataContext";
import { PRODUCT_EXPERIENCES } from "@/lib/product-experience/experienceRegistry";
import { normalizeProductPath } from "@/lib/product-experience/paths";
import SemiFinishedProductRoutes from "@/pages/SemiFinishedProductRoutes";

export default function ProductExperienceRouter() {
  const location = useLocation();
  const { data: machineComponentsData, loading } = useMachineComponentsData();
  const pathname = normalizeProductPath(location.pathname);

  if (loading) return null;

  const experience = PRODUCT_EXPERIENCES.find((item) =>
    item.matcher(pathname, { machineComponentsData }),
  );

  if (experience) {
    const ExperienceComponent = experience.component;
    return <ExperienceComponent />;
  }

  return <SemiFinishedProductRoutes />;
}
