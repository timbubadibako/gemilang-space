import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DaytimeThemeProvider } from "@/lib/daytime-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gemilang — Digital Engineering & Product Design Studio",
  description:
    "Gemilang is a founder-led engineering & design partner helping modern tech companies build digital products, web platforms, and scalable systems.",
  icons: {
    icon: "/favicon.ico",
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
        <DaytimeThemeProvider>{children}</DaytimeThemeProvider>
      </body>
    </html>
  );
}
