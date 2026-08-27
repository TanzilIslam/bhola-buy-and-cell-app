"use client";

import { useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, ExternalLink, Loader2, Search } from "lucide-react";
import type { NeoObject } from "./types";

const numberFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

// Example SPK-IDs from the NASA API docs, offered as a quick starting point.
const EXAMPLE_IDS = ["3542519", "2465633", "3729062"];

export function NeoLookup() {
  const [asteroidId, setAsteroidId] = useState("");
  const [data, setData] = useState<NeoObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runLookup = async (id: string) => {
    if (!id.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/nasa/neo/lookup/${encodeURIComponent(id.trim())}`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || "Failed to look up that asteroid.");
      }

      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    runLookup(asteroidId);
  };

  const handleExampleClick = (id: string) => {
    setAsteroidId(id);
    runLookup(id);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4 space-y-3">
          <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="asteroid-id" className="text-xs">
                Asteroid SPK-ID
              </Label>
              <Input
                id="asteroid-id"
                placeholder="e.g. 3542519"
                value={asteroidId}
                onChange={(e) => setAsteroidId(e.target.value)}
                className="w-44"
              />
            </div>
            <Button type="submit" className="gap-2" disabled={isLoading}>
              <Search className="size-4" />
              Look up
            </Button>
          </form>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-muted-foreground">Try:</span>
            {EXAMPLE_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => handleExampleClick(id)}
                className="text-primary hover:underline"
              >
                {id}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
          Looking up asteroid…
        </div>
      )}

      {!isLoading && error && (
        <Card className="border-destructive/50">
          <CardContent className="p-6 text-sm text-destructive">
            {error}
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && data && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-xl font-semibold">{data.name}</h2>
                <p className="text-sm text-muted-foreground">
                  SPK-ID {data.id} · Reference {data.neo_reference_id}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.is_potentially_hazardous_asteroid && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="size-3" />
                    Hazardous
                  </Badge>
                )}
                {data.is_sentry_object && (
                  <Badge variant="outline">Sentry object</Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Magnitude</p>
                <p className="font-medium">{data.absolute_magnitude_h}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Diameter (min)</p>
                <p className="font-medium">
                  {numberFormat.format(
                    data.estimated_diameter.meters.estimated_diameter_min
                  )}{" "}
                  m
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Diameter (max)</p>
                <p className="font-medium">
                  {numberFormat.format(
                    data.estimated_diameter.meters.estimated_diameter_max
                  )}{" "}
                  m
                </p>
              </div>
              <div>
                <a
                  href={data.nasa_jpl_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  JPL details
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>

            {data.close_approach_data.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">
                  Close approaches ({data.close_approach_data.length})
                </h3>
                <div className="max-h-72 overflow-y-auto rounded-md border">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-muted text-muted-foreground">
                      <tr>
                        <th className="p-2 text-left font-medium">Date</th>
                        <th className="p-2 text-left font-medium">
                          Orbiting body
                        </th>
                        <th className="p-2 text-left font-medium">
                          Miss distance (km)
                        </th>
                        <th className="p-2 text-left font-medium">
                          Velocity (km/h)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.close_approach_data.map((approach, i) => (
                        <tr key={`${approach.close_approach_date}-${i}`} className="border-t">
                          <td className="p-2">{approach.close_approach_date}</td>
                          <td className="p-2">{approach.orbiting_body}</td>
                          <td className="p-2">
                            {numberFormat.format(
                              Number(approach.miss_distance.kilometers)
                            )}
                          </td>
                          <td className="p-2">
                            {numberFormat.format(
                              Number(
                                approach.relative_velocity.kilometers_per_hour
                              )
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
