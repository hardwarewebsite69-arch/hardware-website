import { AdminShell } from "@/components/AdminShell";
import { getSettings } from "@/lib/catalog";

export default async function Page() {
  const settings = await getSettings();

  return (
    <AdminShell active="/admin/settings" title="Settings" subtitle="Storefront contact and business details">
      <section className="max-w-3xl rounded border border-slate-200 bg-white p-6">
        <form className="grid gap-5">
          <label className="grid gap-2 text-sm font-semibold">
            Business Name
            <input className="input-field" defaultValue={settings.business_name} name="business_name" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Phone
            <input className="input-field" defaultValue={settings.phone} name="phone" type="tel" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            WhatsApp
            <input className="input-field" defaultValue={settings.whatsapp_number} name="whatsapp_number" type="tel" />
          </label>
          <button className="w-fit rounded bg-slate-950 px-5 py-3 text-sm font-bold text-white" type="button">Save Settings</button>
        </form>
      </section>
    </AdminShell>
  );
}
