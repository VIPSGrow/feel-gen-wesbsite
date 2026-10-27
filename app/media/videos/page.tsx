import MediaGrid from "@/componants/media/MediaGrid";
import { getMedia, MEDIA_PAGE_SIZE } from "@/lib/mediaApi";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Videos | Feel Safe",
  description: "Watch Feel Safe videos on hygiene awareness and our products.",
  alternates: { canonical: "https://feelsafeco.in/media/videos" },
};

export default async function VideosPage() {
  const { data, total, limit } = await getMedia("videos", 1, MEDIA_PAGE_SIZE);

  return (
    <section className="py-5">
      <div className="container-fluid">
        <div className="section-header text-center mb-5">
          <h1 className="section-title">Videos</h1>
          <p className="lead text-muted">Watch and learn with Feel Safe</p>
        </div>
        <MediaGrid kind="videos" initialItems={data} total={total} limit={limit} />
      </div>
    </section>
  );
}
