"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CalendarDays, Loader2 } from "lucide-react";
import { EpicImageCard } from "./epic/epic-image-card";
import type { EpicColor, EpicDateEntry, EpicImageMeta, EpicMode } from "./epic/types";

const todayIso = () => new Date().toISOString().slice(0, 10);

const COLORS: { value: EpicColor; label: string }[] = [
  { value: "natural", label: "Natural Color" },
  { value: "enhanced", label: "Enhanced Color" },
];

const MODES: { value: EpicMode; label: string }[] = [
  { value: "recent", label: "Most Recent" },
  { value: "date", label: "By Date" },
  { value: "all", label: "All Dates" },
  { value: "available", label: "Available Dates" },
];

export function EpicTab() {
  const [color, setColor] = useState<EpicColor>("natural");
  const [mode, setMode] = useState<EpicMode>("recent");
  const [date, setDate] = useState(todayIso());
  const [images, setImages] = useState<EpicImageMeta[] | null>(null);
  const [dateList, setDateList] = useState<EpicDateEntry[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (currentColor: EpicColor, currentMode: EpicMode, currentDate: string) => {
      setIsLoading(true);
      setError(null);
      setImages(null);
      setDateList(null);

      try {
        const params = new URLSearchParams({ mode: currentMode });
        if (currentMode === "date") params.set("date", currentDate);

        const res = await fetch(
          `/api/nasa/epic/${currentColor}?${params.toString()}`
        );
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.error || "Failed to load EPIC data.");
        }

        if (currentMode === "all" || currentMode === "available") {
          setDateList(json);
        } else {
          setImages(json);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData(color, mode, date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, mode]);

  const handleColorChange = (value: EpicColor) => {
    setColor(value);
  };

  const handleModeChange = (value: EpicMode) => {
    setMode(value);
  };

  const handleDateChange = (value: string) => {
    setDate(value);
    fetchData(color, "date", value);
  };

  const handlePickDate = (pickedDate: string) => {
    setDate(pickedDate);
    setMode("date");
    fetchData(color, "date", pickedDate);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-wrap items-end gap-4 p-4">
          <div className="grid gap-1.5">
            <Label className="text-xs">Color</Label>
            <div className="flex rounded-md border p-1 gap-1">
              {COLORS.map((c) => (
                <Button
                  key={c.value}
                  type="button"
                  size="sm"
                  variant={color === c.value ? "default" : "ghost"}
                  onClick={() => handleColorChange(c.value)}
                >
                  {c.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label className="text-xs">View</Label>
            <div className="flex flex-wrap rounded-md border p-1 gap-1">
              {MODES.map((m) => (
                <Button
                  key={m.value}
                  type="button"
                  size="sm"
                  variant={mode === m.value ? "default" : "ghost"}
                  onClick={() => handleModeChange(m.value)}
                >
                  {m.label}
                </Button>
              ))}
            </div>
          </div>

          {mode === "date" && (
            <div className="grid gap-1.5">
              <Label htmlFor="epic-date" className="flex items-center gap-1.5 text-xs">
                <CalendarDays className="size-3.5" />
                Date
              </Label>
              <Input
                id="epic-date"
                type="date"
                value={date}
                max={todayIso()}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-44"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
          Loading EPIC imagery…
        </div>
      )}

      {!isLoading && error && (
        <Card className="border-destructive/50">
          <CardContent className="p-6 text-sm text-destructive">
            {error}
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && dateList && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {dateList.length} date{dateList.length === 1 ? "" : "s"} with{" "}
            {color} color imagery. Pick one to view its images.
          </p>
          <div className="flex flex-wrap gap-2">
            {dateList.map(({ date: d }) => (
              <button key={d} type="button" onClick={() => handlePickDate(d)}>
                <Badge
                  variant="outline"
                  className={cn(
                    "cursor-pointer hover:bg-accent",
                    d === date && "border-primary text-primary"
                  )}
                >
                  {d}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      )}

      {!isLoading && !error && images && images.length === 0 && (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No {color} color imagery available for this date.
        </p>
      )}

      {!isLoading && !error && images && images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((item) => (
            <EpicImageCard key={item.identifier} color={color} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
