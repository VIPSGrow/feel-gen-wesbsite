"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { getMedia, type MediaItem, type MediaKind } from "@/lib/mediaApi";

interface Props {
  kind: MediaKind;
  initialItems: MediaItem[];
  total: number;
  limit: number;
}

export default function MediaGrid({ kind, initialItems, total, limit }: Props) {
  const [items, setItems] = useState<MediaItem[]>(initialItems);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<MediaItem | null>(null);
  const isVideo = kind === "videos";
  const hasMore = items.length < total;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const loadMore = async () => {
    setLoading(true);
    const next = await getMedia(kind, page + 1, limit);
    setItems((prev) => {
      const seen = new Set(prev.map((i) => i.id));
      return [...prev, ...next.data.filter((i) => !seen.has(i.id))];
    });
    if (next.data.length > 0) setPage(page + 1);
    setLoading(false);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <h3>No {isVideo ? "videos" : "images"} available</h3>
        <p className="text-muted">Check back soon for updates.</p>
      </div>
    );
  }

  return (
    <>
      <div className="row g-4">
        {items.map((item) => (
          <div key={item.id} className="col-lg-3 col-md-4 col-sm-6">
            <div className="card border-0 shadow-sm h-100 position-relative">
              {isVideo ? (
                <video
                  src={item.file_url}
                  controls
                  preload="metadata"
                  className="card-img-top"
                  style={{ aspectRatio: "16 / 9", objectFit: "cover", background: "#000" }}
                />
              ) : (
                <button
                  type="button"
                  className="p-0 border-0 bg-transparent"
                  onClick={() => setActive(item)}
                  aria-label={`View ${item.title || "image"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.file_url}
                    alt={item.title || "Gallery image"}
                    loading="lazy"
                    className="card-img-top"
                    style={{ aspectRatio: "4 / 3", objectFit: "cover", width: "100%" }}
                  />
                </button>
              )}
              <div className="card-body ">
                {(item.title || item.description) && (
                  <div className="mb-3">
                    {item.title && <h3 className="h6 mb-1">{item.title}</h3>}
                    {item.description && (
                      <p className="text-muted small mb-0">{item.description}</p>
                    )}
                  </div>
                )}
                
              </div>
              <a
                  href={item.file_url}
                  download
                  className="btn btn-primary btn-sm position-absolute top-0 end-0 m-3"
                  aria-label={`Download ${item.title || (isVideo ? "video" : "image")}`}
                >
                  <Download size={16} className="" aria-hidden="true" />
                </a>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-5">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <button
            type="button"
            className="btn btn-light position-absolute top-0 end-0 m-3"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.file_url}
            alt={active.title || "Gallery image"}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        </div>
      )}
    </>
  );
}
