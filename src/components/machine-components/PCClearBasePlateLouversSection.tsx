// ============================================================
// PCCLEAR BASE PLATES & LOUVERS
// Production Program + Standard Profiles
// ============================================================

import { useMemo } from "react";

interface PCClearBasePlateLouversSectionProps {
  productSlug?: string;
}

const basePlateProductionProgram = [
  {
    itemName: "PCCLEAR-VF-BASEPLATE-GLAZE-GIRIB",
    embossed: "21” & 24”",
  },
  {
    itemName: "PCCLEAR-VF-BASEPLATE-GLAZE-ACRIB",
    embossed: "21” & 24”",
  },
  {
    itemName: "PCCLEAR-VF-BASEPLATE-GLAZE-JUP6RIB200",
    embossed: "21” & 24”",
  },
  {
    itemName: "PCCLEAR-VF-BASEPLATE-GLAZE-JUP7RIB200",
    embossed: "21” & 24”",
  },
  {
    itemName: "PCCLEAR-VF-BASEPLATE-GLAZE-TATADURAB6RIB203",
    embossed: "21” & 24”",
  },
  {
    itemName: "PCCLEAR-VF-BASEPLATE-GLAZE-VAN5RIB250",
    embossed: "21” & 24”",
  },
  {
    itemName: "PCCLEAR-VF-BASEPLATE-GLAZE-PLAIN",
    embossed: "21” & 24”",
  },
] as const;

const louversProductionProgram = [
  {
    itemName: "LOUVERS-PCCLEAR-VF-GLAZE-JUP6RIB200",
    embossed: "21” & 24”",
  },
  {
    itemName: "LOUVERS-PCCLEAR-VF-GLAZE-TATADURA6RIB203",
    embossed: "21” & 24”",
  },
] as const;

export default function PCClearBasePlateLouversSection({
  productSlug,
}: PCClearBasePlateLouversSectionProps) {
  const profileData = useMemo(() => {
    const slug = productSlug?.toLowerCase();

    if (slug === "pcclear-base-plate") {
      return {
        title: "BASE PLATES",
        image: "/images/pc-clear/pcclear-base-plate-standard-profiles.png",
        alt: "PCClear Base Plates standard profiles",
        productionProgram: basePlateProductionProgram,
      };
    }

    if (slug === "pcclear-louvers") {
      return {
        title: "LOUVERS",
        image: "/images/pc-clear/pcclear-louvers-standard-profiles.png",
        alt: "PCClear Louvers standard profiles",
        productionProgram: louversProductionProgram,
      };
    }

    return null;
  }, [productSlug]);

  if (!profileData) {
    return null;
  }

  return (
    <>
      {/* ========================================================
          PCCLEAR PRODUCTION PROGRAM
          ======================================================== */}
      <section className="border-t border-divider bg-background px-4 py-12 sm:px-6 lg:px-8 xl:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-6">
            <div className="mb-3 inline-flex items-center border border-[#A9D8EB] bg-[#F5FBFE] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#258FC0]">
              PRODUCTION PROGRAM
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[#082B49] sm:text-3xl">
              PCClear Production Program:{" "}
              {profileData.title === "BASE PLATES" ? "Base Plates" : "Louvers"}
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
              Standard PCClear{" "}
              {profileData.title === "BASE PLATES" ? "base plate" : "louver"}{" "}
              profiles available in embossed formats.
            </p>
          </div>

          {/* Production table */}
          <div className="overflow-hidden rounded-lg border border-[#D9E4EA] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#21678E] text-white">
                    <th className="w-[75%] border-r border-white/30 px-5 py-3 text-sm font-semibold">
                      Item Name
                    </th>

                    <th className="w-[25%] px-5 py-3 text-center text-sm font-semibold">
                      Embossed
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {profileData.productionProgram.map((row, index) => (
                    <tr
                      key={row.itemName}
                      className={index % 2 === 0 ? "bg-white" : "bg-[#F7FAFC]"}
                    >
                      <td className="border-r border-t border-[#D9E4EA] px-5 py-2.5 text-sm font-medium text-[#0B3B5D]">
                        {row.itemName}
                      </td>

                      <td className="border-t border-[#D9E4EA] px-5 py-2.5 text-center text-sm text-[#425466]">
                        {row.embossed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-[#D9E4EA] bg-[#F7FAFC] px-4 py-2 text-center text-xs text-muted-foreground sm:hidden">
              Swipe horizontally to view the complete production program
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          STANDARD PROFILES
          ======================================================== */}
      <section className="border-t border-divider bg-white px-4 py-12 sm:px-6 lg:px-8 xl:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-semibold tracking-tight text-[#222] sm:text-2xl">
              Our Standard Profiles
            </h2>

            <h3 className="mt-1 text-xl font-bold text-[#222] sm:text-2xl">
              {profileData.title}
            </h3>
          </div>

          <div className="flex justify-center">
            <div className="w-full overflow-hidden bg-white">
              <img
                src={profileData.image}
                alt={profileData.alt}
                className="mx-auto block h-auto w-full max-w-[1100px] object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
