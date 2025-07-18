import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AquaFarm Pro - Smart Fish Pond Management",
  description: "Revolutionize your aquaculture operations with smart monitoring, automation, and AI-driven insights for optimal fish pond management.",
  keywords: "fish pond management, aquaculture, smart farming, water quality monitoring, fish health, pond automation, aquafarming, fish production",
  authors: [{ name: "AquaFarm Pro Team" }],
  creator: "AquaFarm Pro",
  publisher: "AquaFarm Pro",
  openGraph: {
    title: "AquaFarm Pro - Smart Fish Pond Management",
    description: "Revolutionize your aquaculture operations with smart monitoring, automation, and AI-driven insights for optimal fish pond management.",
    type: "website",
    locale: "en_US",
    siteName: "AquaFarm Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "AquaFarm Pro - Smart Fish Pond Management",
    description: "Revolutionize your aquaculture operations with smart monitoring, automation, and AI-driven insights for optimal fish pond management.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
