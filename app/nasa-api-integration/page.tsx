import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApodTab } from "@/components/nasa/apod-tab";
import { NeoTab } from "@/components/nasa/neo-tab";

export default function NasaApiIntegrationPage() {
  return (
    <main className="container max-w-4xl py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">NASA API Integration</h1>
        <p className="text-muted-foreground mt-1">
          Explore data from NASA&apos;s open APIs.
        </p>
      </div>

      <Tabs defaultValue="apod">
        <TabsList>
          <TabsTrigger value="apod">APOD</TabsTrigger>
          <TabsTrigger value="neo">Asteroids - NeoWs</TabsTrigger>
        </TabsList>
        <TabsContent value="apod">
          <ApodTab />
        </TabsContent>
        <TabsContent value="neo">
          <NeoTab />
        </TabsContent>
      </Tabs>
    </main>
  );
}
