export interface RelatedProduct {
  id: number;
  name: string;
  slug: string;
  f_image: string;
}

export interface BlogPost {
  id: string;
  category_id: number;
  title: string;
  slug: string;
  content: string;
  featured_image: string;
  status: "published" | "draft";
  created_at: string;
  updated_at: string;
  category_name?: string; // Optional, as API may not provide
  comments: Array<{
    id?: string;
    content?: string;
    author?: string;
    created_at?: string;
  }>;
  relatedProducts: RelatedProduct[];
}

export interface BlogResponse {
  success: boolean;
  data:
    | BlogPost[]
    | BlogPost
    | { post: BlogPost; relatedProducts: RelatedProduct[] };
}
