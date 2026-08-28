"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { AsteroidCard } from "./asteroid-card";
import type { NeoFeedResponse } from "./types";

const todayIso = () => new Date().toISOString().slice(0, 10);

const addDays = (isoDate: string, days: number) => {
  const date = new Date(`${isoDate}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};

export function NeoFeed() {
  const [startDate, setStartDate] = useState(todayIso());
  const [endDate, setEndDate] = useState(addDays(todayIso(), 7));
  const [data, setData] = useState<NeoFeedResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeed = useCallback(async (start: string, end: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        start_date: start,
        end_date: end,
      });
      const res = await fetch(`/api/nasa/neo/feed?${params.toString()}`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || "Failed to load the asteroid feed.");
      }

      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed(startDate, endDate);
    // Only run on mount — subsequent fetches are triggered explicitly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    const clampedEnd = value > endDate ? addDays(value, 7) : endDate;
    setEndDate(clampedEnd);
    fetchFeed(value, clampedEnd);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    fetchFeed(startDate, value);
  };

  const dates = data ? Object.keys(data.near_earth_objects).sort() : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-wrap items-end gap-4 p-4">
          <div className="grid gap-1.5">
            <Label htmlFor="neo-start-date" className="text-xs">
              Start date
            </Label>
            <Input
              id="neo-start-date"
              type="date"
              value={startDate}
              max={todayIso()}
              onChange={(e) => handleStartDateChange(e.target.value)}
              className="w-44"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="neo-end-date" className="text-xs">
              End date
            </Label>
            <Input
              id="neo-end-date"
              type="date"
              value={endDate}
              min={startDate}
              max={addDays(startDate, 7)}
              onChange={(e) => handleEndDateChange(e.target.value)}
              className="w-44"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            NASA limits feed ranges to 7 days.
          </p>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
          Loading asteroid feed…
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
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            {data.element_count} asteroid
            {data.element_count === 1 ? "" : "s"} found between {startDate}{" "}
            and {endDate}
          </p>
          {dates.map((date) => (
            <div key={date} className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{date}</h3>
                <Badge variant="secondary">
                  {data.near_earth_objects[date].length}
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.near_earth_objects[date].map((neo) => (
                  <AsteroidCard key={neo.id} neo={neo} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
