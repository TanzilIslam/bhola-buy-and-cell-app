"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/layout/modals/AuthModal";
import { LogIn } from "lucide-react";

// Navbar button that opens the AuthModal
export const AuthButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button size="sm" onClick={() => setIsOpen(true)}>
        <LogIn className="size-4 mr-1.5" />
        Login
      </Button>

      <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
