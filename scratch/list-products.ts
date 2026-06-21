import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function main() {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, is_active");

  if (error) {
    console.error("Error:", error);
  } else {
    console.log("All products in database:");
    data.forEach((p) => console.log(`- "${p.name}" (slug: "${p.slug}", id: "${p.id}")`));
  }
}

main().catch(console.error);
