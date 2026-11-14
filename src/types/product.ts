export interface ProductMaterial {
  _id: string;
  name: string;
  slug: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string[];
  keyFeatures: string[];
  applications: string[];
  specifications: Record<string, string | string[]>;
  materials?: ProductMaterial[];
  pdfUrl?: string;
  image?: string;
}
