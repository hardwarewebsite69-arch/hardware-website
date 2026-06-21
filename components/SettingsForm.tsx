"use client";

import { useState } from "react";
import { updateSettings } from "@/lib/catalog";
import type { Settings } from "@/lib/types";

export function SettingsForm({ initialSettings }: { initialSettings: Settings }) {
  const [businessName, setBusinessName] = useState(initialSettings.business_name);
  const [phone, setPhone] = useState(initialSettings.phone);
  const [whatsappNumber, setWhatsappNumber] = useState(initialSettings.whatsapp_number);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      await updateSettings({
        business_name: businessName,
        phone,
        whatsapp_number: whatsappNumber,
      });
      setMessage("Settings updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Business Name
        <input
          required
          className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white text-slate-900"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          name="business_name"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Phone Number
        <input
          required
          type="tel"
          className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white text-slate-900"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        WhatsApp Number
        <input
          required
          type="tel"
          className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white text-slate-900"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          name="whatsapp_number"
        />
      </label>

      {message && (
        <div className={`text-sm font-semibold p-3 rounded border ${
          message.includes("success") 
            ? "bg-green-50 text-green-700 border-green-200" 
            : "bg-red-50 text-red-700 border-red-200"
        }`}>
          {message}
        </div>
      )}

      <button
        disabled={isSaving}
        className="w-fit rounded bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        type="submit"
      >
        {isSaving ? "Saving Settings..." : "Save Settings"}
      </button>
    </form>
  );
}
