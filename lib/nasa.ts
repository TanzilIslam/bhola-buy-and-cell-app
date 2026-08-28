import { NextResponse } from "next/server";

export const NASA_API_BASE = "https://api.nasa.gov";

// Reads the server-only NASA API key, or returns a ready-to-send error response.
export function requireNasaApiKey():
  | { apiKey: string; errorResponse: null }
  | { apiKey: null; errorResponse: NextResponse } {
  const apiKey = process.env.NASA_API_KEY;

  if (!apiKey) {
    return {
      apiKey: null,
      errorResponse: NextResponse.json(
        { error: "NASA_API_KEY is not configured on the server." },
        { status: 500 }
      ),
    };
  }

  return { apiKey, errorResponse: null };
}

// Fetches a NASA API URL and normalizes the response/error shape.
export async function fetchNasa(url: URL) {
  try {
    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.error?.message || data?.msg || "NASA API request failed.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the NASA API." },
      { status: 502 }
    );
  }
}
