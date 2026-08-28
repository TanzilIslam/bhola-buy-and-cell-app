"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NeoFeed } from "./neo/neo-feed";
import { NeoLookup } from "./neo/neo-lookup";
import { NeoBrowse } from "./neo/neo-browse";

export function NeoTab() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Near Earth Object data from NASA JPL&apos;s Asteroid team.
      </p>
      <Tabs defaultValue="feed">
        <TabsList>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="lookup">Lookup</TabsTrigger>
          <TabsTrigger value="browse">Browse</TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          <NeoFeed />
        </TabsContent>
        <TabsContent value="lookup">
          <NeoLookup />
        </TabsContent>
        <TabsContent value="browse">
          <NeoBrowse />
        </TabsContent>
      </Tabs>
    </div>
  );
}
