export type MachineComponentValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | null
  | undefined;

export interface MachineComponentProduct {
  _id?: string;
  slug?: string;
  name?: string;
  description?: string | string[];
  image?: string;
  pdfUrl?: string;
  keyFeatures?: string[];
  specifications?: Record<string, MachineComponentValue>;
  applications?: string[];
  machineComponentData?: MachineComponentDataDetails;
}

export interface MachineComponentDataDetails {
  summary?: string | string[];
  applications?: string[];
  specifications?: Record<string, MachineComponentValue>;
  downloads?: MachineComponentDownload[];
  order?: number;
  isVisible?: boolean;
}

export interface MachineComponentDownload {
  label?: string;
  title?: string;
  url?: string;
  href?: string;
}

export interface MachineSidebarNode {
  _id?: string;
  id?: string;
  slug?: string;
  name?: string;
  title?: string;
  label?: string;
  type?: string;
  children?: MachineSidebarNode[];
  subCategories?: MachineSidebarNode[];
  brands?: MachineSidebarNode[];
  products?: MachineSidebarNode[];
}

export interface MachineComponentsData {
  experience?: string;
  sidebar?: MachineSidebarNode[];
  defaultProduct?: string;
  products?: Record<string, MachineComponentProduct>;
}

export interface MachineComponentsResponse {
  success?: boolean;
  data?: MachineComponentsData;
}
