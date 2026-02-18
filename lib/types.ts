export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string | null;
  is_featured: boolean;
  published: boolean;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface TimelineEvent {
  id: number;
  year: number;
  title: string;
  description: string;
  category: string;
  sort_order: number;
  created_at: string;
}

export type Category =
  | "All"
  | "WWI"
  | "WWII"
  | "League of Nations"
  | "Independence"
  | "The Commonwealth";

export const CATEGORIES: Category[] = [
  "All",
  "WWI",
  "WWII",
  "League of Nations",
  "Independence",
  "The Commonwealth",
];

export const CATEGORY_IMAGES: Record<string, string> = {
  WWI: "/images/east-africa-front.jpg",
  WWII: "/images/african-soldiers-wwii.jpg",
  "League of Nations": "/images/league-of-nations.jpg",
  Independence: "/images/africa-independence.jpg",
  "The Commonwealth": "/images/commonwealth.jpg",
};
