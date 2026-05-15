import { BuySellSection } from "@/components/layout/sections/buy-sell";
import { MarketplaceTabs } from "@/components/layout/sections/marketplace-tabs";

export const metadata = {
  title: "Bhola Buy & Cell",
  description: "Buy and sell second-hand products in your area",
};

export default function Home() {
  return (
    <>
      <BuySellSection />
      <MarketplaceTabs />
    </>
  );
}
