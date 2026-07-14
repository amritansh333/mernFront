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
  id?: string;
  slug?: string;
  name?: string;
  title?: string;
  label?: string;
  description?: string | string[];
  image?: string;
  imageUrl?: string;
  path?: string;
  href?: string;
  url?: string;
  paths?: string[] | Record<string, string>;
  pdfUrl?: string;
  downloads?: MachineComponentDownload[];
  keyFeatures?: string[];
  features?: string[];
  specifications?: Record<string, MachineComponentValue>;
  applications?: string[];
  machineComponentData?: MachineComponentDataDetails;
  seo?: MachineComponentSeo;
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
  path?: string;
  href?: string;
  url?: string;
  children?: MachineSidebarNode[];
  subCategories?: MachineSidebarNode[];
  brands?: MachineSidebarNode[];
  products?: MachineSidebarNode[];
}

export interface MachineComponentsData {
  experience?: string;
  sidebar?: MachineSidebarNode[];
  navigation?: MachineSidebarNode[];
  defaultProduct?: string;
  products?: Record<string, MachineComponentProduct>;
  paths?: Record<string, string>;
  downloads?: MachineComponentDownload[];
  seo?: MachineComponentSeo;
}

export interface MachineComponentsResponse {
  success?: boolean;
  data?: MachineComponentsData;
}

export interface MachineComponentSeo {
  title?: string;
  description?: string;
  keywords?: string | string[];
  canonical?: string;
}
