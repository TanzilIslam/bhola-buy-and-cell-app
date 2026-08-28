import { NextRequest } from "next/server";
import { NASA_API_BASE, fetchNasa, requireNasaApiKey } from "@/lib/nasa";

const VALID_COLORS = ["natural", "enhanced"];
const VALID_MODES = ["recent", "date", "all", "available"];

export async function GET(
  request: NextRequest,
  { params }: { params: { color: string } }
) {
  if (!VALID_COLORS.includes(params.color)) {
    return Response.json({ error: "Invalid EPIC color." }, { status: 400 });
  }

  const { apiKey, errorResponse } = requireNasaApiKey();
  if (errorResponse) return errorResponse;

  const incomingParams = request.nextUrl.searchParams;
  const mode = incomingParams.get("mode") ?? "recent";
  if (!VALID_MODES.includes(mode)) {
    return Response.json({ error: "Invalid EPIC mode." }, { status: 400 });
  }

  let path = `EPIC/api/${params.color}`;

  if (mode === "date") {
    const date = incomingParams.get("date");
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return Response.json(
        { error: "A valid date (YYYY-MM-DD) is required." },
        { status: 400 }
      );
    }
    path += `/date/${date}`;
  } else if (mode === "all" || mode === "available") {
    path += `/${mode}`;
  }

  const nasaUrl = new URL(`${NASA_API_BASE}/${path}`);
  nasaUrl.searchParams.set("api_key", apiKey);

  return fetchNasa(nasaUrl);
}
