export type MachineComponentValue = string | number | boolean | string[] | number[] | null | undefined;

export interface MachineComponentProduct {
  _id?: string;
  slug?: string;
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string | string[];
  image?: string;
  imageUrl?: string;
  pdfUrl?: string;
  brochureUrl?: string;
  features?: string[];
  keyFeatures?: string[];
  specifications?: Record<string, MachineComponentValue>;
  applications?: string[];
  downloads?: MachineComponentDownload[];
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
  products?: MachineSidebarNode[];
}

export interface MachineComponentsData {
  experience?: string;
  sidebar?: MachineSidebarNode[];
  defaultProduct?: string;
  products?: Record<string, MachineComponentProduct>;
}
