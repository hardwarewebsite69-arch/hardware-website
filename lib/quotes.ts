"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import type { QuoteItemInput } from "@/lib/types";

type BaseQuoteInput = {
  customerName: string;
  phone: string;
  email?: string | null;
  message?: string | null;
};

type UploadQuoteInput = BaseQuoteInput & {
  uploadUrl: string;
  uploadPublicId: string;
  uploadMetadata?: Record<string, unknown>;
};

type ManualQuoteInput = BaseQuoteInput & {
  items: QuoteItemInput[];
};

export async function createUploadQuote(input: UploadQuoteInput) {
  const supabase = createClient(await cookies());

  const { data, error } = await supabase
    .from("quotes")
    .insert({
      customer_name: input.customerName,
      phone: input.phone,
      email: input.email ?? null,
      message: input.message ?? null,
      mode: "upload",
      status: "pending",
      upload_url: input.uploadUrl,
      upload_public_id: input.uploadPublicId,
      upload_metadata: input.uploadMetadata ?? {},
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createManualQuote(input: ManualQuoteInput) {
  const supabase = createClient(await cookies());

  const { data: quote, error: quoteError } = await supabase
    .from("quotes")
    .insert({
      customer_name: input.customerName,
      phone: input.phone,
      email: input.email ?? null,
      message: input.message ?? null,
      mode: "manual",
      status: "pending",
    })
    .select("id")
    .single();

  if (quoteError) {
    throw new Error(quoteError.message);
  }

  if (input.items.length > 0) {
    const { error: itemsError } = await supabase.from("quote_items").insert(
      input.items.map((item) => ({
        quote_id: quote.id,
        product_id: item.product_id ?? null,
        item_name: item.item_name,
        quantity: item.quantity ?? null,
        unit: item.unit ?? null,
        notes: item.notes ?? null,
      })),
    );

    if (itemsError) {
      throw new Error(itemsError.message);
    }
  }

  return quote;
}
