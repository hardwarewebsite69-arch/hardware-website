import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Inter } from "next/font/google";
import { siteUrl, siteName, siteDescription, siteLocale, jsonLd, organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";
import { Header } from "@/components/Header";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { QuoteCartProvider } from "@/components/QuoteCartContext";
import { FloatingActions } from "@/components/homepage/FloatingActions";
import { SettingsProvider } from "@/components/SettingsContext";
import { getSettings } from "@/lib/catalog";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteName} — Industrial Hardware Supplies in Kenya`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteName} — Industrial Hardware Supplies in Kenya`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: siteLocale,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-default.png`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Industrial Hardware Supplies in Kenya`,
    description: siteDescription,
    images: [`${siteUrl}/og-default.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/hardware-logo.png",
    apple: "/hardware-logo.png",
  },
  manifest: "/manifest.json",
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
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${plusJakartaSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(organizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(websiteSchema()),
          }}
        />
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <SettingsProvider initialSettings={settings}>
          <QuoteCartProvider>
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
            {/*
              FloatingActions MUST live OUTSIDE SmoothScrollProvider.
              Lenis applies transform: translateY() to its scroll wrapper,
              which creates a new CSS stacking context. Any position:fixed
              element nested inside a transformed ancestor loses its
              viewport-relative positioning and scrolls with the page.
              Placing FloatingActions here (as a sibling, not a child of
              SmoothScrollProvider) keeps it in the root stacking context
              so fixed positioning works correctly on all browsers.
            */}
            <FloatingActions />
          </QuoteCartProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}

