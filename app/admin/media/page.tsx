import { AdminShell } from "@/components/AdminShell";
import { getAllProductImages } from "@/lib/catalog";

export default async function Page() {
  const mediaItems = await getAllProductImages();

  return (
    <AdminShell active="/admin/media" title="Media Library" subtitle="Product image assets and upload references">
      <section className="rounded border border-slate-200 bg-white p-8 text-slate-600">
        <p className="mb-4">All product image assets uploaded through the catalog workflow appear here for review.</p>
        {mediaItems.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mediaItems.map((image) => (
              <div key={image.id} className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: `url(${image.url})` }} />
                <div className="p-3 text-sm text-slate-700">
                  <p className="truncate font-semibold">{image.public_id}</p>
                  <p className="mt-1 text-slate-500">Product ID: {image.product_id}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
            No media assets have been uploaded yet.
          </div>
        )}
      </section>
    </AdminShell>
  );
}
