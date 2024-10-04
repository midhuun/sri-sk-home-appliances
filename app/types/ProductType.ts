export interface Category {
    _id?: string; // IDs will typically be strings on the frontend
    name: string;
    image: string;
    description?: string;
    total?: number;
    earnings?: number;
    subcategories?: SubCategoryType[]; // Array of subcategory IDs as strings
  }
export interface SubCategoryType {
    _id?: string;
    name: string;
    image: string;
    total?: number;
    earnings?: number;
    description: string;
    category: string; // Category ID as a string
    products?: ProductType[]; // Array of product IDs as strings
  }
export interface ProductType {
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
    subcategory: SubCategoryType; // Subcategory ID as a string
    quantity?:number
  }
  