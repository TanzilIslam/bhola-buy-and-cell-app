import { NextRequest } from "next/server";
import { NASA_API_BASE, fetchNasa, requireNasaApiKey } from "@/lib/nasa";

// Maps the URL segment to the real DONKI path + the query params each
// endpoint accepts. Keeping this as a static whitelist (rather than using
// the URL segment directly) means an unknown segment 404s instead of being
// forwarded straight through to api.nasa.gov.
const DONKI_ENDPOINTS: Record<string, { path: string; params: string[] }> = {
  CME: { path: "CME", params: ["startDate", "endDate"] },
  CMEAnalysis: {
    path: "CMEAnalysis",
    params: [
      "startDate",
      "endDate",
      "mostAccurateOnly",
      "completeEntryOnly",
      "speed",
      "halfAngle",
      "catalog",
      "keyword",
    ],
  },
  GST: { path: "GST", params: ["startDate", "endDate"] },
  IPS: {
    path: "IPS",
    params: ["startDate", "endDate", "location", "catalog"],
  },
  FLR: { path: "FLR", params: ["startDate", "endDate"] },
  SEP: { path: "SEP", params: ["startDate", "endDate"] },
  MPC: { path: "MPC", params: ["startDate", "endDate"] },
  RBE: { path: "RBE", params: ["startDate", "endDate"] },
  HSS: { path: "HSS", params: ["startDate", "endDate"] },
  WSAEnlilSimulations: {
    path: "WSAEnlilSimulations",
    params: ["startDate", "endDate"],
  },
  notifications: {
    path: "notifications",
    params: ["startDate", "endDate", "type"],
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { event: string } }
) {
  const endpoint = DONKI_ENDPOINTS[params.event];
  if (!endpoint) {
    return Response.json(
      { error: "Unknown DONKI endpoint." },
      { status: 404 }
    );
  }

  const { apiKey, errorResponse } = requireNasaApiKey();
  if (errorResponse) return errorResponse;

  const incomingParams = request.nextUrl.searchParams;
  const nasaUrl = new URL(`${NASA_API_BASE}/DONKI/${endpoint.path}`);
  nasaUrl.searchParams.set("api_key", apiKey);

  for (const param of endpoint.params) {
    const value = incomingParams.get(param);
    if (value !== null && value !== "") {
      nasaUrl.searchParams.set(param, value);
    }
  }

  return fetchNasa(nasaUrl);
}
