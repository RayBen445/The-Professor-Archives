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
  published_date: string | null;
  country: string | null;
  region: string | null;
  read_time: number | null;
  tags: string | null;
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
  | "The Commonwealth"
  | "Nigeria"
  | "Grammy"
  | "Guinness Records"
  | "Cold War"
  | "Sports"
  | "Science & Tech"
  | "Women in History"
  | "European History";

export const CATEGORIES: Category[] = [
  "All",
  "WWI",
  "WWII",
  "League of Nations",
  "Independence",
  "The Commonwealth",
  "Nigeria",
  "Grammy",
  "Guinness Records",
  "Cold War",
  "Sports",
  "Science & Tech",
  "Women in History",
  "European History",
];

export const CATEGORY_IMAGES: Record<string, string> = {
  WWI: "/images/east-africa-front.jpg",
  WWII: "/images/african-soldiers-wwii.jpg",
  "League of Nations": "/images/league-of-nations.jpg",
  Independence: "/images/africa-independence.jpg",
  "The Commonwealth": "/images/commonwealth.jpg",
  Nigeria: "/images/africa-independence.jpg",
  Grammy: "/images/hero-bg.jpg",
  "Guinness Records": "/images/hero-bg.jpg",
  "Cold War": "/images/berlin-conference.jpg",
  Sports: "/images/hero-bg.jpg",
  "Science & Tech": "/images/hero-bg.jpg",
  "Women in History": "/images/africa-independence.jpg",
  "European History": "/images/berlin-conference.jpg",
};

export const CATEGORY_COLORS: Record<string, string> = {
  WWI: "from-red-900/80 to-red-700/60",
  WWII: "from-amber-900/80 to-amber-700/60",
  "League of Nations": "from-blue-900/80 to-blue-800/60",
  Independence: "from-green-900/80 to-green-700/60",
  "The Commonwealth": "from-purple-900/80 to-purple-700/60",
  Nigeria: "from-emerald-900/80 to-emerald-600/60",
  Grammy: "from-yellow-900/80 to-yellow-600/60",
  "Guinness Records": "from-sky-900/80 to-sky-600/60",
  "Cold War": "from-slate-900/80 to-slate-600/60",
  Sports: "from-orange-900/80 to-orange-600/60",
  "Science & Tech": "from-cyan-900/80 to-cyan-600/60",
  "Women in History": "from-pink-900/80 to-pink-600/60",
  "European History": "from-stone-900/80 to-stone-600/60",
};

export const REGIONS = [
  "Africa",
  "Europe",
  "Global",
  "Nigeria",
  "Americas",
  "Asia",
] as const;

export type Region = typeof REGIONS[number];

export function formatFullDate(dateStr: string | null): string {
  if (!dateStr) return "Unknown date";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getReadTime(content: string, readTime: number | null): number {
  if (readTime) return readTime;
  return Math.max(3, Math.ceil(content.split(" ").length / 200));
}
