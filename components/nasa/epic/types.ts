export type EpicColor = "natural" | "enhanced";
export type EpicMode = "recent" | "date" | "all" | "available";

export type EpicImageMeta = {
  identifier: string;
  caption: string;
  image: string;
  date: string; // "YYYY-MM-DD HH:mm:ss"
  centroid_coordinates: { lat: number; lon: number };
};

export type EpicDateEntry = { date: string };
