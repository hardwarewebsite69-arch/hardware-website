import Link from "next/link";
import Image from "next/image";

const categoryCards = [
  {
    title: "Construction Hardware",
    count: "1,200+ Products",
    href: "/shop/building-materials",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUQWdpqVA7ZF4cKmqoEPg82pWua5TLBnY-vf8N2QZxwQiQW_-1r2eoFUNB6hjsRkO7gz2jN16eyIBPZ-F9m8x1WWg49DKPERiBBRUuZ8Glipv47TioNwQggYTLFSgBpUGbpgQgTYaGFvAa_9v2ZK5Yddjg69bHw7AbWM7Cm9jUzAbjnhDfTfcjT0wJl0h9o_xOFTMhx4A92HpFCAV09rG-zD3Mzg1GEeWSjfMhi3su5jHZWVo1UljGZVlXQfxGQ5Lm7KVTX1mS_A",
    sizeClass: "lg:col-span-2 lg:row-span-2 min-h-[380px] lg:min-h-full",
    btnLabel: "Explore Construction Supplies",
  },
  {
    title: "Electrical Supplies",
    count: "250+ Products",
    href: "/shop/electrical",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaxg8JxZ_3j2iD7ftJZZNsNJk0n2ubtqRrjnVcVeNNvY7uHtyI54V72tbh_BLItwEGWbVWHaHN0BEQTzpgTWareQ_Pv6xkuEwnQq2YlXTSPR42F2yMRnWEvLKD5w8QcHa3YtvTOEilOEQ5-AG-pA3g7igJnDeuWUvItcc49BqcB7rGT5uYYePDo9sDP7aIPnyPCON-GIEoT8U8Q4YGW6R6XWEIzsACkwOwstBgrhQw9Ez9tnA0Ze3dZqeDiFD8rso014Lo2aZiZA",
    sizeClass: "lg:col-span-1 lg:row-span-1 min-h-[220px] lg:min-h-[250px]",
    btnLabel: "Cabling & Panels",
  },
  {
    title: "Plumbing Supplies",
    count: "150+ Products",
    href: "/shop/plumbing",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGtXU1LMksbNeP8QP2HHLGmRNJEACs6lSmTjhuJizY4oOK8VZd97IrDwQvPnygUvLSww812TA62Ar7xdYsy9WCRykPmYcmjSsRbDAb5SBhnN63bXmkbkIYoYQfgOveVOygtjc6fCqA-dIQoSg71mPp7Edt_PKAjJv7wdmgUjuu6_cMp3yC_Ey_Emx8bmbOGTjOYKTfq7lOJdLq0riM9Ai43wt1zgE2MDjL0f5XetdzZaVq_p9nmmX_ILxzP9uyTODiu96FM7sSmQ",
    sizeClass: "lg:col-span-1 lg:row-span-1 min-h-[220px] lg:min-h-[250px]",
    btnLabel: "Piping & Valves",
  },
];

const additionalCategories = [
  { title: "Power Tools & Machinery", href: "/shop/power-tools", icon: "construction" },
  { title: "Paints & Finishes", href: "/shop/paints", icon: "format_paint" },
  { title: "Safety Gear & PPE", href: "/shop/safety-gear", icon: "security" },
  { title: "Fasteners & Fixings", href: "/shop/fasteners", icon: "settings" },
];

export function CategoriesSection() {
  return (
    <section id="categories" className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-24 md:py-32 font-sans scroll-mt-20">
      
      {/* Section Header */}
      <div className="mb-12 flex items-end justify-between border-b border-neutral-200 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 block mb-2">Trade Catalogs</span>
          <h2 className="text-3xl font-black tracking-tight text-neutral-900 md:text-4xl font-display">
            Explore Categories
          </h2>
        </div>
        <Link 
          className="group flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors" 
          href="/shop"
        >
          View Full Catalog 
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600/5 transition-transform duration-300 group-hover:translate-x-0.5">
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </div>
        </Link>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
        {categoryCards.map((cat) => (
          <Link
            href={cat.href}
            key={cat.title}
            className={`double-bezel-card group relative block overflow-hidden cursor-pointer ${cat.sizeClass}`}
          >
            {/* Inner concentric wrapper with image */}
            <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-neutral-950">
              {/* Gradient Mask to guarantee title contrast */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
              
              <Image 
                fill 
                className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-75" 
                src={cat.image} 
                alt={cat.title} 
              />
              
              {/* Bottom text overlays */}
              <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-6">
                <div>
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">{cat.count}</span>
                  <h3 className="mt-1 text-xl font-bold text-white font-display">{cat.title}</h3>
                  <p className="mt-2 text-xs font-bold text-neutral-300 group-hover:text-white transition-colors flex items-center gap-1">
                    {cat.btnLabel}
                    <span className="material-symbols-outlined text-xs transition-transform duration-300 group-hover:translate-x-0.5">arrow_forward</span>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Additional Category Tags (Trade shortcuts) */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {additionalCategories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.href}
            className="group flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4.5 py-2.5 text-xs font-bold text-neutral-700 transition-all duration-300 hover:border-orange-500 hover:text-orange-600 hover:shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px] text-neutral-400 transition-colors group-hover:text-orange-600 select-none">
              {cat.icon}
            </span>
            {cat.title}
          </Link>
        ))}
      </div>

    </section>
  );
}
