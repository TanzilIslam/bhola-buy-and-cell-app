import { notFound } from "next/navigation";
import Image from "next/image";
import { sellListings } from "@/data/mockData";
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
  MessageCircle,
  Tag,
} from "lucide-react";

export default function ListingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const listing = sellListings.find((l) => l.id === params.id);
  if (!listing) notFound();

  const details = [
    { icon: Tag, label: "Category", value: listing.productCategory },
    { icon: CalendarDays, label: "Posted", value: listing.postedAt },
    {
      icon: Eye,
      label: "Viewing at",
      value:
        listing.viewingLocation === "my_place"
          ? "Seller's place"
          : "Buyer's place",
    },
    { icon: MapPin, label: "Address", value: listing.address },
  ];

  return (
    // extra bottom padding on mobile so content clears the sticky CTA + bottom nav
    <main className="container py-6 pb-52 lg:pb-12">
      <BackButton />

      <div className="mt-5 grid lg:grid-cols-[3fr_2fr] gap-8 items-start">

        {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
        <div className="space-y-5">

          {/* Hero image */}
          <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-muted">
            <Image
              src={listing.imageUrl}
              alt={listing.productName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            {/* Bottom gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <Badge className="absolute top-4 left-4 shadow-lg">
              {listing.productCategory}
            </Badge>
            {/* Price pill on image — mobile only */}
            <div className="lg:hidden absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <span className="text-2xl font-bold text-primary">
                ${listing.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* About — desktop left column */}
          <Card className="hidden lg:block">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-3">About this item</h2>
              <p className="text-muted-foreground leading-relaxed">
                {listing.description}
              </p>
            </CardContent>
          </Card>

          {/* Details grid — desktop left column */}
          <div className="hidden lg:grid grid-cols-2 gap-3">
            {details.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/50"
              >
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="size-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN ───────────────────────────────────────── */}
        <div className="space-y-4 lg:sticky lg:top-24">

          {/* Title + price — desktop */}
          <div className="hidden lg:block">
            <p className="text-4xl font-bold text-primary">
              ${listing.price.toLocaleString()}
            </p>
            <h1 className="text-2xl font-bold mt-1 leading-snug">
              {listing.productName}
            </h1>
          </div>

          {/* Title — mobile (price shown on image) */}
          <h1 className="lg:hidden text-2xl font-bold leading-snug">
            {listing.productName}
          </h1>

          <Separator className="hidden lg:block" />

          {/* Seller card */}
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Seller
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="size-12 ring-2 ring-primary/20">
                  <AvatarImage
                    src={listing.userAvatar}
                    alt={listing.userName}
                  />
                  <AvatarFallback className="text-lg">
                    {listing.userName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{listing.userName}</p>
                  <p className="text-xs text-muted-foreground">
                    Listed {listing.postedAt}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About — mobile */}
          <Card className="lg:hidden">
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2">About this item</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {listing.description}
              </p>
            </CardContent>
          </Card>

          {/* Details grid — mobile */}
          <div className="grid grid-cols-2 gap-2.5 lg:hidden">
            {details.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/50 border border-border/50"
              >
                <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="size-3.5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground">{label}</p>
                  <p className="text-xs font-medium truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <Button size="lg" className="w-full hidden lg:flex gap-2 font-semibold">
            <MessageCircle className="size-4" />
            Contact Seller
          </Button>
        </div>
      </div>

      {/* Mobile / tablet sticky CTA — floats above the bottom nav */}
      <div className="lg:hidden fixed bottom-[90px] left-4 right-4 z-20">
        <Button
          size="lg"
          className="w-full gap-2 font-semibold shadow-2xl shadow-primary/30"
        >
          <MessageCircle className="size-4" />
          Contact Seller
        </Button>
      </div>
    </main>
  );
}
