import Link from "next/link";

export function BOQUploadSection() {
  return (
    <section className="w-full bg-neutral-950 border-y border-neutral-800 py-8 md:py-16 font-sans">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          
          {/* Left: Copy with trust assurance */}
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-600/10 text-orange-500">
              <span className="material-symbols-outlined text-2xl">description</span>
            </div>
            <div>
              <h2 className="text-xl font-black text-white md:text-2xl font-display">
                Submit Your BOQ — <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Get a Bid in 24 Hours</span>
              </h2>
              <p className="mt-1.5 text-xs font-semibold text-neutral-300">
                Supports PDF, Excel, CSV lists • Volume-based pricing discounts applied automatically
              </p>
            </div>
          </div>

          {/* Right: Dual Actions */}
          <div className="flex shrink-0 flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              href="/quote/upload"
              className="group flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-orange-600 px-6 text-sm font-bold text-white shadow-lg shadow-orange-600/10 transition-all duration-300 hover:bg-orange-700 active:scale-98"
            >
              <span className="material-symbols-outlined text-lg">cloud_upload</span>
              Upload File
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-0.5">
                <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
              </div>
            </Link>
            <Link
              href="/quote/manual"
              className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-6 text-sm font-bold text-neutral-300 transition-all duration-300 hover:border-neutral-700 hover:text-white active:scale-98"
            >
              Enter Items Manually
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
