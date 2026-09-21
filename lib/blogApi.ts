import serverCallFuction from "./constantFunction";
import type { BlogPost } from "./types/Blog";

export const getBlogs = async (): Promise<BlogPost[]> => {
  const response = (await serverCallFuction("GET", "api/blog")) as any;
  if (response.success && Array.isArray(response.data)) {
    return response.data.filter(
      (post: BlogPost) => post.status === "published",
    );
  }
  console.error("Failed to fetch blogs:", response);
  return [];
};

export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  const url = `api/blog/${slug}`;
  const response = (await serverCallFuction("GET", url)) as any;
  console.log("blog details - ", url, response);
  if (response?.success) {
    // Handle single post response structures
    // let post = response.data?.post || response.data;
    // if (post && typeof post === "object" && post.slug === slug) {
    //   return post as BlogPost;
    // }
    return response.data;
  }
  console.error(`Failed to fetch blog ${slug}:`, response);
  return null;
};
