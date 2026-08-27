import { NextRequest } from "next/server";
import { NASA_API_BASE, requireNasaApiKey } from "@/lib/nasa";

const VALID_COLORS = ["natural", "enhanced"];
// folder name in the NASA archive path -> file extension served from it
const VALID_FORMATS: Record<string, string> = {
  png: "png",
  jpg: "jpg",
  thumbs: "jpg",
};
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const IMAGE_NAME_RE = /^[A-Za-z0-9_.-]+$/;

export async function GET(request: NextRequest) {
  const { apiKey, errorResponse } = requireNasaApiKey();
  if (errorResponse) return errorResponse;

  const params = request.nextUrl.searchParams;
  const color = params.get("color");
  const date = params.get("date");
  const image = params.get("image");
  const format = params.get("format") ?? "thumbs";

  if (!color || !VALID_COLORS.includes(color)) {
    return Response.json({ error: "Invalid EPIC color." }, { status: 400 });
  }
  if (!date || !DATE_RE.test(date)) {
    return Response.json(
      { error: "A valid date (YYYY-MM-DD) is required." },
      { status: 400 }
    );
  }
  if (!image || !IMAGE_NAME_RE.test(image)) {
    return Response.json({ error: "Invalid image name." }, { status: 400 });
  }
  const ext = VALID_FORMATS[format];
  if (!ext) {
    return Response.json({ error: "Invalid image format." }, { status: 400 });
  }

  const [year, month, day] = date.split("-");
  const nasaUrl = new URL(
    `${NASA_API_BASE}/EPIC/archive/${color}/${year}/${month}/${day}/${format}/${image}.${ext}`
  );
  nasaUrl.searchParams.set("api_key", apiKey);

  let upstream: Response;
  try {
    upstream = await fetch(nasaUrl.toString());
  } catch {
    return Response.json(
      { error: "Unable to reach the NASA EPIC image archive." },
      { status: 502 }
    );
  }

  if (!upstream.ok || !upstream.body) {
    return Response.json(
      { error: "Failed to fetch the EPIC image." },
      { status: upstream.status || 502 }
    );
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ??
        (ext === "png" ? "image/png" : "image/jpeg"),
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
