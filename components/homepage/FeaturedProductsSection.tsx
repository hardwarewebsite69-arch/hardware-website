import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getProducts, getCategories } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";
import { productImageFor } from "@/lib/fallback-data";

const fallbackFeaturedEquipment = [
  {
    badge: "Popular",
    category: "Power Tools",
    description: "Brushless Motor, 2 Batteries",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbdFw0Bl89PLWKEMF3sok2Te_ekMB21GGWv9_4WJ07J6lSWy6W3zTC1a2H_Wp88UlfoGxg4RqK0Yu0P0hJeYN1nq2grOoO7-dQr91ops7nRYLYYzNzCHurCBOK-ARiojEcmuP0rg0m1gS6C7Xt8DIELhqP9EFgfPuI50Tzzr9bYMCwoXleq5ysNvkNRRmEjZGtwc-x0P8_TP3Ktou8EiItNDca9B1_aWmvUMeOo1OdjSUDNsuC5lN-pVCfzWIOI7ccceF4FnBo7g",
    price: "Ksh 12,450",
    originalPrice: "Ksh 14,650",
    savings: "15%",
    title: "Pro-Grade Hammer Drill 20V",
    rating: 4.8,
    reviews: 124,
    stock: true,
    urgent: false,
    slug: "pro-grade-hammer-drill-20v",
  },
  {
    badge: "New",
    category: "Machinery",
    description: "Forged Steel Construction",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp-e3_QYu2u_7GceyjmhGeCavroo12x0pG6wB8oRovXVEf86sYR2DC0xJQ3eoxeT7KliAWNXNVHn3Ea609m8Dp2aIINmgf8IMQPIa2eujZF061FwsMbQJ4hJgkrZGx9hQisXRqKvGwuRgW3xMYdY5HiNeeQ9_vilwy4WX7V-YTcQJ-TLQuJiW_1QRbRJrxyHyBvvRTsyW8rQ9l3n2nZaY72Ku_6_ndzgIT4o-dgVTVhJpaUIqV8tp8CawRWcAZUz39K11_uv3ipA",
    price: "Ksh 8,500",
    originalPrice: "Ksh 9,950",
    savings: "15%",
    title: 'Heavy Duty Bench Vise 6"',
    rating: 4.9,
    reviews: 87,
    stock: true,
    urgent: true,
    slug: "heavy-duty-bench-vise-6",
  },
  {
    category: "Electrical",
    description: "100m Roll, 10 AWG",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3DBOn5aUHE7nBzuGaWDnzHklz5fQi_SRKfNKIS5kQ3Xqi-wA9Ul39PjBGXQeCSMOGe9HGZ5E_9wbmrRkXqoI8OBJ4SPjQnK-ehvJtBQJmUMJZbkC4UiAv0_VDaQRJG9rKCK_dmR6yFUCbimGHW_d2mEqnnU44j5K7qEX6DQdext1paoYTTvDvD9sjc5WUEVZHofEWsBUlL4H8iU5PF14RBSWsaeY_6rNkp7RWq4HEENz1cAdL1UeegKgUZgksaNHMKMzObrs8AA",
    price: "Ksh 15,800",
    originalPrice: "Ksh 18,500",
    savings: "15%",
    title: "Industrial Copper Cabling",
    rating: 4.7,
    reviews: 203,
    stock: true,
    urgent: false,
    slug: "industrial-copper-cabling",
  },
  {
    badge: "Popular",
    category: "Tools",
    description: "Calipers, Micrometers (Metric)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBikIb9EYfJZyI7k8ZDHB1jtEasaGrhLJN_c-dTOM2dvar69c0MLtoINlIf5LTJ9nvBtwgZqAymIG3SDK_TyFa37wG3YoTiHJUzOdqJu7ggtlBLySWG21-wZs_0LM3iJWh77Vuwv6pEQ_xdWMWTqX3PHYUUIh7xxbNPpWRhPur5_suGx48IPSbo-QhCfQxYbU5lAD5pEJTsQOsCFBE8WGysv8PV9WCdmdwupta48ltNUrtdxUmB5wntrKZP2_d6EOgia3YlKbB23A",
    price: "Ksh 4,950",
    originalPrice: "Ksh 5,800",
    savings: "15%",
    title: "Precision Measurement Kit",
    rating: 4.6,
    reviews: 56,
    stock: true,
    urgent: true,
    slug: "precision-measurement-kit",
  },
];

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <span className="text-xs text-[#f59e0b]">
      {"★".repeat(full)}{"☆".repeat(5 - full)}
      <span className="ml-1 text-[11px] font-medium text-[#6b7280]">{rating}</span>
    </span>
  );
}

