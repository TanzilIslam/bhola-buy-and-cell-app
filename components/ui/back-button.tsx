"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-2 gap-1.5 text-muted-foreground hover:text-foreground"
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-4" />
      Back
    </Button>
  );
};
