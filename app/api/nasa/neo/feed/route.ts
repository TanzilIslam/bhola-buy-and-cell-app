import { NextRequest } from "next/server";
import { NASA_API_BASE, fetchNasa, requireNasaApiKey } from "@/lib/nasa";

export async function GET(request: NextRequest) {
  const { apiKey, errorResponse } = requireNasaApiKey();
  if (errorResponse) return errorResponse;

  const incomingParams = request.nextUrl.searchParams;
  const startDate = incomingParams.get("start_date");

  if (!startDate) {
    return Response.json(
      { error: "start_date is required." },
      { status: 400 }
    );
  }

  const nasaUrl = new URL(`${NASA_API_BASE}/neo/rest/v1/feed`);
  nasaUrl.searchParams.set("api_key", apiKey);
  nasaUrl.searchParams.set("start_date", startDate);

  const endDate = incomingParams.get("end_date");
  if (endDate) {
    nasaUrl.searchParams.set("end_date", endDate);
  }

  return fetchNasa(nasaUrl);
}
