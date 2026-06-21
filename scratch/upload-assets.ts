import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!supabaseUrl || !supabaseKey || !cloudName || !apiKey || !apiSecret) {
  console.error("Missing configuration env vars. Please check your .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function sign(params: Record<string, string | number>, secret: string) {
  const payload = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1").update(`${payload}${secret}`).digest("hex");
}

function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  return "application/octet-stream";
}

function getSlugFromFilename(filename: string): string | null {
  const normalized = filename.toLowerCase().trim();
  if (normalized.includes("brushes")) return "paint-brushes";
  if (normalized.includes("covermatt")) return "covermatt";
  if (normalized.includes("crack filler")) return "crack-filler";
  if (normalized.includes("hi-gloss")) return "hi-gloss";
  if (normalized.includes("led bulbs")) return "led-bulbs";
  if (normalized.includes("masking tape")) return "masking-tape";
  if (normalized.includes("matt vinyl")) return "matt-vinyl";
  if (normalized.includes("moisture proof lights")) return "moisture-proof-lights";
  if (normalized.includes("paint roller 4")) return "paint-roller-4";
  if (normalized.includes("paint roller 9")) return "paint-roller-9";
  if (normalized.includes("plastic emulsions")) return "plastic-emulsions";
  if (normalized.includes("silk vinyl")) return "silk-vinyl";
  if (normalized.includes("single socket")) return "single-socket";
  if (normalized.includes("skimming coat")) return "skimming-coat";
  if (normalized.includes("solar floodlight")) return "solar-floodlight";
  if (normalized.includes("switches")) return "electrical-switches";
  if (normalized.includes("twin socket")) return "twin-socket";
  if (normalized.includes("weather guard")) return "weather-guard";
  return null;
}

// 8 best-seller products to be featured
const FEATURED_SLUGS = [
  "silk-vinyl",
  "covermatt",
  "weather-guard",
  "matt-vinyl",
  "led-bulbs",
  "electrical-switches",
  "twin-socket",
  "solar-floodlight"
];

async function uploadToCloudinary(fileBuffer: Buffer, filename: string): Promise<{ url: string; public_id: string; size: number }> {
  const timestamp = Math.round(Date.now() / 1000);
  const folder = "amroz-traders/product-images";
  const signature = sign({ folder, timestamp }, apiSecret!);

  const body = new FormData();
  const mimeType = getMimeType(filename);
  const blob = new Blob([new Uint8Array(fileBuffer)], { type: mimeType });
  body.append("file", blob, filename);
  body.append("api_key", apiKey!);
  body.append("folder", folder);
  body.append("timestamp", String(timestamp));
  body.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    body,
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Cloudinary upload failed: ${response.status} ${await response.text()}`);
  }

  const result = await response.json();
  return {
    url: result.secure_url,
    public_id: result.public_id,
    size: result.bytes || fileBuffer.length
  };
}

async function main() {
  console.log("Starting product image upload and database updates...");

  const imagesDir = "./product-images";
  if (!fs.existsSync(imagesDir)) {
    console.error(`Directory ${imagesDir} not found.`);
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir);
  console.log(`Found ${files.length} files in ${imagesDir}.`);

  for (const filename of files) {
    const slug = getSlugFromFilename(filename);
    if (!slug) {
      console.log(`Skipping file "${filename}" (could not match to product slug)`);
      continue;
    }

    console.log(`\nProcessing "${filename}" for product slug "${slug}"...`);

    // 1. Get product from database
    const { data: product, error: findError } = await supabase
      .from("products")
      .select("id, name")
      .eq("slug", slug)
      .maybeSingle();

    if (findError) {
      console.error(`Error querying product with slug "${slug}":`, findError);
      continue;
    }

    if (!product) {
      console.error(`Product with slug "${slug}" not found in database.`);
      continue;
    }

    console.log(`Found product: "${product.name}" (ID: ${product.id})`);

    // 2. Read image file and upload to Cloudinary
    const filepath = path.join(imagesDir, filename);
    const fileBuffer = fs.readFileSync(filepath);

    let uploadResult;
    try {
      console.log(`Uploading to Cloudinary...`);
      uploadResult = await uploadToCloudinary(fileBuffer, filename);
      console.log(`Cloudinary Upload Success: ${uploadResult.url} (ID: ${uploadResult.public_id})`);
    } catch (uploadError) {
      console.error(`Failed to upload "${filename}" to Cloudinary:`, uploadError);
      continue;
    }

    // 3. Clear existing images in product_images table to prevent duplicates
    console.log(`Cleaning existing images for product ${product.id}...`);
    // First clear featured_image_id reference to avoid FK constraints
    const { error: resetFeaturedError } = await supabase
      .from("products")
      .update({ featured_image_id: null })
      .eq("id", product.id);

    if (resetFeaturedError) {
      console.error(`Warning: Failed to reset featured_image_id for product:`, resetFeaturedError);
    }

    const { error: deleteImagesError } = await supabase
      .from("product_images")
      .delete()
      .eq("product_id", product.id);

    if (deleteImagesError) {
      console.error(`Warning: Failed to delete old images for product:`, deleteImagesError);
    }

    // 4. Insert image record into product_images
    console.log(`Inserting new image record into product_images...`);
    const { data: insertedImage, error: insertImageError } = await supabase
      .from("product_images")
      .insert({
        product_id: product.id,
        url: uploadResult.url,
        public_id: uploadResult.public_id,
        metadata: {
          bytes: uploadResult.size,
          format: filename.split(".").pop()?.toLowerCase(),
          original_filename: filename
        },
        sort_order: 0
      })
      .select("id")
      .single();

    if (insertImageError || !insertedImage) {
      console.error(`Error inserting product image:`, insertImageError);
      continue;
    }

    console.log(`Inserted image ID: ${insertedImage.id}`);

    // 5. Update featured_image_id on products table
    const { error: updateProductError } = await supabase
      .from("products")
      .update({ featured_image_id: insertedImage.id })
      .eq("id", product.id);

    if (updateProductError) {
      console.error(`Error linking featured image to product:`, updateProductError);
    } else {
      console.log(`Successfully linked image to product "${product.name}".`);
    }
  }

  // 6. Set is_featured for products
  console.log("\nConfiguring featured products...");
  
  console.log("Resetting is_featured to false for all products...");
  const { error: resetFeaturedAllError } = await supabase
    .from("products")
    .update({ is_featured: false })
    .neq("slug", "not-matching-anything"); // updates all

  if (resetFeaturedAllError) {
    console.error("Error resetting is_featured on products:", resetFeaturedAllError);
  } else {
    console.log("Successfully reset is_featured on all products.");
  }

  console.log(`Setting is_featured to true for the top 8 best sellers: ${FEATURED_SLUGS.join(", ")}...`);
  const { error: setFeaturedError } = await supabase
    .from("products")
    .update({ is_featured: true })
    .in("slug", FEATURED_SLUGS);

  if (setFeaturedError) {
    console.error("Error setting featured products:", setFeaturedError);
  } else {
    console.log("Successfully configured featured products.");
  }

  console.log("\nMigration completed successfully!");
}

main().catch(console.error);
