"use client"; // Marks this small piece for the browser

import { useRouter } from "next/navigation";

interface DeleteProps {
  id: string;
  // Pass the server action down as a prop safely
  onDeleteAction: (formData: FormData) => Promise<void>; 
}

export function DeleteCategoryButton({ id, onDeleteAction }: DeleteProps) {
  return (
    <form 
      action={onDeleteAction} 
      onSubmit={(e) => { 
        if (!confirm("Are you sure you want to delete this category?")) {
          e.preventDefault(); 
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-800">
        Delete
      </button>
    </form>
  );
}