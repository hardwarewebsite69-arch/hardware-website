"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "@/lib/types";

export interface CartItem {
  id: string;
  name: string;
  sku: string | null;
  price: number | null;
  request_price: boolean;
  quantity: number;
  unit: string;
  notes: string;
}

interface QuoteCartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateItemNotes: (id: string, notes: string) => void;
  clearCart: () => void;
}

const QuoteCartContext = createContext<QuoteCartContextType | undefined>(undefined);

export function QuoteCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("amroz_quote_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse quote cart", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage when items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("amroz_quote_cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          request_price: product.request_price,
          quantity: 1,
          unit: "pcs",
          notes: product.sku ? `SKU: ${product.sku}` : "",
        },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  const updateItemNotes = (id: string, notes: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, notes } : item)));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <QuoteCartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemNotes,
        clearCart,
      }}
    >
      {children}
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart() {
  const context = useContext(QuoteCartContext);
  if (!context) {
    throw new Error("useQuoteCart must be used within a QuoteCartProvider");
  }
  return context;
}
