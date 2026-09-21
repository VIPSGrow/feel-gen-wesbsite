export interface VariantAttribute {
  attribute_name: string;
  value: string;
}

export interface VariantDetails {
  id: number;
  price: number;
  stock: number;
  attributes: VariantAttribute[]; // Kyunki ye array of objects hai
}

export interface CartItem {
  id: string;
  cart_id: string;
  quantity: number;
  price: string | number;
  created_at: string;
  updated_at: string;
  product_id: number;
  variation_id: string | null;
  product_name: string;
  slug: string;
  f_image: string;
  variant_details: VariantDetails | null;
  tax_data: {
    id?: number;
    name?: string;
    percentage?: number;
  } | null;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total_items: number;
  total: string | number;
}
