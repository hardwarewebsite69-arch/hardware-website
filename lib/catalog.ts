"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache"; // Added to clear cache on mutation
import { createClient } from "@/lib/supabase/server";
import { adminSettingsDefaults } from "@/lib/site-config";
import type { Category, Product, ProductImage, Settings } from "@/lib/types";

// ==========================================
// READ OPERATIONS (Existing Code)
// ==========================================

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

// ==========================================
// WRITE OPERATIONS (Create / Edit Mutations)
// ==========================================

/**
 * Creates a new category or updates an existing one if an ID is provided.
 * Omit 'id' from the payload to create, include it to update.
 */
export async function upsertCategory(
  category: Partial<Category> & { name: string; slug: string }
): Promise<Category | null> {
  const supabase = createClient(await cookies());
  
  const { data, error } = await supabase
    .from("categories")
    .upsert({
      id: category.id, // If undefined, Supabase auto-generates a UUID (Create)
      name: category.name,
      slug: category.slug,
      description: category.description ?? null,
      sort_order: category.sort_order ?? 0,
      is_active: category.is_active ?? true,
    })
    .select()
    .single();

  if (error) {
    console.error("Error upserting category:", error.message);
    throw new Error(error.message);
  }

  // Purge the cache so changes are immediately visible
  revalidatePath("/");
  return data;
}

/**
 * Creates a new product or updates an existing one if an ID is provided.
 * Omit 'id' from the payload to create, include it to update.
 */
export async function upsertProduct(
  product: Partial<Product> & { category_id: string; name: string; slug: string }
): Promise<Product | null> {
  const supabase = createClient(await cookies());

  const { data, error } = await supabase
    .from("products")
    .upsert({
      id: product.id, // If undefined, Supabase auto-generates a UUID (Create)
      category_id: product.category_id,
      name: product.name,
      slug: product.slug,
      sku: product.sku ?? null,
      description: product.description ?? null,
      price: product.price ?? 0,
      request_price: product.request_price ?? false,
      is_active: product.is_active ?? true,
    })
    .select()
    .single();

  if (error) {
    console.error("Error upserting product:", error.message);
    throw new Error(error.message);
  }

  // Purge cache paths affected by product mutations
  revalidatePath("/");
  revalidatePath(`/products/${product.slug}`);
  return data;
}
// ==========================================
// DELETE OPERATIONS
// ==========================================

/**
 * Deletes a category by its ID.
 * Note: If your Supabase schema doesn't have ON DELETE CASCADE for foreign keys, 
 * this will fail if products are still tied to this category.
 */
export async function deleteCategory(id: string): Promise<boolean> {
  const supabase = createClient(await cookies());

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting category:", error.message);
    throw new Error(error.message);
  }

  // Purge the cache to reflect changes everywhere
  revalidatePath("/");
  return true;
}

/**
 * Deletes a product by its ID and revalidates its specific page path.
 */
export async function deleteProduct(id: string, slug?: string): Promise<boolean> {
  const supabase = createClient(await cookies());

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting product:", error.message);
    throw new Error(error.message);
  }

  // Purge the global cache and the specific product detail page cache if slug is provided
  revalidatePath("/");
  if (slug) {
    revalidatePath(`/products/${slug}`);
  }
  
  return true;
}

/**
 * Deletes a specific product image by its ID.
 */
export async function deleteProductImage(id: string, productId: string): Promise<boolean> {
  const supabase = createClient(await cookies());

  const { error } = await supabase
    .from("product_images")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting product image:", error.message);
    throw new Error(error.message);
  }

  // Optional: If you have a product details cache that aggregates images, revalidate it
  // revalidatePath(`/products/some-slug`); 
  return true;
}