import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMachineComponents } from "@/lib/machineComponentApi";
import type { MachineComponentProduct, MachineComponentsData } from "@/types/machineComponent";

function getDefaultSlug(data: MachineComponentsData) {
  const products = data?.products ?? {};
  if (data?.defaultProduct && products[data.defaultProduct]) return data.defaultProduct;
  return Object.keys(products)[0] || "";
}

function normalizePath(path?: string) {
  if (!path) return "";

  try {
    const url = new URL(path, window.location.origin);
    return url.pathname.replace(/\/$/, "") || "/";
  } catch {
    return path.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  }
}

function getProductPaths(
  slug: string,
  product?: MachineComponentProduct,
  paths?: Record<string, string>,
) {
  const productPaths = product?.paths;
  const values: string[] = [
    paths?.[slug],
    product?.path,
    product?.href,
    product?.url,
  ].filter((path): path is string => Boolean(path));

  if (Array.isArray(productPaths)) values.push(...productPaths);

  if (productPaths && !Array.isArray(productPaths)) {
    values.push(...Object.values(productPaths));
  }

  return values.map(normalizePath).filter(Boolean);
}

function getSlugForPath(data: MachineComponentsData, pathname: string) {
  const normalizedPathname = normalizePath(pathname);

  return Object.entries(data.products ?? {}).find(([slug, product]) =>
    getProductPaths(slug, product, data.paths).includes(normalizedPathname),
  )?.[0];
}

export function useMachineComponents() {
  const location = useLocation();
  const navigate = useNavigate();
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
        setSelectedSlug(getSlugForPath(data, location.pathname) || getDefaultSlug(data));
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
  }, [location.pathname]);

  useEffect(() => {
    if (!machineData) return;

    const slugFromPath = getSlugForPath(machineData, location.pathname);
    if (slugFromPath && slugFromPath !== selectedSlug) {
      setSelectedSlug(slugFromPath);
    }
  }, [location.pathname, machineData, selectedSlug]);

  const selectProduct = useCallback(
    (slug: string) => {
      if (!slug) return;

      const productPath = getProductPaths(slug, machineData?.products?.[slug], machineData?.paths)[0];

      setSelectedSlug(slug);
      if (productPath && productPath !== normalizePath(location.pathname)) {
        navigate(productPath);
      }
    },
    [location.pathname, machineData?.paths, machineData?.products, navigate],
  );

  const selectedProduct = useMemo(
    () => (selectedSlug ? machineData?.products?.[selectedSlug] : undefined),
    [machineData?.products, selectedSlug],
  );

  return {
    machineData,
    selectedSlug,
    selectedProduct,
    setSelectedSlug: selectProduct,
    loading,
    error,
  };
}
