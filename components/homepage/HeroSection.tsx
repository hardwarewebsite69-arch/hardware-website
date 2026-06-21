import Link from "next/link";
import Image from "next/image";

const trustMetrics = [
  { value: "1,200+", label: "Contractors", icon: "groups" },
  { value: "10,000+", label: "Genuine SKUs", icon: "inventory_2" },
  { value: "Under 24hr", label: "Quotation SLA", icon: "schedule" },
  { value: "Nationwide", label: "Site Delivery", icon: "local_shipping" },
];

const popularSearches = ["PVC Pipes", "Cement", "Power Tools", "Safety Boots", "Paint", "Bolts"];

export function HeroSection() {
  return (
    <section className="relative z-0 overflow-hidden pt-16 pb-24 lg:pt-20 lg:pb-32 font-sans">
      {/* Background with mask */}
      <div className="absolute inset-0 -z-20">
        <Image 
          src="/hero-bg2-clean.png" 
          alt="Industrial warehouse" 
          fill 
          priority 
          className="hidden object-cover object-right lg:block" 
        />
        <Image 
          src="/hero-mobile3.png" 
          alt="Industrial warehouse mobile" 
          fill 
          priority 
          className="block object-cover object-center lg:hidden" 
        />
        {/* Radical dark ink linear mask for high readability on desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-slate-10/10 hidden lg:block" />
        <div className="absolute inset-0 bg-slate-50/90 block lg:hidden" />
      </div>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Branding and Actions */}
          <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-8">
            {/* Live Trust Pill */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-orange-500/10 bg-orange-500/5 px-4 py-1.5 text-xs font-bold text-orange-700 shadow-sm backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-orange-600 animate-pulse" />
              <span>Trusted B2B Supplier Across Kenya</span>
            </div>

            {/* Premium Headline & Subheadline */}
            <div className="space-y-4">
              <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl font-display">
                The Material Backbone of{" "}
                <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  Kenyan Projects.
                </span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg font-medium">
                Supplying certified structural steels, electrical panels, industrial piping, and professional machinery directly to project sites across Kenya.
              </p>
            </div>

            {/* Compact Search Bar Form (Upgraded) */}
            <form 
              action="/search" 
              className="flex w-full max-w-xl overflow-hidden rounded-full border-2 border-neutral-300 bg-white p-1.5 shadow-lg shadow-neutral-900/5 transition-all duration-300 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/15"
            >
              <div className="flex flex-1 items-center px-3">
                <span className="material-symbols-outlined text-neutral-400 text-xl select-none">search</span>
                <input 
                  className="w-full bg-transparent px-2.5 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 font-sans" 
                  name="q" 
                  placeholder="Search 10,000+ products, SKUs, or materials..." 
                  type="search" 
                  required
                />
              </div>
              <button 
                className="rounded-full bg-orange-600 px-6 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-orange-700 active:scale-35 shadow-md" 
                type="submit"
              >
                Search
              </button>
            </form>

            {/* Popular searches tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-neutral-400">Popular:</span>
              {popularSearches.map((tag) => (
                <Link 
                  key={tag} 
                  href={`/search?q=${encodeURIComponent(tag)}`} 
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1 font-semibold text-neutral-700 transition-all duration-300 hover:border-orange-500 hover:text-orange-600 hover:shadow-sm"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Trade CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link 
                className="group flex h-12 items-center justify-center gap-2 rounded-full bg-orange-600 px-8 text-sm font-bold text-white shadow-lg shadow-orange-600/15 transition-all duration-300 hover:scale-102 hover:bg-orange-700 active:scale-98" 
                href="/quote"
              >
                Get Custom Quote
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </div>
              </Link>
              <Link 
                className="flex h-12 items-center justify-center rounded-full border border-neutral-300 bg-white px-8 text-sm font-bold text-neutral-800 transition-all duration-300 hover:bg-neutral-50 hover:border-neutral-300 active:scale-98" 
                href="/shop"
              >
                Browse Materials
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive BOQ Upload Widget (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="double-bezel-card w-full">
              <div className="double-bezel-card-inner flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600/5 text-orange-600">
                    <span className="material-symbols-outlined">cloud_upload</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-neutral-900">Direct BOQ Sourcing</h3>
                    <p className="text-[11px] font-semibold text-neutral-400">PDF, Excel, or Image Lists</p>
                  </div>
                </div>

                <div className="border border-dashed border-neutral-250 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 bg-neutral-50/50 hover:bg-neutral-50 hover:border-orange-500/30 transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-4xl text-neutral-300 group-hover:text-orange-500 transition-colors">description</span>
                  <div className="text-center">
                    <p className="text-xs font-bold text-neutral-800">Drag & drop your materials list</p>
                    <p className="text-[10px] text-neutral-400 mt-1">Accepts PDF, Excel, Word documents</p>
                  </div>
                  <Link 
                    href="/quote/upload" 
                    className="rounded-full bg-neutral-900 px-4 py-1.5 text-[10px] font-bold text-white hover:bg-neutral-850"
                  >
                    Select File
                  </Link>
                </div>

                <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-450 border-t border-neutral-100 pt-4">
                  <span className="flex items-center gap-1.5">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-green-500" />
                    24h Bid SLA
                  </span>
                  <span>Free Estimations</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Floating Trust Metrics Bar */}
        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-neutral-200/80 pt-8 sm:grid-cols-4">
          {trustMetrics.map((m) => (
            <div key={m.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-600/5 text-orange-600">
                <span className="material-symbols-outlined text-xl">{m.icon}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-neutral-900 leading-tight">{m.value}</span>
                <span className="text-xs font-semibold text-neutral-400">{m.label}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
