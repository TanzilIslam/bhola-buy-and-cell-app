import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/data/mockData";
import {
  CalendarDays,
  Mail,
  MapPin,
  Package,
  PackageCheck,
  Phone,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export default function ProfilePage() {
  const { name, handle, email, phone, avatar, location, memberSince, bio, stats } =
    currentUser;

  return (
    <main className="container max-w-2xl py-10">
      <Card className="overflow-hidden">
        {/* Gradient banner */}
        <div className="h-28 bg-gradient-to-r from-primary via-primary/70 to-[#D247BF]" />

        {/* Avatar — overlaps the banner */}
        <div className="-mt-12 px-6 flex items-end justify-between">
          <Avatar className="size-24 border-4 border-background shadow-md">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="text-2xl">{name[0]}</AvatarFallback>
          </Avatar>
          <Badge variant="secondary" className="mb-2">
            Active Member
          </Badge>
        </div>

        <CardContent className="px-6 pt-4 pb-6 space-y-6">
          {/* Name + handle + location */}
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-sm text-muted-foreground">{handle}</p>
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              {location}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                icon: ShoppingBag,
                label: "Bought",
                value: stats.bought,
                color: "text-blue-500",
              },
              {
                icon: PackageCheck,
                label: "Sold",
                value: stats.sold,
                color: "text-green-500",
              },
              {
                icon: TrendingDown,
                label: "Spent",
                value: `$${stats.spent.toLocaleString()}`,
                color: "text-rose-500",
              },
              {
                icon: TrendingUp,
                label: "Earned",
                value: `$${stats.earned.toLocaleString()}`,
                color: "text-emerald-500",
              },
            ].map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 rounded-xl bg-muted/50 py-3 px-2"
              >
                <Icon className={`size-5 ${color}`} />
                <span className="text-lg font-bold">{value}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          <Separator />

          {/* Bio */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              About
            </h2>
            <p className="text-sm leading-relaxed">{bio}</p>
          </div>

          <Separator />

          {/* Contact details */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Contact
            </h2>
            <ul className="space-y-2.5 text-sm">
              {[
                { icon: Mail, text: email },
                { icon: Phone, text: phone },
                { icon: Package, text: `${stats.bought} items purchased` },
                { icon: CalendarDays, text: `Member since ${memberSince}` },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-muted-foreground">
                  <Icon className="size-4 shrink-0 text-primary" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
