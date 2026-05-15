// ─── Shared ───────────────────────────────────────────────────────────────────

export type ProductCategory =
  | "Laptop"
  | "Phone"
  | "Tablet"
  | "Desktop"
  | "Camera"
  | "TV"
  | "Gaming Console"
  | "Other";

// ─── Buy ──────────────────────────────────────────────────────────────────────

/** Where the buyer wants to inspect the product */
export type BuyerViewingLocation = "my_place" | "seller_place";

/** Data the buyer fills in when they want to purchase a product */
export interface BuyFormData {
  /** Broad category of the product they are looking for */
  productCategory: ProductCategory;
  /** Specific product name or model (e.g. "MacBook Pro 14") */
  productName: string;
  /** Any extra requirements or notes about the product */
  description?: string;
  /** Whether they want to see the product at their address or the seller's */
  viewingLocation: BuyerViewingLocation;
  /** Address for the viewing — their own or the seller's, depending on viewingLocation */
  address: string;
}

/** Props accepted by the BuyModal component */
export interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Sell ─────────────────────────────────────────────────────────────────────

/** Where the seller wants to show the product to the buyer */
export type SellerViewingLocation = "my_place" | "buyer_place";

/** Data the seller fills in when they want to list a product for sale */
export interface SellFormData {
  /** Broad category of the product being sold */
  productCategory: ProductCategory;
  /** Specific product name or model (e.g. "Dell XPS 15") */
  productName: string;
  /** Condition, specs, or any other details about the product */
  description?: string;
  /** Asking price in the local currency */
  price: number;
  /** Whether they want to show the product at their address or the buyer's */
  viewingLocation: SellerViewingLocation;
  /** Address for the viewing — their own or the buyer's, depending on viewingLocation */
  address: string;
}

/** Props accepted by the SellModal component */
export interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

/** Props accepted by the AuthModal component */
export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Which tab to open first */
  defaultTab?: "login" | "signup";
}
