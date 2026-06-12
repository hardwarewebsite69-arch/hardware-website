"use client";

import { useMemo, useState, useTransition } from "react";
import { createManualQuote, createUploadQuote } from "@/lib/quotes";

type QuoteFormProps = {
  defaultMode?: "upload" | "manual";
};

type ManualItem = {
  item_name: string;
  quantity: string;
  unit: string;
  notes: string;
};

const blankItem: ManualItem = {
  item_name: "",
  quantity: "1",
  unit: "pcs",
  notes: "",
};

export function QuoteForm({ defaultMode = "upload" }: QuoteFormProps) {
  const [mode, setMode] = useState<"upload" | "manual">(defaultMode);
  const [items, setItems] = useState<ManualItem[]>([{ ...blankItem }]);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const canSubmit = useMemo(() => items.some((item) => item.item_name.trim().length > 0), [items]);

  function updateItem(index: number, field: keyof ManualItem, value: string) {
    setItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)));
  }

  function submit(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      try {
        const base = {
          customerName: String(formData.get("customerName") ?? ""),
          email: String(formData.get("email") ?? "") || null,
          message: String(formData.get("message") ?? "") || null,
          phone: String(formData.get("phone") ?? ""),
        };

        if (mode === "upload") {
          await createUploadQuote({
            ...base,
            uploadPublicId: "pending-direct-upload",
            uploadUrl: String(formData.get("uploadUrl") ?? "") || "manual-follow-up-required",
            uploadMetadata: { source: "quote-form" },
          });
        } else {
          await createManualQuote({
            ...base,
            items: items
              .filter((item) => item.item_name.trim())
              .map((item) => ({
                item_name: item.item_name.trim(),
                notes: item.notes.trim() || null,
                quantity: item.quantity ? Number(item.quantity) : null,
                unit: item.unit.trim() || null,
              })),
          });
        }
        setMessage("Quote request received. Our team will respond shortly.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Could not submit quote request.");
      }
    });
  }

  return (
    <section className="rounded border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="grid grid-cols-2 rounded border border-slate-200 bg-slate-50 p-1 text-sm font-bold">
        <button
          className={`rounded px-3 py-2 ${mode === "upload" ? "bg-slate-950 text-white" : "text-slate-600"}`}
          onClick={() => setMode("upload")}
          type="button"
        >
          Upload List
        </button>
        <button
          className={`rounded px-3 py-2 ${mode === "manual" ? "bg-slate-950 text-white" : "text-slate-600"}`}
          onClick={() => setMode("manual")}
          type="button"
        >
          Manual Entry
        </button>
      </div>
      <form action={submit} className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Name
            <input className="input-field" name="customerName" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Phone
            <input className="input-field" name="phone" required type="tel" />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-semibold">
          Email
          <input className="input-field" name="email" type="email" />
        </label>
        {mode === "upload" ? (
          <label className="grid gap-2 text-sm font-semibold">
            File URL or shared list link
            <input className="input-field" name="uploadUrl" placeholder="Paste a Cloudinary, Drive, or file link" />
          </label>
        ) : (
          <div className="grid gap-3">
            {items.map((item, index) => (
              <div className="grid gap-3 rounded border border-slate-200 p-3 md:grid-cols-[1fr_110px_110px_1fr]" key={index}>
                <input className="input-field" onChange={(event) => updateItem(index, "item_name", event.target.value)} placeholder="Item name" value={item.item_name} />
                <input className="input-field" min="0" onChange={(event) => updateItem(index, "quantity", event.target.value)} placeholder="Qty" type="number" value={item.quantity} />
                <input className="input-field" onChange={(event) => updateItem(index, "unit", event.target.value)} placeholder="Unit" value={item.unit} />
                <input className="input-field" onChange={(event) => updateItem(index, "notes", event.target.value)} placeholder="Notes" value={item.notes} />
              </div>
            ))}
            <button className="w-fit rounded border border-slate-300 px-3 py-2 text-sm font-bold" onClick={() => setItems((current) => [...current, { ...blankItem }])} type="button">
              Add item
            </button>
          </div>
        )}
        <label className="grid gap-2 text-sm font-semibold">
          Message
          <textarea className="input-field min-h-28" name="message" />
        </label>
        <button
          className="rounded bg-orange-600 px-5 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending || (mode === "manual" && !canSubmit)}
          type="submit"
        >
          {isPending ? "Submitting..." : "Submit Quote Request"}
        </button>
        {message ? <p className="rounded bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">{message}</p> : null}
      </form>
    </section>
  );
}
