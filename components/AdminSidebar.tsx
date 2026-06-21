import Link from "next/link";

const items = [
  { href: "/admin/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/admin/products", icon: "inventory_2", label: "Products" },
  { href: "/admin/categories", icon: "category", label: "Categories" },
  { href: "/admin/quotes", icon: "request_quote", label: "Quotes" },
  { href: "/admin/media", icon: "perm_media", label: "Media" },
  { href: "/admin/settings", icon: "settings", label: "Settings" },
];

export function AdminSidebar({
  active,
  isOpen = false,
  onClose,
}: {
  active: string;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 flex flex-col h-full ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-100">
        <Link className="flex items-center gap-3" href="/admin/dashboard" onClick={onClose}>
          <span className="material-symbols-outlined rounded bg-slate-900 p-2 text-white">hardware</span>
          <span>
            <span className="block text-base font-extrabold text-slate-950">Amroz Admin</span>
            <span className="block text-xs font-medium text-slate-500">Catalog operations</span>
          </span>
        </Link>
        {/* Mobile close drawer button */}
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600 md:hidden"
          aria-label="Close sidebar"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {items.map((item) => {
          const isActive = active === item.href || (item.href !== "/admin/dashboard" && active.startsWith(item.href));
          return (
            <Link
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
              href={item.href}
              key={item.href}
              onClick={onClose}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

