import type { ProductCategory } from "@/types/modals";

export interface BuyRequest {
  id: string;
  userName: string;
  userAvatar: string;
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
