"use client";

import { useMemo, useState, useTransition } from "react";
import { createManualQuote, createUploadQuote } from "@/lib/quotes";
import { searchProducts } from "@/lib/catalog";
import { UploadDropzone } from "@/lib/uploadthing";
import type { Product } from "@/lib/types";

type QuoteFormProps = {
  defaultMode?: "upload" | "manual";
};

type ManualItem = {
  product_id?: string;
  item_name: string;
  quantity: string;
  unit: string;
  notes: string;
};

const isImageFile = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext ? ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext) : false;
};

const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (!ext) return "description";
  if (ext === "pdf") return "picture_as_pdf";
  if (["xls", "xlsx", "csv"].includes(ext)) return "table_chart";
  if (["doc", "docx"].includes(ext)) return "article";
  return "description";
};

export function QuoteForm({ defaultMode = "upload" }: QuoteFormProps) {
  const [mode, setMode] = useState<"upload" | "manual">(defaultMode);
  
  // Manual mode states
  const [items, setItems] = useState<ManualItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Upload mode states
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [uploadedFileKey, setUploadedFileKey] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const canSubmit = useMemo(() => {
    if (mode === "upload") {
      return !!uploadedFileUrl;
    }
    return items.some((item) => item.item_name.trim().length > 0);
  }, [mode, uploadedFileUrl, items]);

  // Search products handler
  const handleSearchChange = async (query: string) => {
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const results = await searchProducts(query);
      setSearchResults(results);
    } catch (err) {
      console.error("Failed to search products:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const addProductToQuote = (product: Product) => {
    const newItem: ManualItem = {
      product_id: product.id,
      item_name: product.name,
      quantity: "1",
      unit: "pcs",
      notes: product.sku ? `SKU: ${product.sku}` : "",
    };

    setItems((curr) => {
      const existing = curr.find((i) => i.product_id === product.id);
      if (existing) {
        return curr.map((i) =>
          i.product_id === product.id
            ? { ...i, quantity: String(parseInt(i.quantity, 10) + 1) }
            : i
        );
      }
      return [...curr, newItem];
    });

    setSearchQuery("");
    setSearchResults([]);
  };

  const addCustomItem = () => {
    if (!searchQuery.trim()) return;
    const newItem: ManualItem = {
      item_name: searchQuery.trim(),
      quantity: "1",
      unit: "pcs",
      notes: "",
    };

    setItems((curr) => [...curr, newItem]);
    setSearchQuery("");
    setSearchResults([]);
  };

  function updateItem(index: number, field: keyof ManualItem, value: string) {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    );
  }

  function removeManualItem(index: number) {
    setItems((current) => current.filter((_, i) => i !== index));
  }

  function submit(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      try {
        const fileUrl = formData.get("uploadedFileUrl") as string | null;
        const fileKey = formData.get("uploadedFileKey") as string | null;
        const fileName = formData.get("uploadedFileName") as string | null;

        const base = {
          customerName: String(formData.get("customerName") ?? ""),
          email: String(formData.get("email") ?? "") || null,
          message: String(formData.get("message") ?? "") || null,
          phone: String(formData.get("phone") ?? ""),
        };

        if (mode === "upload") {
          if (!fileUrl) {
            throw new Error("Please upload a BOQ file before submitting.");
          }

          await createUploadQuote({
            ...base,
            uploadPublicId: fileKey || "direct-upload",
            uploadUrl: fileUrl,
            uploadMetadata: { 
              name: fileName || "Uploaded BOQ",
              source: "quote-form-uploadthing" 
            },
          });
        } else {
          const validItems = items.filter((item) => item.item_name.trim());
          if (validItems.length === 0) {
            throw new Error("Please add at least one item to your quote list.");
          }

          await createManualQuote({
            ...base,
            items: validItems.map((item) => ({
              product_id: item.product_id || null,
              item_name: item.item_name.trim(),
              notes: item.notes.trim() || null,
              quantity: item.quantity ? Number(item.quantity) : null,
              unit: item.unit.trim() || null,
            })),
          });
        }
        
        // Reset states
        setUploadedFileUrl(null);
        setUploadedFileKey(null);
        setUploadedFileName(null);
        setItems([]);
        
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
          className={`rounded px-3 py-2 transition-all ${
            mode === "upload" ? "bg-slate-950 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
          onClick={() => setMode("upload")}
          type="button"
        >
          Upload List
        </button>
        <button
          className={`rounded px-3 py-2 transition-all ${
            mode === "manual" ? "bg-slate-950 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
          onClick={() => setMode("manual")}
          type="button"
        >
          Manual Entry
        </button>
      </div>

      <form action={submit} className="mt-6 grid gap-4">
        {/* Contact Fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Name
            <input className="input-field" name="customerName" required placeholder="e.g. John Doe" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Phone
            <input className="input-field" name="phone" required type="tel" placeholder="e.g. +254 712 345678" />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-semibold">
          Email
          <input className="input-field" name="email" type="email" placeholder="e.g. john@gmail.com" />
        </label>

        {/* Mode specific fields */}
        {mode === "upload" ? (
          <div className="grid gap-2">
            <span className="text-sm font-semibold">Upload BOQ / Product List</span>
            
            {uploadedFileUrl ? (
              <div className="relative flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <div className="flex items-center gap-3 min-w-0">
                  {uploadedFileName && isImageFile(uploadedFileName) ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
                      <img
                        src={uploadedFileUrl || ""}
                        alt={uploadedFileName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded border border-slate-200 bg-white shadow-sm text-slate-400">
                      <span className="material-symbols-outlined text-3xl">
                        {getFileIcon(uploadedFileName || "")}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-800">{uploadedFileName || "Uploaded file"}</p>
                    <a
                      href={uploadedFileUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline"
                    >
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      View full file
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setUploadedFileUrl(null);
                    setUploadedFileKey(null);
                    setUploadedFileName(null);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-800 transition-colors"
                  title="Remove file"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 p-1 bg-slate-50">
                <UploadDropzone
                  endpoint="quoteUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                      setUploadedFileUrl(res[0].url);
                      setUploadedFileKey(res[0].key);
                      setUploadedFileName(res[0].name);
                      setUploadError(null);
                    }
                  }}
                  onUploadError={(error) => {
                    setUploadError(error.message);
                    console.error("UploadThing error:", error);
                  }}
                  className="ut-label:text-orange-600 ut-button:bg-orange-600 hover:ut-button:bg-orange-700 ut-allowed-content:text-slate-400 border-none bg-transparent py-8"
                />
                {uploadError && (
                  <p className="mt-2 text-center text-xs font-semibold text-red-600 px-4">{uploadError}</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            <span className="text-sm font-semibold">Items in Quote</span>
            
            {/* List of Manual Items */}
            <div className="grid gap-3">
              {items.map((item, index) => (
                <div 
                  className="grid gap-3 rounded border border-slate-200 p-3 bg-slate-50 md:grid-cols-[2fr_100px_100px_2fr_40px] items-center" 
                  key={index}
                >
                  <div>
                    <p className="text-sm font-bold text-slate-950">{item.item_name}</p>
                    {item.product_id ? (
                      <span className="inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.5 bg-orange-100 text-orange-800 rounded-full">
                        Catalog Product
                      </span>
                    ) : (
                      <span className="inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full">
                        Custom Item
                      </span>
                    )}
                  </div>
                  <input
                    className="input-field text-center py-1 px-2"
                    min="1"
                    onChange={(event) => updateItem(index, "quantity", event.target.value)}
                    placeholder="Qty"
                    type="number"
                    value={item.quantity}
                  />
                  <input
                    className="input-field text-center py-1 px-2"
                    onChange={(event) => updateItem(index, "unit", event.target.value)}
                    placeholder="Unit"
                    value={item.unit}
                  />
                  <input
                    className="input-field py-1 px-3"
                    onChange={(event) => updateItem(index, "notes", event.target.value)}
                    placeholder="Notes (e.g. size, color)"
                    value={item.notes}
                  />
                  <button
                    type="button"
                    onClick={() => removeManualItem(index)}
                    className="text-slate-400 hover:text-red-600 transition-colors flex justify-center items-center h-8 w-8 rounded-full hover:bg-slate-200"
                    title="Remove item"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              ))}

              {items.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-6 bg-slate-50 rounded border border-dashed border-slate-200">
                  No items added yet. Search the catalog below or type to add custom items.
                </p>
              )}
            </div>

            {/* Product Search Tool */}
            <div className="relative border border-slate-200 rounded-lg p-4 bg-white shadow-sm mt-2">
              <label className="grid gap-2 text-sm font-semibold">
                Search Catalog to Add Items
                <div className="relative flex items-center mt-1">
                  <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg">search</span>
                  <input
                    className="input-field w-full pl-10 pr-24"
                    placeholder="Type name (e.g. Cement, PPR Pipe, Paint...)"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                  {searchQuery.trim() && (
                    <button
                      type="button"
                      onClick={addCustomItem}
                      className="absolute right-2 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded transition-colors"
                    >
                      Add Custom
                    </button>
                  )}
                </div>
              </label>

              {/* Search Results Dropdown */}
              {searchQuery.trim().length >= 2 && (
                <div className="absolute left-4 right-4 z-50 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto divide-y divide-slate-100">
                  {isSearching ? (
                    <div className="p-4 text-center text-sm text-slate-500">Searching catalog...</div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => addProductToQuote(product)}
                        className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{product.name}</p>
                          {product.sku && <p className="text-xs text-slate-400">SKU: {product.sku}</p>}
                        </div>
                        <div className="flex items-center gap-3">
                          {product.price ? (
                            <span className="text-xs font-bold text-slate-600">Ksh {product.price.toLocaleString()}</span>
                          ) : (
                            <span className="text-xs text-slate-400">Request Price</span>
                          )}
                          <span className="material-symbols-outlined text-orange-600 text-lg">add_circle</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-left text-sm text-slate-500 flex flex-col gap-2">
                      <p>No products found matching "{searchQuery}"</p>
                      <button
                        type="button"
                        onClick={addCustomItem}
                        className="w-fit text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-xs">add</span> Add "{searchQuery}" as custom item
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hidden inputs to feed UploadThing state into FormData */}
        {mode === "upload" && uploadedFileUrl && (
          <>
            <input type="hidden" name="uploadedFileUrl" value={uploadedFileUrl} />
            <input type="hidden" name="uploadedFileKey" value={uploadedFileKey || ""} />
            <input type="hidden" name="uploadedFileName" value={uploadedFileName || ""} />
          </>
        )}

        <label className="grid gap-2 text-sm font-semibold">
          Message
          <textarea className="input-field min-h-24" name="message" placeholder="Add details or special delivery instructions..." />
        </label>

        <button
          className="rounded bg-orange-600 px-5 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60 transition-colors hover:bg-orange-500 shadow-md"
          disabled={isPending || !canSubmit}
          type="submit"
        >
          {isPending ? "Submitting..." : "Submit Quote Request"}
        </button>

        {message && (
          <p className="rounded bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 border border-slate-200">
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
