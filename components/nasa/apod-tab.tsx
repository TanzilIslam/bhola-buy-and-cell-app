"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Loader2, RefreshCcw } from "lucide-react";

type ApodResponse = {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
  service_version?: string;
  copyright?: string;
  thumbnail_url?: string;
};

const todayIso = () => new Date().toISOString().slice(0, 10);

export function ApodTab() {
  const [date, setDate] = useState<string>("");
  const [data, setData] = useState<ApodResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApod = useCallback(async (selectedDate?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (selectedDate) params.set("date", selectedDate);
      params.set("thumbs", "true");

      const res = await fetch(`/api/nasa/apod?${params.toString()}`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || "Failed to load the Astronomy Picture of the Day.");
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
    fetchApod();
  }, [fetchApod]);

  const handleDateChange = (value: string) => {
    setDate(value);
    fetchApod(value || undefined);
  };

  const handleTodayClick = () => {
    setDate("");
    fetchApod();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-wrap items-end gap-4 p-4">
          <div className="grid gap-1.5">
            <Label htmlFor="apod-date" className="flex items-center gap-1.5 text-xs">
              <CalendarDays className="size-3.5" />
              Date
            </Label>
            <Input
              id="apod-date"
              type="date"
              value={date}
              max={todayIso()}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-44"
            />
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleTodayClick}
            disabled={isLoading}
          >
            <RefreshCcw className="size-4" />
            Today
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
          Loading Astronomy Picture of the Day…
        </div>
      )}

      {!isLoading && error && (
        <Card className="border-destructive/50">
          <CardContent className="p-6 text-sm text-destructive">{error}</CardContent>
        </Card>
      )}

      {!isLoading && !error && data && (
        <Card className="overflow-hidden">
          <div className="bg-muted/50">
            {data.media_type === "video" ? (
              <iframe
                src={data.url}
                title={data.title}
                allowFullScreen
                className="aspect-video w-full"
              />
            ) : (
              // NASA APOD images are served from many different hosts, so a
              // plain <img> is used instead of next/image (which requires
              // each host to be allow-listed up front).
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.hdurl || data.url}
                alt={data.title}
                className="w-full max-h-[70vh] object-contain"
              />
            )}
          </div>
          <CardContent className="space-y-3 p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{data.date}</Badge>
              {data.copyright && (
                <Badge variant="outline">© {data.copyright.trim()}</Badge>
              )}
            </div>
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {data.explanation}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
