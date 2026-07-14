import api from "@/lib/api";
import type { MachineComponentsData, MachineComponentsResponse } from "@/types/machineComponent";

let cache: MachineComponentsData | null = null;
let pendingRequest: Promise<MachineComponentsData> | null = null;

function normalizeMachineComponentsResponse(
  response: MachineComponentsData | MachineComponentsResponse,
): MachineComponentsData {
  if ("data" in response && response.data) return response.data;
  return response as MachineComponentsData;
}

export async function getMachineComponents(): Promise<MachineComponentsData> {
  if (cache) return cache;
  if (pendingRequest) return pendingRequest;

  pendingRequest = api
    .get<MachineComponentsData | MachineComponentsResponse>("/machine-components")
    .then((response) => {
      cache = normalizeMachineComponentsResponse(response.data ?? {});
      return cache;
    })
    .finally(() => {
      pendingRequest = null;
    });

  return pendingRequest;
}
