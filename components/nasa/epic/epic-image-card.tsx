import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, MapPin } from "lucide-react";
import type { EpicColor, EpicImageMeta } from "./types";

function buildImageUrl(
  color: EpicColor,
  dateTime: string,
  image: string,
  format: "thumbs" | "png" | "jpg"
) {
  const date = dateTime.split(" ")[0];
  const params = new URLSearchParams({ color, date, image, format });
  return `/api/nasa/epic/image?${params.toString()}`;
}

export function EpicImageCard({
  color,
  item,
}: {
  color: EpicColor;
  item: EpicImageMeta;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-muted/50">
        {/* NASA serves EPIC imagery from an archive path that requires the
            api_key, so this is proxied through our own image route instead
            of next/image, keeping the key server-side. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={buildImageUrl(color, item.date, item.image, "thumbs")}
          alt={item.caption}
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
      </div>
      <CardContent className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground">{item.date} UTC</p>
        <p className="text-sm leading-snug line-clamp-2">{item.caption}</p>
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="size-3.5" />
            {item.centroid_coordinates.lat.toFixed(1)},{" "}
            {item.centroid_coordinates.lon.toFixed(1)}
          </span>
          <a
            href={buildImageUrl(color, item.date, item.image, "png")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            Full res
            <ExternalLink className="size-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
