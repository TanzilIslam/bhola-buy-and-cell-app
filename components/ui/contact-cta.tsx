"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { ContactModal, type ContactInfo } from "@/components/layout/modals/ContactModal";

interface ContactCTAProps {
  contact: ContactInfo;
  product: string;
  role: "seller" | "buyer";
}

export function ContactCTA({ contact, product, role }: ContactCTAProps) {
  const [open, setOpen] = useState(false);
  const label = role === "seller" ? "Contact Seller" : "Contact Buyer";

  return (
    <>
      {/* Desktop CTA — sits inline inside the right column */}
      <Button
        size="lg"
        className="w-full hidden lg:flex gap-2 font-semibold"
        onClick={() => setOpen(true)}
      >
        <MessageCircle className="size-4" />
        {label}
      </Button>

      {/* Mobile / tablet sticky CTA — fixed above bottom nav */}
      <div className="lg:hidden fixed bottom-[90px] left-4 right-4 z-20">
        <Button
          size="lg"
          className="w-full gap-2 font-semibold shadow-2xl shadow-primary/30"
          onClick={() => setOpen(true)}
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
