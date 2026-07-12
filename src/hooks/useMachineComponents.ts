import { useEffect, useState } from "react";
import { getMachineComponents } from "@/lib/machineComponentApi";
import type { MachineComponentsData } from "@/types/machineComponent";

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
        setSelectedSlug(data?.defaultProduct || Object.keys(data?.products ?? {})[0] || "");
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
