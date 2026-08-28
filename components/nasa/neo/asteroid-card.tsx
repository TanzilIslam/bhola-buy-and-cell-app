import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ExternalLink, Ruler } from "lucide-react";
import type { NeoObject } from "./types";

const numberFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function formatMeters(neo: NeoObject) {
  const { estimated_diameter_min, estimated_diameter_max } =
    neo.estimated_diameter.meters;
  return `${numberFormat.format(estimated_diameter_min)}–${numberFormat.format(
    estimated_diameter_max
  )} m`;
}

export function AsteroidCard({ neo }: { neo: NeoObject }) {
  const nextApproach = neo.close_approach_data[0];

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{neo.name}</h3>
          {neo.is_potentially_hazardous_asteroid && (
            <Badge
              variant="destructive"
              className="shrink-0 gap-1 whitespace-nowrap"
            >
              <AlertTriangle className="size-3" />
              Hazardous
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Ruler className="size-3.5" />
            {formatMeters(neo)}
          </span>
          <span>Mag {neo.absolute_magnitude_h}</span>
        </div>

        {nextApproach && (
          <div className="rounded-md bg-muted/50 p-2.5 text-xs space-y-1">
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">Approach date</span>
              <span className="font-medium">
                {nextApproach.close_approach_date}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">Miss distance</span>
              <span className="font-medium">
                {numberFormat.format(
                  Number(nextApproach.miss_distance.kilometers)
                )}{" "}
                km
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">Velocity</span>
              <span className="font-medium">
                {numberFormat.format(
                  Number(nextApproach.relative_velocity.kilometers_per_hour)
                )}{" "}
                km/h
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">Orbiting body</span>
              <span className="font-medium">{nextApproach.orbiting_body}</span>
            </div>
          </div>
        )}

        <a
          href={neo.nasa_jpl_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs text-primary hover:underline w-fit"
        >
          JPL details
          <ExternalLink className="size-3" />
        </a>
      </CardContent>
    </Card>
  );
}
