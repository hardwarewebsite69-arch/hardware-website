"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
}: ConfirmationModalProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      window.requestAnimationFrame(() => setShouldRender(true));
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Delay unmounting to allow for potential animations
      const timeout = setTimeout(() => {
        window.requestAnimationFrame(() => setShouldRender(false));
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return createPortal(
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transition-all duration-200 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {message}
          </p>
        </div>
        <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-sm transition-all active:scale-95 ${
              isDestructive 
                ? "bg-red-600 hover:bg-red-700 shadow-red-200" 
                : "bg-orange-600 hover:bg-orange-700 shadow-orange-200"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
