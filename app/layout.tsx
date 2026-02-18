import type { Metadata, Viewport } from "next";
import { Crimson_Text, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-baby",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const crimson = Crimson_Text({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "The Professor's Archives | Uncovered History",
  description:
    "Uncovering hidden history about WWI, WWII, The League of Nations, and African Independence. Global events. African perspectives. Explained vividly.",
  keywords: [
    "African history",
    "WWI",
    "WWII",
    "League of Nations",
    "African Independence",
    "colonial history",
    "hidden history",
  ],
  authors: [{ name: "The Professor" }],
  openGraph: {
    title: "The Professor's Archives",
    description: "Global events. African perspectives. Explained vividly.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F0E8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${crimson.variable}`}>
      <body className="font-serif bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
