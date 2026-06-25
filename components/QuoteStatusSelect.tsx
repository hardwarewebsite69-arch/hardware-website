"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateQuoteStatus } from "@/lib/admin";
import type { QuoteStatus } from "@/lib/types";

const STATUS_OPTIONS: { value: QuoteStatus; label: string; bg: string; text: string; ring: string }[] = [
  { value: "pending", label: "Pending", bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-600/20" },
  { value: "in_review", label: "In Review", bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-600/20" },
  { value: "responded", label: "Responded", bg: "bg-green-50", text: "text-green-700", ring: "ring-green-600/20" },
  { value: "closed", label: "Closed", bg: "bg-slate-50", text: "text-slate-600", ring: "ring-slate-500/10" },
];

export function QuoteStatusSelect({ quoteId, currentStatus }: { quoteId: string; currentStatus: QuoteStatus }) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const current = STATUS_OPTIONS.find((o) => o.value === status) ?? STATUS_OPTIONS[0];

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as QuoteStatus;
    const prevStatus = status;
    setStatus(newStatus);
    setIsUpdating(true);
    try {
      await updateQuoteStatus(quoteId, newStatus);
      router.refresh();
    } catch {
      setStatus(prevStatus);
      alert("Failed to update quote status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="font-semibold text-slate-500">Status</dt>
      <dd className="relative">
        <select
          value={status}
          onChange={handleChange}
          disabled={isUpdating}
          className={`appearance-none rounded-full px-3 py-1 pr-8 text-xs font-bold ring-1 ring-inset cursor-pointer transition-colors disabled:opacity-60 ${current.bg} ${current.text} ${current.ring}`}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white text-slate-900">
              {opt.label}
            </option>
          ))}
        </select>
        {isUpdating && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2">
            <span className="block h-2.5 w-2.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        )}
      </dd>
    </div>
  );
}
