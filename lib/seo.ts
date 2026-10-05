import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amroztraders.com";
export const siteName = "Amroz Traders";
export const siteDescription =
  "Kenya's trusted supplier of construction hardware, electrical supplies, power tools, PPE and building materials. Get instant BOQ quotes, bulk pricing, and nationwide delivery.";
export const siteLocale = "en_KE";

export function canonical(url: string): string {
  const base = siteUrl.replace(/\/+$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${base}${path}`;
}

export function createMetadata(overrides: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const url = canonical(overrides.path);
  const images = overrides.ogImage
    ? [{ url: overrides.ogImage, width: 1200, height: 630, alt: overrides.title }]
    : [{ url: `${siteUrl}/og-default.png`, width: 1200, height: 630, alt: siteName }];

  return {
    title: overrides.title,
    description: overrides.description,
    alternates: { canonical: url },
    openGraph: {
      title: overrides.title,
      description: overrides.description,
      url,
      siteName,
      locale: siteLocale,
      type: overrides.ogType ?? "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: overrides.title,
      description: overrides.description,
      images: images.map((i) => i.url),
    },
    robots: overrides.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function jsonLd<T>(schema: T): string {
  return JSON.stringify(schema);
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/hardware-logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254713355507",
      contactType: "sales",
      email: "info@amroztraders.co.ke",
      areaServed: "KE",
      availableLanguage: ["English", "Swahili"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tarasaa Trading Center, Garsen–Lamu Rd",
      addressLocality: "Tana River County",
      addressCountry: "KE",
    },
    sameAs: [
      "https://wa.me/254713355507",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonical(item.url),
    })),
  };
}

export function productSchema(product: {
  name: string;
  description: string;
  image: string;
  sku?: string;
  price?: number;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    offers: product.price
      ? {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "KES",
          availability: "https://schema.org/InStock",
          url: canonical(product.url),
        }
      : undefined,
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Amroz Traders",
    description: "Get in touch with our sales and dispatch team.",
    url: canonical("/contact"),
  };
}
