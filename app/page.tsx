import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const categoryCards = [
  {
    count: "250+ Products",
    href: "/shop/tools-equipment",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCaxg8JxZ_3j2iD7ftJZZNsNJk0n2ubtqRrjnVcVeNNvY7uHtyI54V72tbh_BLItwEGWbVWHaHN0BEQTzpgTWareQ_Pv6xkuEwnQq2YlXTSPR42F2yMRnWEvLKD5w8QcHa3YtvTOEilOEQ5-AG-pA3g7igJnDeuWUvItcc49BqcB7rGT5uYYePDo9sDP7aIPnyPCON-GIEoT8U8Q4YGW6R6XWEIzsACkwOwstBgrhQw9Ez9tnA0Ze3dZqeDiFD8rso014Lo2aZiZA",
    title: "Power Tools",
  },
  {
    count: "1,200+ Products",
    href: "/shop/industrial-hardware",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUQWdpqVA7ZF4cKmqoEPg82pWua5TLBnY-vf8N2QZxwQiQW_-1r2eoFUNB6hjsRkO7gz2jN16eyIBPZ-F9m8x1WWg49DKPERiBBRUuZ8Glipv47TioNwQggYTLFSgBpUGbpgQgTYaGFvAa_9v2ZK5Yddjg69bHw7AbWM7Cm9jUzAbjnhDfTfcjT0wJl0h9o_xOFTMhx4A92HpFCAV09rG-zD3Mzg1GEeWSjfMhi3su5jHZWVo1UljGZVlXQfxGQ5Lm7KVTX1mS_A",
    title: "Fasteners",
  },
  {
    count: "150+ Products",
    href: "/shop/tools-equipment",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGtXU1LMksbNeP8QP2HHLGmRNJEACs6lSmTjhuJizY4oOK8VZd97IrDwQvPnygUvLSww812TA62Ar7xdYsy9WCRykPmYcmjSsRbDAb5SBhnN63bXmkbkIYoYQfgOveVOygtjc6fCqA-dIQoSg71mPp7Edt_PKAjJv7wdmgUjuu6_cMp3yC_Ey_Emx8bmbOGTjOYKTfq7lOJdLq0riM9Ai43wt1zgE2MDjL0f5XetdzZaVq_p9nmmX_ILxzP9uyTODiu96FM7sSmQ",
    title: "Safety Gear",
  },
];

