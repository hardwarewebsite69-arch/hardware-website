import { AdminShell } from "@/components/AdminShell";

export default function Page() {
  return (
    <AdminShell active="/admin/media" title="Media Library" subtitle="Product image assets and upload references">
      <section className="rounded border border-slate-200 bg-white p-8 text-slate-600">
        Media uploads are ready to connect to Cloudinary-backed product image management.
      </section>
    </AdminShell>
  );
}
