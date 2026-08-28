"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { AsteroidCard } from "./asteroid-card";
import type { NeoBrowseResponse } from "./types";

export function NeoBrowse() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<NeoBrowseResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(async (pageNumber: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ page: String(pageNumber) });
      const res = await fetch(`/api/nasa/neo/browse?${params.toString()}`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || "Failed to browse asteroids.");
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
    fetchPage(page);
  }, [page, fetchPage]);

  const totalPages = data?.page.total_pages ?? 0;

  return (
    <div className="space-y-6">
      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
          Loading asteroid data-set…
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
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Page {data.page.number + 1} of {totalPages} ·{" "}
              {data.page.total_elements.toLocaleString()} asteroids total
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
              >
                <ChevronLeft className="size-4" />
                Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() =>
                  setPage((p) => Math.min(totalPages - 1, p + 1))
                }
                disabled={page + 1 >= totalPages}
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.near_earth_objects.map((neo) => (
              <AsteroidCard key={neo.id} neo={neo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