const featuredEquipment = [
  {
    badge: "Popular",
    category: "Power Tools",
    description: "Brushless Motor, 2 Batteries",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbdFw0Bl89PLWKEMF3sok2Te_ekMB21GGWv9_4WJ07J6lSWy6W3zTC1a2H_Wp88UlfoGxg4RqK0Yu0P0hJeYN1nq2grOoO7-dQr91ops7nRYLYYzNzCHurCBOK-ARiojEcmuP0rg0m1gS6C7Xt8DIELhqP9EFgfPuI50Tzzr9bYMCwoXleq5ysNvkNRRmEjZGtwc-x0P8_TP3Ktou8EiItNDca9B1_aWmvUMeOo1OdjSUDNsuC5lN-pVCfzWIOI7ccceF4FnBo7g",
    price: "Ksh 249.00",
    title: "Pro-Grade Hammer Drill 20V",
  },
  {
    badge: "New",
    category: "Machinery",
    description: "Forged Steel Construction",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCp-e3_QYu2u_7GceyjmhGeCavroo12x0pG6wB8oRovXVEf86sYR2DC0xJQ3eoxeT7KliAWNXNVHn3Ea609m8Dp2aIINmgf8IMQPIa2eujZF061FwsMbQJ4hJgkrZGx9hQisXRqKvGwuRgW3xMYdY5HiNeeQ9_vilwy4WX7V-YTcQJ-TLQuJiW_1QRbRJrxyHyBvvRTsyW8rQ9l3n2nZaY72Ku_6_ndzgIT4o-dgVTVhJpaUIqV8tp8CawRWcAZUz39K11_uv3ipA",
    price: "Ksh 185.00",
    title: 'Heavy Duty Bench Vise 6"',
  },
  {
    category: "Electrical",
    description: "100m Roll, 10 AWG",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3DBOn5aUHE7nBzuGaWDnzHklz5fQi_SRKfNKIS5kQ3Xqi-wA9Ul39PjBGXQeCSMOGe9HGZ5E_9wbmrRkXqoI8OBJ4SPjQnK-ehvJtBQJmUMJZbkC4UiAv0_VDaQRJG9rKCK_dmR6yFUCbimGHW_d2mEqnnU44j5K7qEX6DQdext1paoYTTvDvD9sjc5WUEVZHofEWsBUlL4H8iU5PF14RBSWsaeY_6rNkp7RWq4HEENz1cAdL1UeegKgUZgksaNHMKMzObrs8AA",
    price: "Ksh 320.00",
    title: "Industrial Copper Cabling",
  },
  {
    badge: "Popular",
    category: "Tools",
    description: "Calipers, Micrometers (Metric)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBikIb9EYfJZyI7k8ZDHB1jtEasaGrhLJN_c-dTOM2dvar69c0MLtoINlIf5LTJ9nvBtwgZqAymIG3SDK_TyFa37wG3YoTiHJUzOdqJu7ggtlBLySWG21-wZs_0LM3iJWh77Vuwv6pEQ_xdWMWTqX3PHYUUIh7xxbNPpWRhPur5_suGx48IPSbo-QhCfQxYbU5lAD5pEJTsQOsCFBE8WGysv8PV9WCdmdwupta48ltNUrtdxUmB5wntrKZP2_d6EOgia3YlKbB23A",
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
    <div className="min-h-screen bg-[#f7f9fb] font-(--font-inter) text-[#191c1e]">
           <Header />
      <main className="w-full flex-1">
        <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-20 px-6 py-20 lg:grid-cols-2">
          <div className="flex flex-col gap-12">
            <div className="space-y-3">
              <span className="industrial-border inline-flex items-center rounded bg-[#f2f4f6] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#191c1e]">
                Premium Hardware Supply
              </span>
              <h1 className="text-5xl font-extrabold leading-14 tracking-normal text-[#191c1e]">
                Engineered for <br />
                <span className="text-[#ea580c]">Precision &amp; Durability</span>
              </h1>
              <p className="max-w-lg text-lg leading-7 text-[#5a4138]">
                Equip your next major project with industrial-grade tools and materials. Sourced for reliability, priced for scale.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="flex h-12 items-center justify-center rounded bg-[#ea580c] px-12 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#c2410c]" href="/shop">
                Shop Products
              </Link>
              <Link className="flex h-12 items-center justify-center rounded border-2 border-[#111827] bg-transparent px-12 py-3 text-sm font-semibold text-[#111827] transition-colors hover:bg-[#f2f4f6]" href="/quote">
                Request Bulk Quote
              </Link>
            </div>
          </div>
          <div className="industrial-border relative h-125 w-full overflow-hidden rounded-lg bg-[#f2f4f6] shadow-[0px_4px_20px_rgba(17,24,39,0.05)]">
            <Image
              width={1200}
              height={1200}
              alt="Collage of premium industrial tools and materials including cement, piping, and hardware components"
              className="absolute inset-0 h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkZg4elrdRamRFzXX5UP31O_Z7mVhq5vE_2dZP2AKLvhU2eBEMEVVxj3LR14yvCEgye3esxFjpetqr8L62yO91_QX8-jVsjpHnzQvPCMQhcugs1y1Lt7kOzeoTU6EA_pat5ZHVkNM0ZLSbEY5YkKbOvPn7hHtQ9YjKMK8Is5vGVgUJJ9r4HtfvKv9KbOALIdrPOCwWPZ3GC2LnOPMiYHgetguY7k5AlpkN_Jwg1XwJ3Z2ZEs2ZULO64hfPjXWWKGcxfxmxjsPa_w"
            />
          </div>
        </section>

        <section className="industrial-border w-full border-x-0 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 divide-x divide-[#e2bfb2] px-6 py-6 md:grid-cols-4">
            {trustItems.map((item) => (
              <div className="flex items-center justify-center gap-3 px-3" key={item.label}>
                <span className="material-symbols-outlined text-2xl text-[#ea580c]">{item.icon}</span>
                <span className="text-sm font-semibold text-[#191c1e]">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="industrial-border mb-12 flex items-end justify-between border-x-0 border-t-0 pb-3">
            <h2 className="text-[28px] font-bold leading-9 tracking-normal text-[#191c1e]">Explore Categories</h2>
            <Link className="flex items-center text-sm font-semibold text-[#ea580c] hover:underline" href="/shop">
              View All <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoryCards.map((category) => (
              <Link className="hover-lift group industrial-border relative block h-64 overflow-hidden rounded bg-white" href={category.href} key={category.title}>
                <div className="absolute inset-0 z-10 bg-linear-to-t from-[#111827]/80 to-transparent" />
                <Image
                fill
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={category.image} alt="" />
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

        <section className="industrial-border mx-auto my-20 w-full max-w-7xl rounded-lg bg-white px-6 py-20 shadow-[0px_4px_20px_rgba(17,24,39,0.05)]">
          <div className="industrial-border mb-12 flex items-end justify-between border-x-0 border-t-0 pb-3">
            <h2 className="text-[28px] font-bold leading-9 tracking-normal text-[#191c1e]">Featured Equipment</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredEquipment.map((product) => (
              <div className="hover-lift group industrial-border flex flex-col rounded bg-[#f7f9fb]" key={product.title}>
                <div className="industrial-border relative flex aspect-square items-center justify-center border-x-0 border-t-0 bg-[#f2f4f6] p-3">
                  {product.badge ? (
                    <span className={`absolute left-3 top-3 rounded px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-white ${product.badge === "New" ? "bg-[#ea580c]" : "bg-[#111827]"}`}>
                      {product.badge}
                    </span>
                  ) : null}
                  <Image 
                  fill
                  className="h-3/4 w-3/4 object-contain mix-blend-multiply" src={product.image} alt="" />
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

        <section className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 overflow-hidden rounded-lg bg-[#111827] shadow-[0px_10px_30px_rgba(17,24,39,0.1)] lg:grid-cols-2">
            <div className="flex flex-col justify-center p-20 text-white">
              <h2 className="mb-3 text-[28px] font-bold leading-9 tracking-normal">Need Bulk Pricing?</h2>
              <p className="mb-12 text-lg leading-7 text-[#c0c6db]">
                Upload your materials list or BOQ and receive a comprehensive, competitively priced quotation within 24 hours.
              </p>
              <Link className="group flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#e2bfb2]/30 p-12 text-center transition-colors hover:bg-[#404758]/10" href="/quote/upload">
                <span className="material-symbols-outlined mb-3 text-4xl text-[#ea580c] transition-transform group-hover:scale-110">cloud_upload</span>
                <span className="text-sm font-semibold text-white">Drag &amp; Drop Files Here</span>
                <span className="mt-1 text-xs text-[#c0c6db]">Supports PDF, Excel, CSV (Max 10MB)</span>
              </Link>
            </div>
            <div className="bg-white p-20">
              <h3 className="mb-6 text-xl font-semibold text-[#191c1e]">Or Enter Items Manually</h3>
              <form className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#191c1e]">Product Search</label>
                  <div className="flex gap-3">
                    <input className="input-border flex-1 rounded bg-[#f7f9fb] p-3 text-base" placeholder="e.g. 10mm Rebar, M10 Bolts..." type="text" />
                    <input className="input-border w-24 rounded bg-[#f7f9fb] p-3 text-base" placeholder="Qty" type="number" />
                    <button className="rounded bg-[#e6e8ea] px-6 text-sm font-semibold text-[#191c1e] transition-colors hover:bg-[#d8dadc]" type="button">
                      Add
                    </button>
                  </div>
                </div>
                <div className="industrial-border flex min-h-30 flex-col items-center justify-center rounded-lg bg-[#f7f9fb] p-3 text-[#5a4138]">
                  <span className="material-symbols-outlined mb-1 text-3xl opacity-50">list_alt</span>
                  <span className="text-xs font-medium">List is empty</span>
                </div>
                <div className="pt-3">
                  <Link className="flex h-12 w-full items-center justify-center rounded bg-[#111827] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#111827]/90" href="/quote/manual">
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