export async function FeaturedProductsSection() {
  let dbProducts = await getProducts({ isFeatured: true, isActive: true, limit: 8 });
  const categories = await getCategories();

  // If no featured products are marked, fall back to any active products in the database
  if (dbProducts.length === 0) {
    dbProducts = await getProducts({ isActive: true, limit: 8 });
  }

  // Determine display products. If empty database, use fallback equipment.
  const displayItems = dbProducts.length
    ? dbProducts.map((p) => {
        // Find category name
        const cat = categories.find((c) => c.id === p.category_id);
        const categoryName = cat ? cat.name : "Industrial Hardware";

        // Deterministic ratings/reviews based on name
        const hash = p.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const rating = 4.5 + (hash % 5) * 0.1;
        const reviews = 30 + (hash % 170);

        // First image from product_images table or fallback
        const imageUrl = p.product_images?.[0]?.url ?? productImageFor(p.slug);

        return {
          id: p.id,
          title: p.name,
          category: categoryName,
          description: p.description || "Premium catalog selection.",
          image: imageUrl,
          price: formatPrice(p.price, p.request_price),
          badge: hash % 3 === 0 ? "Popular" : hash % 3 === 1 ? "New" : undefined,
          stock: true,
          urgent: hash % 4 === 0,
          rating,
          reviews,
          slug: p.slug,
        };
      })
    : fallbackFeaturedEquipment;

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12 md:py-32 font-sans">
      
      {/* Section Header */}
      <div className="mb-12 flex items-end justify-between border-b border-neutral-200 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 block mb-2">Trade Inventory</span>
          <h2 className="text-3xl font-black tracking-tight text-neutral-900 md:text-4xl font-display">Featured Products</h2>
        </div>
        <Link className="group flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors" href="/shop">
          Browse Full Catalog
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600/5 transition-transform duration-300 group-hover:translate-x-0.5">
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </div>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" suppressHydrationWarning={true}>
        {displayItems.map((product) => {
          // Parse numeric value to mock a bulk deal tier
          const numericPrice = parseFloat(product.price.replace(/[^\d.]/g, ""));
          const hasBulkRate = !isNaN(numericPrice) && numericPrice > 0;
          const bulkPriceFormatted = hasBulkRate 
            ? `Ksh ${(numericPrice * 0.88).toLocaleString()}` 
            : null;

          return (
            <div className="double-bezel-card flex flex-col group h-full" key={product.title} suppressHydrationWarning={true}>
              <div className="double-bezel-card-inner flex-1 flex flex-col">
                
                {/* Image Container with Badges */}
                <Link className="relative flex aspect-square items-center justify-center bg-neutral-50/50 rounded-xl overflow-hidden p-4 group" href={`/product/${product.slug}`}>
                  {product.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-neutral-900 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white z-10">
                      {product.badge}
                    </span>
                  )}
                  {product.urgent && (
                    <span className="absolute right-3 top-3 rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] font-bold text-red-650 z-10">
                      Limited Stock
                    </span>
                  )}
                  <div className="relative h-4/5 w-4/5 transition-transform duration-700 ease-out-expo group-hover:scale-105" suppressHydrationWarning={true}>
                    <Image 
                      fill 
                      className="object-contain mix-blend-multiply" 
                      src={product.image} 
                      alt={product.title} 
                      sizes="250px" 
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col pt-4" suppressHydrationWarning={true}>
                  <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-550">
                    {product.category}
                  </span>
                  <Link href={`/product/${product.slug}`}>
                    <h4 className="mb-2 text-sm sm:text-base font-bold leading-snug text-neutral-900 hover:text-orange-600 transition-colors duration-300">
                      {product.title}
                    </h4>
                  </Link>
                  <p className="mb-3 text-xs font-semibold text-neutral-600 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="mb-3 flex items-center gap-1.5" suppressHydrationWarning={true}>
                    <Stars rating={product.rating} />
                    <span className="text-xs font-bold text-neutral-500">({product.reviews})</span>
                  </div>

                

                  {/* Pricing and WhatsApp Trigger */}
                  <div className="mt-auto flex items-end justify-between" suppressHydrationWarning={true}>
                    <div className="flex flex-col gap-0.5" suppressHydrationWarning={true}>
                      {bulkPriceFormatted ? (
                        <>
                          <span className="text-xs font-semibold text-neutral-500 line-through leading-none">
                            {product.price}
                          </span>
                          <span className="text-base sm:text-lg font-black text-neutral-900 leading-none">
                            {bulkPriceFormatted}
                            <span className="text-[10px] font-bold text-orange-600 uppercase ml-1">Bulk</span>
                          </span>
                        </>
                      ) : (
                        <span className="text-base sm:text-lg font-black text-neutral-900 leading-none">
                          {product.price}
                        </span>
                      )}
                    </div>
                    
                    <a 
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-600/5 text-orange-600 transition-all duration-300 hover:bg-[#25d366]/10 hover:text-[#25d366] active:scale-90" 
                      href={`${siteConfig.whatsappHref}?text=Hi%20Amroz%20Traders,%20I%20want%2520to%20inquire%20about%20${encodeURIComponent(product.title)}%20(SKU:%20${encodeURIComponent(product.slug)})`} 
                      title="Inquire" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined text-lg">chat</span>
                    </a>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
