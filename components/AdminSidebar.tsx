import Link from "next/link";

const items = [
  { href: "/admin/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/admin/products", icon: "inventory_2", label: "Products" },
  { href: "/admin/categories", icon: "category", label: "Categories" },
  { href: "/admin/quotes", icon: "request_quote", label: "Quotes" },
  { href: "/admin/media", icon: "perm_media", label: "Media" },
  { href: "/admin/settings", icon: "settings", label: "Settings" },
];

export function AdminSidebar({ active }: { active: string }) {
  return (
    <aside className="border-b border-slate-200 bg-white md:min-h-screen md:w-72 md:border-b-0 md:border-r">
      <div className="p-5">
        <Link className="flex items-center gap-3" href="/admin/dashboard">
          <span className="material-symbols-outlined rounded bg-slate-900 p-2 text-white">hardware</span>
          <span>
            <span className="block text-base font-extrabold text-slate-950">Amroz Admin</span>
            <span className="block text-xs font-medium text-slate-500">Catalog operations</span>
          </span>
        </Link>
      </div>
      <nav className="flex gap-2 overflow-x-auto px-3 pb-4 md:grid md:overflow-visible md:px-4">
        {items.map((item) => {
          const isActive = active === item.href || (item.href !== "/admin/dashboard" && active.startsWith(item.href));
          return (
            <Link
              className={`flex min-w-fit items-center gap-3 rounded px-3 py-2.5 text-sm font-semibold ${
                isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
              href={item.href}
              key={item.href}
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
