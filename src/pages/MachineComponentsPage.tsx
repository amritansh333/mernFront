import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
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
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMachineComponents } from "@/hooks/useMachineComponents";

export default function MachineComponentsPage() {
  const { machineData, selectedSlug, selectedProduct, setSelectedSlug, loading, error } =
    useMachineComponents();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const seo = selectedProduct?.seo ?? machineData?.seo;
    const title = seo?.title || selectedProduct?.name;
    const description = seo?.description;

    if (title) {
      document.title = title;
    }

    if (description) {
      let metaDescription = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]',
      );

      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }

      metaDescription.content = description;
    }
  }, [machineData?.seo, selectedProduct?.name, selectedProduct?.seo]);

  useEffect(() => {
    if (!selectedSlug) return;
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    if (window.innerWidth < 1024) window.scrollTo({ top: 0, behavior: "smooth" });
    setIsDrawerOpen(false);
  }, [selectedSlug]);

  if (loading) return <LoadingState />;
  if (error) return <EmptyState title="Unable to load Machine Components" message={error} />;

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
      <div className="flex min-h-[calc(100vh-4rem)] overflow-x-hidden">
        <div className="hidden w-72 shrink-0 lg:block xl:w-80">
          <div className="sticky top-16 h-[calc(100vh-4rem)]">
            <MachineSidebar
              sidebar={machineData?.sidebar}
              products={machineData?.products}
              selectedSlug={selectedSlug}
              setSelectedSlug={setSelectedSlug}
            />
          </div>
        </div>

        <section className="min-w-0 flex-1">
          <div className="sticky top-16 z-20 flex items-center justify-between border-b border-divider bg-background px-4 py-3 lg:hidden">
            <span className="text-sm font-semibold text-charcoal">Machine Components</span>
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                  Browse
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-sm p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Machine Components Navigation</SheetTitle>
                </SheetHeader>
                <MachineSidebar
                  sidebar={machineData?.sidebar}
                  products={machineData?.products}
                  selectedSlug={selectedSlug}
                  setSelectedSlug={setSelectedSlug}
                />
              </SheetContent>
            </Sheet>
          </div>

          <div ref={contentRef} className="h-auto overflow-y-visible lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
            <ProductRenderer product={selectedProduct} />
          </div>
        </section>
      </div>
    </main>
  );
}
