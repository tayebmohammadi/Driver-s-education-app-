import { NextRequest, NextResponse } from "next/server";

const SACRAMENTO_BIAS = "Sacramento, CA, USA";

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address")?.trim();
  if (!address) {
    return NextResponse.json({ error: "Address required" }, { status: 400 });
  }

  const query = address.toLowerCase().includes("sacramento")
    ? address
    : `${address}, ${SACRAMENTO_BIAS}`;

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", query);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");
    url.searchParams.set("countrycodes", "us");

    const res = await fetch(url.toString(), {
      headers: {
        "User-Agent": "DriverEducationPlatform/1.0 (driving-school-app)",
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Geocoding failed" }, { status: 502 });
    }

    const results = (await res.json()) as {
      lat: string;
      lon: string;
      display_name: string;
    }[];

    if (!results.length) {
      return NextResponse.json({ location: null, formattedAddress: null });
    }

    const hit = results[0];
    return NextResponse.json({
      location: {
        lat: parseFloat(hit.lat),
        lng: parseFloat(hit.lon),
      },
      formattedAddress: hit.display_name,
    });
  } catch {
    return NextResponse.json({ error: "Geocoding unavailable" }, { status: 503 });
  }
}
