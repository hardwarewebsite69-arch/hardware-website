import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { adminSettingsDefaults } from "@/lib/site-config";
import type { Category, Product, ProductImage, Settings } from "@/lib/types";

export async function getSettings(): Promise<Settings> {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("settings")
    .select("business_name, phone, whatsapp_number")
    .single();

  return data ?? adminSettingsDefaults;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("categories")
    .select("id, name, slug, description, sort_order, is_active")
    .eq("is_active", true)
    .order("sort_order");

  return data ?? [];
}

export async function getProducts(): Promise<Product[]> {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("products")
    .select("id, category_id, name, slug, sku, description, price, request_price, is_active")
    .eq("is_active", true)
    .order("name");

  return data ?? [];
}

export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return [];
  }

  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("products")
    .select("id, category_id, name, slug, sku, description, price, request_price, is_active")
    .eq("category_id", category.id)
    .eq("is_active", true)
    .order("name");

  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("products")
    .select("id, category_id, name, slug, sku, description, price, request_price, is_active")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  return data ?? null;
}

export async function getProductImages(productId: string): Promise<ProductImage[]> {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("product_images")
    .select("id, product_id, url, public_id, metadata, sort_order")
    .eq("product_id", productId)
    .order("sort_order");

  return data ?? [];
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) {
    return [];
  }

  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("products")
    .select("id, category_id, name, slug, sku, description, price, request_price, is_active")
    .eq("is_active", true)
    .or(`name.ilike.%${query}%,sku.ilike.%${query}%,description.ilike.%${query}%`)
    .order("name")
    .limit(24);

  return data ?? [];
}
