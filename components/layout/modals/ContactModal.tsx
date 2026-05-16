"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Mail, Phone, MessageSquare, ShoppingCart, Tag } from "lucide-react";

export interface ContactInfo {
  name: string;
  avatar: string;
  phone: string;
  email: string;
}

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  contact: ContactInfo;
  product: string;
  role: "seller" | "buyer";
}

export function ContactModal({ open, onClose, contact, product, role }: ContactModalProps) {
  const [copied, setCopied] = useState(false);

  const whatsappNumber = contact.phone.replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent(
    role === "seller"
      ? `Hi ${contact.name}! I saw your listing for "${product}" and I'm interested. Is it still available?`
      : `Hi ${contact.name}! I saw you're looking for "${product}". I might have one — let's talk!`
  );

  const copyPhone = async () => {
    await navigator.clipboard.writeText(contact.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm p-0 overflow-hidden">
        {/* ── Gradient header ──────────────────────────────────── */}
        <div className="relative bg-gradient-to-br from-primary/20 via-background to-[#D247BF]/15 px-6 pt-8 pb-6 text-center">
          <div className="pointer-events-none absolute -top-10 -right-10 size-36 rounded-full bg-primary/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 size-28 rounded-full bg-[#D247BF]/10 blur-2xl" />

          <div className="relative">
            <Avatar className="size-20 mx-auto ring-4 ring-background shadow-xl mb-3">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback className="text-2xl font-bold">
                {contact.name[0]}
              </AvatarFallback>
            </Avatar>

            <Badge variant="secondary" className="mb-2 gap-1.5 text-xs">
              {role === "seller" ? (
                <><Tag className="size-3" /> Seller</>
              ) : (
                <><ShoppingCart className="size-3" /> Buyer</>
              )}
            </Badge>

            <DialogHeader>
              <DialogTitle className="text-xl font-bold">{contact.name}</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1 px-4">
              {product}
            </p>
          </div>
        </div>

        {/* ── Contact actions ──────────────────────────────────── */}
        <div className="p-4 space-y-2.5">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl px-4 py-3.5 font-semibold text-sm transition-colors"
          >
            <MessageSquare className="size-5 shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(product)}`}
            className="flex items-center gap-3 w-full border border-border hover:bg-muted/60 rounded-xl px-4 py-3.5 text-sm transition-colors"
          >
            <Mail className="size-5 text-primary shrink-0" />
            <span className="truncate font-medium">{contact.email}</span>
          </a>

          {/* Phone + copy */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3 flex-1 border border-border rounded-xl px-4 py-3.5 text-sm">
              <Phone className="size-5 text-primary shrink-0" />
              <span className="font-medium">{contact.phone}</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="size-[52px] rounded-xl shrink-0"
              onClick={copyPhone}
              title={copied ? "Copied!" : "Copy number"}
            >
              {copied ? (
                <Check className="size-4 text-green-500" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </div>

          <p className="text-[11px] text-muted-foreground text-center pt-1">
            Always meet in a safe, public place.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
