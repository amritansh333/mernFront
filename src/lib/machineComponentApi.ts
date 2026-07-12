import api from "@/lib/api";
import type { MachineComponentsData } from "@/types/machineComponent";

let cache: MachineComponentsData | null = null;
let pendingRequest: Promise<MachineComponentsData> | null = null;

export async function getMachineComponents(): Promise<MachineComponentsData> {
  if (cache) return cache;
  if (pendingRequest) return pendingRequest;

  pendingRequest = api
    .get<MachineComponentsData>("/machine-components")
    .then((response) => {
      cache = response.data ?? {};
      return cache;
    })
    .finally(() => {
      pendingRequest = null;
    });

  return pendingRequest;
}
