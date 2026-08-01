import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { buildMachineComponentBreadcrumbs } from "@/lib/machineComponentBreadcrumbs";
import { useMachineComponents } from "@/hooks/useMachineComponents";

export default function MachineBreadcrumbs() {
  const location = useLocation();

  const { machineData, selectedSlug } = useMachineComponents();

  const breadcrumbs = useMemo(
    () =>
      buildMachineComponentBreadcrumbs(
        machineData,
        selectedSlug,
        location.pathname,
      ),
    [location.pathname, machineData, selectedSlug],
  );

  if (!breadcrumbs.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-3 flex w-full">
      <div
        className="
          flex
          flex-wrap
          items-center
          gap-x-1
          gap-y-1
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.08em]
          leading-tight
          text-[#276A96]
          sm:text-[10px]
          md:text-[11px]
        "
      >
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <div
              key={`${breadcrumb.label}-${index}`}
              className="flex items-center gap-[2px]"
            >
              {index > 0 && (
                <ChevronRight className="h-[10px] w-[10px] shrink-0 text-[#84B7D3]" />
              )}

              {isLast || !breadcrumb.path ? (
                <span className="text-[#276A96]">{breadcrumb.label}</span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className="
                    text-[#276A96]
                    transition-colors
                    hover:text-[#279ECE]
                  "
                >
                  {breadcrumb.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
