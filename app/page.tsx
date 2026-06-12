import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const categoryCards = [
  {
    count: "250+ Products",
    href: "/shop/Electrical",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaxg8JxZ_3j2iD7ftJZZNsNJk0n2ubtqRrjnVcVeNNvY7uHtyI54V72tbh_BLItwEGWbVWHaHN0BEQTzpgTWareQ_Pv6xkuEwnQq2YlXTSPR42F2yMRnWEvLKD5w8QcHa3YtvTOEilOEQ5-AG-pA3g7igJnDeuWUvItcc49BqcB7rGT5uYYePDo9sDP7aIPnyPCON-GIEoT8U8Q4YGW6R6XWEIzsACkwOwstBgrhQw9Ez9tnA0Ze3dZqeDiFD8rso014Lo2aZiZA",
    title: "Electrical",
  },
  {
    count: "1,200+ Products",
    href: "/shop/Hardware",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUQWdpqVA7ZF4cKmqoEPg82pWua5TLBnY-vf8N2QZxwQiQW_-1r2eoFUNB6hjsRkO7gz2jN16eyIBPZ-F9m8x1WWg49DKPERiBBRUuZ8Glipv47TioNwQggYTLFSgBpUGbpgQgTYaGFvAa_9v2ZK5Yddjg69bHw7AbWM7Cm9jUzAbjnhDfTfcjT0wJl0h9o_xOFTMhx4A92HpFCAV09rG-zD3Mzg1GEeWSjfMhi3su5jHZWVo1UljGZVlXQfxGQ5Lm7KVTX1mS_A",
    title: "Hardware",
  },
  {
    count: "150+ Products",
    href: "/shop/tools-equipment",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGtXU1LMksbNeP8QP2HHLGmRNJEACs6lSmTjhuJizY4oOK8VZd97IrDwQvPnygUvLSww812TA62Ar7xdYsy9WCRykPmYcmjSsRbDAb5SBhnN63bXmkbkIYoYQfgOveVOygtjc6fCqA-dIQoSg71mPp7Edt_PKAjJv7wdmgUjuu6_cMp3yC_Ey_Emx8bmbOGTjOYKTfq7lOJdLq0riM9Ai43wt1zgE2MDjL0f5XetdzZaVq_p9nmmX_ILxzP9uyTODiu96FM7sSmQ",
    title: "Safety Gear",
  },
];

