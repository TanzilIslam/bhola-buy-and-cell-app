"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ImageIcon, Upload, X } from "lucide-react";
import type { SellModalProps } from "@/types/modals";
import { sellFormSchema, type SellFormValues } from "@/types/validationSchema";

const PRODUCT_CATEGORIES = [
  "Laptop",
  "Phone",
  "Tablet",
  "Desktop",
  "Camera",
  "TV",
  "Gaming Console",
  "Other",
] as const;

// ─── Image Upload ─────────────────────────────────────────────────────────────

function ImageUpload({
  value,
  onChange,
}: {
  value: File | null;
  onChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }
  function handleDragLeave() {
    setIsDragging(false);
  }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) onChange(file);
  }
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onChange(file);
    e.target.value = "";
  }

  if (previewUrl && value) {
    return (
      <div className="relative h-40 rounded-xl overflow-hidden border border-border bg-muted">
        <Image
          src={previewUrl}
          alt="Product preview"
          fill
          sizes="100%"
          className="object-cover"
        />
        {/* Gradient overlay for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* File info */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-2">
          <p className="text-white text-xs font-medium truncate">{value.name}</p>
          <p className="text-white/70 text-[10px]">
            {(value.size / 1024 / 1024).toFixed(1)} MB
          </p>
        </div>
        {/* Remove button */}
        <button
          type="button"
          onClick={() => onChange(null)}
          className="absolute top-2 right-2 size-7 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          aria-label="Remove image"
        >
          <X className="size-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "h-40 flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-all select-none",
        isDragging
          ? "border-primary bg-primary/5 scale-[0.99]"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      <div
        className={cn(
          "size-11 rounded-xl flex items-center justify-center transition-colors",
          isDragging ? "bg-primary/15" : "bg-muted"
        )}
      >
        {isDragging ? (
          <Upload className="size-5 text-primary" />
        ) : (
          <ImageIcon className="size-5 text-muted-foreground" />
        )}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">
          {isDragging ? "Drop it here" : "Click or drag to upload"}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          PNG, JPG, WebP — up to 10 MB
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

// ─── Sell Modal ───────────────────────────────────────────────────────────────

export const SellModal = ({ isOpen, onClose }: SellModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<SellFormValues>({
    resolver: zodResolver(sellFormSchema),
    defaultValues: {
      productName: "",
      description: "",
      price: 0,
      address: "",
    },
  });

  function onSubmit(values: SellFormValues) {
    // TODO: need to connect save in supabase
    // TODO: upload imageFile to Supabase Storage and store the returned URL
    console.log(values, imageFile);
    form.reset();
    setImageFile(null);
    onClose();
    toast.success("Listing posted!", {
      description: `"${values.productName}" is now live in the marketplace.`,
    });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal panel */}
      <div className="relative bg-background rounded-lg p-6 w-full max-w-md mx-4 shadow-lg border border-border overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Want to Sell</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            {/* Product category */}
            <FormField
              control={form.control}
              name="productCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Specific product name */}
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Dell XPS 15" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Condition / specs */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition &amp; Details</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Describe the condition, specs, accessories included..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Photo */}
            <div className="grid gap-1.5">
              <label className="text-sm font-medium leading-none">
                Photo{" "}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <ImageUpload value={imageFile} onChange={setImageFile} />
            </div>

            {/* Asking price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asking Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="e.g. 500"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Where to show the product */}
            <FormField
              control={form.control}
              name="viewingLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Where to Show</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select showing location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="my_place">My Place</SelectItem>
                      <SelectItem value="buyer_place">Buyer&apos;s Place</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2 w-full">
              List for Sale
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
