import { host } from "@/lib/constantFunction";

export async function GET(request: Request) {
  const fileUrl = new URL(request.url).searchParams.get("url");

  if (!fileUrl) {
    return new Response("A file URL is required.", { status: 400 });
  }

  const backendUrl = new URL(host);
  let downloadUrl: URL;

  try {
    downloadUrl = new URL(fileUrl, `${backendUrl.origin}/`);
  } catch {
    return new Response("Invalid file URL.", { status: 400 });
  }

  if (
    downloadUrl.origin !== backendUrl.origin ||
    !downloadUrl.pathname.startsWith("/uploads/") ||
    downloadUrl.username ||
    downloadUrl.password
  ) {
    return new Response("Invalid file URL.", { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(downloadUrl, { redirect: "error" });
  } catch {
    return new Response("Unable to download the requested file.", { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    return new Response("The requested file could not be found.", {
      status: upstream.status === 404 ? 404 : 502,
    });
  }

  const filename = downloadUrl.pathname.split("/").pop()?.replace(/[^a-zA-Z0-9._-]/g, "_") || "download";

  return new Response(upstream.body, {
    headers: {
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": upstream.headers.get("content-type") || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
