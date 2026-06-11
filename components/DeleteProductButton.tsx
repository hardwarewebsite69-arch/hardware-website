"use main";
"use client";

import { useTransition } from "react";
import { deleteProduct } from "@/lib/catalog"; // Adjust this import path to where your delete actions live

interface DeleteProductButtonProps {
  productId: string;
  productSlug?: string;
}

export function DeleteProductButton({ productId, productSlug }: DeleteProductButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      startTransition(async () => {
        try {
          await deleteProduct(productId, productSlug);
        } catch (error) {
          alert("Failed to delete the product. Please try again.");
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="font-bold text-red-600 hover:text-red-500 disabled:opacity-50 transition-colors"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}