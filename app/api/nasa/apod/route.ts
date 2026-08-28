import { NextRequest } from "next/server";
import { NASA_API_BASE, fetchNasa, requireNasaApiKey } from "@/lib/nasa";

// Query params this route forwards to the NASA APOD endpoint.
const FORWARDED_PARAMS = [
  "date",
  "start_date",
  "end_date",
  "count",
  "thumbs",
] as const;

export async function GET(request: NextRequest) {
  const { apiKey, errorResponse } = requireNasaApiKey();
  if (errorResponse) return errorResponse;

  const incomingParams = request.nextUrl.searchParams;
  const nasaUrl = new URL(`${NASA_API_BASE}/planetary/apod`);
  nasaUrl.searchParams.set("api_key", apiKey);

  for (const param of FORWARDED_PARAMS) {
    const value = incomingParams.get(param);
    if (value !== null) {
      nasaUrl.searchParams.set(param, value);
    }
  }

  return fetchNasa(nasaUrl);
}
