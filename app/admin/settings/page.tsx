import { AdminShell } from "@/components/AdminShell";
import { getSettings } from "@/lib/catalog";
import { SettingsForm } from "@/components/SettingsForm";

export default async function Page() {
  const settings = await getSettings();

  return (
    <AdminShell active="/admin/settings" title="Settings" subtitle="Storefront contact and business details">
      <section className="max-w-3xl rounded border border-slate-200 bg-white p-6 shadow-sm">
        <SettingsForm initialSettings={settings} />
      </section>
    </AdminShell>
  );
}

