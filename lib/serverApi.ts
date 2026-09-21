import { cookies } from "next/headers";
import { host } from "./constantFunction";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function serverApiFetch(
  endpoint: string,
  method: HttpMethod = "GET",
  body: any = null,
) {
  const cookieStore = await cookies();

  // Extract Auth Data
  const token = cookieStore.get("token")?.value;
  const userData = cookieStore.get("user")?.value;
  const user = userData ? JSON.parse(userData) : null;
  const dId = user?.distributor_info?.id || "";

  // Append distributor_id automatically to GET requests if not present
  let url = `${host}/${endpoint}`;
  if (method === "GET" && dId) {
    const separator = url.includes("?") ? "&" : "?";
    if (!url.includes("distributor_id=")) {
      url += `${separator}distributor_id=${dId}`;
    }
  }

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
    next: { revalidate: 60 }, // Default revalidation
  });

  return res.json();
}
