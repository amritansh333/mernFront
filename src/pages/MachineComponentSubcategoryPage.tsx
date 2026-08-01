import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Search } from "lucide-react";

import MachineSidebar from "@/components/machine-components/MachineSidebar";
import HeroSection from "@/components/machine-components/HeroSection";
import ApplicationsSection from "@/components/machine-components/ApplicationsSection";
import SpecificationsSection from "@/components/machine-components/SpecificationsSection";
import ProductCardsSection from "@/components/machine-components/ProductCardsSection";
import LoadingState from "@/components/machine-components/LoadingState";
import EmptyState from "@/components/machine-components/EmptyState";

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

export default function MachineComponentSubcategoryPage() {
  const location = useLocation();

  const {
    machineData,
    selectedSlug,
    setSelectedSlug,
    loading,
    error,
  } = useMachineComponents();

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
  (product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
).length;

  const [pageLoading, setPageLoading] = useState(true);

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
    return (
      <EmptyState
        title="Unable to load page"
        message={error}
      />
    );
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
                      <SheetTitle>
                        Machine Components Navigation
                      </SheetTitle>
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
            
                      <SheetTitle>
                        Search Products
                      </SheetTitle>
            
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
            
                      <SheetTitle>
                        Machine Components Navigation
                      </SheetTitle>
            
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
            
                      <SheetTitle>
                        Search Products
                      </SheetTitle>
            
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
            
                      <SheetTitle>
                        Machine Components Navigation
                      </SheetTitle>
            
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
            
                      <SheetTitle>
                        Search Products
                      </SheetTitle>
            
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

          <ProductCardsSection
    products={subcategoryData.products}
    
/>

          <SpecificationsSection
            specifications={subcategoryData.specifications}
          />

          <ApplicationsSection
            applications={subcategoryData.applications}
          />

          
        </section>
      </div>
    </main>
  );
}