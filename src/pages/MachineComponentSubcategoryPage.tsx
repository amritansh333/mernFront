import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Menu, Search } from "lucide-react";

import MachineSidebar from "@/components/machine-components/MachineSidebar";
import HeroSection from "@/components/machine-components/HeroSection";
import ApplicationsSection from "@/components/machine-components/ApplicationsSection";
import SpecificationsSection from "@/components/machine-components/SpecificationsSection";
import ProductCardsSection from "@/components/machine-components/ProductCardsSection";
import LoadingState from "@/components/machine-components/LoadingState";
import EmptyState from "@/components/machine-components/EmptyState";
import { BrochureModal } from "@/components/brochure";
import { buildMachineComponentBreadcrumbs } from "@/lib/machineComponentBreadcrumbs";
import type { BrochureProductContext } from "@/components/brochure/types";
import CuttingBoardApplicationsSection from "@/components/machine-components/CuttingBoardApplicationsSection";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import SidebarSearch from "@/components/machine-components/SidebarSearch";

import { useMachineComponents } from "@/hooks/useMachineComponents";
import { getMachineComponentSubcategory } from "@/lib/machineComponentApi";

import type {
  MachineComponentDownload,
  MachineComponentValue,
} from "@/types/machineComponent";

interface SubcategoryProduct {
  name: string;
  slug: string;
  path: string;
  image: string;
  description: string[];
  keyFeatures: string[];
}

interface SubcategoryPageData {
  name: string;
  slug: string;
  path: string;
  image: string;

  heroTitle: string;
  heroSubtitle: string;

  description: string[];

  applications: string[];

  technicalCharacteristics: string[];

  specifications: Record<string, MachineComponentValue>;

  downloads: MachineComponentDownload[];

  products: SubcategoryProduct[];
}

// ============================================================
// RIPLA CUTTING BOARD - SOURCE TABLE DATA
// ============================================================

const materialUsesTable = [
  {
    material: "Ripla Kaylon",
    uses:
      "Very High hardness boards for On-bridge and roller type cutting installation. Universal, especially on roller-cutting presses.",
    cuttingMaterial: "Textile synthetics and other soft materials",
  },
  {
    material: "Ripla Cutrite",
    uses:
      "Cutting board for manual cuts, e.g. in Pattern Departments.",
    cuttingMaterial: "—",
  },
  {
    material: "Ripla HIH",
    uses:
      "Most Versatile Board of high strength, high hardness and low impact for multiple applications.",
    cuttingMaterial:
      "Leather, leather fibre material, paper cardboard articles (round with inner bore for envelopes), shoe uppers and specially suitable for safety footwear and hand cutting. Also suitable for Textile and Components Industries.",
  },
  {
    material: "Ripla HIK",
    uses:
      "Multi-purpose high quality Boards with high impact strength, low bending and warpage.",
    cuttingMaterial:
      "Leather, soft materials, shoe industry. Its application is most for bag cutting and fashion Shoe Upper.",
  },
  {
    material: "Ripla Hitech",
    uses:
      "Higher life, high quality, high impact strength, high hardness board. Perfect substitute for any imported board.",
    cuttingMaterial:
      "Cutting boards for swing arm cutting machines. Leather, insole materials for high pressure application and specially used for Gloves Cutting Machine.",
  },
  {
    material: "Ripla KET",
    uses:
      "Cutting board for universal use; also as one-way cutting board of 3–12 mm thickness.",
    cuttingMaterial:
      "Textiles, felts, fleeces, foam plastic, leather, insole materials, rubber, foils and other soft materials.",
  },
] as const;

