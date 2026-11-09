import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DaytimeThemeProvider } from "@/lib/daytime-context";
import { CMSProvider } from "@/lib/cms-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://gemilang-space.vercel.app"
  ),
  title: "Gemilang Space — Digital Engineering & Product Design Studio",
  description:
    "Partner rekayasa teknologi founder-led: Website toko cepat, sistem kasir (POS), otomasi WhatsApp bisnis & tim IT on-demand bulanan. Garansi 30 hari bug-free.",
  keywords: [
    "Gemilang Space",
    "Software House Kuningan",
    "Sistem Kasir POS Offline First",
    "Jasa Pembuatan Website Toko",
    "Otomasi WhatsApp",
    "Tim IT Bulanan",
    "Next.js Developer Indonesia",
  ],
  authors: [{ name: "Syifa Pajril Yaum", url: "https://gemilang-space.vercel.app" }],
  creator: "Gemilang Space",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/gemilang-mark.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/gemilang-mark.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://gemilang-space.vercel.app",
    siteName: "Gemilang Space",
    title: "Gemilang Space — Digital Engineering & Product Design Studio",
    description:
      "Partner rekayasa teknologi founder-led: Website toko cepat, sistem kasir (POS), otomasi WhatsApp bisnis & tim IT on-demand bulanan. Garansi 30 hari bug-free.",
    images: [
      {
        url: "/images/gemilang-og.png",
        width: 1200,
        height: 630,
        alt: "Gemilang Space — Digital Engineering & Product Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gemilang Space — Digital Engineering & Product Design Studio",
    description:
      "Partner rekayasa teknologi founder-led: Website toko cepat, sistem kasir (POS), otomasi WhatsApp bisnis & tim IT on-demand bulanan.",
    images: ["/images/gemilang-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#04060A] text-white">
        <DaytimeThemeProvider>
          <CMSProvider>{children}</CMSProvider>
        </DaytimeThemeProvider>
      </body>
    </html>
  );
}
