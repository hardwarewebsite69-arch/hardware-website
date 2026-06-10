import { AdminHeader } from "@/components/AdminHeader";
import { AdminSidebar } from "@/components/AdminSidebar";

export function AdminShell({
  active,
  children,
  title,
  subtitle,
}: {
  active: string;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="min-h-screen bg-[#f7faf9] text-slate-950 md:flex">
      <AdminSidebar active={active} />
      <div className="min-w-0 flex-1">
        <AdminHeader title={title} subtitle={subtitle} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
