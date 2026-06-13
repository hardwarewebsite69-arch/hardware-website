import { AdminShell } from "@/components/AdminShell";
import { getAllProductImages } from "@/lib/catalog";
import { MediaLibraryItem } from "@/components/MediaLibraryItem";

export default async function Page() {
  const mediaItems = await getAllProductImages();

  return (
    <AdminShell active="/admin/media" title="Media Library" subtitle="Product image assets and upload references">
      <section className="rounded border border-slate-200 bg-white p-8 text-slate-600">
        <p className="mb-6">All product image assets uploaded through the catalog workflow appear here for review.</p>
        {mediaItems.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {mediaItems.map((image) => (
              <MediaLibraryItem key={image.id} image={image} />
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