const featuredEquipment = [
  {
    badge: "Popular",
    category: "Power Tools",
    description: "Brushless Motor, 2 Batteries",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbdFw0Bl89PLWKEMF3sok2Te_ekMB21GGWv9_4WJ07J6lSWy6W3zTC1a2H_Wp88UlfoGxg4RqK0Yu0P0hJeYN1nq2grOoO7-dQr91ops7nRYLYYzNzCHurCBOK-ARiojEcmuP0rg0m1gS6C7Xt8DIELhqP9EFgfPuI50Tzzr9bYMCwoXleq5ysNvkNRRmEjZGtwc-x0P8_TP3Ktou8EiItNDca9B1_aWmvUMeOo1OdjSUDNsuC5lN-pVCfzWIOI7ccceF4FnBo7g",
    price: "Ksh 249.00",
    title: "Pro-Grade Hammer Drill 20V",
  },
  {
    badge: "New",
    category: "Machinery",
    description: "Forged Steel Construction",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp-e3_QYu2u_7GceyjmhGeCavroo12x0pG6wB8oRovXVEf86sYR2DC0xJQ3eoxeT7KliAWNXNVHn3Ea609m8Dp2aIINmgf8IMQPIa2eujZF061FwsMbQJ4hJgkrZGx9hQisXRqKvGwuRgW3xMYdY5HiNeeQ9_vilwy4WX7V-YTcQJ-TLQuJiW_1QRbRJrxyHyBvvRTsyW8rQ9l3n2nZaY72Ku_6_ndzgIT4o-dgVTVhJpaUIqV8tp8CawRWcAZUz39K11_uv3ipA",
    price: "Ksh 185.00",
    title: 'Heavy Duty Bench Vise 6"',
  },
  {
    category: "Electrical",
    description: "100m Roll, 10 AWG",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3DBOn5aUHE7nBzuGaWDnzHklz5fQi_SRKfNKIS5kQ3Xqi-wA9Ul39PjBGXQeCSMOGe9HGZ5E_9wbmrRkXqoI8OBJ4SPjQnK-ehvJtBQJmUMJZbkC4UiAv0_VDaQRJG9rKCK_dmR6yFUCbimGHW_d2mEqnnU44j5K7qEX6DQdext1paoYTTvDvD9sjc5WUEVZHofEWsBUlL4H8iU5PF14RBSWsaeY_6rNkp7RWq4HEENz1cAdL1UeegKgUZgksaNHMKMzObrs8AA",
    price: "Ksh 320.00",
    title: "Industrial Copper Cabling",
  },
  {
    badge: "Popular",
    category: "Tools",
    description: "Calipers, Micrometers (Metric)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBikIb9EYfJZyI7k8ZDHB1jtEasaGrhLJN_c-dTOM2dvar69c0MLtoINlIf5LTJ9nvBtwgZqAymIG3SDK_TyFa37wG3YoTiHJUzOdqJu7ggtlBLySWG21-wZs_0LM3iJWh77Vuwv6pEQ_xdWMWTqX3PHYUUIh7xxbNPpWRhPur5_suGx48IPSbo-QhCfQxYbU5lAD5pEJTsQOsCFBE8WGysv8PV9WCdmdwupta48ltNUrtdxUmB5wntrKZP2_d6EOgia3YlKbB23A",
    price: "Ksh 450.00",
    title: "Precision Measurement Kit",
  },
];

const trustItems = [
  { icon: "local_shipping", label: "Fast Delivery" },
  { icon: "payments", label: "Bulk Pricing" },
  { icon: "support_agent", label: "Contractor Support" },
  { icon: "inventory_2", label: "10,000+ Products" },
];

