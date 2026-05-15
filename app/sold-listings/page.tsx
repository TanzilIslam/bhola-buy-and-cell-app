import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { soldItems, type SaleStatus } from "@/data/mockData";
import { CalendarDays, UserRound } from "lucide-react";

const statusConfig: Record<SaleStatus, { label: string; className: string }> =
  {
    completed: {
      label: "Completed",
      className: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
    },
    shipped: {
      label: "Shipped",
      className: "bg-blue-500/15 text-blue-600 border-blue-500/30",
    },
    pending_pickup: {
      label: "Pending Pickup",
      className: "bg-amber-500/15 text-amber-600 border-amber-500/30",
    },
  };

export default function SoldListingsPage() {
  return (
    <main className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Sold Listings</h1>
        <p className="text-muted-foreground mt-1">
          {soldItems.length} items sold so far
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {soldItems.map((item) => {
          const status = statusConfig[item.status];
          return (
            <Card
              key={item.id}
              className="overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200 group"
            >
              {/* Product image */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={item.imageUrl}
                  alt={item.productName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Status badge overlaid on image */}
                <span
                  className={`absolute top-2.5 right-2.5 text-xs font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm ${status.className}`}
                >
                  {status.label}
                </span>
                <Badge className="absolute top-2.5 left-2.5 shadow">
                  {item.productCategory}
                </Badge>
              </div>

              <CardContent className="p-4 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-base leading-snug">
                    {item.productName}
                  </h3>
                  <span className="text-emerald-600 font-bold text-lg whitespace-nowrap">
                    +${item.price.toLocaleString()}
                  </span>
                </div>
              </CardContent>

              <Separator />

              <CardFooter className="px-4 py-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar className="size-7 shrink-0">
                    <AvatarImage src={item.buyer.avatar} alt={item.buyer.name} />
                    <AvatarFallback>{item.buyer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground leading-none mb-0.5">
                      Buyer
                    </p>
                    <p className="text-sm font-medium truncate flex items-center gap-1">
                      <UserRound className="size-3 text-muted-foreground" />
                      {item.buyer.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                  <CalendarDays className="size-3.5" />
                  {item.soldAt}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
