import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { getMachineComponents } from "@/lib/machineComponentApi";
import type { MachineComponentsData } from "@/types/machineComponent";

interface MachineComponentsDataContextValue {
  data: MachineComponentsData | null;
  loading: boolean;
  error: string | null;
}

const MachineComponentsDataContext =
  createContext<MachineComponentsDataContextValue | null>(null);

export function MachineComponentsDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState<MachineComponentsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getMachineComponents()
      .then((machineComponentsData) => {
        if (!isMounted) return;
        setData(machineComponentsData);
        setError(null);
      })
      .catch(() => {
        if (!isMounted) return;
        setData(null);
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

  const value = useMemo(
    () => ({ data, loading, error }),
    [data, loading, error],
  );

  return (
    <MachineComponentsDataContext.Provider value={value}>
      {children}
    </MachineComponentsDataContext.Provider>
  );
}

export function useMachineComponentsData() {
  const context = useContext(MachineComponentsDataContext);

  if (!context) {
    throw new Error(
      "useMachineComponentsData must be used within MachineComponentsDataProvider",
    );
  }

  return context;
}
