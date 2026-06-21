import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function main() {
  // Query quote items and products to see what has been ordered
  const { data: quoteItems, error } = await supabase
    .from("quote_items")
    .select("product_id, quantity, item_name");

  if (error) {
    console.error("Error fetching quote items:", error);
    return;
  }

  console.log(`Total quote items found: ${quoteItems.length}`);
  
  const productCounts: Record<string, { count: number; name: string }> = {};

  for (const item of quoteItems) {
    if (item.product_id) {
      if (!productCounts[item.product_id]) {
        productCounts[item.product_id] = { count: 0, name: item.item_name || "Unknown" };
      }
      productCounts[item.product_id].count += Number(item.quantity || 1);
    }
  }

  const sorted = Object.entries(productCounts)
    .sort((a, b) => b[1].count - a[1].count);

  console.log("Products ranked by quote count/quantity:");
  sorted.forEach(([id, info]) => {
    console.log(`- Product ID: ${id}, Name: "${info.name}", Total Qty: ${info.count}`);
  });
}

main().catch(console.error);
