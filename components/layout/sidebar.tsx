"use client";
import { cn } from "@/lib/utils";
import { Package, PackageCheck, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/bought-items", icon: Package, label: "Bought Items" },
  { href: "/sold-listings", icon: PackageCheck, label: "Sold Listings" },
];

// Icon-only vertical sidebar for primary app navigation
export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-14 border-r border-border bg-card flex flex-col items-center gap-2 pt-24 pb-6">
      {navItems.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          title={label}
          aria-label={label}
          className={cn(
            "flex items-center justify-center size-10 rounded-lg transition-colors",
            pathname === href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Icon className="size-5" />
        </Link>
      ))}
    </aside>
  );
};
