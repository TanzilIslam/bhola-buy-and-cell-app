"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { ContactModal, type ContactInfo } from "@/components/layout/modals/ContactModal";
import { useAuth } from "@/contexts/auth-context";

interface ContactCTAProps {
  contact: ContactInfo;
  product: string;
  role: "seller" | "buyer";
}

export function ContactCTA({ contact, product, role }: ContactCTAProps) {
  const { isLoggedIn, openAuthModal } = useAuth();
  const [open, setOpen] = useState(false);
  const label = role === "seller" ? "Contact Seller" : "Contact Buyer";

  function handleOpen() {
    if (!isLoggedIn) {
      toast.info(`Sign in to contact this ${role}`);
      openAuthModal();
      return;
    }
    setOpen(true);
  }

  return (
    <>
      {/* Desktop CTA — sits inline inside the right column */}
      <Button
        size="lg"
        className="w-full hidden lg:flex gap-2 font-semibold"
        onClick={handleOpen}
      >
        <MessageCircle className="size-4" />
        {label}
      </Button>

      {/* Mobile / tablet sticky CTA — fixed above bottom nav */}
      <div className="lg:hidden fixed bottom-[90px] left-4 right-4 z-20">
        <Button
          size="lg"
          className="w-full gap-2 font-semibold shadow-2xl shadow-primary/30"
          onClick={handleOpen}
        >
          <MessageCircle className="size-4" />
          {label}
        </Button>
      </div>

      <ContactModal
        open={open}
        onClose={() => setOpen(false)}
        contact={contact}
        product={product}
        role={role}
      />
    </>
  );
}
