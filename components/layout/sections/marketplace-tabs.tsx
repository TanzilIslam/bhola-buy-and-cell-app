"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  MapPin,
  Search,
  SearchX,
  ShoppingCart,
  SlidersHorizontal,
  Tag,
  X,
} from "lucide-react";
import {
  buyRequests,
  sellListings,
  type BuyRequest,
  type SellListing,
} from "@/data/mockData";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Laptop", "Phone", "Tablet", "Desktop",
  "Camera", "TV", "Gaming Console", "Other",
] as const;

const SORT_OPTIONS = [
  { label: "Newest first",        value: "newest"     },
  { label: "Price: low → high",   value: "price_asc"  },
  { label: "Price: high → low",   value: "price_desc" },
];

const PRICE_OPTIONS = [
  { label: "Any price",      value: "any"       },
  { label: "Under $500",     value: "under500"  },
  { label: "$500 – $1,000",  value: "500-1000"  },
  { label: "$1,000 – $2,000",value: "1000-2000" },
  { label: "$2,000+",        value: "2000plus"  },
];

// ─── Pill button (shared by category row and filter sheet) ────────────────────

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 border",
        active
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-muted/60 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center gap-4 py-20 text-center">
      <div className="size-16 rounded-2xl bg-muted flex items-center justify-center">
        <SearchX className="size-7 text-muted-foreground" />
      </div>
      <div>
        <p className="font-semibold">No results found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your search or clearing filters
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={onClear}>
        Clear all filters
      </Button>
    </div>
  );
}

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
              {request.viewingLocation === "my_place" ? "At my place" : "At seller's place"}
              {" · "}{request.address}
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
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={listing.imageUrl}
            alt={listing.productName}
            fill
            className="object-cover group-hover/card:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <Badge className="absolute top-2.5 left-2.5 shadow">{listing.productCategory}</Badge>
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
            <p className="text-muted-foreground text-sm line-clamp-2">{listing.description}</p>
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
                  {listing.viewingLocation === "my_place" ? "At my place" : "At buyer's place"}
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

