import Link from "next/link";

export function BOQUploadSection() {
  return (
    <section className="w-full bg-[#111827]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between sm:gap-8 md:py-12">
        {/* Left: Copy */}
        <div className="flex items-center gap-4 text-center sm:text-left">
          <span className="material-symbols-outlined hidden text-3xl text-[#ea580c] sm:block">description</span>
          <div>
            <h2 className="text-lg font-bold text-white sm:text-xl">
              Upload Your BOQ — <span className="text-[#ea580c]">Get a Quote in 24 Hours</span>
            </h2>
            <p className="mt-1 text-sm text-[#94a3b8]">
              Supports PDF, Excel, CSV • Competitive bulk pricing guaranteed
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/quote/upload"
            className="flex h-11 items-center gap-2 rounded-lg bg-[#ea580c] px-6 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#c2410c] hover:shadow-lg"
          >
            <span className="material-symbols-outlined text-lg">cloud_upload</span>
            Upload File
          </Link>
          <Link
            href="/quote/manual"
            className="flex h-11 items-center gap-2 rounded-lg border border-[#374151] px-6 text-sm font-semibold text-[#d1d5db] transition-all hover:border-[#6b7280] hover:text-white"
          >
            Enter Manually
          </Link>
        </div>
      </div>
    </section>
  );
}
