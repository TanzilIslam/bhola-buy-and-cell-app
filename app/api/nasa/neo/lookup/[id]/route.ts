import { NASA_API_BASE, fetchNasa, requireNasaApiKey } from "@/lib/nasa";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { apiKey, errorResponse } = requireNasaApiKey();
  if (errorResponse) return errorResponse;

  const asteroidId = params.id;
  if (!asteroidId) {
    return Response.json(
      { error: "asteroid_id is required." },
      { status: 400 }
    );
  }

  const nasaUrl = new URL(
    `${NASA_API_BASE}/neo/rest/v1/neo/${encodeURIComponent(asteroidId)}`
  );
  nasaUrl.searchParams.set("api_key", apiKey);

  return fetchNasa(nasaUrl);
}