const technicalSpecificationsTable = {
  headers: [
    "Cutting Boards",
    "Test Method",
    "Unit",
    "Ripla Cutrite",
    "Ripla HIK",
    "Ripla Hitech",
    "Ripla HIH",
    "Ripla KET",
    "Ripla Kaylon",
  ],
  rows: [
    {
      parameter: "Shore Hardness D 3 sec.",
      testMethod: "ISO 868",
      unit: "",
      values: ["63", "70", "74", "75", "70", "82"],
    },
    {
      parameter: "Notched Impact Strength 23°C",
      testMethod: "ISO 179",
      unit: "ml/mm²",
      values: [">50", "15", "6", "9", "9", "6"],
    },
    {
      parameter: "Modulus of elasticity in flexion",
      testMethod: "ISO 527-1",
      unit: "N/mm²",
      values: ["900", "950", "1100", "1300", "1300", "3500"],
    },
    {
      parameter: "Elongation at break",
      testMethod: "ISO 527-1",
      unit: "%",
      values: [">100", ">100", ">50", ">100", ">100", ">50"],
    },
    {
      parameter: "Use",
      testMethod: "",
      unit: "",
      values: [
        "For manual cuts, e.g. in Pattern Departments",
        "Boards with High impact strength, low bending and warpage",
        "High Durability, high impact strength, high hardness board",
        "High strength, High hardness Boards with low impact for multiple applications.",
        "Versatile Boards - also as one-way cutting board of 3–12 mm thickness",
        "Very High hardness boards for On-bridge and roller type cutting presses",
      ],
    },
    {
      parameter: "Industry",
      testMethod: "",
      unit: "",
      values: [
        "—",
        "Leather",
        "Leather",
        "Leather, Cardboard, Paper, Textile",
        "Textile, Leather, Rubber, Foam, Plastic",
        "Textile",
      ],
    },
  ],
} as const;

// ============================================================
// MATERIAL / USES TABLE
// ============================================================

