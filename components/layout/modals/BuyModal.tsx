"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { BuyModalProps } from "@/types/modals";

// Modal shown when the user clicks "Want to Buy"
export const BuyModal = ({ isOpen, onClose }: BuyModalProps) => {
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
          <h2 className="text-2xl font-bold">Want to Buy</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>
        {/* Content goes here */}
      </div>
    </div>
  );
};
