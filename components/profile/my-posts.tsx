"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  buyRequests,
  sellListings,
  currentUser,
  type BuyRequest,
  type SellListing,
} from "@/data/mockData";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CalendarDays,
  Package,
  ShoppingCart,
  Tag,
  Trash2,
} from "lucide-react";

type Tab = "listings" | "requests";

export function MyPosts() {
  const [tab, setTab] = useState<Tab>("listings");
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());

  const myListings = useMemo(
    () =>
      sellListings.filter(
        (l) => l.userName === currentUser.name && !deletedIds.has(l.id)
      ),
    [deletedIds]
  );
  const myRequests = useMemo(
    () =>
      buyRequests.filter(
        (r) => r.userName === currentUser.name && !deletedIds.has(r.id)
      ),
    [deletedIds]
  );

  function softDelete(id: string, productName: string) {
    setDeletedIds((prev) => new Set(prev).add(id));
    toast.success("Post removed", {
      description: `"${productName}" is no longer visible.`,
      action: {
        label: "Undo",
        onClick: () =>
          setDeletedIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          }),
      },
    });
  }

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "listings", label: "Listings", count: myListings.length },
    { id: "requests", label: "Buy Requests", count: myRequests.length },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-lg font-bold">My Posts</h2>
        <p className="text-xs text-muted-foreground mb-4">
          Manage your active listings and buy requests.
        </p>

        {/* Tab switcher */}
        <div className="flex gap-1 p-1 bg-muted rounded-xl">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all",
                tab === t.id
                  ? "bg-background shadow text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
              <span
                className={cn(
                  "text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-5",
                  tab === t.id
                    ? "bg-primary/15 text-primary"
                    : "bg-muted-foreground/15"
                )}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-6 space-y-2.5">
        {tab === "listings" ? (
          myListings.length === 0 ? (
            <EmptyState
              icon={Package}
              label="No active listings"
              hint="Tap 'Want to Sell' on the home page to list your first item."
            />
          ) : (
            myListings.map((l) => (
              <ListingRow key={l.id} listing={l} onDelete={softDelete} />
            ))
          )
        ) : myRequests.length === 0 ? (
          <EmptyState
            icon={ShoppingCart}
            label="No active buy requests"
            hint="Tap 'Want to Buy' on the home page to post a request."
          />
        ) : (
          myRequests.map((r) => (
            <RequestRow key={r.id} request={r} onDelete={softDelete} />
          ))
        )}
      </div>
    </Card>
  );
}

// ─── Listing row ─────────────────────────────────────────────────────────────

function ListingRow({
  listing,
  onDelete,
}: {
  listing: SellListing;
  onDelete: (id: string, name: string) => void;
}) {
  return (
    <div className="group flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50 hover:bg-muted/60 transition-colors">
      <Link
        href={`/listings/${listing.id}`}
        className="relative size-16 rounded-lg overflow-hidden bg-muted shrink-0"
      >
        <Image
          src={listing.imageUrl}
          alt={listing.productName}
          fill
          sizes="64px"
          className="object-cover"
        />
      </Link>

      <Link href={`/listings/${listing.id}`} className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <Badge variant="secondary" className="text-[10px] gap-1 py-0 px-1.5">
            <Tag className="size-2.5" />
            {listing.productCategory}
          </Badge>
          <span className="text-sm font-bold text-primary">
            ${listing.price.toLocaleString()}
          </span>
        </div>
        <p className="text-sm font-semibold truncate">{listing.productName}</p>
        <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
          <CalendarDays className="size-3" />
          {listing.postedAt}
        </p>
      </Link>

      <div className="flex items-center gap-1 shrink-0">
        <Link
          href={`/listings/${listing.id}`}
          className="hidden sm:flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
          aria-label="View listing"
        >
          <ArrowRight className="size-4" />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(listing.id, listing.productName)}
          aria-label="Delete listing"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Buy request row ─────────────────────────────────────────────────────────

function RequestRow({
  request,
  onDelete,
}: {
  request: BuyRequest;
  onDelete: (id: string, name: string) => void;
}) {
  return (
    <div className="group flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50 hover:bg-muted/60 transition-colors">
      <Link
        href={`/requests/${request.id}`}
        className="size-16 rounded-lg bg-gradient-to-br from-primary/15 to-[#D247BF]/15 flex items-center justify-center shrink-0"
      >
        <ShoppingCart className="size-6 text-primary" />
      </Link>

      <Link href={`/requests/${request.id}`} className="flex-1 min-w-0">
        <Badge variant="secondary" className="text-[10px] gap-1 py-0 px-1.5 mb-1">
          <Tag className="size-2.5" />
          {request.productCategory}
        </Badge>
        <p className="text-sm font-semibold truncate">{request.productName}</p>
        <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
          <CalendarDays className="size-3" />
          Posted {request.postedAt}
        </p>
      </Link>

      <div className="flex items-center gap-1 shrink-0">
        <Link
          href={`/requests/${request.id}`}
          className="hidden sm:flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
          aria-label="View request"
        >
          <ArrowRight className="size-4" />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(request.id, request.productName)}
          aria-label="Delete request"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────

function EmptyState({
  icon: Icon,
  label,
  hint,
}: {
  icon: typeof Package;
  label: string;
  hint: string;
}) {
  return (
    <div className="flex flex-col items-center text-center py-10 px-4">
      <div className="size-14 rounded-2xl bg-muted flex items-center justify-center mb-3">
        <Icon className="size-6 text-muted-foreground" />
      </div>
      <p className="font-semibold text-sm">{label}</p>
      <p className="text-xs text-muted-foreground mt-1 max-w-xs">{hint}</p>
    </div>
  );
}