export default function Page() {
  return (
    <div className="min-h-screen  font-(--font-inter) text-[#191c1e]">
      <Header />
      <main className="w-full flex-1">
          
          {/* --- HERO SECTION WITH BACKGROUND IMAGE --- */}
          <section className="relative overflow-hidden pt-12 pb-20 lg:pt-12 lg:pb-12">
            
            {/* Next.js Optimized Background Image */}
            <div className="absolute inset-0 -z-20">
              <Image
                src="/hero-bg.png" // Put your image file path or URL here
                alt="Industrial background"
                fill
                priority // Tells Next.js to preload this critical Above-the-Fold image
                className="object-cover object-center"
              />
            </div>
            {/* Next.js Optimized Mobile Background Image */}
            <div className="absolute inset-0 -z-20 block lg:hidden">
              <Image
                src="/hero-mobile.png" // Change this to your preferred mobile layout path
                alt="Industrial background mobile"
                fill
                priority 
                className="object-cover object-center"
              />
            </div>

            {/* Background Overlay & Gradients for Readability */}
            {/* Note: changed text color considerations below to look stellar on white backgrounds or overlays */}
            {/* <div className="absolute inset-0 -z-10 bg-white/85 backdrop-blur-sm lg:bg-gradient-to-r lg:from-white/95 lg:via-white/80 lg:to-transparent" /> */}

            {/* Cleaned up an empty duplicate row tag that was right here */}
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
              
              {/* Left Column: Copy & CTAs */}
              <div className="flex flex-col gap-6 lg:gap-8">
                
                {/* Trust badge */}
                <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#e5e7eb] bg-white px-4 py-1.5 text-sm font-medium text-[#4b5563] shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-[#ea580c]" />
                  <span>Trusted by 500+ Contractors</span>
                  <span className="text-xs text-[#9ca3af]">• 98% Reorder Rate</span>
                </div>

                {/* Headline */}
                <div className="space-y-4">
                  <h1 className="text-4xl font-extrabold leading-[1.2] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl lg:leading-[1.15]">
                    <span className="block">Engineered for</span>
                    <span className="mt-2 block bg-gradient-to-r from-[#ea580c] via-[#d44f0a] to-[#b83b0e] bg-clip-text text-transparent">
                      Precision & Durability
                    </span>
                  </h1>

                  {/* Sub-headline */}
                  <p className="max-w-lg text-base leading-relaxed text-[#374151] sm:text-lg font-medium">
                    Equip your next major project with industrial-grade tools and
                    materials. Sourced for absolute reliability,priced for commercial scale.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    className="group flex h-12 items-center justify-center gap-2 rounded-lg bg-[#ea580c] px-8 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#c2410c] hover:shadow-lg active:translate-y-0 sm:h-14 sm:py-4"
                    href="/shop"
                  >
                    Shop Products
                    <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </Link>
                  <Link
                    className="flex h-12 items-center justify-center rounded-lg border-2 border-[#e5e7eb] bg-white px-8 py-3 text-base font-semibold text-[#111827] transition-all duration-200 hover:border-[#d1d5db] hover:bg-[#f9fafb] hover:shadow-md sm:h-14 sm:py-4"
                    href="/quote"
                  >
                    Request Bulk Quote
                  </Link>
                </div>

                {/* Quick Trust Indicators */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
                  <div className="flex items-center gap-2 text-[#374151]">
                    <span className="material-symbols-outlined text-lg text-[#ea580c]">
                      verified
                    </span>
                    ISO 9001 Certified
                  </div>
                  <div className="flex items-center gap-2 text-[#374151]">
                    <span className="material-symbols-outlined text-lg text-[#ea580c]">
                      autorenew
                    </span>
                    Hassle-free Returns
                  </div>
                  <div className="flex items-center gap-2 text-[#374151]">
                    <span className="material-symbols-outlined text-lg text-[#ea580c]">
                      local_shipping
                    </span>
                    Nationwide Delivery
                  </div>
                </div>
              </div>            
            </div>
          </section>
        {/* --- END HERO SECTION --- */}

        {/* Trust Bar Section */}
        <section className="w-full border-x-0 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 divide-x divide-[#e2bfb2] px-6 py-4 md:grid-cols-4 md:gap-6 md:py-6">
            {trustItems.map((item) => (
              <div className="flex items-center justify-center gap-2 px-2 md:gap-3 md:px-3" key={item.label}>
                <span className="material-symbols-outlined text-xl text-[#ea580c] md:text-2xl">{item.icon}</span>
                <span className="text-xs font-semibold text-[#191c1e] md:text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-8 flex items-end justify-between border-x-0 border-t-0 pb-3 md:mb-12">
            <h2 className="text-2xl font-bold leading-8 tracking-normal text-[#191c1e] md:text-[28px] md:leading-9">Explore Categories</h2>
            <Link className="flex items-center text-sm font-semibold text-[#ea580c] hover:underline" href="/shop">
              View All <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoryCards.map((category) => (
              <Link className="hover-lift group relative block h-64 overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl" href={category.href} key={category.title}>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#111827]/80 to-transparent" />
                <Image
                  fill
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={category.image}
                  alt={`${category.title} category`}
                />
                <div className="absolute bottom-0 left-0 z-20 flex w-full items-end justify-between p-6">
                  <div>
                    <h3 className="mb-1 text-xl font-semibold text-white">{category.title}</h3>
                    <p className="text-xs font-medium text-[#ffdbce]">{category.count}</p>
                  </div>
                  <span className="material-symbols-outlined rounded-full bg-[#ea580c]/80 p-1 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    arrow_forward
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Equipment Section */}
        <section className="mx-auto my-1 w-full max-w-7xl rounded-lg bg-white px-6 py-2 shadow-[0px_4px_20px_rgba(17,24,39,0.05)] md:my-10 md:py-12">
          <div className="mb-8 flex items-end justify-between border-x-0 border-t-0 pb-3 md:mb-12">
            <h2 className="text-2xl font-bold leading-8 tracking-normal text-[#191c1e] md:text-[28px] md:leading-9">Featured Equipment</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredEquipment.map((product) => (
              <div className="hover-lift group flex flex-col rounded-lg bg-[#f7f9fb] transition-shadow hover:shadow-md" key={product.title}>
                <div className="relative flex aspect-square items-center justify-center border-x-0 border-t-0 bg-[#f2f4f6] p-3">
                  {product.badge ? (
                    <span className={`absolute left-3 top-3 rounded px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-white ${product.badge === "New" ? "bg-[#ea580c]" : "bg-[#111827]"}`}>
                      {product.badge}
                    </span>
                  ) : null}
                  <Image
                    fill
                    className="h-3/4 w-3/4 object-contain mix-blend-multiply"
                    src={product.image}
                    alt={product.title}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-1 text-xs uppercase tracking-wider text-[#5a4138]">{product.category}</span>
                  <h4 className="mb-1 text-base font-semibold leading-6 text-[#191c1e]">{product.title}</h4>
                  <p className="mb-6 text-xs text-[#5a4138]">{product.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-semibold text-[#191c1e]">{product.price}</span>
                    <a className="rounded p-1 text-[#ea580c] transition-colors hover:bg-[#ea580c]/10" href={siteConfig.whatsappHref} title="WhatsApp Inquiry">
                      <span className="material-symbols-outlined">chat</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bulk Pricing Section */}
        <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 overflow-hidden rounded-lg bg-[#111827] shadow-[0px_10px_30px_rgba(17,24,39,0.1)] lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 text-white md:p-16 lg:p-20">
              <h2 className="mb-3 text-2xl font-bold leading-8 tracking-normal md:text-[28px] md:leading-9">Need Bulk Pricing?</h2>
              <p className="mb-8 text-base leading-7 text-[#c0c6db] md:mb-12 md:text-lg">
                Upload your materials list or BOQ and receive a comprehensive, competitively priced quotation within 24 hours.
              </p>
              <Link className="group flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#e2bfb2]/30 p-8 text-center transition-colors hover:bg-[#404758]/10 md:p-12" href="/quote/upload">
                <span className="material-symbols-outlined mb-3 text-3xl text-[#ea580c] transition-transform group-hover:scale-110 md:text-4xl">cloud_upload</span>
                <span className="text-sm font-semibold text-white">Drag & Drop Files Here</span>
                <span className="mt-1 text-xs text-[#c0c6db]">Supports PDF, Excel, CSV (Max 10MB)</span>
              </Link>
            </div>
            <div className="bg-white p-8 md:p-16 lg:p-20">
              <h3 className="mb-6 text-lg font-semibold text-[#191c1e] md:text-xl">Or Enter Items Manually</h3>
              <form className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#191c1e]">Product Search</label>
                  <div className="flex gap-3">
                    <input className="input-border flex-1 rounded-lg bg-[#f7f9fb] p-3 text-base" placeholder="e.g. 10mm Rebar, M10 Bolts..." type="text" />
                    <input className="input-border w-24 rounded-lg bg-[#f7f9fb] p-3 text-base" placeholder="Qty" type="number" />
                    <button className="rounded-lg bg-[#e6e8ea] px-6 text-sm font-semibold text-[#191c1e] transition-colors hover:bg-[#d8dadc]" type="button">
                      Add
                    </button>
                  </div>
                </div>
                <div className="flex min-h-30 flex-col items-center justify-center rounded-lg bg-[#f7f9fb] p-3 text-[#5a4138]">
                  <span className="material-symbols-outlined mb-1 text-3xl opacity-50">list_alt</span>
                  <span className="text-xs font-medium">List is empty</span>
                </div>
                <div className="pt-3">
                  <Link className="flex h-12 w-full items-center justify-center rounded-lg bg-[#111827] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#111827]/90" href="/quote/manual">
                    Submit Request
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}