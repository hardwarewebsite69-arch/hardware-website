"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
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

export async function getAllQuotes(options?: {
  page?: number;
  limit?: number;
}): Promise<Quote[]> {
  const supabase = createClient(await cookies());
  let query = supabase
    .from("quotes")
    .select("id, customer_name, phone, email, message, mode, status, upload_url, upload_public_id, upload_metadata, created_at")
    .order("created_at", { ascending: false });

  if (options?.page && options?.limit) {
    const from = (options.page - 1) * options.limit;
    const to = from + options.limit - 1;
    query = query.range(from, to);
  }

  const { data } = await query;
  return data ?? [];
}

export async function getQuotesCount(): Promise<number> {
  const supabase = createClient(await cookies());
  const { count } = await supabase
    .from("quotes")
    .select("id", { count: "exact", head: true });

  return count ?? 0;
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

export async function getCurrentUserProfile() {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email,
    full_name: profile?.full_name ?? "",
    role: profile?.role ?? "staff",
  };
}

export async function updateCurrentUserProfile(fullName: string) {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      full_name: fullName,
      updated_at: new Date().toISOString(),
    });

  if (error) throw new Error(error.message);
}

export async function deleteQuote(quoteId: string): Promise<void> {
  const supabase = createClient(await cookies());
  const { error } = await supabase
    .from("quotes")
    .delete()
    .eq("id", quoteId);

  if (error) {
    console.error("Error deleting quote:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/admin/quotes");
}

export async function signOutAction() {
  const supabase = createClient(await cookies());
  await supabase.auth.signOut();
  revalidatePath("/");
}

