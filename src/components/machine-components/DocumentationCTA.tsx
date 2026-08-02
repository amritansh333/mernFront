import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Download } from "lucide-react";
import { BrochureModal } from "@/components/brochure";
import { useMachineComponents } from "@/hooks/useMachineComponents";
import { buildMachineComponentBreadcrumbs } from "@/lib/machineComponentBreadcrumbs";

interface DocumentationCTAProps {
  title?: string;
  productId?: string;
  productSlug?: string;
  productName?: string;
}

export default function DocumentationCTA({
  title,
  productId,
  productSlug,
  productName,
}: DocumentationCTAProps) {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const location = useLocation();
  const { machineData } = useMachineComponents();
  const displayName = productName ?? title;
  const currentRoute = `${location.pathname}${location.search}${location.hash}`;
  const breadcrumbLabels = useMemo(() => {
    const breadcrumbs = buildMachineComponentBreadcrumbs(
      machineData,
      productSlug ?? "",
      location.pathname,
    )
      .map((breadcrumb) => breadcrumb.label)
      .filter((label) => label && label !== "Home");

    if (breadcrumbs.length > 0) return breadcrumbs;
    return displayName ? [displayName] : [];
  }, [displayName, location.pathname, machineData, productSlug]);

  return (
    <>
      <section className="mt-6 overflow-hidden border border-[#279ECE]/15 bg-[#EDF8FD]">
        <div className="grid grid-cols-1 lg:grid-cols-[59%_41%]">
          {/* LEFT */}

          <div className="flex flex-col p-5 lg:p-6">
            <h2 className="text-center text-2xl font-bold tracking-tight text-[#0F2A3D] transition-colors duration-300 hover:text-[#279ECE] sm:text-3xl lg:text-[30px]">
              Need Complete Product Information?
            </h2>

            <button
              type="button"
              onClick={() => setIsBrochureOpen(true)}
              className="
              mt-5
              inline-flex
              h-10
              w-full
              sm:w-auto
              min-w-[180px]
              items-center
              justify-center
              gap-2
              border
              border-[#C7D9E6]
              bg-white
              px-5
              text-[13px]
              font-semibold
              text-[#279ECE]
              transition-all
              duration-200
              hover:border-[#279ECE]
              hover:bg-[#F5FBFE]
              hover:text-[#279ECE]
              hover:shadow-lg
              hover:shadow-[#279ECE]/20
              focus:outline-none
              focus:ring-2
              focus:ring-[#279ECE]
              focus:ring-offset-2
            "
            >
              <span>Get Product Brochure</span>

              <Download className="h-4 w-4" />
            </button>
          </div>

          {/* RIGHT */}

          <div className="border-t border-[#279ECE]/10 bg-white/45 p-5 lg:border-l lg:border-t-0 lg:p-6">
            <p className="text-[14px] leading-8 text-[#5C7696]">
              Click{" "}
              <button
                type="button"
                onClick={() => setIsBrochureOpen(true)}
                className="font-semibold text-[#279ECE] hover:underline hover:underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[#279ECE] focus:ring-offset-2"
              >
                Get Product Brochure
              </button>{" "}
              to receive a detailed brochure for{" "}
              <span className="font-semibold text-[#279ECE]">
                {displayName}
              </span>{" "}
              with technical specifications, material details, dimensions,
              applications, & other product information.
            </p>
          </div>
        </div>
      </section>

      <BrochureModal
        open={isBrochureOpen}
        onOpenChange={setIsBrochureOpen}
        productContext={{
          productId,
          productSlug,
          productName: displayName,
          breadcrumbLabels,
          currentRoute,
        }}
      />
    </>
  );
}
