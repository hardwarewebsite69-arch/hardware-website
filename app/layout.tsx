import type { Metadata } from "next";
import { Geist, Geist_Mono, Hanken_Grotesk, Inter } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";
import { Header } from "@/components/Header";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { QuoteCartProvider } from "@/components/QuoteCartContext";
import { FloatingActions } from "@/components/homepage/FloatingActions";
import { SettingsProvider } from "@/components/SettingsContext";
import { getSettings } from "@/lib/catalog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amroz Traders — Industrial Hardware Supplies in Kenya",
  description:
    "Kenya's trusted supplier of construction hardware, electrical supplies, power tools, PPE and building materials. Get instant BOQ quotes, bulk pricing, and nationwide delivery.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${hankenGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <SettingsProvider initialSettings={settings}>
          <QuoteCartProvider>
            {children}
            <FloatingActions />
          </QuoteCartProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}

