import Link from "next/link";
import Image from "next/image";

const categoryCards = [
  {
    title: "Electrical Supplies",
    count: "250+ Products",
    href: "/shop/electrical",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaxg8JxZ_3j2iD7ftJZZNsNJk0n2ubtqRrjnVcVeNNvY7uHtyI54V72tbh_BLItwEGWbVWHaHN0BEQTzpgTWareQ_Pv6xkuEwnQq2YlXTSPR42F2yMRnWEvLKD5w8QcHa3YtvTOEilOEQ5-AG-pA3g7igJnDeuWUvItcc49BqcB7rGT5uYYePDo9sDP7aIPnyPCON-GIEoT8U8Q4YGW6R6XWEIzsACkwOwstBgrhQw9Ez9tnA0Ze3dZqeDiFD8rso014Lo2aZiZA",
  },
  {
    title: "Construction Hardware",
    count: "1,200+ Products",
    href: "/shop/hardware",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUQWdpqVA7ZF4cKmqoEPg82pWua5TLBnY-vf8N2QZxwQiQW_-1r2eoFUNB6hjsRkO7gz2jN16eyIBPZ-F9m8x1WWg49DKPERiBBRUuZ8Glipv47TioNwQggYTLFSgBpUGbpgQgTYaGFvAa_9v2ZK5Yddjg69bHw7AbWM7Cm9jUzAbjnhDfTfcjT0wJl0h9o_xOFTMhx4A92HpFCAV09rG-zD3Mzg1GEeWSjfMhi3su5jHZWVo1UljGZVlXQfxGQ5Lm7KVTX1mS_A",
  },
  {
    title: "PPE & Safety Equipment",
    count: "150+ Products",
    href: "/shop/safety",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGtXU1LMksbNeP8QP2HHLGmRNJEACs6lSmTjhuJizY4oOK8VZd97IrDwQvPnygUvLSww812TA62Ar7xdYsy9WCRykPmYcmjSsRbDAb5SBhnN63bXmkbkIYoYQfgOveVOygtjc6fCqA-dIQoSg71mPp7Edt_PKAjJv7wdmgUjuu6_cMp3yC_Ey_Emx8bmbOGTjOYKTfq7lOJdLq0riM9Ai43wt1zgE2MDjL0f5XetdzZaVq_p9nmmX_ILxzP9uyTODiu96FM7sSmQ",
  },
];

const additionalCategories = [
  { title: "Plumbing Supplies", href: "/shop/plumbing", icon: "plumbing" },
  { title: "Power Tools & Machinery", href: "/shop/power-tools", icon: "construction" },
  { title: "Paints & Finishes", href: "/shop/paints", icon: "format_paint" },
  { title: "Building Materials", href: "/shop/building-materials", icon: "domain" },
  { title: "Fasteners & Fixings", href: "/shop/fasteners", icon: "settings" },
];

export function CategoriesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
      <div className="mb-8 flex items-end justify-between md:mb-12">
        <h2 className="text-2xl font-bold tracking-tight text-[#191c1e] md:text-[28px]">
          Explore Categories
        </h2>
        <Link className="flex items-center text-sm font-semibold text-[#ea580c] hover:underline" href="/shop">
          View All <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
        </Link>
      </div>

      {/* Main Visual Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categoryCards.map((cat) => (
          <Link
            className="hover-lift group relative block h-64 overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl"
            href={cat.href}
            key={cat.title}
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#111827]/80 to-transparent" />
            <Image fill className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={cat.image} alt={cat.title} />
            <div className="absolute bottom-0 left-0 z-20 flex w-full items-end justify-between p-6">
              <div>
                <h3 className="mb-1 text-xl font-semibold text-white">{cat.title}</h3>
                <p className="text-xs font-medium text-[#ffdbce]">{cat.count}</p>
              </div>
              <span className="material-symbols-outlined rounded-full bg-[#ea580c]/80 p-1 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">arrow_forward</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Additional Category Links */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {additionalCategories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.href}
            className="group flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-semibold text-[#374151] transition-all hover:border-[#ea580c] hover:text-[#ea580c] hover:shadow-sm"
          >
            <span className="material-symbols-outlined text-base text-[#9ca3af] transition-colors group-hover:text-[#ea580c]">{cat.icon}</span>
            {cat.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
