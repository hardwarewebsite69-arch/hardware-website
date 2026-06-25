"use client";

import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

export function AdminShellClient({
  children,
  title,
  subtitle,
  user,
}: {
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7faf9] text-slate-950 md:flex relative overflow-x-hidden">
      {/* Mobile sidebar overlay backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
      />

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
