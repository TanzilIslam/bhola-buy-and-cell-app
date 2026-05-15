import type { ProductCategory } from "@/types/modals";

// ─── User Profile ─────────────────────────────────────────────────────────────

export interface UserProfile {
  name: string;
  handle: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  memberSince: string;
  bio: string;
  stats: {
    bought: number;
    sold: number;
    spent: number;
    earned: number;
  };
}

export const currentUser: UserProfile = {
  name: "Bhola Ahmed",
  handle: "@bhola.ahmed",
  email: "bhola.ahmed@gmail.com",
  phone: "+880 1711-234567",
  avatar: "https://i.pravatar.cc/150?img=68",
  location: "Dhaka, Bangladesh",
  memberSince: "January 2024",
  bio: "Tech enthusiast buying and selling second-hand electronics. I believe great gadgets should find new homes instead of collecting dust. Always open to good deals!",
  stats: { bought: 12, sold: 8, spent: 4820, earned: 3650 },
};

// ─── Bought Items ─────────────────────────────────────────────────────────────

export type PurchaseStatus = "delivered" | "in_transit" | "processing";

export interface BoughtItem {
  id: string;
  productName: string;
  productCategory: ProductCategory;
  imageUrl: string;
  price: number;
  seller: { name: string; avatar: string };
  purchasedAt: string;
  status: PurchaseStatus;
}

export const boughtItems: BoughtItem[] = [
  {
    id: "bi-1",
    productName: "MacBook Pro 14-inch M3",
    productCategory: "Laptop",
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop",
    price: 1450,
    seller: { name: "David Park", avatar: "https://i.pravatar.cc/150?img=12" },
    purchasedAt: "May 10, 2026",
    status: "delivered",
  },
  {
    id: "bi-2",
    productName: "iPhone 15 Pro — 256 GB",
    productCategory: "Phone",
    imageUrl:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop",
    price: 780,
    seller: { name: "Nina Torres", avatar: "https://i.pravatar.cc/150?img=9" },
    purchasedAt: "May 5, 2026",
    status: "delivered",
  },
  {
    id: "bi-3",
    productName: "Sony A7C II (body only)",
    productCategory: "Camera",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop",
    price: 1620,
    seller: { name: "Aisha Malik", avatar: "https://i.pravatar.cc/150?img=44" },
    purchasedAt: "May 13, 2026",
    status: "in_transit",
  },
  {
    id: "bi-4",
    productName: "iPad Pro 12.9\" M2",
    productCategory: "Tablet",
    imageUrl:
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=600&auto=format&fit=crop",
    price: 740,
    seller: { name: "Ethan Wright", avatar: "https://i.pravatar.cc/150?img=60" },
    purchasedAt: "May 14, 2026",
    status: "processing",
  },
  {
    id: "bi-5",
    productName: "PlayStation 5 Disc Edition",
    productCategory: "Gaming Console",
    imageUrl:
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&auto=format&fit=crop",
    price: 380,
    seller: { name: "Carlos Rivera", avatar: "https://i.pravatar.cc/150?img=52" },
    purchasedAt: "Apr 28, 2026",
    status: "delivered",
  },
  {
    id: "bi-6",
    productName: 'LG UltraWide 34" Monitor',
    productCategory: "Desktop",
    imageUrl:
      "https://images.unsplash.com/photo-1527443224154-c4a573d5f5ec?w=600&auto=format&fit=crop",
    price: 420,
    seller: { name: "Lily Zhang", avatar: "https://i.pravatar.cc/150?img=38" },
    purchasedAt: "Apr 20, 2026",
    status: "delivered",
  },
];

// ─── Sold Listings ────────────────────────────────────────────────────────────

export type SaleStatus = "completed" | "pending_pickup" | "shipped";

export interface SoldItem {
  id: string;
  productName: string;
  productCategory: ProductCategory;
  imageUrl: string;
  price: number;
  buyer: { name: string; avatar: string };
  soldAt: string;
  status: SaleStatus;
}

