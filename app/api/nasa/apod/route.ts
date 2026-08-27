import { NextRequest, NextResponse } from "next/server";

const NASA_APOD_URL = "https://api.nasa.gov/planetary/apod";

// Query params this route forwards to the NASA APOD endpoint.
const FORWARDED_PARAMS = [
  "date",
  "start_date",
  "end_date",
  "count",
  "thumbs",
] as const;

export async function GET(request: NextRequest) {
  const apiKey = process.env.NASA_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "NASA_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  const incomingParams = request.nextUrl.searchParams;
  const nasaUrl = new URL(NASA_APOD_URL);
  nasaUrl.searchParams.set("api_key", apiKey);

  for (const param of FORWARDED_PARAMS) {
    const value = incomingParams.get(param);
    if (value !== null) {
      nasaUrl.searchParams.set(param, value);
    }
  }

  try {
    const response = await fetch(nasaUrl.toString());
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.msg || data?.error?.message || "Failed to fetch APOD data." },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the NASA APOD API." },
      { status: 502 }
    );
  }
}
