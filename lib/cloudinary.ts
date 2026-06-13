import "server-only";
import { createHash } from "node:crypto";
import { siteConfig } from "@/lib/site-config";

type CloudinaryUploadPurpose = "product-images" | "quote-uploads";

export type CloudinaryUploadResult = {
  url: string;
  public_id: string;
  metadata: {
    bytes?: number;
    format?: string;
    resource_type?: string;
    original_filename?: string;
  };
};

function getCloudinaryConfig() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? siteConfig.cloudinaryCloudName;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are not configured.");
  }

  return { cloudName, apiKey, apiSecret };
}

function sign(params: Record<string, string | number>, apiSecret: string) {
  const payload = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
}

export async function uploadToCloudinary(
  file: File,
  purpose: CloudinaryUploadPurpose,
): Promise<CloudinaryUploadResult> {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const timestamp = Math.round(Date.now() / 1000);
  const folder = `amroz-traders/${purpose}`;
  const signature = sign({ folder, timestamp }, apiSecret);
  const body = new FormData();

  body.append("file", file);
  body.append("api_key", apiKey);
  body.append("folder", folder);
  body.append("timestamp", String(timestamp));
  body.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    body,
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Cloudinary upload failed with ${response.status}.`);
  }

  const result = (await response.json()) as {
    secure_url: string;
    public_id: string;
    bytes?: number;
    format?: string;
    resource_type?: string;
    original_filename?: string;
  };

  return {
    url: result.secure_url,
    public_id: result.public_id,
    metadata: {
      bytes: result.bytes,
      format: result.format,
      resource_type: result.resource_type,
      original_filename: result.original_filename,
    },
  };
}

export async function deleteFromCloudinary(public_id: string): Promise<void> {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const timestamp = Math.round(Date.now() / 1000);
  const signature = sign({ public_id, timestamp }, apiSecret);

  const body = new FormData();
  body.append("public_id", public_id);
  body.append("api_key", apiKey);
  body.append("timestamp", String(timestamp));
  body.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
    body,
    method: "POST",
  });

  if (!response.ok) {
    console.error("Cloudinary deletion failed:", await response.text());
  }
}
