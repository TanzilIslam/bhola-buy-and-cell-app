import { NextRequest } from "next/server";
import { NASA_API_BASE, fetchNasa, requireNasaApiKey } from "@/lib/nasa";

export async function GET(request: NextRequest) {
  const { apiKey, errorResponse } = requireNasaApiKey();
  if (errorResponse) return errorResponse;

  const incomingParams = request.nextUrl.searchParams;
  const nasaUrl = new URL(`${NASA_API_BASE}/neo/rest/v1/neo/browse`);
  nasaUrl.searchParams.set("api_key", apiKey);

  const page = incomingParams.get("page");
  if (page) nasaUrl.searchParams.set("page", page);

  const size = incomingParams.get("size");
  if (size) nasaUrl.searchParams.set("size", size);

  return fetchNasa(nasaUrl);
}
