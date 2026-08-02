export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string[];
  image?: string;
  order?: number;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string[];
  image?: string;
  order?: number;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  description?: string[];
  image?: string;
  order?: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string[];
  image?: string;
}