function MaterialUsesTable() {
  return (
    <section className="border-t border-divider bg-background px-4 py-12 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6">
          <div className="mb-3 inline-flex items-center border border-[#A9D8EB] bg-[#F5FBFE] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#258FC0]">
            MATERIAL &amp; APPLICATIONS
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-[#082B49] sm:text-3xl">
            Material &amp; Uses
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            Ripla cutting board grades are available for different cutting
            applications, materials and machine requirements.
          </p>
        </div>

        {/* Horizontal scrolling is intentional on small screens so the
            complete table remains readable without shrinking the text. */}
        <div className="overflow-hidden rounded-lg border border-[#D9E4EA] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="bg-[#21678E] text-white">
                  <th className="w-[19%] border-r border-white/20 px-5 py-4 text-sm font-semibold">
                    Material
                  </th>
                  <th className="w-[38%] border-r border-white/20 px-5 py-4 text-sm font-semibold">
                    Uses
                  </th>
                  <th className="w-[43%] px-5 py-4 text-sm font-semibold">
                    Cutting Material
                  </th>
                </tr>
              </thead>

              <tbody>
                {materialUsesTable.map((row, index) => (
                  <tr
                    key={row.material}
                    className={
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-[#F7FAFC]"
                    }
                  >
                    <td className="border-r border-t border-[#D9E4EA] px-5 py-5 align-top text-sm font-semibold text-[#0B3B5D]">
                      {row.material}
                    </td>

                    <td className="border-r border-t border-[#D9E4EA] px-5 py-5 align-top text-sm leading-6 text-[#425466]">
                      {row.uses}
                    </td>

                    <td className="border-t border-[#D9E4EA] px-5 py-5 align-top text-sm leading-6 text-[#425466]">
                      {row.cuttingMaterial}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile hint */}
          <div className="border-t border-[#D9E4EA] bg-[#F7FAFC] px-4 py-2 text-center text-xs text-muted-foreground sm:hidden">
            Swipe horizontally to view the complete table
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// TECHNICAL SPECIFICATIONS TABLE
// ============================================================

function TechnicalSpecificationsTable() {
  const { headers, rows } = technicalSpecificationsTable;

  return (
    <section className="border-t border-divider bg-[#F7FAFC] px-4 py-12 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6">
          <div className="mb-3 inline-flex items-center border border-[#A9D8EB] bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#258FC0]">
            TECHNICAL SPECIFICATIONS
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-[#082B49] sm:text-3xl">
            Technical Specifications
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            Technical data for the different Ripla cutting board grades.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#D9E4EA] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] border-collapse text-left">
              <thead>
                <tr className="bg-[#21678E] text-white">
                  {headers.map((header, index) => (
                    <th
                      key={header}
                      className={[
                        "px-4 py-4 text-sm font-semibold",
                        index !== headers.length - 1
                          ? "border-r border-white/20"
                          : "",
                        index === 0 ? "sticky left-0 z-10 bg-[#21678E]" : "",
                      ].join(" ")}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={row.parameter}
                    className={
                      rowIndex % 2 === 0
                        ? "bg-white"
                        : "bg-[#F7FAFC]"
                    }
                  >
                    {/* Sticky first column makes the table easier to use
                        on mobile while horizontally scrolling. */}
                    <td
                      className={[
                        "sticky left-0 z-[1] min-w-[210px] border-r border-t border-[#D9E4EA] px-4 py-4 align-top text-sm font-semibold text-[#0B3B5D]",
                        rowIndex % 2 === 0
                          ? "bg-white"
                          : "bg-[#F7FAFC]",
                      ].join(" ")}
                    >
                      {row.parameter}
                    </td>

                    <td className="min-w-[120px] border-r border-t border-[#D9E4EA] px-4 py-4 align-top text-sm text-[#425466]">
                      {row.testMethod || "—"}
                    </td>

                    <td className="min-w-[100px] border-r border-t border-[#D9E4EA] px-4 py-4 align-top text-sm text-[#425466]">
                      {row.unit || "—"}
                    </td>

                    {row.values.map((value, valueIndex) => (
                      <td
                        key={`${row.parameter}-${headers[valueIndex + 3]}`}
                        className={[
                          "min-w-[145px] border-t border-[#D9E4EA] px-4 py-4 align-top text-sm leading-6 text-[#425466]",
                          valueIndex < row.values.length - 1
                            ? "border-r"
                            : "",
                        ].join(" ")}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile hint */}
          <div className="border-t border-[#D9E4EA] bg-[#F7FAFC] px-4 py-2 text-center text-xs text-muted-foreground sm:hidden">
            Swipe horizontally to view all Ripla grades
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          The data is provided purely for information and shall not be regarded
          as binding unless expressly agreed in a contract of sale.
        </p>
      </div>
    </section>
  );
}

// ============================================================
// RIPLA CUTTING BOARD - APPLICATIONS & DIRECTIONS
// ============================================================

const riplaMachineApplications = [
  "Swing-arm cutting machines",
  "Bridge cutting machines",
  "Travelling head cutting machines",
  "Roller and bridge type cutting installations",
] as const;

const riplaSoftMaterials = [
  "Leather, leather fibre material",
  "Insole material, rubber",
  "Gaskets",
  "Textiles, felt, fleece",
  "Foam plastics, upholstery material",
  "Paper, cardboard, carton",
  "Foils",
  "Thermoplastic materials",
] as const;


export default function MachineComponentSubcategoryPage() {
  const location = useLocation();

  const { machineData, selectedSlug, setSelectedSlug, loading, error } =
    useMachineComponents();
  const navigate = useNavigate();

  const subcategory = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);

    // /products/category/subcategory
    return segments[2] ?? "";
  }, [location.pathname]);

  const [subcategoryData, setSubcategoryData] =
    useState<SubcategoryPageData | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCount = Object.values(machineData?.products ?? {}).filter(
    (product) => product.name.toLowerCase().includes(search.toLowerCase()),
  ).length;

  const [pageLoading, setPageLoading] = useState(true);

  // Brochure modal state for brochure-based product cards on brochure subcategories
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [brochureProductContext, setBrochureProductContext] = useState<
    BrochureProductContext
  >({ currentRoute: `${location.pathname}${location.search}${location.hash}` });

  useEffect(() => {
    if (!subcategory) return;

    setPageLoading(true);

    getMachineComponentSubcategory(subcategory)
      .then((data) => {
        setSubcategoryData(data);
      })
      .catch((err) => {
        console.error("Failed to load subcategory", err);
        setSubcategoryData(null);
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, [subcategory]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsDrawerOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  if (loading || pageLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <EmptyState title="Unable to load page" message={error} />;
  }

  if (!subcategoryData) {
    return (
      <EmptyState
        title="Subcategory not found"
        message="No information available."
      />
    );
  }

  return (
    <main className="pt-16 bg-background">
      <div className="flex min-h-[calc(100vh-4rem)]">
        <div className="hidden w-72 shrink-0 lg:block xl:w-80">
          <div className="sticky top-16 h-[calc(100vh-4rem)]">
            <MachineSidebar
              sidebar={machineData?.sidebar}
              products={machineData?.products}
              selectedSlug={selectedSlug}
              setSelectedSlug={setSelectedSlug}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </div>

        <section className="min-w-0 flex-1">
          <div className="sticky top-16 z-20 border-b border-divider bg-background px-4 py-3 lg:hidden">
            {/* ================= TABLET ================= */}
            <div className="hidden sm:flex items-center justify-between">
              {/* Explore */}

              <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-11 px-5 whitespace-nowrap border-[#A9D8EB] hover:border-[#A9D8EB]"
                  >
                    <Menu className="mr-2 h-4 w-4" />
                    Explore Our Range
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="w-[88vw] max-w-sm p-0"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>Machine Components Navigation</SheetTitle>
                  </SheetHeader>

                  <MachineSidebar
                    sidebar={machineData?.sidebar}
                    products={machineData?.products}
                    selectedSlug={selectedSlug}
                    setSelectedSlug={setSelectedSlug}
                    search={search}
                    setSearch={setSearch}
                  />
                </SheetContent>
              </Sheet>

              {/* Search */}

              <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-11 px-5 whitespace-nowrap border-[#A9D8EB] hover:border-[#A9D8EB]"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search Products
                  </Button>
                </SheetTrigger>

                <SheetContent side="top">
                  <SheetHeader className="mb-4">
                    <SheetTitle>Search Products</SheetTitle>
                  </SheetHeader>

                  <SidebarSearch
                    value={search}
                    onChange={setSearch}
                    totalProducts={filteredCount}
                    onSearch={() => {
                      setIsSearchOpen(false);
                      setIsDrawerOpen(true);
                    }}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* ================= MOBILE L + MOBILE M ================= */}

            <div className="hidden min-[360px]:flex sm:hidden items-center gap-2">
              {/* Explore */}

              <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="
  h-8
  flex-1
  min-w-0
  justify-center
  border-[#A9D8EB]
  px-2
  text-[13px]
  hover:border-[#A9D8EB]
"
                  >
                    <Menu className="mr-1 h-3 w-3" />
                    Explore Our Range
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="w-[88vw] max-w-sm p-0"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>Machine Components Navigation</SheetTitle>
                  </SheetHeader>

                  <MachineSidebar
                    sidebar={machineData?.sidebar}
                    products={machineData?.products}
                    selectedSlug={selectedSlug}
                    setSelectedSlug={setSelectedSlug}
                    search={search}
                    setSearch={setSearch}
                  />
                </SheetContent>
              </Sheet>
              {/* Search */}

              <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="
  h-8
  flex-1
  min-w-0
  justify-center
  border-[#A9D8EB]
  px-2
  text-[13px]
  hover:border-[#A9D8EB]
"
                  >
                    <Search className="mr-1 h-3 w-3" />
                    Search Products
                  </Button>
                </SheetTrigger>

                <SheetContent side="top">
                  <SheetHeader className="mb-4">
                    <SheetTitle>Search Products</SheetTitle>

                    <SheetDescription>
                      Search thermoplastics machine components.
                    </SheetDescription>
                  </SheetHeader>

                  <SidebarSearch
                    value={search}
                    onChange={setSearch}
                    totalProducts={filteredCount}
                    onSearch={() => {
                      setIsSearchOpen(false);
                      setIsDrawerOpen(true);
                    }}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* ================= MOBILE S (keep existing behaviour) ================= */}

            <div className="flex min-[360px]:hidden items-center gap-1">
              <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="
              h-8
              flex-1
              min-w-0
              justify-center
              border-[#A9D8EB]
              hover:border-[#A9D8EB]
            "
                  >
                    <Menu className="mr-1 h-3 w-3" />
                    Explore Our Range
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="w-[88vw] max-w-sm p-0"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>Machine Components Navigation</SheetTitle>
                  </SheetHeader>

                  <MachineSidebar
                    sidebar={machineData?.sidebar}
                    products={machineData?.products}
                    selectedSlug={selectedSlug}
                    setSelectedSlug={setSelectedSlug}
                    search={search}
                    setSearch={setSearch}
                  />
                </SheetContent>
              </Sheet>

              <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="
  h-8
  flex-1
  min-w-0
  justify-center
  border-[#A9D8EB]
  px-2
  text-[13px]
  hover:border-[#A9D8EB]
"
                  >
                    <Search className="h-1 w-1" />
                    Search
                  </Button>
                </SheetTrigger>

                <SheetContent side="top">
                  <SheetHeader className="mb-4">
                    <SheetTitle>Search Products</SheetTitle>

                    <SheetDescription>
                      Search thermoplastics machine components.
                    </SheetDescription>
                  </SheetHeader>

                  <SidebarSearch
                    value={search}
                    onChange={setSearch}
                    totalProducts={filteredCount}
                    onSearch={() => {
                      setIsSearchOpen(false);
                      setIsDrawerOpen(true);
                    }}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <HeroSection
            title={subcategoryData.heroTitle || subcategoryData.name}
            description={subcategoryData.description}
            image={subcategoryData.image}
            features={subcategoryData.technicalCharacteristics}
            downloads={subcategoryData.downloads}
            showActionButtons
          />
          <SpecificationsSection
  specifications={subcategoryData.specifications}
/>

{/* ============================================================
    RIPLA CUTTING BOARD TABLES
    Only displayed on the Cutting Board subcategory.
    ============================================================ */}
{subcategory === "cutting-board" && (
  <>
    <MaterialUsesTable />
    <TechnicalSpecificationsTable />
    <CuttingBoardApplicationsSection />
  </>
)}

<ApplicationsSection applications={subcategoryData.applications} />

          {/* Brochure modal used for Ripla cards on Cutting Board subcategory */}
          <BrochureModal
            open={isBrochureOpen}
            onOpenChange={setIsBrochureOpen}
            productContext={brochureProductContext}
          />

          {
  // For Cutting Board and Chopping Board, intercept clicks on Ripla products
  // and open the existing BrochureModal.
  subcategory === "cutting-board" ||
  subcategory === "chopping-board" ||
  subcategory === "pop" ? (
    <ProductCardsSection
      products={subcategoryData.products}
      shouldUseCustomClick={(p) => {
        const slug = (p?.slug || "").toLowerCase();
        // Brochure flow for RIPLA (cutting boards) and CUTRITE (chopping boards)
        return slug.includes("ripla") || slug.includes("cutrite");
      }}
      onCardClick={(p) => {
        const productSlug = p.slug || "";

        const breadcrumbs = buildMachineComponentBreadcrumbs(
          machineData,
          productSlug,
          location.pathname,
        )
          .map((b) => b.label)
          .filter((l) => l && l !== "Home");

        const currentRoute =
          `${location.pathname}${location.search}${location.hash}`;

        const canonical = machineData?.products?.[productSlug];

        const canonicalId =
          canonical?._id ||
          (canonical as unknown as { id?: string })?.id ||
          undefined;

        if (typeof p.path === "string") {
          navigate(p.path);
        }

        setBrochureProductContext({
          productId: canonicalId,
          productSlug,
          productName: p.name,
          breadcrumbLabels:
            breadcrumbs.length > 0
              ? breadcrumbs
              : [p.name || ""],
          currentRoute,
        });

        setIsBrochureOpen(true);
      }}
    />
  ) : (
    <ProductCardsSection products={subcategoryData.products} />
  )
}

          
        </section>
      </div>
    </main>
  );
}