function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
        `Add it to .env.local or your deployment's environment variables.`
    );
  }
  return value;
}

function optionalEnv(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

export const env = {
  supabaseUrl: requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
  supabaseServiceRoleKey: requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  siteUrl: optionalEnv("NEXT_PUBLIC_SITE_URL", "https://amroztraders.com"),
  cloudinaryCloudName: optionalEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", "dxyngeag4"),
};

export function validateEnv(): void {
  if (typeof window === "undefined") {
    requireEnv("SUPABASE_SERVICE_ROLE_KEY");
    requireEnv("NEXT_PUBLIC_SUPABASE_URL");
    requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  }
}
