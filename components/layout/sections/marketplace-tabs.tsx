"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowRight, MapPin, ShoppingCart, Tag } from "lucide-react";
import {
  buyRequests,
  sellListings,
  type BuyRequest,
  type SellListing,
} from "@/data/mockData";

// ─── Buy Request Card ─────────────────────────────────────────────────────────

function BuyRequestCard({ request }: { request: BuyRequest }) {
  return (
    <Link href={`/requests/${request.id}`} className="block h-full group/card">
      <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <Avatar className="size-9 shrink-0">
                <AvatarImage src={request.userAvatar} alt={request.userName} />
                <AvatarFallback>{request.userName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm leading-tight">{request.userName}</p>
                <p className="text-xs text-muted-foreground">{request.postedAt}</p>
              </div>
            </div>
            <Badge variant="secondary" className="shrink-0 flex items-center gap-1">
              <ShoppingCart className="size-3" />
              Buying
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pb-3 flex-1">
          <Badge className="mb-2 text-xs">{request.productCategory}</Badge>
          <h3 className="font-semibold text-base mb-1 leading-snug group-hover/card:text-primary transition-colors">
            {request.productName}
          </h3>
          {request.description && (
            <p className="text-muted-foreground text-sm line-clamp-2">
              {request.description}
            </p>
          )}
        </CardContent>

        <Separator />

        <CardFooter className="pt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground min-w-0">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">
              {request.viewingLocation === "my_place"
                ? "At my place"
                : "At seller's place"}{" "}
              · {request.address}
            </span>
          </div>
          <ArrowRight className="size-4 text-muted-foreground shrink-0 group-hover/card:text-primary group-hover/card:translate-x-0.5 transition-all" />
        </CardFooter>
      </Card>
    </Link>
  );
}

// ─── Sell Listing Card ────────────────────────────────────────────────────────

function SellListingCard({ listing }: { listing: SellListing }) {
  return (
    <Link href={`/listings/${listing.id}`} className="block h-full group/card">
      <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
        {/* Product image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={listing.imageUrl}
            alt={listing.productName}
            fill
            className="object-cover group-hover/card:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <Badge className="absolute top-2.5 left-2.5 shadow">
            {listing.productCategory}
          </Badge>
          {/* Hover gradient */}
          <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors duration-300" />
        </div>

        <CardContent className="p-4 flex-1">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-semibold text-base leading-snug group-hover/card:text-primary transition-colors">
              {listing.productName}
            </h3>
            <span className="text-primary font-bold text-lg whitespace-nowrap">
              ${listing.price.toLocaleString()}
            </span>
          </div>
          {listing.description && (
            <p className="text-muted-foreground text-sm line-clamp-2">
              {listing.description}
            </p>
          )}
        </CardContent>

        <Separator />

        <CardFooter className="px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar className="size-7 shrink-0">
              <AvatarImage src={listing.userAvatar} alt={listing.userName} />
              <AvatarFallback>{listing.userName[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{listing.userName}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3 shrink-0" />
                <span className="truncate">
                  {listing.viewingLocation === "my_place"
                    ? "At my place"
                    : "At buyer's place"}
                </span>
              </div>
            </div>
          </div>
          <ArrowRight className="size-4 text-muted-foreground shrink-0 group-hover/card:text-primary group-hover/card:translate-x-0.5 transition-all" />
        </CardFooter>
      </Card>
    </Link>
  );
}

// ─── Marketplace Tabs ─────────────────────────────────────────────────────────

// Two-tab marketplace: "Looking to Buy" requests and "Available to Sell" listings
export const MarketplaceTabs = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");

  return (
    <section className="container py-10">
      {/* Tab switcher */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit mx-auto mb-8">
        <button
          onClick={() => setActiveTab("buy")}
          className={cn(
            "flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all",
            activeTab === "buy"
              ? "bg-background shadow text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <ShoppingCart className="size-4" />
          Looking to Buy
          <span className="ml-1 rounded-full bg-primary/10 text-primary px-1.5 py-0.5 text-xs font-semibold">
            {buyRequests.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("sell")}
          className={cn(
            "flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all",
            activeTab === "sell"
              ? "bg-background shadow text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Tag className="size-4" />
          For Sale
          <span className="ml-1 rounded-full bg-primary/10 text-primary px-1.5 py-0.5 text-xs font-semibold">
            {sellListings.length}
          </span>
        </button>
      </div>

      {/* Cards grid */}
      {activeTab === "buy" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {buyRequests.map((request) => (
            <BuyRequestCard key={request.id} request={request} />
          ))}
        </div>
      )}

      {activeTab === "sell" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sellListings.map((listing) => (
            <SellListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </section>
  );
};
