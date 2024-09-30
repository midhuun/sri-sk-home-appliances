export interface Category {
    _id?: string; // IDs will typically be strings on the frontend
    name: string;
    image: string;
    description?: string;
    total?: number;
    earnings?: number;
    subcategories?: SubCategory[]; // Array of subcategory IDs as strings
  }
export interface SubCategory {
    _id?: string;
    name: string;
    image: string;
    total?: number;
    earnings?: number;
    description: string;
    category: string; // Category ID as a string
    products?: Product[]; // Array of product IDs as strings
  }
export interface Product {
    _id?: string;
    name: string;
    image: string;
    earnings?: number;
    description: string;
    price: number;
    instock: boolean;
    originalPrice?: number; // Optional if it's not always present
    colors?: string[];
    stock: number;
    subcategory: SubCategory; // Subcategory ID as a string
  }
  