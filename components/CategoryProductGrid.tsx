"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

export function CategoryProductGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterInquiry, setFilterInquiry] = useState(false);
  const [filterDirectPrice, setFilterDirectPrice] = useState(false);
  const [filterInStock, setFilterInStock] = useState(false);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // 1. Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSku = product.sku?.toLowerCase().includes(query) ?? false;
        const matchesDesc = product.description?.toLowerCase().includes(query) ?? false;
        if (!matchesName && !matchesSku && !matchesDesc) return false;
      }

      // 2. Checkboxes filters
      if (filterInquiry && !product.request_price) {
        return false;
      }
      if (filterDirectPrice && product.request_price) {
        return false;
      }
      // Note: All active products in catalog are considered in stock in our MVP, 
      // but if we filter by "In stock" specifically we can keep it as a no-op or match is_active.
      if (filterInStock && !product.is_active) {
        return false;
      }

      return true;
    });
  }, [initialProducts, searchQuery, filterInquiry, filterDirectPrice, filterInStock]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Filters Sidebar */}
      <aside className="lg:col-span-3">
        <div className="sticky top-24 rounded-lg border border-slate-200 bg-white p-5 shadow-sm space-y-6">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#ea580c]">Search Within</p>
            <div className="relative flex items-center mt-3">
              <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg">search</span>
              <input
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-sm outline-none bg-slate-50 focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-slate-900 transition-colors"
                placeholder="Find in category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-900">Filters</p>
            <div className="mt-4 space-y-3 text-sm font-semibold text-slate-700">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filterInquiry}
                  onChange={(e) => setFilterInquiry(e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                />
                Price on Inquiry
              </label>
              
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filterDirectPrice}
                  onChange={(e) => setFilterDirectPrice(e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                />
                With Direct Pricing
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filterInStock}
                  onChange={(e) => setFilterInStock(e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                />
                In stock only
              </label>
            </div>
          </div>

          {(searchQuery || filterInquiry || filterDirectPrice || filterInStock) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterInquiry(false);
                setFilterDirectPrice(false);
                setFilterInStock(false);
              }}
              className="w-full text-xs font-bold text-orange-600 hover:text-orange-700 underline text-left"
            >
              Clear all filters
            </button>
          )}
        </div>
      </aside>

      {/* Product Grid Area */}
      <section className="lg:col-span-9">
        {filteredProducts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
            <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">inventory_2</span>
            <p className="text-base font-medium">No products match your filter selections.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterInquiry(false);
                setFilterDirectPrice(false);
                setFilterInStock(false);
              }}
              className="mt-3 text-sm font-bold text-orange-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
