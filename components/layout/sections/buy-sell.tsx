"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BuyModal } from "@/components/layout/modals/BuyModal";
import { SellModal } from "@/components/layout/modals/SellModal";
import { useAuth } from "@/contexts/auth-context";

export const BuySellSection = () => {
  const { isLoggedIn, openAuthModal } = useAuth();
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const [isSellOpen, setIsSellOpen] = useState(false);

  function handleBuy() {
    if (!isLoggedIn) {
      toast.info("Sign in to post a buy request");
      openAuthModal();
      return;
    }
    setIsBuyOpen(true);
  }

  function handleSell() {
    if (!isLoggedIn) {
      toast.info("Sign in to list an item for sale");
      openAuthModal();
      return;
    }
    setIsSellOpen(true);
  }

  return (
    <section className="container py-12 flex justify-center">
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="font-bold" onClick={handleBuy}>
          Want to Buy
        </Button>
        <Button size="lg" variant="secondary" className="font-bold" onClick={handleSell}>
          Want to Sell
        </Button>
      </div>

      <BuyModal isOpen={isBuyOpen} onClose={() => setIsBuyOpen(false)} />
      <SellModal isOpen={isSellOpen} onClose={() => setIsSellOpen(false)} />
    </section>
  );
};
