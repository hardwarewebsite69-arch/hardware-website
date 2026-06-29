"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import type { Quote, QuoteStatus } from "@/lib/types";

export type QuoteItem = {
  id: string;
  quote_id: string;
  product_id: string | null;
  item_name: string;
  quantity: number | null;
  unit: string | null;
  unit_price: number | null;
  notes: string | null;
  created_at: string;
};

export async function getAllQuotes(options?: {
  page?: number;
  limit?: number;
  status?: string;
  mode?: string;
}): Promise<Quote[]> {
  const supabase = createClient(await cookies());
  let query = supabase
    .from("quotes")
    .select("id, customer_name, phone, email, message, mode, status, quotation_number, upload_url, upload_public_id, upload_metadata, created_at")
    .order("created_at", { ascending: false });

  if (options?.status && options.status !== "all") {
    query = query.eq("status", options.status);
  }
  if (options?.mode && options.mode !== "all") {
    query = query.eq("mode", options.mode);
  }

  if (options?.page && options?.limit) {
    const from = (options.page - 1) * options.limit;
    const to = from + options.limit - 1;
    query = query.range(from, to);
  }

  const { data } = await query;
  return data ?? [];
}

export async function getQuotesCount(options?: {
  status?: string;
  mode?: string;
}): Promise<number> {
  const supabase = createClient(await cookies());
  let query = supabase
    .from("quotes")
    .select("id", { count: "exact", head: true });

  if (options?.status && options.status !== "all") {
    query = query.eq("status", options.status);
  }
  if (options?.mode && options.mode !== "all") {
    query = query.eq("mode", options.mode);
  }

  const { count } = await query;
  return count ?? 0;
}

export async function getQuoteById(id: string): Promise<Quote | null> {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("quotes")
    .select("id, customer_name, phone, email, message, mode, status, quotation_number, upload_url, upload_public_id, upload_metadata, created_at")
    .eq("id", id)
    .maybeSingle();

  return data ?? null;
}

export async function getQuoteItems(quoteId: string): Promise<QuoteItem[]> {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("quote_items")
    .select("id, quote_id, product_id, item_name, quantity, unit, unit_price, notes, created_at")
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

export async function updateQuoteStatus(quoteId: string, status: QuoteStatus): Promise<void> {
  const supabase = createClient(await cookies());
  const { error } = await supabase
    .from("quotes")
    .update({ status })
    .eq("id", quoteId);

  if (error) {
    console.error("Error updating quote status:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/admin/quotes");
  revalidatePath(`/admin/quotes/${quoteId}`);
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

export async function updateQuoteItemPrice(itemId: string, unitPrice: number | null): Promise<void> {
  const supabase = createClient(await cookies());
  const { error } = await supabase
    .from("quote_items")
    .update({ unit_price: unitPrice })
    .eq("id", itemId);

  if (error) {
    console.error("Error updating quote item price:", error.message);
    throw new Error(error.message);
  }
}

export async function generateQuotationNumber(): Promise<string> {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase.rpc("nextval", {
    seq_name: "public.quotation_number_seq",
  });

  if (error) {
    const { data: fallback, error: fallbackError } = await supabase
      .from("quotes")
      .select("quotation_number")
      .not("quotation_number", "is", null)
      .order("quotation_number", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fallbackError || !fallback?.quotation_number) {
      return "QT-1001";
    }

    const num = parseInt(fallback.quotation_number.replace("QT-", ""), 10);
    return `QT-${num + 1}`;
  }

  const seqNum = data as number;
  return `QT-${seqNum}`;
}

export async function saveQuotation(quoteId: string, quotationNumber: string): Promise<void> {
  const supabase = createClient(await cookies());
  const { error } = await supabase
    .from("quotes")
    .update({
      quotation_number: quotationNumber,
      status: "responded",
    })
    .eq("id", quoteId);

  if (error) {
    console.error("Error saving quotation:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/admin/quotes");
  revalidatePath(`/admin/quotes/${quoteId}`);
}

export async function addQuoteItem(input: {
  quoteId: string;
  itemName: string;
  quantity: number;
  unit: string;
  unitPrice: number | null;
  notes?: string | null;
}): Promise<QuoteItem> {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("quote_items")
    .insert({
      quote_id: input.quoteId,
      item_name: input.itemName,
      quantity: input.quantity,
      unit: input.unit,
      unit_price: input.unitPrice,
      notes: input.notes ?? null,
    })
    .select("id, quote_id, product_id, item_name, quantity, unit, unit_price, notes, created_at")
    .single();

  if (error) {
    console.error("Error adding quote item:", error.message);
    throw new Error(error.message);
  }

  revalidatePath(`/admin/quotes/${input.quoteId}`);
  return data;
}

export async function deleteQuoteItem(itemId: string): Promise<void> {
  const supabase = createClient(await cookies());
  const { error } = await supabase
    .from("quote_items")
    .delete()
    .eq("id", itemId);

  if (error) {
    console.error("Error deleting quote item:", error.message);
    throw new Error(error.message);
  }
}

export type UserProfile = {
  id: string;
  email: string | undefined;
  full_name: string;
  role: string;
  created_at: string;
};

export async function inviteUserByEmail(email: string, fullName: string, role: string = "staff") {
  const supabase = createServiceClient();

  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback?next=/admin/dashboard`,
  });

  if (error) throw new Error(error.message);

  if (data.user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: data.user.id,
        full_name: fullName,
        role,
        updated_at: new Date().toISOString(),
      });

    if (profileError) throw new Error(profileError.message);
  }

  revalidatePath("/admin/users");
  return data;
}

export async function getUsers(): Promise<UserProfile[]> {
  const supabase = createServiceClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, full_name, role, updated_at")
    .order("updated_at", { ascending: false });

  if (error) return [];

  const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

  if (authError) return [];

  const userMap = new Map(authUsers.users.map((u) => [u.id, u.email]));

  return (profiles ?? []).map((p) => ({
    id: p.id,
    email: userMap.get(p.id) ?? undefined,
    full_name: p.full_name,
    role: p.role,
    created_at: p.updated_at,
  }));
}

export async function signOutAction() {
  const supabase = createClient(await cookies());
  await supabase.auth.signOut();
  revalidatePath("/");
}

