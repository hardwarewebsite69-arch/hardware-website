"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  updateQuoteItemPrice,
  generateQuotationNumber,
  saveQuotation,
  addQuoteItem,
  deleteQuoteItem,
} from "@/lib/admin";
import { siteConfig } from "@/lib/site-config";
import { PrintableQuotation } from "./PrintableQuotation";
import type { QuoteItem } from "@/lib/admin";
import type { Quote } from "@/lib/types";

type EditableItem = QuoteItem & {
  _dirty?: boolean;
};

const NAVY: [number, number, number] = [41, 65, 91];
const ORANGE: [number, number, number] = [234, 88, 12];

async function toBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Failed to convert image to base64"));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function QuotationEditor({
  quote,
  initialItems,
}: {
  quote: Quote;
  initialItems: QuoteItem[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<EditableItem[]>(
    initialItems.map((i) => ({ ...i, _dirty: false })),
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [qNum, setQNum] = useState<string | null>(quote.quotation_number);
  const [isOpen, setIsOpen] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const [newItem, setNewItem] = useState({
    itemName: "",
    quantity: "1",
    unit: "pcs",
    unitPrice: "",
  });

  const updatePrice = useCallback(
    async (itemId: string, value: string) => {
      const price = value === "" ? null : parseFloat(value);
      const numPrice = price && !isNaN(price) ? price : null;

      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? { ...item, unit_price: numPrice, _dirty: true }
            : item,
        ),
      );

      try {
        await updateQuoteItemPrice(itemId, numPrice);
        setItems((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, _dirty: false } : item,
          ),
        );
      } catch {
        setItems((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, _dirty: false } : item,
          ),
        );
      }
    },
    [],
  );

  const handleAddItem = useCallback(async () => {
    if (!newItem.itemName.trim()) return;

    const quantity = parseFloat(newItem.quantity) || 1;
    const unitPrice =
      newItem.unitPrice === "" ? null : parseFloat(newItem.unitPrice);
    const numUnitPrice =
      unitPrice && !isNaN(unitPrice) ? unitPrice : null;

    try {
      const created = await addQuoteItem({
        quoteId: quote.id,
        itemName: newItem.itemName.trim(),
        quantity,
        unit: newItem.unit.trim() || "pcs",
        unitPrice: numUnitPrice,
      });
      setItems((prev) => [...prev, { ...created, _dirty: false }]);
      setNewItem({ itemName: "", quantity: "1", unit: "pcs", unitPrice: "" });
    } catch (e) {
      console.error("Failed to add item:", e);
    }
  }, [newItem, quote.id]);

  const handleDeleteItem = useCallback(
    async (itemId: string) => {
      try {
        await deleteQuoteItem(itemId);
        setItems((prev) => prev.filter((i) => i.id !== itemId));
      } catch (e) {
        console.error("Failed to delete item:", e);
      }
    },
    [],
  );

  const grandTotal = items.reduce((sum, item) => {
    return sum + (item.unit_price ?? 0) * (item.quantity ?? 1);
  }, 0);

  const ensureQuotationNumber = useCallback(async () => {
    if (qNum) return qNum;
    const num = await generateQuotationNumber();
    setQNum(num);
    await saveQuotation(quote.id, num);
    router.refresh();
    return num;
  }, [qNum, quote.id, router]);

  const generatePDF = useCallback(async () => {
    setIsGenerating(true);
    try {
      const num = await ensureQuotationNumber();
      const logoDataUrl = await toBase64(`${window.location.origin}/hardware-logo.png`);
      const doc = new jsPDF();
      const pw = doc.internal.pageSize.getWidth();
      const m = 20;

      const today = new Date().toLocaleDateString("en-KE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const imgProps = doc.getImageProperties(logoDataUrl);
      const logoW = 26;
      const logoH = (imgProps.height / imgProps.width) * logoW;
      doc.addImage(logoDataUrl, "PNG", m, 12, logoW, logoH);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(siteConfig.businessName, m + logoW + 6, 24);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(`Tel: ${siteConfig.phone}`, m + logoW + 6, 31);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.setTextColor(...NAVY);
      doc.text("QUOTATION", pw - m, 28, { align: "right" });

      doc.setTextColor(0);
      doc.setDrawColor(...NAVY);
      doc.setLineWidth(0.5);
      doc.line(m, 46, pw - m, 46);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...NAVY);
      doc.text("Bill To", m, 58);

      doc.setTextColor(0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(quote.customer_name, m, 67);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(quote.phone, m, 74);
      if (quote.email) doc.text(quote.email, m, 81);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`Quotation #:  ${num}`, pw - m, 58, { align: "right" });
      doc.text(`Date:  ${today}`, pw - m, 67, { align: "right" });

      const infoBottom = quote.email ? 89 : 82;
      doc.setDrawColor(200);
      doc.setLineWidth(0.3);
      doc.line(m, infoBottom, pw - m, infoBottom);

      const tableData = items.map((item, index) => [
        index + 1,
        item.item_name,
        item.quantity ?? 1,
        item.unit ?? "",
        item.unit_price != null ? `KES ${item.unit_price.toLocaleString()}` : "-",
        item.unit_price != null
          ? `KES ${((item.unit_price) * (item.quantity ?? 1)).toLocaleString()}`
          : "-",
      ]);

      autoTable(doc, {
        startY: infoBottom + 8,
        head: [["#", "Description", "Qty", "Unit", "Unit Price", "Total"]],
        body: tableData,
        theme: "grid",
        headStyles: {
          fillColor: NAVY,
          textColor: 255,
          fontStyle: "bold",
          fontSize: 9,
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        columnStyles: {
          0: { cellWidth: 10, halign: "center" },
          1: { cellWidth: "auto" },
          2: { cellWidth: 15, halign: "center" },
          3: { cellWidth: 15, halign: "center" },
          4: { cellWidth: 30, halign: "right" },
          5: { cellWidth: 30, halign: "right" },
        },
        foot: [
          [
            "",
            "",
            "",
            "",
            {
              content: "Grand Total:",
              styles: { fontStyle: "bold", halign: "right", fontSize: 9 },
            },
            {
              content: `KES ${grandTotal.toLocaleString()}`,
              styles: { fontStyle: "bold", halign: "right", fontSize: 10 },
            },
          ],
        ],
        footStyles: {
          fillColor: [255, 247, 237],
          textColor: ORANGE,
          fontSize: 9,
        },
      });

      const lastY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...NAVY);
      doc.text("Terms & Conditions", m, lastY + 8);

      doc.setTextColor(100);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("1. Quotation valid for 14 days from the date above.", m, lastY + 16);
      doc.text("2. Prices are inclusive of VAT where applicable.", m, lastY + 22);
      doc.text("3. Delivery charges may apply based on location and order value.", m, lastY + 28);

      doc.setTextColor(0);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.text("Thank you for choosing Amroz Traders.", pw / 2, lastY + 40, { align: "center" });

      doc.save(`Quotation-${num.replace(/\//g, "-")}.pdf`);
    } catch (e) {
      console.error("Failed to generate PDF:", e);
      alert("Failed to generate quotation PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [items, qNum, quote, grandTotal, router, ensureQuotationNumber]);

  const handlePreviewPrint = useCallback(async () => {
    await ensureQuotationNumber();
    setShowPrintModal(true);
  }, [ensureQuotationNumber]);

  const dirtyCount = items.filter((i) => i._dirty).length;

  if (!isOpen) {
    return (
      <div className="border-t border-slate-100 px-5 py-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3.5 2A1.5 1.5 0 002 3.5v9A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0012.5 2h-9zM4 4.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7z" />
            <path d="M6.5 6.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H7a.5.5 0 01-.5-.5zM6.5 8a.5.5 0 01.5-.5h2a.5.5 0 010 1H7a.5.5 0 01-.5-.5z" />
          </svg>
          {qNum
            ? `View Quotation (${qNum})`
            : "Generate Quotation"}
        </button>
        {qNum && (
          <button
            type="button"
            onClick={generatePDF}
            disabled={isGenerating}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8.75 1.75a.75.75 0 00-1.5 0v5.69L5.03 5.22a.75.75 0 00-1.06 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 00-1.06-1.06L8.75 7.44V1.75z" />
              <path d="M3.5 9.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 15h6.5A2.75 2.75 0 0014 12.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            Download PDF
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="border-t border-slate-100">
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-extrabold text-slate-900">
            Quotation Editor
            {qNum && (
              <span className="ml-2 text-xs font-mono font-medium text-orange-600">
                {qNum}
              </span>
            )}
          </h3>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Collapse
          </button>
        </div>

        {dirtyCount > 0 && (
          <div className="mb-3 rounded bg-amber-50 px-3 py-2 text-xs text-amber-700">
            Saving prices... ({dirtyCount} pending)
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <th className="px-3 py-2.5 w-8">#</th>
                <th className="px-3 py-2.5">Item</th>
                <th className="px-3 py-2.5 w-16">Qty</th>
                <th className="px-3 py-2.5 w-16">Unit</th>
                <th className="px-3 py-2.5 w-28">Unit Price (KES)</th>
                <th className="px-3 py-2.5 w-24">Total</th>
                <th className="px-3 py-2.5 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item, index) => {
                const lineTotal = (item.unit_price ?? 0) * (item.quantity ?? 1);
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="px-3 py-2.5 text-xs text-slate-400 font-mono">
                      {index + 1}
                    </td>
                    <td className="px-3 py-2.5 font-semibold text-slate-900 text-sm">
                      {item.item_name}
                      {item.notes && (
                        <span className="ml-2 text-xs font-normal text-slate-400 italic">
                          {item.notes}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-600">
                      {item.quantity ?? 1}
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-600">
                      {item.unit ?? ""}
                    </td>
                    <td className="px-3 py-2.5">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.unit_price ?? ""}
                        onChange={(e) => updatePrice(item.id, e.target.value)}
                        placeholder="Price"
                        className="w-full rounded border border-slate-200 px-2 py-1 text-xs font-medium text-slate-900 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                      />
                    </td>
                    <td className="px-3 py-2.5 text-xs font-bold text-slate-900">
                      {item.unit_price != null
                        ? `KES ${lineTotal.toLocaleString()}`
                        : "-"}
                    </td>
                    <td className="px-3 py-2.5">
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="flex h-6 w-6 items-center justify-center rounded text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Remove item"
                      >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                          <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 font-bold text-slate-900">
                <td colSpan={4} className="px-3 py-2.5 text-xs"></td>
                <td className="px-3 py-2.5 text-xs text-right">Grand Total:</td>
                <td className="px-3 py-2.5 text-xs">
                  KES {grandTotal.toLocaleString()}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-slate-200 bg-slate-50/50 p-3">
          <input
            type="text"
            value={newItem.itemName}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, itemName: e.target.value }))
            }
            placeholder="Item name"
            className="min-w-[160px] flex-1 rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-900 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, quantity: e.target.value }))
            }
            placeholder="Qty"
            className="w-16 rounded border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
          <input
            type="text"
            value={newItem.unit}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, unit: e.target.value }))
            }
            placeholder="Unit"
            className="w-16 rounded border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
          <input
            type="number"
            step="0.01"
            min="0"
            value={newItem.unitPrice}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, unitPrice: e.target.value }))
            }
            placeholder="Price"
            className="w-20 rounded border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
          <button
            type="button"
            onClick={handleAddItem}
            disabled={!newItem.itemName.trim()}
            className="rounded bg-slate-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-700 transition-colors disabled:opacity-40"
          >
            Add Item
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {!qNum ? (
            <button
              type="button"
              onClick={generatePDF}
              disabled={isGenerating || items.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-500 transition-colors disabled:opacity-50 col-span-2"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Generating...
                </span>
              ) : (
                <>
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3.5 2A1.5 1.5 0 002 3.5v9A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0012.5 2h-9zM4 4.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7z" />
                    <path d="M6.5 6.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H7a.5.5 0 01-.5-.5zM6.5 8a.5.5 0 01.5-.5h2a.5.5 0 010 1H7a.5.5 0 01-.5-.5z" />
                  </svg>
                  Generate & Download PDF
                </>
              )}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={generatePDF}
                disabled={isGenerating}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Downloading...
                  </span>
                ) : (
                  <>
                    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8.75 1.75a.75.75 0 00-1.5 0v5.69L5.03 5.22a.75.75 0 00-1.06 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 00-1.06-1.06L8.75 7.44V1.75z" />
                      <path d="M3.5 9.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 15h6.5A2.75 2.75 0 0014 12.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handlePreviewPrint}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M5 1a2 2 0 00-2 2v1h10V3a2 2 0 00-2-2H5zm6 2H5v1h6V3z" />
                  <path fillRule="evenodd" d="M3 5A2 2 0 001 7v5a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H3zm0 2a1 1 0 00-1 1v5a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1H3z" />
                </svg>
                Preview & Print
              </button>
            </>
          )}
        </div>

        {showPrintModal && qNum && (
          <PrintableQuotation
            quote={quote}
            items={items}
            quotationNumber={qNum}
            grandTotal={grandTotal}
            onClose={() => setShowPrintModal(false)}
          />
        )}
      </div>
    </div>
  );
}
