"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Modal shown when the user clicks "Want to Sell"
export const SellModal = ({ isOpen, onClose }: SellModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative bg-background rounded-lg p-6 w-full max-w-md mx-4 shadow-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Want to Sell</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>
        {/* Content goes here */}
      </div>
    </div>
  );
};
