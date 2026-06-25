"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteQuote } from "@/lib/admin";
import { ConfirmModal } from "./ConfirmModal";
import type { Quote } from "@/lib/types";

interface QuotesTableProps {
  quotes: Quote[];
}

export function QuotesTable({ quotes }: QuotesTableProps) {
  const router = useRouter();
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<Quote | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const visibleQuotes = quotes.filter((q) => !deletedIds.has(q.id));

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setDeletedIds((prev) => new Set(prev).add(deleteTarget.id));
    try {
      await deleteQuote(deleteTarget.id);
      setDeleteTarget(null);
      router.refresh();
    } catch {
      setDeletedIds((prev) => {
        const next = new Set(prev);
        next.delete(deleteTarget.id);
        return next;
      });
      alert("Failed to delete the quote. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded border border-slate-200 bg-white">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Email</th>
              <th className="p-4">File</th>
              <th className="p-4">Created</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleQuotes.length === 0 ? (
              <tr>
                <td className="p-6 text-slate-500 text-center" colSpan={6}>
                  No quotes are visible for this session.
                </td>
              </tr>
            ) : (
              visibleQuotes.map((quote) => (
                <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors" key={quote.id}>
                  <td className="p-4 font-bold text-slate-900">{quote.customer_name}</td>
                  <td className="p-4 text-slate-700">{quote.phone}</td>
                  <td className="p-4 text-slate-600">{quote.email || <span className="text-slate-400">—</span>}</td>
                  <td className="p-4">
                    {quote.upload_url ? (
                      <a
                        href={quote.upload_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 underline font-semibold truncate max-w-[280px] inline-block align-middle"
                        title={quote.upload_url}
                      >
                        {quote.upload_url}
                      </a>
                    ) : (
                      <span className="text-slate-400 italic">Manual Entry</span>
                    )}
                  </td>
                  <td className="p-4 text-slate-500">{new Date(quote.created_at).toLocaleString()}</td>
                  <td className="p-4">
                    <Link className="font-bold text-orange-700 hover:text-orange-600" href={`/admin/quotes/${quote.id}`}>
                      Review
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(quote)}
                      className="ml-3 font-bold text-red-600 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={deleteTarget !== null}
        onClose={() => { if (!isDeleting) setDeleteTarget(null); }}
        onConfirm={handleDelete}
        title="Permanently Delete Quote Request?"
        description={
          deleteTarget
            ? `Are you sure you want to delete the quote for '${deleteTarget.customer_name}' (${deleteTarget.email || "no email"})? This will permanently remove this record from the database. This action cannot be undone.`
            : ""
        }
        confirmLabel="Yes, Delete"
        isLoading={isDeleting}
      />
    </>
  );
}
