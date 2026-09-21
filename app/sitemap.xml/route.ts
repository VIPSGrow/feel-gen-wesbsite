import { getBlogs } from "@/lib/blogApi";
import serverCallFuction from "@/lib/constantFunction";

const baseUrl = "https://feelsafeco.in";

const staticPaths: string[] = [
  "/",
  "/about-us",
  "/blog",
  "/products",
  "/contact-us",
  "/privacy-policy",
  "/legal-disclaimer",
  "/terms-conditions",
  "/shipping-policy",
  "/return-refund-policy",
  "/return-buyback-policy",
];

function toUrlXml(path: string) {
  return `  <url><loc>${baseUrl}${path}</loc></url>`;
}

function safeSlug(slug: unknown): slug is string {
  return typeof slug === "string" && slug.trim().length > 0;
}

export async function GET() {
  let productSlugs: string[] = [];
  let blogUrls: string[] = [];

  // Products: GET /api/products/products-slug
  try {
    const response = (await serverCallFuction(
      "GET",
      "api/products/products-slug",
    )) as { success?: boolean; data?: unknown };

    type ProductItem = { slug?: unknown } & Record<string, unknown>;
    type ProductData = ProductItem[] | string[];

    const data = response?.data as ProductData | undefined;

    // Expected: response.success === true and response.data is either:
    // - array of items containing `slug`, OR
    // - array of slug strings.
    if (response?.success && Array.isArray(response?.data)) {
      const maybeSlugs = (response.data as ProductData).map((item: unknown) => {
        if (typeof item === "string") return item;
        return (item as { slug?: unknown }).slug;
      });

      productSlugs = maybeSlugs.filter(safeSlug);
    }
  } catch {
    productSlugs = [];
  }

  // Blogs (published only)
  try {
    const blogs = await getBlogs();
    blogUrls = blogs.map((b) => `/blog/${b.slug}`).filter((p) => p.length > 0);
  } catch {
    blogUrls = [];
  }

  const dynamicProductUrls = productSlugs.map((slug) => `/products/${slug}`);

  const urls = Array.from(
    new Set([...staticPaths, ...dynamicProductUrls, ...blogUrls]),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((path) => toUrlXml(path))
    .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
