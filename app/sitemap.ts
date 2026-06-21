import { MetadataRoute } from "next";
import { getCategories, getProducts } from "@/lib/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://amroztraders.com";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/shop",
    "/quote",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch categories dynamically
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = await getCategories();
    categoryRoutes = categories.map((category) => ({
      url: `${baseUrl}/shop/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error);
  }

  // Fetch products dynamically
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts({ isActive: true });
    productRoutes = products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
