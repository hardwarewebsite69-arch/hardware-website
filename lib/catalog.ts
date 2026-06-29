"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache"; 
import { createClient, createPublicClient } from "@/lib/supabase/server";
import { adminSettingsDefaults } from "@/lib/site-config";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Category, Product, ProductImage, Settings } from "@/lib/types";
import { cleanId } from "@/lib/utils";
import { uploadToCloudinary, deleteFromCloudinary, type CloudinaryUploadResult } from "@/lib/cloudinary";

// ==========================================
// READ OPERATIONS
// ==========================================

export async function getSettings(supabaseClient?: SupabaseClient): Promise<Settings> {
  const supabase = supabaseClient || createPublicClient();
  const { data } = await supabase
    .from("settings")
    .select("business_name, phone, whatsapp_number")
    .single();

  return data ?? adminSettingsDefaults;
}

export async function getCategories(supabaseClient?: SupabaseClient): Promise<Category[]> {
  const supabase = supabaseClient || createPublicClient();
  const { data } = await supabase
    .from("categories")
    .select("id, name, slug, description, sort_order, is_active, image_url, image_public_id")
    .eq("is_active", true)
    .order("sort_order");

  return data ?? [];
}

export async function getAllCategories(supabaseClient?: SupabaseClient): Promise<Category[]> {
  const supabase = supabaseClient || createPublicClient();
  const { data } = await supabase
    .from("categories")
    .select("id, name, slug, description, sort_order, is_active, image_url, image_public_id")
    .order("sort_order");

  return data ?? [];
}

export async function getProducts(options?: {
  page?: number;
  limit?: number;
  isFeatured?: boolean;
  categoryId?: string;
  isActive?: boolean;
}, supabaseClient?: SupabaseClient): Promise<Product[]> {
  const supabase = supabaseClient || createPublicClient();
  let query = supabase
    .from("products")
    .select("id, category_id, name, slug, sku, description, price, request_price, is_active, is_featured, featured_image_id, product_images!product_images_product_id_fkey(url, sort_order)")
    .order("name");

  const hasActiveFilter = options && 'isActive' in options;
  if (hasActiveFilter) {
    if (options.isActive !== undefined && options.isActive !== null) {
      query = query.eq("is_active", options.isActive);
    }
  } else {
    query = query.eq("is_active", true);
  }

  if (options?.isFeatured !== undefined) {
    query = query.eq("is_featured", options.isFeatured);
  }
  if (options?.categoryId !== undefined) {
    query = query.eq("category_id", options.categoryId);
  }

  if (options?.page && options?.limit) {
    const from = (options.page - 1) * options.limit;
    const to = from + options.limit - 1;
    query = query.range(from, to);
  }

  const { data } = await query;
  return data ?? [];
}

export async function getProductsByCategorySlug(slug: string, supabaseClient?: SupabaseClient): Promise<Product[]> {
  const categories = await getCategories(supabaseClient);
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return [];
  }

  const supabase = supabaseClient || createPublicClient();
  const { data } = await supabase
    .from("products")
    .select("id, category_id, name, slug, sku, description, price, request_price, is_active, is_featured, featured_image_id, product_images!product_images_product_id_fkey(url, sort_order)")
    .eq("category_id", category.id)
    .eq("is_active", true)
    .order("name");

  return data ?? [];
}

export async function getProductBySlug(slug: string, supabaseClient?: SupabaseClient): Promise<Product | null> {
  const supabase = supabaseClient || createPublicClient();
  const { data } = await supabase
    .from("products")
    .select("id, category_id, name, slug, sku, description, price, request_price, is_active, is_featured, featured_image_id, product_images!product_images_product_id_fkey(url, sort_order)")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  return data ?? null;
}

export async function getProductImages(productId: string, supabaseClient?: SupabaseClient): Promise<ProductImage[]> {
  const supabase = supabaseClient || createPublicClient();
  const { data } = await supabase
    .from("product_images")
    .select("id, product_id, url, public_id, metadata, sort_order")
    .eq("product_id", productId)
    .order("sort_order");

  return data ?? [];
}

export async function searchProducts(query: string, supabaseClient?: SupabaseClient): Promise<Product[]> {
  if (!query.trim()) {
    return [];
  }

  const supabase = supabaseClient || createPublicClient();
  const { data } = await supabase
    .from("products")
    .select("id, category_id, name, slug, sku, description, price, request_price, is_active, is_featured, featured_image_id, product_images!product_images_product_id_fkey(url, sort_order)")
    .eq("is_active", true)
    .or(`name.ilike.%${query}%,sku.ilike.%${query}%,description.ilike.%${query}%`)
    .order("name")
    .limit(24);

  return data ?? [];
}

export async function getAllProductImages(supabaseClient?: SupabaseClient): Promise<ProductImage[]> {
  const supabase = supabaseClient || createPublicClient();
  const { data } = await supabase
    .from("product_images")
    .select("id, product_id, url, public_id, metadata, sort_order")
    .order("created_at", { ascending: false });

  return data ?? [];
}

