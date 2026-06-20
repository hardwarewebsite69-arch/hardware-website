"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { createManualQuote, createUploadQuote } from "@/lib/quotes";
import { searchProducts } from "@/lib/catalog";

import { useUploadThing } from "@/lib/uploadthing";
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
  const ext = filename.split(".").pop()?.toLowerCase();
  return ext ? ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext) : false;
};

const getFileIcon = (filename: string) => {
  const ext = filename.split(".").pop()?.toLowerCase();
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
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const triggerSearch = async () => {
      if (debouncedSearchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const results = await searchProducts(debouncedSearchQuery);
        setSearchResults(results);
      } catch (err) {
        console.error("Failed to search products:", err);
      } finally {
        setIsSearching(false);
      }
    };

    triggerSearch();
  }, [debouncedSearchQuery]);

  // Upload mode states
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [uploadedFileKey, setUploadedFileKey] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload, isUploading: utIsUploading } = useUploadThing("quoteUploader", {
    onUploadBegin: () => {
      setIsUploading(true);
      setUploadProgress(0);
      setUploadError(null);
    },
    onUploadProgress: (p) => setUploadProgress(p),
    onClientUploadComplete: (res) => {
      setIsUploading(false);
      if (res && res.length > 0) {
        setUploadedFileUrl(res[0].url);
        setUploadedFileKey(res[0].key);
        setUploadedFileName(res[0].name);
        setUploadError(null);
      }
    },
    onUploadError: (err) => {
      setIsUploading(false);
      setUploadError(err.message);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await startUpload([file]);
    // reset so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canSubmit = useMemo(() => {
    if (mode === "upload") {
      return !!uploadedFileUrl;
    }
    return items.some((item) => item.item_name.trim().length > 0);
  }, [mode, uploadedFileUrl, items]);

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

        const customerName = String(formData.get("customerName") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim() || null;
        const messageVal = String(formData.get("message") ?? "").trim() || null;
        const rawPhone = String(formData.get("phone") ?? "").trim();
        // Keep a leading + then strip everything except digits
        const hasPlus = rawPhone.startsWith("+");
        const cleanDigits = rawPhone.replace(/[^0-9]/g, "");
        if (cleanDigits.length < 7 || cleanDigits.length > 15) {
          throw new Error("Please enter a valid phone number (7 to 15 digits).");
        }
        // Auto-add + if user typed 254... without it (Kenya country code)
        const needsPlus = hasPlus || cleanDigits.startsWith("254");
        const phone = (needsPlus ? "+" : "") + cleanDigits;

        const base = {
          customerName,
          email,
          message: messageVal,
          phone,
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
              source: "quote-form-uploadthing",
            },
          });
        } else {
          const validItems = items.filter((item) => item.item_name.trim());
          if (validItems.length === 0) {
            throw new Error("Please add at least one item to your quote list.");
          }

          await createManualQuote({
            ...base,
            items: validItems.map((item) => {
              let qty = parseFloat(item.quantity);
              if (isNaN(qty) || qty <= 0) qty = 1;
              return {
                product_id: item.product_id || null,
                item_name: item.item_name.trim(),
                notes: item.notes?.trim() || null,
                quantity: qty,
                unit: item.unit?.trim() || null,
              };
            }),
          });
        }

        setUploadedFileUrl(null);
        setUploadedFileKey(null);
        setUploadedFileName(null);
        setItems([]);
        setMessage("Quote request received. Our team will respond shortly.");
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : "Could not submit quote request."
        );
      }
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    submit(formData);
  };

  return (
    <section className="mx-auto w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      {/* Tab Switcher - Sleeker Pill Design */}
      <div className="flex rounded-lg bg-slate-100 p-1 text-sm font-semibold mb-8">
        <button
          className={`flex-1 rounded-md px-4 py-2.5 transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
            mode === "upload"
              ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
          onClick={() => setMode("upload")}
          type="button"
          disabled={isUploading || isPending}
        >
          Upload BOQ List
        </button>
        <button
          className={`flex-1 rounded-md px-4 py-2.5 transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
            mode === "manual"
              ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
          onClick={() => setMode("manual")}
          type="button"
          disabled={isUploading || isPending}
        >
          Manual Entry
        </button>
      </div>

      <div className="grid gap-6">
        {/* Contact Details Group */}
        <div className="grid gap-5 sm:grid-cols-2 rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:p-5">
          <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
            Full Name <span className="text-orange-600">*</span>
            <input
              className="input-field"
              name="customerName"
              form="quote-form"
              required
              placeholder="e.g. John Doe"
              disabled={isPending || isUploading}
              autoComplete="name"
            />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
            Phone Number <span className="text-orange-600">*</span>
            <input
              className="input-field"
              name="phone"
              form="quote-form"
              required
              type="tel"
              placeholder="e.g. +254 712 345678"
              disabled={isPending || isUploading}
              autoComplete="tel"
            />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-slate-700 sm:col-span-2">
            Email Address
            <input
              className="input-field"
              name="email"
              form="quote-form"
              type="email"
              placeholder="e.g. john@company.com"
              disabled={isPending || isUploading}
              autoComplete="email"
            />
          </label>
        </div>

        {/* Dynamic Mode Section — UploadDropzone MUST live outside <form> so its
            internal submit button never triggers the form's onSubmit handler */}
        <div className="grid gap-2">
          {mode === "upload" ? (
            <div className="grid gap-3">
              <span className="text-sm font-bold text-slate-800">
                Upload BOQ / Product List
              </span>

              {isUploading ? (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-orange-200 bg-orange-50/30 p-10 text-center transition-all">
                  <div className="relative flex h-14 w-14 items-center justify-center">
                    <div className="absolute h-full w-full animate-spin rounded-full border-4 border-orange-100 border-t-orange-600"></div>
                  </div>
                  <p className="mt-4 text-sm font-bold text-slate-800">
                    Uploading your file...
                  </p>
                  <div className="mt-4 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-1.5 rounded-full bg-orange-600 transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    {uploadProgress}%
                  </p>
                </div>
              ) : uploadedFileUrl ? (
                <div className="group relative flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-300">
                  <div className="flex min-w-0 items-center gap-4">
                    {uploadedFileName && isImageFile(uploadedFileName) ? (
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                        <img
                          src={uploadedFileUrl || ""}
                          alt={uploadedFileName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-slate-400">
                        <span className="material-symbols-outlined text-3xl">
                          {getFileIcon(uploadedFileName || "")}
                        </span>
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-800">
                        {uploadedFileName || "Uploaded file"}
                      </p>
                      <a
                        href={uploadedFileUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-orange-600 transition-colors hover:text-orange-700 hover:underline"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          open_in_new
                        </span>
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
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Remove file"
                  >
                    <span className="material-symbols-outlined text-lg">
                      delete
                    </span>
                  </button>
                </div>
              ) : (
                <div
                  className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 transition-colors hover:border-orange-300 hover:bg-orange-50/20"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) startUpload([file]);
                  }}
                >
                  <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                    {/* Upload icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      className="mx-auto mb-4 h-12 w-12 text-slate-300"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765a4.5 4.5 0 0 1 8.302-3.046a3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm font-semibold text-slate-600 mb-1">
                      Choose a file or drag and drop
                    </p>
                    <p className="text-xs text-slate-400 mb-6">
                      PDF, Excel, Word, images up to 16MB
                    </p>
                    {/* Plain native file input — always works */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="quote-file-input"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.png,.jpg,.jpeg,.webp,.gif,.svg"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="quote-file-input"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-800 disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[18px]">upload_file</span>
                      Choose File
                    </label>
                  </div>
                  {uploadError && (
                    <p className="pb-4 text-center text-xs font-semibold text-red-600">
                      {uploadError}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800">
                  Items in Quote
                </span>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  {items.length} {items.length === 1 ? "Item" : "Items"}
                </span>
              </div>

              {/* Responsive Manual Items List */}
              <div className="grid gap-3">
                {items.map((item, index) => (
                  <div
                    className="flex flex-col md:grid md:grid-cols-[2fr_90px_90px_2fr_auto] items-start md:items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-300"
                    key={index}
                  >
                    <div className="w-full min-w-0">
                      <p className="truncate text-sm font-bold text-slate-900">
                        {item.item_name}
                      </p>
                      {item.product_id ? (
                        <span className="mt-1 inline-block rounded-md bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-700 border border-orange-100">
                          Catalog Product
                        </span>
                      ) : (
                        <span className="mt-1 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 border border-slate-200">
                          Custom Item
                        </span>
                      )}
                    </div>
                    
                    <div className="flex w-full md:contents gap-2">
                      <input
                        className="input-field w-1/2 md:w-full text-center text-sm py-1.5 px-2"
                        min="0.01"
                        step="any"
                        onChange={(event) =>
                          updateItem(index, "quantity", event.target.value)
                        }
                        onBlur={(event) => {
                          const val = parseFloat(event.target.value);
                          if (isNaN(val) || val <= 0) {
                            updateItem(index, "quantity", "1");
                          }
                        }}
                        placeholder="Qty"
                        type="number"
                        value={item.quantity}
                        disabled={isPending}
                      />
                      <input
                        className="input-field w-1/2 md:w-full text-center text-sm py-1.5 px-2"
                        onChange={(event) =>
                          updateItem(index, "unit", event.target.value)
                        }
                        placeholder="Unit"
                        value={item.unit}
                        disabled={isPending}
                      />
                    </div>
                    
                    <div className="flex w-full md:contents gap-2 items-center">
                      <input
                        className="input-field w-full text-sm py-1.5 px-3"
                        onChange={(event) =>
                          updateItem(index, "notes", event.target.value)
                        }
                        placeholder="Notes (e.g. size, color)"
                        value={item.notes}
                        disabled={isPending}
                      />
                      <button
                        type="button"
                        onClick={() => removeManualItem(index)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        title="Remove item"
                        disabled={isPending}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                ))}

                {items.length === 0 && (
                  <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-10">
                    <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">
                      shopping_cart_checkout
                    </span>
                    <p className="text-sm font-medium text-slate-500 text-center max-w-xs">
                      No items added yet. Search the catalog below or type to add custom items.
                    </p>
                  </div>
                )}
              </div>

              {/* Prominent Product Search */}
              <div className="relative mt-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Search & Add Items
                  <div className="relative flex items-center">
                 
                    <input
                      className="input-field w-full pl-11 pr-32 bg-white shadow-sm"
                      placeholder="Type name (e.g. Cement, Pipe, Paint...)"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      disabled={isPending}
                    />
                    {searchQuery.trim() && (
                      <div className="absolute right-2 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleSearchChange("")}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                          title="Clear search"
                          disabled={isPending}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            close
                          </span>
                        </button>
                        <div className="h-4 w-px bg-slate-200 mx-0.5"></div>
                        <button
                          type="button"
                          onClick={addCustomItem}
                          className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-md transition-colors shadow-sm disabled:opacity-50"
                          disabled={isPending}
                        >
                          Add Custom
                        </button>
                      </div>
                    )}
                  </div>
                </label>

                {/* Refined Search Results Dropdown */}
                {searchQuery.trim().length >= 2 && (
                  <div className="absolute left-0 right-0 z-50 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-72 overflow-y-auto divide-y divide-slate-100 top-full">
                    {isSearching ? (
                      <div className="p-6 flex flex-col items-center justify-center text-slate-400 gap-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-slate-600"></div>
                        <p className="text-xs font-medium">Searching catalog...</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => addProductToQuote(product)}
                          className="w-full px-4 py-3.5 text-left hover:bg-slate-50 flex items-center justify-between transition-colors group"
                        >
                          <div>
                            <p className="font-bold text-slate-800 text-sm group-hover:text-orange-600 transition-colors">
                              {product.name}
                            </p>
                            {product.sku && (
                              <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                                SKU: {product.sku}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            {product.price ? (
                              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                                Ksh {product.price.toLocaleString()}
                              </span>
                            ) : (
                              <span className="text-[11px] font-semibold text-slate-400">
                                Request Price
                              </span>
                            )}
                            <span className="material-symbols-outlined text-orange-600 text-[22px] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                              add_circle
                            </span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-6 text-center flex flex-col items-center gap-3">
                        <div className="bg-slate-50 p-3 rounded-full">
                           <span className="material-symbols-outlined text-slate-400 text-2xl">inventory_2</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-600">
                            No exact matches for "{searchQuery}"
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            You can still add it as a custom item.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={addCustomItem}
                          className="mt-2 text-xs font-bold bg-orange-50 text-orange-700 hover:bg-orange-100 px-4 py-2 rounded-lg transition-colors"
                        >
                          Add "{searchQuery}"
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form starts here — separate from UploadDropzone so its button
          cannot accidentally trigger handleSubmit */}
      <form id="quote-form" onSubmit={handleSubmit} className="grid gap-6 mt-6">
        {/* Hidden inputs to feed UploadThing state into FormData */}
        {mode === "upload" && uploadedFileUrl && (
          <>
            <input type="hidden" name="uploadedFileUrl" value={uploadedFileUrl} />
            <input type="hidden" name="uploadedFileKey" value={uploadedFileKey || ""} />
            <input type="hidden" name="uploadedFileName" value={uploadedFileName || ""} />
          </>
        )}

        <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
          Additional Notes (Optional)
          <textarea
            className="input-field min-h-[100px] resize-y"
            name="message"
            placeholder="Delivery instructions, timeline, or special requests..."
            disabled={isPending || isUploading}
          />
        </label>

        <div className="pt-2">
          <button
            className="w-full rounded-lg bg-orange-600 px-6 py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-orange-500 hover-lift disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:transform-none flex items-center justify-center gap-2"
            disabled={isPending || isUploading || !canSubmit}
            type="submit"
          >
            {isPending ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                Submitting Request...
              </>
            ) : (
              <>
                Submit Quote Request
                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </div>

        {message && (
          <div className={`mt-2 flex items-start gap-3 rounded-lg border p-4 ${
            message.includes("received") 
            ? "border-green-200 bg-green-50 text-green-800"
            : "border-red-200 bg-red-50 text-red-800"
          }`}>
            <span className="material-symbols-outlined mt-0.5">
              {message.includes("received") ? "check_circle" : "error"}
            </span>
            <p className="text-sm font-semibold leading-relaxed">
              {message}
            </p>
          </div>
        )}
      </form>
    </section>
  );
}