export const soldItems: SoldItem[] = [
  {
    id: "si-1",
    productName: "Dell XPS 15 (2022)",
    productCategory: "Laptop",
    imageUrl:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop",
    price: 980,
    buyer: { name: "Alex Johnson", avatar: "https://i.pravatar.cc/150?img=11" },
    soldAt: "May 8, 2026",
    status: "completed",
  },
  {
    id: "si-2",
    productName: "Samsung Galaxy S23",
    productCategory: "Phone",
    imageUrl:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop",
    price: 460,
    buyer: { name: "Sarah Lee", avatar: "https://i.pravatar.cc/150?img=5" },
    soldAt: "May 12, 2026",
    status: "shipped",
  },
  {
    id: "si-3",
    productName: "Canon EOS R50 + Kit Lens",
    productCategory: "Camera",
    imageUrl:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&auto=format&fit=crop",
    price: 620,
    buyer: { name: "Priya Nair", avatar: "https://i.pravatar.cc/150?img=25" },
    soldAt: "May 14, 2026",
    status: "pending_pickup",
  },
  {
    id: "si-4",
    productName: "Xbox Series X Bundle",
    productCategory: "Gaming Console",
    imageUrl:
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=600&auto=format&fit=crop",
    price: 420,
    buyer: { name: "Jordan Kim", avatar: "https://i.pravatar.cc/150?img=33" },
    soldAt: "Apr 30, 2026",
    status: "completed",
  },
  {
    id: "si-5",
    productName: 'Samsung 65" QLED TV',
    productCategory: "TV",
    imageUrl:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop",
    price: 750,
    buyer: { name: "Olivia Chen", avatar: "https://i.pravatar.cc/150?img=47" },
    soldAt: "Apr 22, 2026",
    status: "completed",
  },
  {
    id: "si-6",
    productName: "iPad Air (5th Gen)",
    productCategory: "Tablet",
    imageUrl:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop",
    price: 420,
    buyer: { name: "Marcus Brown", avatar: "https://i.pravatar.cc/150?img=17" },
    soldAt: "May 15, 2026",
    status: "pending_pickup",
  },
];

export interface BuyRequest {
  id: string;
  userName: string;
  userAvatar: string;
  userPhone: string;
  userEmail: string;
  productCategory: ProductCategory;
  productName: string;
  description?: string;
  viewingLocation: "my_place" | "seller_place";
  address: string;
  postedAt: string;
}

export interface SellListing {
  id: string;
  userName: string;
  userAvatar: string;
  userPhone: string;
  userEmail: string;
  productCategory: ProductCategory;
  productName: string;
  description?: string;
  price: number;
  viewingLocation: "my_place" | "buyer_place";
  address: string;
  imageUrl: string;
  postedAt: string;
}

export const buyRequests: BuyRequest[] = [
  {
    id: "br-1",
    userName: "Alex Johnson",
    userAvatar: "https://i.pravatar.cc/150?img=11",
    userPhone: "+1 212-555-0101",
    userEmail: "alex.johnson@email.com",
    productCategory: "Laptop",
    productName: "MacBook Pro 14-inch M3",
    description:
      "Looking for M2 or M3 chip, 16 GB RAM minimum. Minor cosmetic scratches are fine.",
    viewingLocation: "my_place",
    address: "123 Main St, New York, NY",
    postedAt: "May 12, 2026",
  },
  {
    id: "br-2",
    userName: "Sarah Lee",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    userPhone: "+1 718-555-0102",
    userEmail: "sarah.lee@email.com",
    productCategory: "Phone",
    productName: "iPhone 15 Pro",
    description:
      "Any colour, good condition. Original box and charger preferred.",
    viewingLocation: "seller_place",
    address: "456 Oak Ave, Brooklyn, NY",
    postedAt: "May 11, 2026",
  },
  {
    id: "br-3",
    userName: "Marcus Brown",
    userAvatar: "https://i.pravatar.cc/150?img=17",
    userPhone: "+1 718-555-0103",
    userEmail: "marcus.brown@email.com",
    productCategory: "Tablet",
    productName: "iPad Pro 12.9\" (2022+)",
    description:
      "Need it for digital art. Apple Pencil compatibility is a must.",
    viewingLocation: "my_place",
    address: "789 Pine Rd, Queens, NY",
    postedAt: "May 10, 2026",
  },
  {
    id: "br-4",
    userName: "Priya Nair",
    userAvatar: "https://i.pravatar.cc/150?img=25",
    userPhone: "+1 212-555-0104",
    userEmail: "priya.nair@email.com",
    productCategory: "Camera",
    productName: "Sony A7 IV / A7C",
    description:
      "Full-frame mirrorless. Low shutter count preferred. Kit lens is a plus.",
    viewingLocation: "seller_place",
    address: "321 Maple Blvd, Manhattan, NY",
    postedAt: "May 9, 2026",
  },
  {
    id: "br-5",
    userName: "Jordan Kim",
    userAvatar: "https://i.pravatar.cc/150?img=33",
    userPhone: "+1 973-555-0105",
    userEmail: "jordan.kim@email.com",
    productCategory: "Gaming Console",
    productName: "PlayStation 5 Disc Edition",
    description: "Standard disc edition only. Can pick up anywhere in NJ.",
    viewingLocation: "seller_place",
    address: "654 Elm St, Newark, NJ",
    postedAt: "May 8, 2026",
  },
  {
    id: "br-6",
    userName: "Olivia Chen",
    userAvatar: "https://i.pravatar.cc/150?img=47",
    userPhone: "+1 201-555-0106",
    userEmail: "olivia.chen@email.com",
    productCategory: "Desktop",
    productName: "Mac Mini M2 Pro",
    description:
      "Looking for a Mac Mini M2 Pro or M2 Max, 16 GB+ RAM. Must include power cable.",
    viewingLocation: "my_place",
    address: "987 Cedar Lane, Hoboken, NJ",
    postedAt: "May 7, 2026",
  },
];

