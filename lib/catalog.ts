"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache"; // Added to clear cache on mutation
import { createClient } from "@/lib/supabase/server";
import { adminSettingsDefaults } from "@/lib/site-config";
import type { Category, Product, ProductImage, Settings } from "@/lib/types";
import { uploadToCloudinary } from "@/lib/cloudinary";

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
    .select("id, category_id, name, slug, sku, description, price, request_price, is_active, featured_image_id")
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
    .select("id, category_id, name, slug, sku, description, price, request_price, is_active, featured_image_id")
    .eq("category_id", category.id)
    .eq("is_active", true)
    .order("name");

  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("products")
    .select("id, category_id, name, slug, sku, description, price, request_price, is_active, featured_image_id")
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
    .select("id, category_id, name, slug, sku, description, price, request_price, is_active, featured_image_id")
    .eq("is_active", true)
    .or(`name.ilike.%${query}%,sku.ilike.%${query}%,description.ilike.%${query}%`)
    .order("name")
    .limit(24);

  return data ?? [];
}

export async function getAllProductImages(): Promise<ProductImage[]> {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("product_images")
    .select("id, product_id, url, public_id, metadata, sort_order")
    .order("created_at", { ascending: false });

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
      id: product.id,
      category_id: product.category_id,
      name: product.name,
      slug: product.slug,
      sku: product.sku ?? null,
      description: product.description ?? null,
      price: product.price ?? 0,
      request_price: product.request_price ?? false,
      is_active: product.is_active ?? true,
      featured_image_id: product.featured_image_id ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error upserting product:", error.message);
    throw new Error(error.message);
  }

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
export async function deleteProductImage(id: string, _productId: string): Promise<boolean> {
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

export async function saveProductAction(
  productData: Partial<Product> & { category_id: string; name: string; slug: string },
  uploadedImages: { url: string; public_id: string; metadata: any }[]
): Promise<Product | null> {
  const savedProduct = await upsertProduct(productData);

  if (!savedProduct) {
    throw new Error("Failed to save product.");
  }

  if (uploadedImages.length > 0) {
    // Note: In a production app, you might want to clear existing images 
    // or handle diffs if this is an update.
    await linkImagesToProduct(savedProduct.id, uploadedImages);

    // Set first image as featured if none exists
    if (!savedProduct.featured_image_id) {
      const images = await getProductImages(savedProduct.id);
      if (images.length > 0) {
        const supabase = createClient(await cookies());
        await supabase
          .from("products")
          .update({ featured_image_id: images[0].id })
          .eq("id", savedProduct.id);
      }
    }
  }

  revalidatePath("/admin/products");
  revalidatePath(`/product/${savedProduct.slug}`);
  
  return savedProduct;
}

export async function uploadImageAction(file: File): Promise<CloudinaryUploadResult> {
  const result = await uploadToCloudinary(file, "product-images");
  return result;
}

export async function linkImagesToProduct(
  productId: string,
  images: { url: string; public_id: string; metadata: any }[]
): Promise<void> {
  const supabase = createClient(await cookies());

  const imageRecords = images.map((img, index) => ({
    product_id: productId,
    url: img.url,
    public_id: img.public_id,
    metadata: img.metadata,
    sort_order: index,
  }));

  const { error } = await supabase.from("product_images").insert(imageRecords);
  if (error) {
    console.error("Error linking product images:", error.message);
    throw new Error(error.message);
  }
}

export async function upsertProductWithImages(
  product: Partial<Product> & { category_id: string; name: string; slug: string },
  images?: File[],
  preUploadedImages?: { url: string; public_id: string; metadata: any }[]
): Promise<Product | null> {
  const supabase = createClient(await cookies());
  const savedProduct = await upsertProduct(product);

  if (!savedProduct) {
    throw new Error("Failed to save product before image upload.");
  }

  // 1. Handle pre-uploaded images (if any)
  if (preUploadedImages && preUploadedImages.length > 0) {
    await linkImagesToProduct(savedProduct.id, preUploadedImages);
  }

  // 2. Handle raw files (original behavior)
  const imageFiles = (images ?? []).filter((file) => file instanceof File && file.size > 0);
  if (imageFiles.length > 0) {
    const uploadResults = await Promise.all(
      imageFiles.map((file) => uploadToCloudinary(file, "product-images"))
    );

    const imageRecords = uploadResults.map((upload, index) => ({
      product_id: savedProduct.id,
      url: upload.url,
      public_id: upload.public_id,
      metadata: upload.metadata,
      sort_order: (preUploadedImages?.length ?? 0) + index,
    }));

    const { data: insertedImages, error } = await supabase
      .from("product_images")
      .insert(imageRecords)
      .select();

    if (error) {
      console.error("Error inserting product images:", error.message);
      throw new Error(error.message);
    }

    // Set first image as featured if none exists
    if (!savedProduct.featured_image_id && insertedImages && insertedImages.length > 0) {
      await supabase
        .from("products")
        .update({ featured_image_id: insertedImages[0].id })
        .eq("id", savedProduct.id);
    }
  }

  return savedProduct;
}
