"use client";

import { useRef, useCallback } from "react";
import { siteConfig } from "@/lib/site-config";
import type { QuoteItem } from "@/lib/admin";
import type { Quote } from "@/lib/types";

type PrintableQuotationProps = {
  quote: Quote;
  items: QuoteItem[];
  quotationNumber: string;
  grandTotal: number;
  onClose: () => void;
};

export function PrintableQuotation({
  quote,
  items,
  quotationNumber,
  grandTotal,
  onClose,
}: PrintableQuotationProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useCallback(() => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const styles = Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          return Array.from(sheet.cssRules || [])
            .map((rule) => rule.cssText)
            .join("\n");
        } catch {
          return "";
        }
      })
      .join("\n");

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>Quotation-${quotationNumber.replace(/\//g, "-")}</title>
  <style>
    ${styles}
    @page { margin: 12mm 10mm; size: A4; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  </style>
</head>
<body>
  ${contentRef.current?.outerHTML || ""}
</body>
</html>`);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  }, [quotationNumber]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 shadow-sm print:hidden">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="rounded-md bg-slate-950 px-5 py-2 text-sm font-bold text-white hover:bg-slate-800 transition-colors"
        >
          Print / Save PDF
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-100 print:overflow-visible print:bg-white">
        <div className="mx-auto max-w-[210mm] bg-white shadow-xl print:shadow-none">
          <div ref={contentRef}>
            <div className="px-8 py-10 print:px-6 print:py-8">
              <div className="flex items-start justify-between border-b border-slate-100 pb-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/hardware-logo.png"
                    alt="Amroz Traders"
                    className="h-14 w-14 rounded-lg object-contain"
                  />
                  <div>
                    <h1 className="text-xl font-black tracking-tight text-slate-900">
                      {siteConfig.businessName}
                    </h1>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Tel: {siteConfig.phone}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-lg font-black tracking-wider text-slate-900">
                    QUOTATION
                  </h2>
                </div>
              </div>

              <div className="mt-6 flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Bill To
                  </h3>
                  <p className="mt-1.5 text-sm font-bold text-slate-900">
                    {quote.customer_name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-600">
                    {quote.phone}
                  </p>
                  {quote.email && (
                    <p className="text-xs text-slate-600">{quote.email}</p>
                  )}
                  {quote.message && (
                    <p className="mt-2 max-w-md text-xs italic text-slate-500">
                      {quote.message}
                    </p>
                  )}
                </div>
                <div className="text-right text-xs">
                  <div className="flex items-center justify-end gap-3">
                    <span className="font-medium text-slate-400">
                      Quotation #:
                    </span>
                    <span className="font-bold text-slate-900">
                      {quotationNumber}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-end gap-3">
                    <span className="font-medium text-slate-400">Date:</span>
                    <span className="font-semibold text-slate-900">
                      {new Date().toLocaleDateString("en-KE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-600">
                      <th className="w-10 px-4 py-3.5 text-center">#</th>
                      <th className="px-4 py-3.5">Description</th>
                      <th className="w-16 px-4 py-3.5 text-center">Qty</th>
                      <th className="w-14 px-4 py-3.5 text-center">Unit</th>
                      <th className="w-28 px-4 py-3.5 text-right">
                        Unit Price
                      </th>
                      <th className="w-28 px-4 py-3.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((item, index) => {
                      const lineTotal =
                        (item.unit_price ?? 0) * (item.quantity ?? 1);
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3.5 text-center font-mono text-xs text-slate-400">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3.5 font-semibold text-slate-900">
                            {item.item_name}
                            {item.notes && (
                              <span className="ml-2 text-xs font-normal italic text-slate-400">
                                {item.notes}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-center text-slate-700">
                            {item.quantity ?? 1}
                          </td>
                          <td className="px-4 py-3.5 text-center text-slate-500">
                            {item.unit ?? ""}
                          </td>
                          <td className="px-4 py-3.5 text-right font-mono text-slate-700">
                            {item.unit_price != null
                              ? `KES ${item.unit_price.toLocaleString()}`
                              : "-"}
                          </td>
                          <td className="px-4 py-3.5 text-right font-mono font-bold text-slate-900">
                            {item.unit_price != null
                              ? `KES ${lineTotal.toLocaleString()}`
                              : "-"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-end">
                <div className="w-64 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-slate-900">
                      Grand Total:
                    </span>
                    <span className="text-lg font-black text-orange-600">
                      KES {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Terms &amp; Conditions
                </h4>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-start gap-2 text-xs text-slate-500">
                    <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                    Quotation valid for 14 days from the date above.
                  </li>
                  <li className="flex items-start gap-2 text-xs text-slate-500">
                    <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                    Prices are inclusive of VAT where applicable.
                  </li>
                  <li className="flex items-start gap-2 text-xs text-slate-500">
                    <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                    Delivery charges may apply based on location and order
                    value.
                  </li>
                </ul>
                <p className="mt-3 text-center text-xs italic text-slate-400">
                  Thank you for choosing {siteConfig.businessName}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
