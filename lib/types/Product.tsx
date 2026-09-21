interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_desc: string;
  price: number;
  base_price: number;
  discounted_price: number;
  rating: number;
  f_image: string;
  g_images: string[];
  specs: Record<string, string>;
  category: Category;
  qty: number;
  hsn_code: string;
  weight: string;
  dimension_length: string;
  dimension_width: string;
  dimension_height: string;
  dimension_unit: string;
  tax_data: {
    name: string;
    percentage: number;
  } | null;
  admin_stock: number;
  distributor_stock: number;
}
interface Category {
  id: number;
  name: string;
  slug: string;
}
interface ProductAttributes {
  id: number;
  name: string;
  values: [{ id: number; value: string }];
}

interface ProVariant {
  id: number;
  bv_point: number;
  price: number;
  sku: string;
  stock: number;
  attr_combinations: [
    {
      attr_id: number;
      attr_value_id: number;
      value: string;
    },
  ];
}

interface ProductApiResponse {
  product: Product;
  category: Category;
  product_attributes: ProductAttributes[];
  variants: ProVariant[];
  tax_data: {
    name: string;
    percentage: number;
  } | null;
}

export type {
  Product,
  Category,
  ProductApiResponse,
  ProductAttributes,
  ProVariant,
};
