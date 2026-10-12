import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gemilang Space — Digital Engineering & Product Design Studio",
  description:
    "Gemilang Space is a founder-led engineering & design partner helping modern tech companies build digital products, web platforms, and scalable systems.",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#04060A] text-white">
        {children}
      </body>
    </html>
  );
}
