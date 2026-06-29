"use client";

import { useState, useMemo, useId } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

function FilterPanel({
  searchQuery,
  onSearchChange,
  filterInquiry,
  onInquiryChange,
  filterDirectPrice,
  onDirectPriceChange,
  filterInStock,
  onInStockChange,
  onClear,
  hasAnyFilter,
}: {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  filterInquiry: boolean;
  onInquiryChange: (v: boolean) => void;
  filterDirectPrice: boolean;
  onDirectPriceChange: (v: boolean) => void;
  filterInStock: boolean;
  onInStockChange: (v: boolean) => void;
  onClear: () => void;
  hasAnyFilter: boolean;
}) {
  const searchId = useId();
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor={searchId} className="text-xs font-black uppercase tracking-widest text-[#ea580c]">
          Search Within
        </label>
        <div className="relative flex items-center mt-2">
          <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg">search</span>
          <input
            id={searchId}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-sm outline-none bg-slate-50 focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-slate-900 transition-colors"
            placeholder="Find in category..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <hr className="border-slate-100" />

      <div>
        <p className="text-xs font-black uppercase tracking-widest text-slate-900">Filters</p>
        <div className="mt-3 space-y-3 text-sm font-semibold text-slate-700">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filterInquiry}
              onChange={(e) => onInquiryChange(e.target.checked)}
              className="h-4.5 w-4.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
            />
            Price on Inquiry
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filterDirectPrice}
              onChange={(e) => onDirectPriceChange(e.target.checked)}
              className="h-4.5 w-4.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
            />
            With Direct Pricing
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filterInStock}
              onChange={(e) => onInStockChange(e.target.checked)}
              className="h-4.5 w-4.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
            />
            In stock only
          </label>
        </div>
      </div>

      {hasAnyFilter && (
        <button
          onClick={onClear}
          className="text-xs font-bold text-orange-600 hover:text-orange-700 underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

const activeFilterCount = (searchQuery: string, filterInquiry: boolean, filterDirectPrice: boolean, filterInStock: boolean) => {
  let count = 0;
  if (searchQuery.trim()) count++;
  if (filterInquiry) count++;
  if (filterDirectPrice) count++;
  if (filterInStock) count++;
  return count;
};

export function CategoryProductGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterInquiry, setFilterInquiry] = useState(false);
  const [filterDirectPrice, setFilterDirectPrice] = useState(false);
  const [filterInStock, setFilterInStock] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSku = product.sku?.toLowerCase().includes(query) ?? false;
        const matchesDesc = product.description?.toLowerCase().includes(query) ?? false;
        if (!matchesName && !matchesSku && !matchesDesc) return false;
      }

      if (filterInquiry && !product.request_price) return false;
      if (filterDirectPrice && product.request_price) return false;
      if (filterInStock && !product.is_active) return false;

      return true;
    });
  }, [initialProducts, searchQuery, filterInquiry, filterDirectPrice, filterInStock]);

  const clearAll = () => {
    setSearchQuery("");
    setFilterInquiry(false);
    setFilterDirectPrice(false);
    setFilterInStock(false);
  };

  const hasAnyFilter = searchQuery.trim() !== "" || filterInquiry || filterDirectPrice || filterInStock;
  const activeCount = activeFilterCount(searchQuery, filterInquiry, filterDirectPrice, filterInStock);

  return (
    <div>
      {/* Mobile Filter Toggle Bar — visible below lg */}
      <div className="lg:hidden mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:border-slate-300"
          >
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Filters
            {activeCount > 0 && (
              <span className="flex items-center justify-center h-5 min-w-5 rounded-full bg-orange-600 px-1.5 text-[11px] font-black text-white">
                {activeCount}
              </span>
            )}
          </button>

          {hasAnyFilter && (
            <button
              onClick={clearAll}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 underline"
            >
              Clear all
            </button>
          )}

          <span className="ml-auto text-sm font-semibold text-slate-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </span>
        </div>

        {/* Collapsible Filter Panel */}
        <div
          className={`overflow-hidden transition-all duration-200 ease-in-out ${
            mobileFiltersOpen ? "mt-3 max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <FilterPanel
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterInquiry={filterInquiry}
              onInquiryChange={setFilterInquiry}
              filterDirectPrice={filterDirectPrice}
              onDirectPriceChange={setFilterDirectPrice}
              filterInStock={filterInStock}
              onInStockChange={setFilterInStock}
              onClear={clearAll}
              hasAnyFilter={hasAnyFilter}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Desktop Sidebar Filters — lg+ only */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <FilterPanel
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterInquiry={filterInquiry}
              onInquiryChange={setFilterInquiry}
              filterDirectPrice={filterDirectPrice}
              onDirectPriceChange={setFilterDirectPrice}
              filterInStock={filterInStock}
              onInStockChange={setFilterInStock}
              onClear={clearAll}
              hasAnyFilter={hasAnyFilter}
            />
          </div>
        </aside>

        {/* Product Grid Area */}
        <section className="lg:col-span-9">
          {filteredProducts.length > 0 ? (
            <div>
              {/* Desktop product count */}
              <p className="hidden lg:block mb-5 text-sm font-semibold text-slate-500">
                {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
              </p>
              <div className="grid gap-3 sm:gap-5 grid-cols-2 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
              <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">inventory_2</span>
              <p className="text-base font-medium">No products match your filter selections.</p>
              <button
                onClick={clearAll}
                className="mt-3 text-sm font-bold text-orange-600 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
