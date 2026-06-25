"use client";

import { useState } from "react";

export function CopyIdButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboards not always available
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="ml-1.5 inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
      title="Copy ID"
    >
      {copied ? (
        <span className="flex items-center gap-1 text-green-600">
          <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>
          Copied
        </span>
      ) : (
        <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 006.5 4.25v5.5A2.25 2.25 0 004.25 12h-1.5A2.25 2.25 0 01.5 9.75v-5.5A2.25 2.25 0 012.75 2h1.5zM2.75 3.5a.75.75 0 00-.75.75v5.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-5.5a.75.75 0 00-.75-.75h-1.5zM7 5.75a.75.75 0 01.75-.75h5.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75h-5.5a.75.75 0 01-.75-.75v-7.5zm1.5.75v6h4v-6h-4z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}
