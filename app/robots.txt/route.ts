export async function GET() {
  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "Sitemap: https://feelsafeco.in/sitemap.xml",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
}
