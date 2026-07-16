import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { Sparkles } from "lucide-react";
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

  if (breadcrumbs.length === 0) return null;

  return (
    <nav
  className="
    mb-4
    inline-flex
    max-w-full
    items-start
    gap-2
    rounded-md
    border
    border-[#279ECE]/20
    bg-[#279ECE]/10
    px-3
    py-2
    lg:px-4
  "
>
      <Sparkles className="h-3.5 w-3.5 shrink-0 self-start text-[#276A96]" />
      <span
  className="
    flex
    flex-wrap
    items-center
    gap-x-2
    gap-y-1
    text-[9px]
    sm:text-[10px]
    font-bold
    uppercase
    tracking-[0.16em]
    leading-5
    text-[#276A96]
  "
>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <span
  key={`${breadcrumb.label}-${breadcrumb.path || index}`}
  className="inline-flex shrink-0 items-center gap-1.5"
>
              {index > 0 && <span>/</span>}
              {isLast || !breadcrumb.path ? (
                <span>{breadcrumb.label}</span>
              ) : (
                <Link to={breadcrumb.path} className="hover:text-primary">
                  {breadcrumb.label}
                </Link>
              )}
            </span>
          );
        })}
      </span>
    </nav>
  );
}
