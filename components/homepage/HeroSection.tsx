import Link from "next/link";
import Image from "next/image";

const trustMetrics = [
  { value: "1,200+", label: "Contractors", icon: "groups" },
  { value: "10,000+", label: "Products", icon: "inventory_2" },
  { value: "24hr", label: "Quotation", icon: "schedule" },
  { value: "Nationwide", label: "Delivery", icon: "local_shipping" },
];

const popularSearches = ["PVC Pipes", "Cement", "Power Tools", "Safety Boots", "Paint", "Bolts"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-20">
      <div className="absolute inset-0 -z-20">
        <Image src="/hero-bg2-clean.png" alt="Industrial background" fill priority className="hidden object-cover object-center lg:block" />
        <Image src="/hero-mobile3.png" alt="Industrial background mobile" fill priority className="block object-cover object-center lg:hidden" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6 lg:gap-8">
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#e5e7eb] bg-white/90 px-4 py-1.5 text-sm font-medium text-[#4b5563] shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span>Trusted by 1,200+ Contractors Across Kenya</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[#111827] sm:text-5xl lg:text-[56px]">
              <span className="block">Everything Your</span>
              <span className="block">Project Needs.</span>
              <span className="mt-1 block bg-gradient-to-r from-[#ea580c] via-[#d44f0a] to-[#b83b0e] bg-clip-text text-transparent">
                One Supplier.
              </span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-[#374151] sm:text-lg font-medium">
              From bolts to power tools, electrical supplies, PPE and construction materials — delivered across Kenya.
            </p>
          </div>

          {/* Search Bar */}
          <form action="/search" className="flex w-full max-w-lg overflow-hidden rounded-xl border border-[#d1d5db] bg-white shadow-lg transition-all focus-within:border-[#ea580c] focus-within:ring-2 focus-within:ring-[#ea580c]/20">
            <div className="flex flex-1 items-center px-4">
              <span className="material-symbols-outlined text-[#9ca3af] text-xl">search</span>
              <input className="w-full bg-transparent px-3 py-3.5 text-sm text-[#111827] outline-none placeholder:text-[#9ca3af]" name="q" placeholder="Search 10,000+ products..." type="search" />
            </div>
            <button className="bg-[#ea580c] px-6 text-sm font-bold text-white transition-colors hover:bg-[#c2410c]" type="submit">Search</button>
          </form>

          {/* Popular searches */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-[#6b7280]">Popular:</span>
            {popularSearches.map((tag) => (
              <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="rounded-full border border-[#e5e7eb] bg-white/80 px-3 py-1 font-medium text-[#374151] transition-colors hover:border-[#ea580c] hover:text-[#ea580c]">
                {tag}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link className="group flex h-13 items-center justify-center gap-2 rounded-lg bg-[#ea580c] px-8 text-base font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#c2410c] hover:shadow-xl active:translate-y-0" href="/quote">
              Get Instant Quote
              <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
            </Link>
            <Link className="flex h-13 items-center justify-center rounded-lg border-2 border-[#d1d5db] bg-white px-8 text-base font-semibold text-[#111827] transition-all duration-200 hover:border-[#9ca3af] hover:shadow-md" href="/shop">
              Browse Products
            </Link>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trustMetrics.map((m) => (
              <div key={m.label} className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-lg text-[#ea580c]">{m.icon}</span>
                <div className="flex flex-col">
                  <span className="text-sm font-extrabold text-[#111827] leading-tight">{m.value}</span>
                  <span className="text-[11px] font-medium text-[#6b7280]">{m.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
