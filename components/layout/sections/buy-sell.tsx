"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BuyModal } from "@/components/layout/modals/BuyModal";
import { SellModal } from "@/components/layout/modals/SellModal";

// Buy/Sell section: two centered CTA buttons that open their respective modals
export const BuySellSection = () => {
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const [isSellOpen, setIsSellOpen] = useState(false);

  return (
    <section className="container py-12 flex justify-center">
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="font-bold" onClick={() => setIsBuyOpen(true)}>
          Want to Buy
        </Button>
        <Button
          size="lg"
          variant="secondary"
          className="font-bold"
          onClick={() => setIsSellOpen(true)}
        >
          Want to Sell
        </Button>
      </div>

      <BuyModal isOpen={isBuyOpen} onClose={() => setIsBuyOpen(false)} />
      <SellModal isOpen={isSellOpen} onClose={() => setIsSellOpen(false)} />
    </section>
  );
};
