import serverCallFuction from "./constantFunction";
import type { BlogDetail, BlogPost } from "./types/Blog";

export const getBlogs = async (): Promise<BlogPost[]> => {
  const response = await serverCallFuction("GET", "api/blog");
  if (
    "success" in response &&
    response.success &&
    Array.isArray(response.data)
  ) {
    return response.data.filter(
      (post): post is BlogPost =>
        typeof post === "object" &&
        post !== null &&
        "status" in post &&
        post.status === "published",
    );
  }
  console.error("Failed to fetch blogs:", response);
  return [];
};

export const getBlogHref = (blog: BlogPost): string =>
  `/blog/${encodeURIComponent(blog.slug || blog.id)}`;

const toBlogDetail = (data: unknown): BlogDetail | null => {
  if (!data || typeof data !== "object") {
    return null;
  }

  const payload = data as Partial<BlogDetail> & Partial<BlogPost>;
  const post =
    payload.post && typeof payload.post === "object" ? payload.post : payload;

  if (!("id" in post) || !("title" in post)) {
    return null;
  }

  return {
    post: post as BlogPost,
    comments: payload.comments ?? post.comments ?? [],
    relatedProducts: payload.relatedProducts ?? post.relatedProducts ?? [],
  };
};

export const getBlogBySlug = async (
  slug: string,
): Promise<BlogDetail | null> => {
  const url = `api/blog/${encodeURIComponent(slug)}`;
  const response = await serverCallFuction("GET", url);

  if ("success" in response && response.success) {
    const detail = toBlogDetail(response.data);
    if (detail) {
      return detail;
    }
  }

  const blogs = await getBlogs();
  const blog = blogs.find((post) => post.slug === slug || post.id === slug);
  if (blog) {
    return toBlogDetail(blog);
  }

  console.error(`Failed to fetch blog ${slug}:`, response);
  return null;
};
