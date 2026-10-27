import serverCallFuction from "./constantFunction";

export type MediaKind = "images" | "videos";

export interface MediaItem {
  id: string | number;
  title?: string | null;
  description?: string | null;
  file_url: string;
  created_at?: string;
}

export interface MediaPage {
  total: number;
  page: number;
  limit: number;
  data: MediaItem[];
}

export const MEDIA_PAGE_SIZE = 12;

export const getMedia = async (
  kind: MediaKind,
  page = 1,
  limit = MEDIA_PAGE_SIZE,
): Promise<MediaPage> => {
  const response = await serverCallFuction(
    "GET",
    `api/media/${kind}?page=${page}&limit=${limit}`,
  );

  const body = response as Record<string, unknown>;
  console.log("media - image - ", response)
  if (Array.isArray(body.data)) {
    return {
      total: Number(body.total) || body.data.length,
      page: Number(body.page) || page,
      limit: Number(body.limit) || limit,
      data: body.data as MediaItem[],
    };
  }

  console.error(`Failed to fetch ${kind}:`, response);
  return { total: 0, page, limit, data: [] };
};
