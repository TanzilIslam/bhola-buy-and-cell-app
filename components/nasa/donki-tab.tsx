"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DonkiPanel, type DonkiFilterField } from "./donki/donki-panel";

type DonkiEventConfig = {
  key: string;
  label: string;
  event: string;
  defaultRangeDays?: number;
  filters?: DonkiFilterField[];
};

const DONKI_EVENTS: DonkiEventConfig[] = [
  { key: "cme", label: "CME", event: "CME" },
  {
    key: "cme-analysis",
    label: "CME Analysis",
    event: "CMEAnalysis",
    filters: [
      {
        key: "mostAccurateOnly",
        label: "Most accurate only",
        type: "checkbox",
        default: true,
      },
      {
        key: "completeEntryOnly",
        label: "Complete entries only",
        type: "checkbox",
        default: true,
      },
      { key: "speed", label: "Min speed (km/s)", type: "number", placeholder: "0" },
      { key: "halfAngle", label: "Min half angle", type: "number", placeholder: "0" },
      {
        key: "catalog",
        label: "Catalog",
        type: "select",
        options: ["ALL", "SWRC_CATALOG", "JANG_ET_AL_CATALOG"],
      },
      { key: "keyword", label: "Keyword", type: "text", placeholder: "e.g. swpc_annex" },
    ],
  },
  { key: "gst", label: "GST", event: "GST" },
  {
    key: "ips",
    label: "IPS",
    event: "IPS",
    filters: [
      {
        key: "location",
        label: "Location",
        type: "select",
        options: ["Earth", "MESSENGER", "STEREO A", "STEREO B"],
      },
      {
        key: "catalog",
        label: "Catalog",
        type: "select",
        options: ["SWRC_CATALOG", "WINSLOW_MESSENGER_ICME_CATALOG"],
      },
    ],
  },
  { key: "flr", label: "FLR", event: "FLR" },
  { key: "sep", label: "SEP", event: "SEP" },
  { key: "mpc", label: "MPC", event: "MPC" },
  { key: "rbe", label: "RBE", event: "RBE" },
  { key: "hss", label: "HSS", event: "HSS" },
  {
    key: "wsa-enlil",
    label: "WSA+Enlil",
    event: "WSAEnlilSimulations",
    defaultRangeDays: 7,
  },
  {
    key: "notifications",
    label: "Notifications",
    event: "notifications",
    defaultRangeDays: 7,
    filters: [
      {
        key: "type",
        label: "Type",
        type: "select",
        options: ["all", "FLR", "SEP", "CME", "IPS", "MPC", "GST", "RBE", "report"],
      },
    ],
  },
];

export function DonkiTab() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Space weather events from the Space Weather Database Of Notifications,
        Knowledge, Information (DONKI).
      </p>
      <Tabs defaultValue={DONKI_EVENTS[0].key}>
        <div className="overflow-x-auto">
          <TabsList className="w-max">
            {DONKI_EVENTS.map((e) => (
              <TabsTrigger key={e.key} value={e.key}>
                {e.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {DONKI_EVENTS.map((e) => (
          <TabsContent key={e.key} value={e.key}>
            <DonkiPanel
              event={e.event}
              defaultRangeDays={e.defaultRangeDays}
              filters={e.filters}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