// ==========================================
// WRITE OPERATIONS
// ==========================================

export async function upsertCategory(
  category: Partial<Category> & { name: string; slug: string }
): Promise<Category | null> {
  const supabase = createClient(await cookies());
  
  const id = cleanId(category.id);

  const { data, error } = await supabase
    .from("categories")
    .upsert({
      id,
      name: category.name,
      slug: category.slug,
      description: category.description ?? null,
      sort_order: category.sort_order ?? 0,
      is_active: category.is_active ?? true,
      image_url: category.image_url ?? null,
      image_public_id: category.image_public_id ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error upserting category:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/");
  return data;
}

export async function saveCategoryAction(
  categoryData: Partial<Category> & { name: string; slug: string },
  uploadedImage: CloudinaryUploadResult | null
): Promise<Category | null> {
  const dataToSave = { ...categoryData };

  if (uploadedImage) {
    dataToSave.image_url = uploadedImage.url;
    dataToSave.image_public_id = uploadedImage.public_id;
  }

  const saved = await upsertCategory(dataToSave);
  if (!saved) throw new Error("Failed to save category.");

  revalidatePath("/admin/categories");
  return saved;
}

export async function upsertProduct(
  product: Partial<Product> & { category_id: string; name: string; slug: string }
): Promise<Product | null> {
  const supabase = createClient(await cookies());

  const id = cleanId(product.id);

  const { data, error } = await supabase
    .from("products")
    .upsert({
      id,
      category_id: product.category_id,
      name: product.name,
      slug: product.slug,
      sku: product.sku ?? null,
      description: product.description ?? null,
      price: product.price ?? 0,
      request_price: product.request_price ?? false,
      is_active: product.is_active ?? true,
      is_featured: product.is_featured ?? false,
      featured_image_id: product.featured_image_id ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error upserting product:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath(`/product/${product.slug}`);
  return data;
}

// ==========================================
// DELETE OPERATIONS
// ==========================================

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

  revalidatePath("/");
  return true;
}

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

  revalidatePath("/");
  if (slug) {
    revalidatePath(`/products/${slug}`);
  }
  
  return true;
}

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

  return true;
}

export async function deleteMediaAction(id: string, public_id: string): Promise<void> {
  const supabase = createClient(await cookies());

  // 1. Delete from database
  const { error } = await supabase.from("product_images").delete().eq("id", id);
  if (error) throw new Error(error.message);

  // 2. Delete from Cloudinary
  await deleteFromCloudinary(public_id);

  revalidatePath("/admin/media");
}

export async function saveProductAction(
  productData: Partial<Product> & { category_id: string; name: string; slug: string },
  uploadedImages: CloudinaryUploadResult[]
): Promise<Product | null> {
  const supabase = createClient(await cookies());

  const id = cleanId(productData.id);

  const dataToSave = { ...productData, id };

  if (id) {
    await supabase
      .from("products")
      .update({ featured_image_id: null })
      .eq("id", id);

    await supabase
      .from("product_images")
      .delete()
      .eq("product_id", id);
  }

  // 2. Save/upsert the product details
  const savedProduct = await upsertProduct(dataToSave);

  if (!savedProduct) {
    throw new Error("Failed to save product.");
  }

  // 3. Link the current list of images to the product
  if (uploadedImages.length > 0) {
    const imageRecords = uploadedImages.map((img, index) => ({
      product_id: savedProduct.id,
      url: img.url,
      public_id: img.public_id,
      metadata: img.metadata,
      sort_order: index,
    }));

    const { data: insertedImages, error } = await supabase
      .from("product_images")
      .insert(imageRecords)
      .select();

    if (error) {
      console.error("Error linking product images:", error.message);
      throw new Error(error.message);
    }

    // Set first image as featured
    if (insertedImages && insertedImages.length > 0) {
      const { error: updateError } = await supabase
        .from("products")
        .update({ featured_image_id: insertedImages[0].id })
        .eq("id", savedProduct.id);

      if (updateError) {
        console.error("Error updating featured image:", updateError.message);
      } else {
        savedProduct.featured_image_id = insertedImages[0].id;
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
  images: CloudinaryUploadResult[]
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
  preUploadedImages?: CloudinaryUploadResult[]
): Promise<Product | null> {
  const supabase = createClient(await cookies());
  const savedProduct = await upsertProduct(product);

  if (!savedProduct) {
    throw new Error("Failed to save product before image upload.");
  }

  if (preUploadedImages && preUploadedImages.length > 0) {
    await linkImagesToProduct(savedProduct.id, preUploadedImages);
  }

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

    if (!savedProduct.featured_image_id && insertedImages && insertedImages.length > 0) {
      await supabase
        .from("products")
        .update({ featured_image_id: insertedImages[0].id })
        .eq("id", savedProduct.id);
    }
  }

  return savedProduct;
}

export async function updateSettings(settings: Settings): Promise<Settings> {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("settings")
    .upsert({
      id: true,
      business_name: settings.business_name,
      phone: settings.phone,
      whatsapp_number: settings.whatsapp_number,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error updating settings:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/");
  return data;
}