export const MarketplaceTabs = () => {
  const [activeTab,      setActiveTab]      = useState<"buy" | "sell">("buy");
  const [search,         setSearch]         = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy,         setSortBy]         = useState("newest");
  const [priceFilter,    setPriceFilter]    = useState("any");
  const [filterOpen,     setFilterOpen]     = useState(false);

  // ── Derived filtered lists ──────────────────────────────────────────────────

  const filteredBuy = useMemo(() => {
    const q = search.toLowerCase();
    return buyRequests.filter((r) => {
      const matchSearch = !q
        || r.productName.toLowerCase().includes(q)
        || r.description?.toLowerCase().includes(q);
      const matchCat = activeCategory === "All" || r.productCategory === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  const filteredSell = useMemo(() => {
    const q = search.toLowerCase();
    const results = sellListings.filter((l) => {
      const matchSearch = !q
        || l.productName.toLowerCase().includes(q)
        || l.description?.toLowerCase().includes(q);
      const matchCat  = activeCategory === "All" || l.productCategory === activeCategory;
      const matchPrice =
        priceFilter === "any"       ? true :
        priceFilter === "under500"  ? l.price < 500 :
        priceFilter === "500-1000"  ? l.price >= 500  && l.price <= 1000 :
        priceFilter === "1000-2000" ? l.price > 1000  && l.price <= 2000 :
        priceFilter === "2000plus"  ? l.price > 2000  : true;
      return matchSearch && matchCat && matchPrice;
    });
    if (sortBy === "price_asc")  results.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") results.sort((a, b) => b.price - a.price);
    return results;
  }, [search, activeCategory, priceFilter, sortBy]);

  // Active filter count — badge on the mobile Filters button
  const filterCount = useMemo(() => {
    let n = 0;
    if (activeCategory !== "All")                        n++;
    if (sortBy         !== "newest")                     n++;
    if (priceFilter    !== "any" && activeTab === "sell") n++;
    return n;
  }, [activeCategory, sortBy, priceFilter, activeTab]);

  const clearAll = () => {
    setSearch("");
    setActiveCategory("All");
    setSortBy("newest");
    setPriceFilter("any");
  };

  const activeResults = activeTab === "buy" ? filteredBuy : filteredSell;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <section className="container py-6">

      {/*
        ┌─────────────────────────────────────────────────────────────┐
        │  STICKY SEARCH + CATEGORY STRIP                             │
        │  • mobile/tablet : horizontally scrollable category pills   │
        │  • sm+           : pills wrap naturally                     │
        └─────────────────────────────────────────────────────────────┘
      */}
      <div className="sticky top-20 z-20 bg-background/95 backdrop-blur-md -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 pb-3 mb-5">

        {/* Search bar */}
        <div className="relative mb-2.5">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, brands, models…"
            className="h-10 pl-9 pr-9 rounded-xl bg-muted/50 border-0 focus-visible:ring-1 text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Category pills
            mobile  → overflow-x-auto + scrollbar-hide = thumb-swipeable
            sm+     → flex-wrap = all chips visible, no scroll          */}
        <div className="flex gap-1.5 overflow-x-auto sm:flex-wrap scrollbar-hide">
          {(["All", ...CATEGORIES] as string[]).map((cat) => (
            <Pill
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Pill>
          ))}
        </div>
      </div>

      {/*
        ┌─────────────────────────────────────────────────────────────┐
        │  CONTROLS ROW                                               │
        │  Left:  tab switcher with live counts                       │
        │  Right: mobile → "Filters" sheet button                    │
        │         sm+    → inline sort + price selects               │
        └─────────────────────────────────────────────────────────────┘
      */}
      <div className="flex flex-wrap items-center gap-3 mb-5">

        {/* Tab switcher */}
        <div className="flex gap-1 p-1 bg-muted rounded-xl">
          {([
            { id: "buy",  icon: ShoppingCart, label: "To Buy",  count: filteredBuy.length  },
            { id: "sell", icon: Tag,           label: "For Sale", count: filteredSell.length },
          ] as const).map(({ id, icon: Icon, label, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                activeTab === id
                  ? "bg-background shadow text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-3.5" />
              {label}
              <span className={cn(
                "rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
                activeTab === id
                  ? "bg-primary/10 text-primary"
                  : "bg-muted-foreground/10 text-muted-foreground"
              )}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Results count — spacer on sm+ */}
        <p className="text-sm text-muted-foreground sm:mr-auto">
          <span className="font-semibold text-foreground">{activeResults.length}</span> results
        </p>

        {/* ── Mobile: Filters sheet button ── */}
        <Button
          variant="outline"
          size="sm"
          className="sm:hidden h-8 gap-1.5 text-xs"
          onClick={() => setFilterOpen(true)}
        >
          <SlidersHorizontal className="size-3.5" />
          Filters
          {filterCount > 0 && (
            <span className="ml-0.5 size-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
              {filterCount}
            </span>
          )}
        </Button>

        {/* ── sm+: inline sort ── */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="hidden sm:flex h-8 w-[155px] text-xs rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-xs">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* ── sm+: price filter (sell tab only) ── */}
        {activeTab === "sell" && (
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="hidden sm:flex h-8 w-[145px] text-xs rounded-lg">
              <SelectValue placeholder="Any price" />
            </SelectTrigger>
            <SelectContent>
              {PRICE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value} className="text-xs">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* ── sm+: clear button (only when filters active) ── */}
        {(filterCount > 0 || search) && (
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex h-8 text-xs text-muted-foreground gap-1"
            onClick={clearAll}
          >
            <X className="size-3" />
            Clear
          </Button>
        )}
      </div>

      {/*
        ┌─────────────────────────────────────────────────────────────┐
        │  CARDS GRID                                                 │
        │  1 col mobile → 2 col sm → 3 col lg                        │
        └─────────────────────────────────────────────────────────────┘
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeResults.length === 0 ? (
          <EmptyState onClear={clearAll} />
        ) : activeTab === "buy" ? (
          filteredBuy.map((r) => <BuyRequestCard key={r.id} request={r} />)
        ) : (
          filteredSell.map((l) => <SellListingCard key={l.id} listing={l} />)
        )}
      </div>

      {/*
        ┌─────────────────────────────────────────────────────────────┐
        │  MOBILE FILTER SHEET (bottom drawer)                        │
        │  Sort + price range (sell tab) as pill groups               │
        │  Clear | Apply action row                                   │
        └─────────────────────────────────────────────────────────────┘
      */}
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader className="mb-5">
            <SheetTitle className="text-base">Filters</SheetTitle>
          </SheetHeader>

          <div className="space-y-5">
            {/* Sort */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                Sort by
              </p>
              <div className="flex flex-wrap gap-2">
                {SORT_OPTIONS.map((o) => (
                  <Pill
                    key={o.value}
                    active={sortBy === o.value}
                    onClick={() => setSortBy(o.value)}
                  >
                    {o.label}
                  </Pill>
                ))}
              </div>
            </div>

            {/* Price — sell tab only */}
            {activeTab === "sell" && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                  Price range
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRICE_OPTIONS.map((o) => (
                    <Pill
                      key={o.value}
                      active={priceFilter === o.value}
                      onClick={() => setPriceFilter(o.value)}
                    >
                      {o.label}
                    </Pill>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-6 pt-4 border-t border-border">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setSortBy("newest");
                setPriceFilter("any");
                setFilterOpen(false);
              }}
            >
              Clear
            </Button>
            <Button className="flex-1" onClick={() => setFilterOpen(false)}>
              Apply
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};
