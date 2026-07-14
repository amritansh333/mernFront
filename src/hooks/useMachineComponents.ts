import { useEffect, useState } from "react";
import { getMachineComponents } from "@/lib/machineComponentApi";
import type { MachineComponentsData } from "@/types/machineComponent";

function getDefaultSlug(data: MachineComponentsData) {
  const products = data?.products ?? {};
  if (data?.defaultProduct && products[data.defaultProduct]) return data.defaultProduct;
  return Object.keys(products)[0] || "";
}

export function useMachineComponents() {
  const [machineData, setMachineData] = useState<MachineComponentsData | null>(null);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getMachineComponents()
      .then((data) => {
        if (!isMounted) return;

        setMachineData(data);
        setSelectedSlug(getDefaultSlug(data));
        setError(null);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Failed to load Machine Components.");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedProduct = selectedSlug ? machineData?.products?.[selectedSlug] : undefined;

  return {
    machineData,
    selectedSlug,
    selectedProduct,
    setSelectedSlug,
    loading,
    error,
  };
}