export const sellListings: SellListing[] = [
  {
    id: "sl-1",
    userName: "David Park",
    userAvatar: "https://i.pravatar.cc/150?img=12",
    userPhone: "+1 212-555-0201",
    userEmail: "david.park@email.com",
    productCategory: "Laptop",
    productName: "Dell XPS 15 (2023)",
    description:
      "Intel i7-13700H, 32 GB RAM, 1 TB SSD, OLED display. Barely used, comes with original box and charger.",
    price: 1100,
    viewingLocation: "my_place",
    address: "55 West 23rd St, New York, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop",
    postedAt: "May 13, 2026",
  },
  {
    id: "sl-2",
    userName: "Nina Torres",
    userAvatar: "https://i.pravatar.cc/150?img=9",
    userPhone: "+1 718-555-0202",
    userEmail: "nina.torres@email.com",
    productCategory: "Phone",
    productName: "Samsung Galaxy S24 Ultra",
    description:
      "256 GB, Titanium Black. 9/10 condition, no cracks, S Pen included. Selling because I switched to iPhone.",
    price: 850,
    viewingLocation: "buyer_place",
    address: "200 Park Ave, New York, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop",
    postedAt: "May 12, 2026",
  },
  {
    id: "sl-3",
    userName: "Ethan Wright",
    userAvatar: "https://i.pravatar.cc/150?img=60",
    userPhone: "+1 718-555-0203",
    userEmail: "ethan.wright@email.com",
    productCategory: "Tablet",
    productName: "Samsung Galaxy Tab S9+",
    description:
      "12.4\" AMOLED, 256 GB, WiFi + 5G. Comes with S Pen and book cover. Perfect condition.",
    price: 620,
    viewingLocation: "my_place",
    address: "1 Flatbush Ave, Brooklyn, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop",
    postedAt: "May 11, 2026",
  },
  {
    id: "sl-4",
    userName: "Aisha Malik",
    userAvatar: "https://i.pravatar.cc/150?img=44",
    userPhone: "+1 212-555-0204",
    userEmail: "aisha.malik@email.com",
    productCategory: "Camera",
    productName: "Canon EOS R6 Mark II",
    description:
      "Body only, 3,500 shutter count. Comes with extra battery, charger, and original strap. No marks.",
    price: 1900,
    viewingLocation: "my_place",
    address: "80 Spring St, Manhattan, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop",
    postedAt: "May 10, 2026",
  },
  {
    id: "sl-5",
    userName: "Carlos Rivera",
    userAvatar: "https://i.pravatar.cc/150?img=52",
    userPhone: "+1 718-555-0205",
    userEmail: "carlos.rivera@email.com",
    productCategory: "Gaming Console",
    productName: "Xbox Series X",
    description:
      "1 TB, includes two controllers and 10 game codes. Moving abroad — must sell fast.",
    price: 390,
    viewingLocation: "buyer_place",
    address: "500 Grand Concourse, Bronx, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=600&auto=format&fit=crop",
    postedAt: "May 9, 2026",
  },
  {
    id: "sl-6",
    userName: "Lily Zhang",
    userAvatar: "https://i.pravatar.cc/150?img=38",
    userPhone: "+1 718-555-0206",
    userEmail: "lily.zhang@email.com",
    productCategory: "TV",
    productName: 'LG C3 OLED 55"',
    description:
      "2023 model, 4K 120Hz, perfect for gaming and movies. Wall-mount bracket included.",
    price: 950,
    viewingLocation: "my_place",
    address: "230 Flushing Ave, Queens, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop",
    postedAt: "May 8, 2026",
  },
];
