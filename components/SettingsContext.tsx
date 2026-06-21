"use client";

import React, { createContext, useContext } from "react";
import type { Settings } from "@/lib/types";

interface SettingsContextType {
  settings: Settings;
  telHref: string;
  whatsappHref: string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings: Settings;
}) {
  const settings = initialSettings;

  // Format tel: link
  const cleanPhone = settings.phone.replace(/[^0-9+]/g, "");
  const telHref = `tel:${cleanPhone}`;

  // Format whatsapp link: clean digits, default to Kenya code if starting with 0
  const cleanWhatsappDigits = settings.whatsapp_number.replace(/[^0-9]/g, "");
  const formattedWhatsappNumber = cleanWhatsappDigits.startsWith("0")
    ? `254${cleanWhatsappDigits.slice(1)}`
    : cleanWhatsappDigits;
  const whatsappHref = `https://wa.me/${formattedWhatsappNumber}`;

  return (
    <SettingsContext.Provider value={{ settings, telHref, whatsappHref }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
