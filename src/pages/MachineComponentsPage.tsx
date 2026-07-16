import { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";
import MachineSidebar from "@/components/machine-components/MachineSidebar";
import ProductRenderer from "@/components/machine-components/ProductRenderer";
import LoadingState from "@/components/machine-components/LoadingState";
import EmptyState from "@/components/machine-components/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import SidebarSearch from "@/components/machine-components/SidebarSearch";
import { useMachineComponents } from "@/hooks/useMachineComponents";

export default function MachineComponentsPage() {

  const {
    machineData,
    selectedSlug,
    selectedProduct,
    setSelectedSlug,
    loading,
    error,
  } = useMachineComponents();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const filteredCount = Object.values(machineData?.products ?? {}).filter(
  (product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
).length;


  useEffect(() => {
    const seo = selectedProduct?.seo ?? machineData?.seo;
    const title = seo?.title || selectedProduct?.name;
    const description = seo?.description;
    const keywords = Array.isArray(seo?.keywords)
      ? seo.keywords.filter(Boolean).join(", ")
      : seo?.keywords;
    const canonical = seo?.canonical;
    const previousTitle = document.title;
    const previousDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const previousDescriptionContent = previousDescription?.content;
    const previousKeywords = document.querySelector<HTMLMetaElement>(
      'meta[name="keywords"]',
    );
    const previousKeywordsContent = previousKeywords?.content;
    const previousCanonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    const previousCanonicalHref = previousCanonical?.href;
    let createdDescription = false;
    let createdKeywords = false;
    let createdCanonical = false;

    if (title) {
      document.title = title;
    }

    if (description) {
      let metaDescription = previousDescription;

      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
        createdDescription = true;
      }

      metaDescription.content = description;
    }

    if (keywords) {
      let metaKeywords = previousKeywords;

      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
        createdKeywords = true;
      }

      metaKeywords.content = keywords;
    }

    if (canonical) {
      let canonicalLink = previousCanonical;

      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        document.head.appendChild(canonicalLink);
        createdCanonical = true;
      }

      canonicalLink.href = canonical;
    }

    return () => {
      document.title = previousTitle;

      if (createdDescription) {
        document
          .querySelector<HTMLMetaElement>('meta[name="description"]')
          ?.remove();
      } else if (
        previousDescription &&
        previousDescriptionContent !== undefined
      ) {
        previousDescription.content = previousDescriptionContent;
      }

      if (createdKeywords) {
        document
          .querySelector<HTMLMetaElement>('meta[name="keywords"]')
          ?.remove();
      } else if (previousKeywords && previousKeywordsContent !== undefined) {
        previousKeywords.content = previousKeywordsContent;
      }

      if (createdCanonical) {
        document
          .querySelector<HTMLLinkElement>('link[rel="canonical"]')
          ?.remove();
      } else if (previousCanonical && previousCanonicalHref !== undefined) {
        previousCanonical.href = previousCanonicalHref;
      }
    };
  }, [machineData?.seo, selectedProduct?.name, selectedProduct?.seo]);

  useEffect(() => {
    if (!selectedSlug) return;

    window.scrollTo({ top: 0, behavior: "smooth" });

    setIsDrawerOpen(false);
    setIsSearchOpen(false);
  }, [selectedSlug]);

  if (loading) return <LoadingState />;
  if (error)
    return (
      <EmptyState title="Unable to load Machine Components" message={error} />
    );

  if (machineData?.experience !== "machine_components") {
    return (
      <EmptyState
        title="Machine Components unavailable"
        message="The requested product experience is not available."
      />
    );
  }

  if (!selectedProduct) {
    return (
      <EmptyState
        title="No Machine Component selected"
        message="Product information is not available for this selection."
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

      <SheetContent side="left" className="w-[88vw] max-w-sm p-0">
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
  h-11
  flex-1
  min-w-0
  justify-center
  border-[#A9D8EB]
  hover:border-[#A9D8EB]
"
        >
          <Menu className="mr-2 h-4 w-4" />
          Explore Our Range
        </Button>

      </SheetTrigger>

      <SheetContent side="left" className="w-[88vw] max-w-sm p-0">

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
  h-11
  flex-1
  min-w-0
  justify-center
  border-[#A9D8EB]
  hover:border-[#A9D8EB]
"
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

  <div className="flex min-[360px]:hidden items-center gap-2">

    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>

      <SheetTrigger asChild>

        <Button
          variant="outline"
          className="
  h-11
  flex-1
  min-w-0
  justify-center
  border-[#A9D8EB]
  hover:border-[#A9D8EB]
"
        >
          <Menu className="mr-2 h-4 w-4" />
          Explore Our Range
        </Button>

      </SheetTrigger>

      <SheetContent side="left" className="w-[88vw] max-w-sm p-0">

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
          className="h-11 w-11 shrink-0 border-[#A9D8EB] hover:border-[#A9D8EB]"
        >
          <Search className="h-5 w-5" />
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

          <div>
            <ProductRenderer product={selectedProduct} />
          </div>
        </section>
      </div>
    </main>
  );
}
