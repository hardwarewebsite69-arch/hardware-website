import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase
    .from("products")
    .update({ is_featured: false })
    .eq("slug", "silk-vinyl")
    .select();

  if (error) {
    console.error("Write error:", error);
  } else {
    console.log("Write success:", data);
  }
}

main().catch(console.error);
