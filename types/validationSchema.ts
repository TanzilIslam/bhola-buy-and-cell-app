import { z } from "zod";

// ─── Shared ───────────────────────────────────────────────────────────────────

const productCategorySchema = z.enum([
  "Laptop",
  "Phone",
  "Tablet",
  "Desktop",
  "Camera",
  "TV",
  "Gaming Console",
  "Other",
]);

// ─── Buy ──────────────────────────────────────────────────────────────────────

export const buyFormSchema = z.object({
  productCategory: productCategorySchema,
  productName: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be at most 100 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
  viewingLocation: z.enum(["my_place", "seller_place"], {
    required_error: "Please select where you want to view the product",
  }),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(255, "Address must be at most 255 characters"),
});

/** Inferred type from buyFormSchema — use instead of BuyFormData where a zod type is needed */
export type BuyFormValues = z.infer<typeof buyFormSchema>;

// ─── Sell ─────────────────────────────────────────────────────────────────────

export const sellFormSchema = z.object({
  productCategory: productCategorySchema,
  productName: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be at most 100 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than 0")
    .max(1_000_000, "Price seems too high — please double-check"),
  viewingLocation: z.enum(["my_place", "buyer_place"], {
    required_error: "Please select where you want to show the product",
  }),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(255, "Address must be at most 255 characters"),
});

/** Inferred type from sellFormSchema — use instead of SellFormData where a zod type is needed */
export type SellFormValues = z.infer<typeof sellFormSchema>;

// ─── Login ────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// ─── Sign Up ──────────────────────────────────────────────────────────────────

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(/^\+?[\d\s\-()]+$/, "Please enter a valid phone number"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
