"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/admin/products", icon: "inventory_2", label: "Products" },
  { href: "/admin/categories", icon: "category", label: "Categories" },
  { href: "/admin/quotes", icon: "request_quote", label: "Quotes" },
  { href: "/admin/media", icon: "perm_media", label: "Media" },
  { href: "/admin/settings", icon: "settings", label: "Settings" },
];

export function AdminSidebar({
  isOpen = false,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const pathname = usePathname();

  const isActiveRoute = (href: string) => {
    if (href === "/admin/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col h-full bg-white transition-all duration-300 ease-in-out md:static ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } ${isCollapsed ? "w-16 overflow-hidden" : "w-72"}`}
    >
      {/* Brand Header */}
      <div className={`flex items-center border-b border-slate-200 ${isCollapsed ? "justify-center px-0 py-4" : "justify-between px-5 py-4"}`}>
        <Link
          className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}
          href="/admin/dashboard"
          onClick={onClose}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-600 text-sm font-black text-white">
            A
          </span>
          {!isCollapsed && (
            <span className="min-w-0">
              <span className="block text-sm font-extrabold tracking-wide text-slate-900">Amroz Admin</span>
              <span className="block text-[11px] font-medium text-slate-500">Catalog operations</span>
            </span>
          )}
        </Link>
        {/* Mobile close drawer button */}
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 md:hidden"
          aria-label="Close sidebar"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className={`flex-1 ${isCollapsed ? "overflow-hidden px-2 py-4 space-y-2" : "overflow-y-auto px-3 py-5 space-y-1"}`}>
        {items.map((item) => {
          const isActive = isActiveRoute(item.href);
          return (
            <div key={item.href} className="group relative">
              <Link
                className={`flex items-center rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isCollapsed ? "justify-center px-0 py-3" : "gap-3 px-3 py-2.5"
                } ${
                  isActive
                    ? "bg-orange-50 text-orange-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                href={item.href}
                onClick={onClose}
              >
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                {!isCollapsed && <span className="tracking-wide">{item.label}</span>}
              </Link>
              {/* Active indicator bar */}
              {isActive && !isCollapsed && (
                <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-orange-500" />
              )}
              {/* Tooltip on collapsed hover */}
              {isCollapsed && (
                <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-50">
                  <div className="whitespace-nowrap rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-900 shadow-lg ring-1 ring-slate-200">
                    {item.label}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse toggle — desktop only */}
      <div className={`hidden md:flex border-t border-slate-200 p-3 ${isCollapsed ? "justify-center" : ""}`}>
        <button
          type="button"
          onClick={onToggleCollapse}
          className={`flex items-center rounded-lg text-sm font-semibold text-slate-500 transition-all duration-200 hover:bg-slate-50 hover:text-slate-700 ${
            isCollapsed ? "justify-center px-0 py-3 w-full" : "gap-3 px-3 py-2.5 w-full"
          }`}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span className="material-symbols-outlined text-[22px]">{isCollapsed ? "chevron_right" : "chevron_left"}</span>
          {!isCollapsed && <span className="tracking-wide">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
