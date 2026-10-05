import { MetadataRoute } from "next";
import { getCategories, getProducts } from "@/lib/catalog";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteUrl;

  const staticRoutes = [
    { url: `${baseUrl}/`, priority: 1.0, freq: "daily" as const },
    { url: `${baseUrl}/shop`, priority: 0.9, freq: "daily" as const },
    { url: `${baseUrl}/quote`, priority: 0.8, freq: "weekly" as const },
    { url: `${baseUrl}/contact`, priority: 0.8, freq: "monthly" as const },
    { url: `${baseUrl}/search`, priority: 0.5, freq: "monthly" as const },
    { url: `${baseUrl}/terms`, priority: 0.4, freq: "monthly" as const },
    { url: `${baseUrl}/privacy`, priority: 0.4, freq: "monthly" as const },
    { url: `${baseUrl}/dispatch-policy`, priority: 0.4, freq: "monthly" as const },
    { url: `${baseUrl}/login`, priority: 0.2, freq: "monthly" as const },
    { url: `${baseUrl}/forgot-password`, priority: 0.1, freq: "monthly" as const },
    { url: `${baseUrl}/quote/manual`, priority: 0.3, freq: "monthly" as const },
    { url: `${baseUrl}/quote/upload`, priority: 0.3, freq: "monthly" as const },
  ].map((r) => ({
    url: r.url,
    lastModified: new Date(),
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = await getCategories();
    categoryRoutes = categories.map((category) => ({
      url: `${baseUrl}/shop/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // categories not available — skip dynamic routes
  }

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts({ isActive: true });
    productRoutes = products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    // products not available — skip dynamic routes
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
