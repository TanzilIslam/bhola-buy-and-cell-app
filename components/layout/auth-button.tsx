"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { currentUser } from "@/data/mockData";

export const AuthButton = () => {
  const { isLoggedIn, openAuthModal, logout } = useAuth();

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Avatar className="size-8 ring-2 ring-primary/30">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback className="text-xs font-bold">
            {currentUser.name[0]}
          </AvatarFallback>
        </Avatar>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground gap-1.5"
          onClick={logout}
        >
          <LogOut className="size-4" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>
    );
  }

  return (
    <Button size="sm" onClick={openAuthModal}>
      <LogIn className="size-4 mr-1.5" />
      Login
    </Button>
  );
};
