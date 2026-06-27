"use client";

import { useCallback } from "react";
import type { Quote } from "@/lib/types";
import type { QuoteItem } from "@/lib/admin";
import { siteConfig } from "@/lib/site-config";

export function PrintableQuotation({
  quote,
  items,
  quotationNumber,
  grandTotal,
  onClose,
}: {
  quote: Quote;
  items: QuoteItem[];
  quotationNumber: string;
  grandTotal: number;
  onClose: () => void;
}) {
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

    const today = new Date().toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const itemsHtml = items
      .map(
        (item, i) => `
          <tr>
            <td class="td">${i + 1}</td>
            <td class="td">${item.item_name}</td>
            <td class="td text-center">${item.quantity ?? 1}</td>
            <td class="td text-center">${item.unit ?? ""}</td>
            <td class="td text-right">
              ${item.unit_price != null ? `KES ${item.unit_price.toLocaleString()}` : "-"}
            </td>
            <td class="td text-right">
              ${item.unit_price != null ? `KES ${((item.unit_price) * (item.quantity ?? 1)).toLocaleString()}` : "-"}
            </td>
          </tr>`,
      )
      .join("\n");

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <style>${styles}</style>
  <style>
    @page { margin: 0; size: A4; }
    * { box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      margin: 0; padding: 0; background: #fff; color: #0f172a;
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }
    .page { width: 210mm; min-height: 297mm; padding: 40px 35px; margin: 0 auto; }
    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .logo-area { display: flex; align-items: center; gap: 12px; }
    .logo { height: 48px; width: auto; }
    .company-name { font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
    .quotation-title { font-size: 30px; font-weight: 900; color: #293c5b; letter-spacing: -0.03em; }
    .divider-navy { height: 2px; background: #293c5b; margin: 14px 0; }
    .divider-thin { height: 1px; background: #e2e8f0; margin: 12px 0; }
    .info-section { display: flex; justify-content: space-between; margin-bottom: 16px; }
    .bill-to h3 { font-size: 10px; font-weight: 700; color: #293c5b; text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 6px 0; }
    .bill-to p { font-size: 11px; color: #0f172a; margin: 2px 0; line-height: 1.5; }
    .meta-section { text-align: right; }
    .meta-row { margin-bottom: 3px; }
    .meta-label { font-size: 10px; font-weight: 600; color: #64748b; }
    .meta-value { font-size: 11px; font-weight: 600; color: #0f172a; }
    .table-wrap { border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; }
    th {
      background: #293c5b; color: #fff; font-size: 10px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.05em;
      padding: 10px 12px; text-align: left;
    }
    th.text-right { text-align: right; }
    th.text-center { text-align: center; }
    .td { padding: 10px 12px; font-size: 11px; border-bottom: 1px solid #f1f5f9; color: #0f172a; }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .grand-total td {
      background: #fff7ed; border-top: 2px solid #ea580c; border-bottom: none;
      font-weight: 700; font-size: 13px; padding: 12px;
    }
    .grand-total .label { text-align: right; color: #0f172a; }
    .grand-total .value { text-align: right; color: #ea580c; font-size: 15px; }
    .terms {
      border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 20px;
      background: #fafafa; margin-bottom: 16px;
    }
    .terms h4 { font-size: 11px; font-weight: 700; color: #293c5b; margin: 0 0 8px 0; }
    .terms ul { margin: 0; padding-left: 16px; list-style: disc; }
    .terms li { font-size: 10px; color: #475569; line-height: 1.7; }
    .thank-you { text-align: center; font-size: 11px; font-style: italic; color: #94a3b8; padding-top: 8px; }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="logo-area">
        <img src="/hardware-logo.png" alt="Logo" class="logo" />
        <span class="company-name">${siteConfig.businessName}</span>
      </div>
      <div class="quotation-title">QUOTATION</div>
    </div>
    <div class="divider-navy"></div>
    <div class="info-section">
      <div class="bill-to">
        <h3>Bill To</h3>
        <p style="font-weight: 700">${quote.customer_name}</p>
        <p>${quote.phone}</p>
        ${quote.email ? `<p>${quote.email}</p>` : ""}
      </div>
      <div class="meta-section">
        <div class="meta-row">
          <span class="meta-label">Quotation #: </span>
          <span class="meta-value">${quotationNumber}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Date: </span>
          <span class="meta-value">${today}</span>
        </div>
      </div>
    </div>
    <div class="divider-thin"></div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th style="width: 32px">#</th>
            <th>Description</th>
            <th style="width: 50px" class="text-center">Qty</th>
            <th style="width: 50px" class="text-center">Unit</th>
            <th style="width: 90px" class="text-right">Unit Price</th>
            <th style="width: 90px" class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr class="grand-total">
            <td colspan="4"></td>
            <td class="label">Grand Total:</td>
            <td class="value">KES ${grandTotal.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="terms">
      <h4>Terms &amp; Conditions</h4>
      <ul>
        <li>Quotation valid for 14 days from the date above.</li>
        <li>Prices are inclusive of VAT where applicable.</li>
        <li>Delivery charges may apply based on location and order value.</li>
      </ul>
    </div>
    <div class="thank-you">Thank you for choosing ${siteConfig.businessName}.</div>
  </div>
  <script>window.print();window.close();</script>
</body>
</html>`);

    printWindow.document.close();
  }, [quote, items, quotationNumber, grandTotal]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-auto w-full max-w-[210mm] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
          <h3 className="text-sm font-bold text-slate-900">
            Preview — {quotationNumber}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-md bg-slate-950 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5 1a2 2 0 00-2 2v1h10V3a2 2 0 00-2-2H5zm6 2H5v1h6V3z" />
                <path fillRule="evenodd" d="M11 7H5v1h6V7z" />
                <path d="M3 7a2 2 0 00-2 2v3a1 1 0 001 1h1v-1a2 2 0 012-2h6a2 2 0 012 2v1h1a1 1 0 001-1V9a2 2 0 00-2-2H3z" />
                <path d="M6 11a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2z" />
              </svg>
              Print
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
        <div className="max-h-[80vh] overflow-y-auto bg-white p-8">
          <div className="mx-auto" style={{ maxWidth: "210mm" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src="/hardware-logo.png" alt="Logo" className="h-10 w-auto" />
                <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                  {siteConfig.businessName}
                </span>
              </div>
              <span className="text-3xl font-black text-[#293c5b] tracking-tighter">
                QUOTATION
              </span>
            </div>
            <div className="h-0.5 bg-[#293c5b] mb-4" />
            <div className="flex justify-between mb-4">
              <div>
                <h4 className="text-[10px] font-bold text-[#293c5b] uppercase tracking-wider mb-1">
                  Bill To
                </h4>
                <p className="text-xs font-bold text-slate-900">{quote.customer_name}</p>
                <p className="text-xs text-slate-900">{quote.phone}</p>
                {quote.email && <p className="text-xs text-slate-900">{quote.email}</p>}
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500">
                  <span className="font-semibold">Quotation #:</span>{" "}
                  <span className="font-semibold text-slate-900">{quotationNumber}</span>
                </p>
                <p className="text-[10px] text-slate-500">
                  <span className="font-semibold">Date:</span>{" "}
                  <span className="font-semibold text-slate-900">
                    {new Date().toLocaleDateString("en-KE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
              </div>
            </div>
            <div className="h-px bg-slate-200 mb-4" />
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#293c5b] text-white text-[10px] font-bold uppercase tracking-wider">
                    <th className="px-3 py-2.5 text-left w-8">#</th>
                    <th className="px-3 py-2.5 text-left">Description</th>
                    <th className="px-3 py-2.5 text-center w-14">Qty</th>
                    <th className="px-3 py-2.5 text-center w-14">Unit</th>
                    <th className="px-3 py-2.5 text-right w-28">Unit Price</th>
                    <th className="px-3 py-2.5 text-right w-28">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, i) => (
                    <tr key={item.id}>
                      <td className="px-3 py-2.5 text-slate-400">{i + 1}</td>
                      <td className="px-3 py-2.5 font-medium text-slate-900">{item.item_name}</td>
                      <td className="px-3 py-2.5 text-center text-slate-600">{item.quantity ?? 1}</td>
                      <td className="px-3 py-2.5 text-center text-slate-600">{item.unit ?? ""}</td>
                      <td className="px-3 py-2.5 text-right font-medium text-slate-900">
                        {item.unit_price != null ? `KES ${item.unit_price.toLocaleString()}` : "-"}
                      </td>
                      <td className="px-3 py-2.5 text-right font-semibold text-slate-900">
                        {item.unit_price != null
                          ? `KES ${((item.unit_price) * (item.quantity ?? 1)).toLocaleString()}`
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-orange-50 font-bold">
                    <td colSpan={4} className="px-3 py-3"></td>
                    <td className="px-3 py-3 text-right text-sm text-slate-900">Grand Total:</td>
                    <td className="px-3 py-3 text-right text-base text-orange-600">
                      KES {grandTotal.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50/50 px-5 py-3">
              <h4 className="text-xs font-bold text-[#293c5b] mb-2">Terms &amp; Conditions</h4>
              <ul className="list-disc pl-4 text-[11px] text-slate-600 space-y-0.5">
                <li>Quotation valid for 14 days from the date above.</li>
                <li>Prices are inclusive of VAT where applicable.</li>
                <li>Delivery charges may apply based on location and order value.</li>
              </ul>
            </div>
            <p className="mt-4 text-center text-xs italic text-slate-400">
              Thank you for choosing {siteConfig.businessName}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
