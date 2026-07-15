export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string[];
  keyFeatures: string[];
  applications: string[];
  specifications: Record<string, string | string[]>;
  pdfUrl?: string;
  image?: string;
}