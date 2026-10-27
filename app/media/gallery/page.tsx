import MediaGrid from "@/componants/media/MediaGrid";
import { getMedia, MEDIA_PAGE_SIZE } from "@/lib/mediaApi";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery | Feel Safe",
  description: "Photo gallery of Feel Safe events, products and community.",
  alternates: { canonical: "https://feelsafeco.in/media/gallery" },
};

export default async function GalleryPage() {
  const { data, total, limit } = await getMedia("images", 1, MEDIA_PAGE_SIZE);

  return (
    <section className="py-5">
      <div className="container-fluid">
        <div className="section-header text-center mb-5">
          <h1 className="section-title">Gallery</h1>
          <p className="lead text-muted">Moments from Feel Safe</p>
        </div>
        <MediaGrid kind="images" initialItems={data} total={total} limit={limit} />
      </div>
    </section>
  );
}
