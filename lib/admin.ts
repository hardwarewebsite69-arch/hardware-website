import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import type { Quote } from "@/lib/types";

export type QuoteItem = {
  id: string;
  quote_id: string;
  product_id: string | null;
  item_name: string;
  quantity: number | null;
  unit: string | null;
  notes: string | null;
  created_at: string;
};

export async function getAllQuotes(): Promise<Quote[]> {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("quotes")
    .select("id, customer_name, phone, email, message, mode, status, upload_url, upload_public_id, upload_metadata, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return data ?? [];
}

export async function getQuoteById(id: string): Promise<Quote | null> {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("quotes")
    .select("id, customer_name, phone, email, message, mode, status, upload_url, upload_public_id, upload_metadata, created_at")
    .eq("id", id)
    .maybeSingle();

  return data ?? null;
}

export async function getQuoteItems(quoteId: string): Promise<QuoteItem[]> {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("quote_items")
    .select("id, quote_id, product_id, item_name, quantity, unit, notes, created_at")
    .eq("quote_id", quoteId)
    .order("created_at");

  return data ?? [];
}
