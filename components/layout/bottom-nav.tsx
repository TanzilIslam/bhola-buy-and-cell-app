"use client";
import { cn } from "@/lib/utils";
import { Home, Package, PackageCheck, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/bought-items", icon: Package, label: "Bought" },
  { href: "/sold-listings", icon: PackageCheck, label: "Sold" },
];

// Floating bottom navigation — visible on mobile/tablet only (hidden on lg+)
export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 lg:hidden w-full max-w-sm px-4">
      <div className="flex items-center bg-background/75 backdrop-blur-xl border border-border/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.14)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)] p-1.5 gap-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className={cn("size-5", isActive && "drop-shadow-sm")} />
              <span className="text-[11px] font-medium leading-none tracking-wide">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
