"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

type JsonRecord = Record<string, unknown>;

// DONKI event shapes differ per endpoint (CME, FLR, GST, notifications, …),
// so rather than a bespoke renderer per type, scalar fields are shown
// directly and nested arrays/objects are shown as expandable raw JSON.
const TITLE_KEYS = [
  "activityID",
  "flrID",
  "gstID",
  "mpcID",
  "rbeID",
  "hssID",
  "sepID",
  "ipsID",
  "simulationID",
  "messageID",
];
const BADGE_KEYS = ["classType", "messageType", "location", "type"];
const MAX_INLINE_LENGTH = 140;

function formatLabel(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function isInlineScalar(value: unknown): value is string | number | boolean {
  if (typeof value === "number" || typeof value === "boolean") return true;
  return typeof value === "string" && value.length <= MAX_INLINE_LENGTH;
}

export function JsonEventCard({ item }: { item: JsonRecord }) {
  const [expandedField, setExpandedField] = useState<string | null>(null);

  const titleKey = TITLE_KEYS.find((k) => item[k]);
  const title = titleKey ? String(item[titleKey]) : "Event";
  const badgeKey = BADGE_KEYS.find(
    (k) => k !== titleKey && isInlineScalar(item[k]) && item[k] !== ""
  );

  const entries = Object.entries(item).filter(
    ([key]) => key !== titleKey && key !== badgeKey
  );
  const scalarEntries = entries.filter(([, value]) => isInlineScalar(value));
  const complexEntries = entries.filter(
    ([, value]) => !isInlineScalar(value)
  );

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold break-all">{title}</h3>
          {badgeKey && (
            <Badge variant="secondary" className="shrink-0">
              {String(item[badgeKey])}
            </Badge>
          )}
        </div>

        {scalarEntries.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            {scalarEntries.map(([key, value]) => (
              <div key={key} className="min-w-0">
                <p className="text-muted-foreground">{formatLabel(key)}</p>
                <p className="font-medium break-words">
                  {typeof value === "boolean"
                    ? value
                      ? "Yes"
                      : "No"
                    : String(value)}
                </p>
              </div>
            ))}
          </div>
        )}

        {complexEntries.map(([key, value]) => (
          <div key={key} className="border-t pt-2">
            <button
              type="button"
              onClick={() =>
                setExpandedField((f) => (f === key ? null : key))
              }
              className="flex w-full items-center justify-between text-xs text-muted-foreground hover:text-foreground"
            >
              <span>
                {formatLabel(key)}
                {Array.isArray(value) ? ` (${value.length})` : ""}
              </span>
              {expandedField === key ? (
                <ChevronUp className="size-3.5" />
              ) : (
                <ChevronDown className="size-3.5" />
              )}
            </button>
            {expandedField === key && (
              <pre className="mt-2 max-h-64 overflow-auto rounded bg-muted/50 p-2 text-[11px] leading-relaxed whitespace-pre-wrap">
                {JSON.stringify(value, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
