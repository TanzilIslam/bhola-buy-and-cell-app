"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search } from "lucide-react";
import { JsonEventCard } from "./json-event-card";

export type DonkiFilterField =
  | { key: string; label: string; type: "select"; options: string[] }
  | { key: string; label: string; type: "number"; placeholder?: string }
  | { key: string; label: string; type: "text"; placeholder?: string }
  | { key: string; label: string; type: "checkbox"; default?: boolean };

type FilterValue = string | boolean;

const todayIso = () => new Date().toISOString().slice(0, 10);
const daysBeforeIso = (days: number) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
};

export function DonkiPanel({
  event,
  defaultRangeDays = 30,
  filters = [],
}: {
  event: string;
  defaultRangeDays?: number;
  filters?: DonkiFilterField[];
}) {
  const [startDate, setStartDate] = useState(daysBeforeIso(defaultRangeDays));
  const [endDate, setEndDate] = useState(todayIso());
  const [filterValues, setFilterValues] = useState<Record<string, FilterValue>>(
    () => {
      const initial: Record<string, FilterValue> = {};
      filters.forEach((f) => {
        if (f.type === "checkbox") initial[f.key] = f.default ?? false;
      });
      return initial;
    }
  );
  const [data, setData] = useState<Record<string, unknown>[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (start: string, end: string, values: Record<string, FilterValue>) => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({ startDate: start, endDate: end });
        filters.forEach((f) => {
          const value = values[f.key];
          if (value === undefined || value === "") return;
          params.set(f.key, typeof value === "boolean" ? String(value) : value);
        });

        const res = await fetch(`/api/nasa/donki/${event}?${params.toString()}`);
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.error || "Failed to load DONKI data.");
        }

        setData(Array.isArray(json) ? json : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
        setData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [event, filters]
  );

  useEffect(() => {
    fetchData(startDate, endDate, filterValues);
    // Only run on mount — subsequent fetches are triggered by the form submit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchData(startDate, endDate, filterValues);
  };

  const setFilterValue = (key: string, value: FilterValue) => {
    setFilterValues((v) => ({ ...v, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap items-end gap-4"
          >
            <div className="grid gap-1.5">
              <Label className="text-xs">Start date</Label>
              <Input
                type="date"
                value={startDate}
                max={endDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-40"
              />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">End date</Label>
              <Input
                type="date"
                value={endDate}
                min={startDate}
                max={todayIso()}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-40"
              />
            </div>

            {filters.map((f) => {
              if (f.type === "checkbox") {
                return (
                  <label
                    key={f.key}
                    className="flex h-10 items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(filterValues[f.key])}
                      onChange={(e) => setFilterValue(f.key, e.target.checked)}
                    />
                    {f.label}
                  </label>
                );
              }

              return (
                <div key={f.key} className="grid gap-1.5">
                  <Label className="text-xs">{f.label}</Label>
                  {f.type === "select" ? (
                    <select
                      value={(filterValues[f.key] as string) ?? ""}
                      onChange={(e) => setFilterValue(f.key, e.target.value)}
                      className="h-10 w-40 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="">Any</option>
                      {f.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      type={f.type === "number" ? "number" : "text"}
                      placeholder={f.placeholder}
                      value={(filterValues[f.key] as string) ?? ""}
                      onChange={(e) => setFilterValue(f.key, e.target.value)}
                      className="w-32"
                    />
                  )}
                </div>
              );
            })}

            <Button type="submit" className="gap-2" disabled={isLoading}>
              <Search className="size-4" />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
          Loading…
        </div>
      )}

      {!isLoading && error && (
        <Card className="border-destructive/50">
          <CardContent className="p-6 text-sm text-destructive">
            {error}
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && data && data.length === 0 && (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No events found for this range.
        </p>
      )}

      {!isLoading && !error && data && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, i) => (
            <JsonEventCard
              key={
                (item.activityID as string) ||
                (item.messageID as string) ||
                i
              }
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
