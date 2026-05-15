import { notFound } from "next/navigation";
import { buyRequests } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "@/components/ui/back-button";
import {
  CalendarDays,
  Eye,
  MapPin,
  ShoppingCart,
} from "lucide-react";
import { ContactCTA } from "@/components/ui/contact-cta";

export default function RequestDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const request = buyRequests.find((r) => r.id === params.id);
  if (!request) notFound();

  return (
    <main className="container max-w-2xl py-6 pb-52 lg:pb-12">
      <BackButton />

      <div className="mt-5 space-y-4">

        {/* ── Hero card — gradient bg + large avatar ─────────────── */}
        <div className="relative rounded-2xl overflow-hidden border border-primary/15 bg-gradient-to-br from-primary/15 via-background to-[#D247BF]/15">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-12 -right-12 size-48 rounded-full bg-primary/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 size-40 rounded-full bg-[#D247BF]/10 blur-2xl" />

          <div className="relative px-6 pt-8 pb-7 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <Avatar className="size-24 shrink-0 ring-4 ring-background shadow-2xl">
              <AvatarImage src={request.userAvatar} alt={request.userName} />
              <AvatarFallback className="text-3xl font-bold">
                {request.userName[0]}
              </AvatarFallback>
            </Avatar>

            <div className="text-center sm:text-left">
              <Badge
                variant="secondary"
                className="mb-2.5 gap-1.5 text-xs font-semibold"
              >
                <ShoppingCart className="size-3" />
                Looking to Buy
              </Badge>
              <h1 className="text-2xl font-bold">{request.userName}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1.5 text-sm text-muted-foreground">
                <CalendarDays className="size-3.5" />
                Posted {request.postedAt}
              </div>
            </div>
          </div>
        </div>

        {/* ── Product details ─────────────────────────────────────── */}
        <Card>
          <CardContent className="p-6">
            <Badge className="mb-3">{request.productCategory}</Badge>
            <h2 className="text-2xl font-bold leading-snug mb-1">
              {request.productName}
            </h2>
            {request.description && (
              <>
                <Separator className="my-4" />
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {request.description}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* ── Meeting preference ──────────────────────────────────── */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Meeting Preference</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Eye className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Wants to view at</p>
                  <p className="font-medium text-sm">
                    {request.viewingLocation === "my_place"
                      ? "Buyer's place (they'll host)"
                      : "Seller's place (they'll visit)"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium text-sm">{request.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <ContactCTA
          contact={{
            name: request.userName,
            avatar: request.userAvatar,
            phone: request.userPhone,
            email: request.userEmail,
          }}
          product={request.productName}
          role="buyer"
        />
      </div>
    </main>
  );
}
