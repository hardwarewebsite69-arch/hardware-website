"use client";

import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

export function AdminShellClient({
  active,
  children,
  title,
  subtitle,
  user,
}: {
  active: string;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  user: {
    id: string;
    email: string | undefined;
    full_name: string;
    role: string;
  };
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7faf9] text-slate-950 md:flex relative overflow-x-hidden">
      {/* Mobile sidebar overlay backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - responsive sliding panel */}
      <AdminSidebar active={active} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="min-w-0 flex-1 flex flex-col">
        <AdminHeader
          title={title}
          subtitle={subtitle}
          user={user}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main className="px-4 py-6 sm:px-6 lg:px-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
